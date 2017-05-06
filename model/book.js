
function book(bookId, bookTitle, authorFirstName, authorLastName, content, 
    metadata_tags, category, published_date, language){
    this.bookId = bookId;    
    this.bookTitle = bookTitle;
    this.author = { firstName : authorFirstName, lastName : authorLastName};
    this.content = content;
    this.metadata_tags = metadata_tags;
    this.category = category;
    this.published_date = published_date;
    this.language = language;
}

module.exports = book;