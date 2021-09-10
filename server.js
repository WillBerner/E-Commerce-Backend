// Import necessary dependencies
const express = require('express');
// Import created routes
const routes = require('./routes');

// Import sequelize connection
const sequelize = require('./config/connection')

// Boilerplate
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use modularized routes to set up endpoints
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
