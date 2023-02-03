const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./confic/connection.js');

//initialize express
const app = express();
//set port
const PORT = process.env.PORT || 3001;

//telling handlebars to utilize the helpers
const hbs = exphbs.create({helpers}); 

//basic handlebar initialization
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//middleware
//parses incoming json requests and puts the parsed data in req
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//puncturing hole to front end, creating a path to public(client side) files
app.use(express.static(path.join(__dirname, 'public')))

//telling the server to follow pathway into ./controllers for routing
app.use(routes);

//we are not going to be running "DROP DATABASE IF EXISTS" when we run our server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});
