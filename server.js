const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
//telling handlebars to utilize the helpers
const hbs = exphbs.create({ helpers }); 

const session = require('express-session');

//initialize express
const app = express();

//set port
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));



//handlebars is going to allow us to make dynamic html
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
app.use(routes);

//we are not going to be running "DROP DATABASE IF EXISTS" when we run our server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
