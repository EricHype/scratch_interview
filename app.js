var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var morgan       = require('morgan');


module.exports = function(container){
  var router = express();

router.use(morgan('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static(path.resolve(__dirname, 'client')));

//routes
require('./routes/books-routes')(router, container.booksService, container.booksErrors);


//catch all route
router.get('*', function(req, res){
  res.send('Page not found', 404);
});


return router;
};