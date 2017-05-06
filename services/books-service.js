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

module.exports = BooksService;