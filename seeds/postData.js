const sequelize = require('../config/connection');
const { Post } = require('../models');

const postData = [
    {
        title: "A day in the life",
        post_text: "just another day in the life writing code! I love what i do!",
        user_id: 1
    },
    {
        title: "MVC",
        post_text: "MVC is an architectural paradigm that utilized Models, Controller, and View folders for the seperation of concerns",
        user_id: 2
    }, 
    {
        title: "JAWS_DB question",
        post_text: "is JAWS_DB necessary for the applications deployment onto heroku?",
        user_id: 3
    }
];

const seedGallery = () => Post.bulkCreate(postData);

module.exports = seedGallery;
