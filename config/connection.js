const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
require('dotenv').config();
//requiring .env file data
//sequelize will be working with our database
//this could all be in the server.js but we are modularizing 

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3001
        }
    );
}

module.exports = sequelize;