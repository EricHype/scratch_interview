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

module.exports = BooksService;