var supertest = require('supertest');
var assert = require("assert");


var container = require("../test-container");
var app = require('../../app')(container);


describe("Books routes", function() {
    
    /*
    it("should give 404 error when id is not found", function(done){
       //.query({ userId : userId })
        supertest(app)
                .get('/api/v1/books/999999999')
                .send()
                .expect(404)
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
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.notEqual(null, res.body.data);
                    assert.equal(2, res.body.data.bookId);
                    done();
                });
    });
    
    it("should throw an error response when firstName is missing in author search", function(done){
        supertest(app)
                .get('/api/v1/books/author')
                .query({ lastName : "Smith" })
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, false);
                    assert.equal(res.body.errorCode, container.booksErrors.MISSING_FIRSTNAME_LASTNAME.errorCode);
                    done();
                });
    });
    
    it("should throw an error response when lastName is missing in author search", function(done){
        supertest(app)
                .get('/api/v1/books/author')
                .query({ firstName : "John" })
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, false);
                    assert.equal(res.body.errorCode, container.booksErrors.MISSING_FIRSTNAME_LASTNAME.errorCode);
                    done();
                });
    });
    
    it("should return an empty array for an unknown author in author search", function(done){
        supertest(app)
                .get('/api/v1/books/author')
                .query({ firstName : "John", lastName : "Smith" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 0);
                    done();
                });
    });
    
     it("should return an array for a known author in author search", function(done){
        supertest(app)
                .get('/api/v1/books/author')
                .query({ firstName : "authorFirstName1", lastName : "authorLastName1" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 1);
                    done();
                });
    });
    
    it("should return error for missing title text in search by title", function(done){
        supertest(app)
                .get('/api/v1/books/title')
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, false);
                    assert.equal(res.body.errorCode, container.booksErrors.MISSING_TITLE.errorCode);
                    done();
                });
    });
    
    it("should return an empty array for a bad title text search", function(done){
        supertest(app)
                .get('/api/v1/books/title')
                .query({ titleText : "IamNotARealTitle" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 0);
                    done();
                });
    });
    
    it("should return an array for a good title text search", function(done){
        supertest(app)
                .get('/api/v1/books/title')
                .query({ titleText : "bookTitle10" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 112);
                    done();
                });
    });
    
    
    it("should return error for missing content text in search by content", function(done){
        supertest(app)
                .get('/api/v1/books/content')
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, false);
                    assert.equal(res.body.errorCode, container.booksErrors.MISSING_CONTENT.errorCode);
                    done();
                });
    });
    
    it("should return an empty array for a bad content search", function(done){
        supertest(app)
                .get('/api/v1/books/content')
                .query({ contentText : "IamNotARealContent" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 0);
                    done();
                });
    });
    
    it("should return an array for a good content search", function(done){
        supertest(app)
                .get('/api/v1/books/content')
                .query({ contentText : "content10" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 112);
                    done();
                });
    });
    
    
    it("should return error for missing tags in search by metadata", function(done){
        supertest(app)
                .get('/api/v1/books/metadata')
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, false);
                    assert.equal(res.body.errorCode, container.booksErrors.MISSING_TAGS.errorCode);
                    done();
                });
    });
    
    
    it("should return 500 error for malformed tags in search by metadata", function(done){
        supertest(app)
                .get('/api/v1/books/metadata')
                .query({ tags : "tags123" })
                .send()
                .expect(500)
                .end(function(err, res){
                    done();
                });
    });
    
    it("should return an array for a matching metadata tag", function(done){
        supertest(app)
                .get('/api/v1/books/metadata')
                .query({ tags : "tag:1" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 1);
                    done();
                });
    });
    
     it("should return error for missing category in search by category", function(done){
        supertest(app)
                .get('/api/v1/books/category')
                .send()
                .expect(400)
                .end(function(err, res){
                    assert.equal(res.body.success, false);
                    assert.equal(res.body.errorCode, container.booksErrors.MISSING_CATEGORIES.errorCode);
                    done();
                });
    });
    
    it("should return an empty array for a bad category search", function(done){
        supertest(app)
                .get('/api/v1/books/category')
                .query({ categories : "IamNotARealCategory" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.equal(res.body.data.length, 0);
                    done();
                });
    });
    */
     it("should return a full array for a good category search", function(done){
        supertest(app)
                .get('/api/v1/books/category')
                .query({ categories : "NON_FICTION,COMEDY" })
                .send()
                .expect(200)
                .end(function(err, res){
                    assert.equal(res.body.success, true);
                    assert.notEqual(res.body.data.length, 0);
                    done();
                });
    });
    
})