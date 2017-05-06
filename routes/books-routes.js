module.exports = function(apiRoutes, booksService, booksErrors){

    apiRoutes.get("/api/v1/books/author", getBooksByAuthor)
    
    function getBooksByAuthor(req, res){
        
        if(!req.query.firstName || !req.query.lastName){
            return res.status(400).json(booksErrors.MISSING_FIRSTNAME_LASTNAME);
        }
        
         booksService.getAllBooksForAuthor(req.query.firstName, req.query.lastName)
        .then(function(books){
            return res.json({ success: true, message: "Author Search Complete", data: books});
        })
        .catch(function(err){
            return res.status(500).json(err);
        });
    }
    
    apiRoutes.get("/api/v1/books/title", getBooksByTitle)
    
    function getBooksByTitle(req, res){
        
        if(!req.query.titleText){
            return res.status(400).json(booksErrors.MISSING_TITLE);
        }
        
         booksService.getAllBooksForTitle(req.query.titleText)
        .then(function(books){
            return res.json({ success: true, message: "Title Search Complete", data: books});
        })
        .catch(function(err){
            return res.status(500).json(err);
        });
    }
    
    
    apiRoutes.get("/api/v1/books/content", getBooksByContent)
    
    function getBooksByContent(req, res){
        
        if(!req.query.contentText){
            return res.status(400).json(booksErrors.MISSING_CONTENT);
        }
        
         booksService.getAllBooksWithContent(req.query.contentText)
        .then(function(books){
            return res.json({ success: true, message: "Content Search Complete", data: books});
        })
        .catch(function(err){
            return res.status(500).json(err);
        });
    }
    
    
    apiRoutes.get('/api/v1/books/:id', getBookById);
    
    function getBookById(req, res){
        booksService.getBookById(req.params.id)
        .then(function(book){
            if(!book){
                return res.status(404).json(booksErrors.BAD_ID);
            }
            return res.json({ success: true, message: "Book Found", data: book});
        })
        .catch(function(err){
            return res.status(500).json(err);
        });
    }
    
    apiRoutes.get("/api/v1/books", getAllBooks);
    
    function getAllBooks(req, res){
        booksService.getAllBooks()
        .then(function(books){
            return res.json({ success: true, message: "Books Found", data: books});
        })
        .catch(function(err){
            return res.status(500).json(err);
        });
    }
    
    
};