const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers = require('./utils/helpers.js');
const { strict } = require('assert');

//initialize express
const app = express();

//set port
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: strict
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//telling handlebars to utilize the helpers
const hbs = exphbs.create({ helpers }); 

//basic handlebar initialization
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
//parses incoming json requests and puts the parsed data in req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//puncturing hole to front end, creating a path to public(client side) files
app.use(express.static(path.join(__dirname, 'public')));

//telling the server to follow pathway into ./controllers for routing
// app.use(require('./controllers'));

//we are not going to be running "DROP DATABASE IF EXISTS" when we run our server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});
