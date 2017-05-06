module.exports = function(apiRoutes, booksService, booksErrors){

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
};