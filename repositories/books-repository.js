
var Promise = require('bluebird');

var booksMap = new Map();

function BooksRepository(bookModel){
    this.bookModel = bookModel;
    
    //seed data
    for(var i=1; i<= 10000; i++){
        booksMap.set(i, new bookModel(i, "bookTitle" + i, "authorFirstName" + i, "authorLastName" +i, "content" +i, 
        {"country" : getrandomCountry(), tag : i }, getRandomCategory(), 
        new Date(99, 5, getRandomNumberBetween1and27()), getRandomLanguage()));
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

function getrandomCountry(){
    var rando = getRandomNumberBetween0and3();
    
    if(rando === 0){
        return "ENGLAND";
    }
    if(rando === 1){
        return "USA";
    }
    if(rando === 2){
        return "RUSSIA";
    }
    if(rando === 3){
        return "MEXICO";
    }
    
    //"ENGLISH", "CHINESE", "RUSSIAN", and "SPANISH"
    return "SPAIN";
}


function getRandomNumberBetween0and3(){
    return Math.floor(Math.random() * 4);
}

function getRandomNumberBetween1and27(){
    return Math.floor(Math.random() * 27) + 1;
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
};


BooksRepository.prototype.findAllBooksWithMetadata = function(metadataArray){
    
    var books =[];
    
    for (var book of booksMap.values()) {
        
        var includeBook = true;
        
        for(var kv of metadataArray){
            if(!book.metadata_tags.hasOwnProperty(kv.key)){
                includeBook = false;
                break;
            }
            
            if(book.metadata_tags[kv.key] != kv.value){
                includeBook = false;
                break;
            }
        } 
        
        if(includeBook){
            books.push(book);
        }
        
    }
    
    return Promise.resolve(books);
    
};

BooksRepository.prototype.findAllBooksByCategories = function(categories){
    
    var books = [];
    
    for(var book of booksMap.values()){
        
        var includeBook = false;
        
        for(var cat of categories){
            if(cat == book.category){
                includeBook = true;
            }
        }
        
        if(includeBook){
            books.push(book);
        }
        
    }
    
    return Promise.resolve(books);
};

BooksRepository.prototype.findAllBooksByDate = function(date, operator){

var books = [];
    
    var func_op = null;
    
    switch(operator){
        case "<":
            func_op = published_lt;
            break;
        case ">":
            func_op = published_gt;
            break;
        case "==":
            func_op = published_equals;
            break;
        case ">=":
            func_op = published_ge;
            break;
        case "<=":
            func_op = published_le;
            break;
        default:
            return Promise.reject({ inavlid_operator : true });
    }
    
    for(var book of booksMap.values()){
        if(func_op(book.published_date, date)){
            books.push(book);
        }
    }
    
    return Promise.resolve(books);    
    
};

//published date ( ==, <=, >=, > or <)
function published_equals(bookDate, desiredDate){
    return bookDate.getTime() == desiredDate.getTime();
}
function published_le(bookDate, desiredDate){
    return bookDate.getTime() <= desiredDate.getTime();
}
function published_ge(bookDate, desiredDate){
    return bookDate.getTime() >= desiredDate.getTime();
}
function published_lt(bookDate, desiredDate){
    return bookDate.getTime() < desiredDate.getTime();
}
function published_gt(bookDate, desiredDate){
    return bookDate.getTime() > desiredDate.getTime();
}


BooksRepository.prototype.findAllBooksByLanguages = function(languages){
    var books = [];
    
    for(var book of booksMap.values()){
        
        var includeBook = false;
        
        for(var lang of languages){
            if(lang == book.language){
                includeBook = true;
            }
        }
        
        if(includeBook){
            books.push(book);
        }
        
    }
    
    return Promise.resolve(books);
};

module.exports = BooksRepository;