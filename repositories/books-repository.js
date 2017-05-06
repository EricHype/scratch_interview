
var Promise = require('bluebird');

var booksMap = new Map();

function BooksRepository(bookModel){
    this.bookModel = bookModel;
    
    //seed data
    for(var i=1; i<= 10000; i++){
        booksMap.set(i, new bookModel(i, "bookTitle" + i, "authorFirstName" + i, "authorLastName" +i, "content" +i, 
        {tag : i}, getRandomCategory(), new Date(99, 5, 24), getRandomLanguage()));
    }
    
}

function getRandomCategory(){
    var rando = getRandomNumberBetween0and3();
    
    if(rando === 0){
        return "NON_FICTION";
    }
    if(rando === 1){
        return "FICTION";
    }
    if(rando === 2){
        return "ROMANCE";
    }
    if(rando === 3){
        return "COMEDY";
    }

    //"NON_FICTION", "FICTION", "ROMANCE", and "COMEDY"
    return "NON_FICTION";
}

function getRandomLanguage(){
    
    var rando = getRandomNumberBetween0and3();
    
    if(rando === 0){
        return "ENGLISH";
    }
    if(rando === 1){
        return "CHINESE";
    }
    if(rando === 2){
        return "RUSSIAN";
    }
    if(rando === 3){
        return "SPANISH";
    }
    
    //"ENGLISH", "CHINESE", "RUSSIAN", and "SPANISH"
    return "ENGLISH";
}

function getRandomNumberBetween0and3(){
    return Math.floor(Math.random() * 4);
}



BooksRepository.prototype.findBooksByAuthor= function(firstName, lastName){
    
    var books = [];
    
    for (var book of booksMap.values()) {
        if(book.author.firstName === firstName && book.author.lastName === lastName){
            books.push(book);
        }
    }
    
    return Promise.resolve(books);
};

BooksRepository.prototype.findBookById = function(bookId){
    
    if(booksMap.get(bookId) !== undefined ){ //.has returning false when it shouldn't, figure that out later
        return Promise.resolve(booksMap.get(bookId));
    }
    
    return Promise.resolve(null);
};

BooksRepository.prototype.findAllBooks = function(){
    var values = Array.from(booksMap.values());
    return Promise.resolve(values);
};

BooksRepository.prototype.findAllBooksByTitle = function(title){
    
    var books = [];
    
    for (var book of booksMap.values()) {
        if(book.title.includes(title)){ //allow for partial matches?
            books.push(book);
        }
    }
    
    return Promise.resolve(books);
    
};

BooksRepository.prototype.findAllBooksWithContent = function(content){
    var books = [];
    
    for (var book of booksMap.values()) {
        if(book.content.includes(content)){ 
            books.push(book);
        }
    }
    
    return Promise.resolve(books);
}


module.exports = BooksRepository;