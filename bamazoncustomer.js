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

    for(var i = 0; i < res.length; i++){
        console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' // Price: ' + '$' + res[i].price + " // Remaining Quantity: " + res[i].stock_quantity + " // Department: " + res[i].department_name)
        console.log("-- -- -- -- -- -- -- -- -- -- -- -- --");
    }

    console.log("\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//");
    productPurchase();
      connection.end();
    });
};

function productPurchase() {
    inquirer
        .prompt([
            {
                type:"input",
                message: "Please input the ID of the product you would like to purchase: \n",
                name:"prodIdInput",
                validate: function(value){
                    var validID = value.match(/^[0-9]+$/)
                    if(validID){
                        return true
                    } else {
                        return console.log("Product ID not Found");
                    }
                }
            },

            {
                type: "input",
                message: "Please input the quantity of this item that you would like to purchase: \n",
                name:"quantInput",
                validate: function(value){
                    var validID = value.match(/^[0-9]+$/)
                    if(validID){
                        return true
                    } else {
                        return console.log("Invalid Input: Please Input a Quantity");
                    }
                }
            }
        ]).then(function(answer) {
            connection.query('SELECT * FROM products WHERE id = ?', [answer.prodIdInput], function(err, res){
                if(answer.quantInput > res[0].stock_quantity){
                    console.log('Insufficient Quantity');
                    console.log('');
                    // newOrder();
                }
                else{
                    amountOwed = res[0].Price * answer.quantInput;
                    currentDepartment = res[0].DepartmentName;
                    console.log('Thank you for using Bamazon');
                
                    //update products table
                    connection.query('UPDATE products SET ? Where ?', [{
                        stock_quantity: res[0].stock_quantity - answer.quantInput
                    },{
                        id: answer.prodIdInput
                    }], function(err, res){});
                    //update departments table
                    // logSaleToDepartment();
                    // newOrder();
                }
            })
        })
};