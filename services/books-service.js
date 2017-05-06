function BooksService(booksRepository){
    this.booksRepository = booksRepository;
}


BooksService.prototype.getBookById = function(bookId){
    
    if(typeof(bookId) === 'string'){
        bookId = parseInt(bookId);
    }
    
    return this.booksRepository.findBookById(bookId);
};

module.exports = BooksService;