const validator = require('validator');

function validatePassword(password) {
    if (!validator.isLength(password, { min: 8 })) {
      return false;
    }
    return true;
  }

  function validateUsername(username) {
    if (!validator.isLength(username, { min: 3, max: 20 })) {
      return false;
    }
    if (!validator.isAlphanumeric(username, 'en-US', { ignore: '_' })) {
      return false; 
    }
  
    return true;
  }

  module.exports = { validatePassword, validateUsername, }