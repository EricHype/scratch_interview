var errors = {}

errors.MISSING_CATEGORIES = { success: false, errorCode: "BOOK105", 
    message: "Parameter categories required" };
errors.MISSING_CONTENT = { success: false, errorCode: "BOOK103", 
    message: "Parameter contentText required" };
errors.MISSING_FIRSTNAME_LASTNAME = { success: false, errorCode: "BOOK100", 
    message: "Parameters firstName and lastName are required" };
errors.MISSING_LANGUAGE = { success: false, errorCode: "BOOK107", 
    message: "Parameter languages is required" };    
errors.MISSING_PUBLISH = { success: false, errorCode: "BOOK106", 
    message: "Parameters publishedDate and operator are required" };
errors.MISSING_TAGS = { success: false, errorCode: "BOOK104", 
    message: "Parameter tags required" };
errors.MISSING_TITLE = { success: false, errorCode: "BOOK101", 
    message: "Parameter titleText required" };
    
errors.BAD_ID = { success: false, errorCode: "BOOK404", message: "Cannot find book for given ID" };
errors.BOOKS_GENERAL = { success: false, errorCode: "BOOK500", message: "Error in books route"};

module.exports = errors;