const Sequelize = require('sequelize');
require('dotenv').config();
//requiring .env file data
//sequelize will be working with our database
//this could all be in the server.js but we are modularizing 

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
)


module.exports = sequelize;