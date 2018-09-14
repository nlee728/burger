// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
    
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for SQL statement functions
var orm = {
    selectAll: function(tableInput, callBack) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callBack(result);
    });
  },
    insertOne: function(table, cols, vals, callBack) {
    var queryString = "INSERT INTO " + table + " (" + cols.toString()
     + ") " + "VALUES (" + printQuestionMarks(vals.length) + ") ";
    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      callBack(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  //update: function(table, objColVals, condition, cb) {
    updateOne: function(table, objColVals, condition, callBack) {
    var queryString = "UPDATE " + table + " SET " + objToSql(objColVals)
    + " WHERE " + condition;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      callBack(result);
    });
}
};

// Export the orm object for the model (burger.js).
module.exports = orm;
