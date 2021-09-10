# E-Commerce-Backend
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

E-Commerce Backend is a backend API (surprise surprise) that makes use of CRUD operations for a general eCommerce website. The API is built with Express.js and Sequelize to interact with a MySQL database. There are endpoints for categories, tags, and products. Products belong to a single category but can have multiple tags, and tags can be attributed to multiple products.

## Table of Contents
   
* [Installation Instructions](#installation-instructions)
* [Usage Instructions](#usage-instructions)
* [Demo](#demo)
* [Contributions](#contributions)
* [Questions](#questions)

## Installation Instructions
First, download or clone the repository to your local machine. Then, from within the root directory, run:
      
      npm i
      
to install all the necessary dependencies.

Next, you will need to connect the application to a MySQL database running locally on your machine. First, make sure you have a MySQL server [installed and running on your machine.](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) After confirming you have a server runnning, you will need to create a .env file in the root directory to hold your database credentials. You will need to add the following three properties:

      DB_USER=<username>
      DB_PW=<password>
      DB_NAME='ecommerce_db'
      
Once this is complete, you will need to instantiate the database via the provided schema.sql file. From your root directory, run:
      
      mysql -u <username> -p
      
and enter your username and password credentials. Then, from inside your MySQL shell, run:

      source db/schema.sql // creates the database, or recreates if it already exists.
      quit
      
Optionally, you may seed the database with provided dummy data contained in the /seeds directory by running:

      npm run seed

from your root directory.
      
The application should now be ready for use. 
      
## Usage Instructions

From the root directory, after confirming you've installed all prerequisites and set up the application, run:

      npm start
      
The server will become live and will listen on the default port of 3001. Users can then make requests to three different endpoints:

Categories:

- GET /api/categories/
- GET /api/categories/:categoryID
- POST /api/categories/
- PUT /api/categories/:categoryID
- DELETE /api/categories/:categoryID

Tags:

- GET /api/tags/
- GET /api/tags/:tagID
- POST /api/tags/
- PUT /api/tags/:tagID
- DELETE /api/tags/:tagID

Products:

- GET /api/products/
- GET /api/products/:productID
- POST /api/products/
- PUT /api/products/:productID
- DELETE /api/products/:productID

## Demo

[![Demo](https://img.youtube.com/vi/758dBw6mwHY/0.jpg)](https://www.youtube.com/watch?v=758dBw6mwHY)

## Contributions

Contributions, issue requests, and feature requests are all welcomed.

## Questions

If you have any questions about this software or how to use it, please reach out to me:
- Will.o.berner@gmail.com
- [Will Berner](https://github.com/WillBerner)


&copy; 2021 [Will](https://github.com/WillBerner)
