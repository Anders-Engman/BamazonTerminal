CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(35),
    department_name VARCHAR(35),
    price INT(10),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shrunken Heads", "Occult Paraphernalia", 350, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("An Actual Tank", "Police Vehicles", 90000, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Huginn and Muninn", "Mythological Pets", 100000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fine Wines and Cheeses", "Books", 25, 1200);

SELECT * FROM products;