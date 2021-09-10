// Use env vars to hide sensitive information
require('dotenv').config();

// Import sequelize to use to create the database connection
const Sequelize = require('sequelize');

// Set up the database connection with credentials and db info
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
