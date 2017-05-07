
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

# 3) TL/DR or how do I run it?

- Make sure you have the latest version of node / npm
- clone repository
- npm install 
- node bin/www

# 4) Routes:

(Single parameter search)
/api/v1/books/author - Parameters: firstName, lastName
/api/v1/books/title - Parameters: titleText
/api/v1/books/content - Parameters: contentText
/api/v1/books/metadata - Parameters: tags. Format should be: "key1:val1,key2:val2,..."
/api/v1/books/category - Parameters: categories. Format should be: "CAT1,CAT2,CAT3"
/api/v1/books/published_date - Parameters: publishedDate, operator. Format should be timestamp in millisecond and string operator ie: "=="








(Multi parameter search)
