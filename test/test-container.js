
var container = {};

//ERRORS
container.booksErrors = require("../errors/books-errors");

//MODEL
container.bookModel = require("../model/book");

//REPO
var booksRepoDef = require("../repositories/books-repository");
container.booksRepository = new booksRepoDef(container.bookModel);

//SERVICE
var booksServiceDef = require("../services/books-service");
container.booksService = new booksServiceDef(container.booksRepository);

module.exports = container;