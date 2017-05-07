
# Scratch.fi interview problem
-----
# 1) Problem definition:

One day, Sameh (pictured) decides that the public library market
needs disrupting and abruptly pivots Scratch. He spends all our
funding buying 10M books (and growing...) from public SF libraries
and downloads them onto a server.
Your task is to create and implement an API to search through
these books. The first MVP requires that you build an in-memory
representation that contains data for all these books, as well as
developing the scheme and models for any object(s) you would
need.
You have total control in designing the API and how the in-memory
data structures are represented. Solutions should not utilize highlevel
frameworks, like Rails, Phoenix, Django, etc.

# 2) Assumptions/things I've done differently

From scratch:
- Author and title constraints should be case-insensitive, and multi-token (whitespace-separated)
searches should return results that include all tokens.
- If multiple categories or languages are specified, they should be treated as OR (e.g. “is either English OR
Russian”)

I don't think whitespace seperated names are a great way to go in general, particularly when the behavior is so loosely defined. I'm going to do a specific firstName and lastName designation instead, this will dodge around the problem of people with 3+ names which is more common once you get outside of typical western names. 

The type of client for this API was never specified so I'm assuming dates can come in millisecond timestamp format vs user-input mm/dd/yyyy format.

RAM of server and processor speed are also not defined, so I could technically assume they are unbounded/limitless. 

# 3) TL/DR or how do I run it?

- Make sure you have the latest version of node / npm
- clone repository
- npm install 
- node bin/www

# 4) Routes:

(Single parameter search)
- /api/v1/books/author - Parameters: firstName, lastName
- /api/v1/books/title - Parameters: titleText
- /api/v1/books/content - Parameters: contentText
- /api/v1/books/metadata - Parameters: tags. Format should be: "key1:val1,key2:val2,..."
- /api/v1/books/category - Parameters: categories. Format should be: "CAT1,CAT2,CAT3,..."
- /api/v1/books/published_date - Parameters: publishedDate, operator. Format should be timestamp in millisecond and string operator ie: "=="
- /api/v1/books/language - Parameters: languages. Format should be "LANG1,LANG2,..."

(Multi parameter search)
- /api/v1/books/search - Parameters: firstName, lastName, titleText, contentText, tags, categories, publishedDate, operator, languages, pageNumber, pageSize, limit, sortKeys. Formats are same as above, sortkeys should be in "column:asc,column2:desc" format.

# 5) Things still to do/stuff I'm not that happy with.

This implementation is laregly a brute force one, given the nebulous nature of the problem, which is massively inefficient. Seriously, it took me a full day of working on it and re-reading the problem before I finally figured out what Scratch was probably trying to have me code so they could evaluate. 

Sadly, by the time I understood what the problem really wanted me to do, I had already put a lot of hours into the single-parameter routes and the tests that go with them. I unfortunately ended up shorting what was probably the more important stuff Scratch would like to see in the multi-parameter route and backing repository. I really wish I had understood what was written a bit better or that the problem was written more clearly so I knew where to spend my time.

The service class violated the single object responsibility principle, so I'd love to refactor that. Additionally, I'd like to add in memory indexes on the collection to speed up searches. It's not hard to get a pretty decent speed gain over the simple iterate-over-whole-collection version I did as an initial implementation. 

Lastly, this is a solution that could greatly benefit from caching, particularly if the pagination feature is heavily used.

# 6) If this was to be deployed as a service

Part of the problem is say what you wold do if this solution were to be deployed as a service that added 100 books per second and had to handle 50k searches per second. Flatly, I wouldn't ship anything like this to handle that problem. There are way better, well understood and industry standard tools like elasticsearch/solr that can handle something like this easily and the benefits of using them far outweigh the costs. 

However, if I had to ship this type of solution, there are a number of things to consider. One would be how consistent the data needs to be and at what time (eventual consistency vs atomic). If inserts can be batched together so that index rebuilding etc can be taken on a less frequent schedule that would be a benefit. For searches, all code would need to be made non-blocking, the brute force methods I implemented wouldn't be able to keep up with that kind of load. As mentioned above, caching of query results would also be a boon, particularly if the pagination feature is heavily used.
