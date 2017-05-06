var supertest = require('supertest');
var assert = require("assert");


var container = require("../test-container");
var app = require('../../app')(container);


describe("Books routes", function() {
    
    
    it("should give 404 error when id is not found", function(done){
       //.query({ userId : userId })
        supertest(app)
                .get('/api/v1/books/999999999')
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, false);
                    assert.equal(res.body.errorCode, container.booksErrors.BAD_ID.errorCode);
                    assert.equal(res.body.message, container.booksErrors.BAD_ID.message);
                    done();
                });
    });
    
    it("should return a book when id is good", function(done){
       //.query({ userId : userId })
        supertest(app)
                .get('/api/v1/books/2')
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.notEqual(null, res.body.data);
                    assert.equal(2, res.body.data.bookId);
                    done();
                });
    });
    
})