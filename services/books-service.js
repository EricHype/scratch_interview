require("../util/array-keysort");


function BooksService(booksRepository){
    this.booksRepository = booksRepository;
}


BooksService.prototype.getBookById = function(bookId){
    
    if(typeof(bookId) === 'string'){
        bookId = parseInt(bookId);
    }
    
    return this.booksRepository.findBookById(bookId);
};


BooksService.prototype.getAllBooks = function(){
    return this.booksRepository.findAllBooks();
};

BooksService.prototype.getAllBooksForAuthor = function(firstName, lastName){
    return this.booksRepository.findBooksByAuthor(firstName, lastName);   
};

BooksService.prototype.getAllBooksForTitle = function(titleText){
    return this.booksRepository.findAllBooksByTitle(titleText);
};

BooksService.prototype.getAllBooksWithContent = function(content){
    return this.booksRepository.findAllBooksWithContent(content);
};

BooksService.prototype.getBooksWithMetadata = function(tags){
    var entries = tags.split(",");
    if(!entries || entries.length < 1 || !tags.includes(":")){
        return Promise.reject({ noTags: true });
    }
    
    var kvArray = entries.map(function(entry){
        var vals = entry.split(":"); //this will break if the value or key text has a ":"" in it
        return { key: vals[0], value: vals[1] };
    });
    
    return this.booksRepository.findAllBooksWithMetadata(kvArray);
};

BooksService.prototype.getBooksWithCategories = function(categories){
    var catArr = categories.toUpperCase().split(",");
    return this.booksRepository.findAllBooksByCategories(catArr);
};


BooksService.prototype.getAllBooksByPublishDate = function(publishDate, operator){
    
    var date = null;
    if(!(publishDate instanceof Date)){
        date = new Date(parseInt(publishDate));
    }
    
   return this.booksRepository.findAllBooksByDate(date, operator);
};

BooksService.prototype.getAllBooksByLanguages = function(languages){
    var langArr = languages.toUpperCase().split(",");
    return this.booksRepository.findAllBooksByLanguages(langArr);
};


BooksService.prototype.getBooksByParameters = function(firstName, lastName, titleText, contentText,
    tags, categories, publishedDate, operator, languages, pageSize, pageNumber, limit, sortKeys){
  
    var tagsArray = null;
    if(tags){
        var entries = tags.split(",");
        if(!entries || entries.length < 1 || !tags.includes(":")){
            return Promise.reject({ noTags: true });
        }
        
        tagsArray = entries.map(function(entry){
            var vals = entry.split(":"); //this will break if the value or key text has a ":"" in it
            return { key: vals[0], value: vals[1] };
        });
    }
    
    var langArray = null;
    if(languages){
        langArray = languages.toUpperCase().split(",");
    }
    
    var catArray = null;
    if(categories){
        catArray = categories.toUpperCase().split(",");
    }
    
  
    //TODO: this should check a cache before going to the repo, this would be particularly helpful for paging performance
    return this.booksRepository.findAllBooksByCriteria(firstName, lastName, titleText, contentText,
        tagsArray, catArray, publishedDate, operator, langArray)
        
    //doing all of the following here goes against the Single Object Responsibility principle and should be refactored
    .then(function(books){
        
        //sort if neccessary, assume keys in column1:asc,column2:desc
        if(!sortKeys){
            return Promise.resolve(books);
        }
        var sortKV = {};     
        var keysArr = sortKeys.split(",");
        
        for(var kv of keysArr){
            var split = kv.split(":");
            sortKV[split[0]] = split[1];
        }
        
        return Promise.resolve(books.sortKeys(sortKV));
    })
    .then(function(sortedBooks){
        //get page if pagination on
        if(!pageNumber || !pageSize){
            return Promise.resolve(sortedBooks);
        }
        
        var pagedBooks = [];
        var startIndex = pageNumber * (pageSize -1); //page 2 of size 30 should show records 30-59
        var endIndex = startIndex + pageSize;
        if(endIndex > pagedBooks.length){
            endIndex = pagedBooks.length;
        }
        
        for(var i= startIndex; i< endIndex; i++){
            pagedBooks.push(sortedBooks[i]);    
        }
        
        return Promise.resolve(pagedBooks);
    })
    .then(function(books){
        //apply limit if specified 
        if(!limit){
            return Promise.resolve(books);
        }
        
        return Promise.resolve(books.slice(0, limit));
        
    });
};

module.exports = BooksService;