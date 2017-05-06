var errors = {}

errors.BAD_ID = { success: false, errorCode: "BOOK404", message: "Cannot find book for given ID" };
errors.BOOKS_GENERAL = { success: false, errorCode: "BOOK500", message: "Error in books route"};

module.exports = errors;