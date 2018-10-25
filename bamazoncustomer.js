var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
    productDisplay();
});

function productDisplay() {
    console.log("Welcome to Bamazon, Your Community Marketplace \n");
    console.log("Displaying all available products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
// NEXT OBJECTIVE:
// 1) split recieved "res" data into respective parts
// 2) For Loop to display all of the server options
//      2.1) Find out how to read number of rows in a server!!
      console.log(res);
      inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to purchase an Item? \n",
                choices: ["Yes", "Not Right Now"],
                name: "choice"
            }
        ]).then(function(answer) {
            if (answer === "Yes") {
                productPurchase();
            } else if (answer === "Not Right Now") {
                console.log("Thank you for using Bamazon")
            }
        })
      connection.end();
    });
};

function productPurchase() {
    inquirer
        .prompt([
            {
                type:"input",
                message: "Please input the ID of the product you would like to purchase: \n",
                name:"prodIdInput"
            },

            {
                type: "input",
                message: "Please input the quantity of this item that you would like to purchase: \n",
                name:"quantInput"
            }

        ]).then(function(answer) {
            // connection.query(""
            // )
            console.log(answer);
        })
};