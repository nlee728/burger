// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  selectAll: function(callBack) {
    orm.all("burgers", function(res) {
      callBack(res);
    });
  },
  
  insertOne: function(cols, vals, callBack) {
    orm.create("burgers", cols, vals, function(res) {
      callBack(res);
    });
  },
  
  updateOne: function(objColVals, condition, callBack) {
    orm.update("burgers", objColVals, condition, function(res) {
      callBack(res);
    });
  }
};

// Export the database functions for the controller
module.exports = burger;
