
var Promise = require('bluebird');

var booksMap = new Map();

function BooksRepository(bookModel){
    this.bookModel = bookModel;
    
    //seed data
    for(var i=1; i<= 1000; i++){
        booksMap.set(i, new bookModel(i, "bookTitle", "authorFirstName" + i, "authorLastName" +i, "content" +i, 
        {tag : i}, getRandomCategory(), new Date(99, 5, 24), getRandomLanguage()));
    }
    
}

function getRandomCategory(){
    //"NON_FICTION", "FICTION", "ROMANCE", and "COMEDY"
    return "NON_FICTION";
}

function getRandomLanguage(){
    //"ENGLISH", "CHINESE", "RUSSIAN", and "SPANISH"
    return "ENGLISH";
}

BooksRepository.prototype.findBookByAuthor= function(firstName, lastName){
    for (var book of booksMap.values()) {
        if(book.author.firstName === firstName && book.author.lastName === lastName){
            return Promise.resolve(book);
        }
    }
    
    return Promise.resolve(null);
};

BooksRepository.prototype.findBookById = function(bookId){
    
    if(booksMap.get(bookId) !== undefined ){ //.has returning false when it shouldn't, figure that out later
        return Promise.resolve(booksMap.get(bookId));
    }
    
    return Promise.resolve(null);
};

module.exports = BooksRepository;