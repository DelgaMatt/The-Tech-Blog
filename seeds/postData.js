const sequelize = require('../config/connection');
const { Post } = require('../models');

const postData = [
    {
        title: "A day in the life",
        post_text: "just another day in the life writing code! I love what i do!"
    },
    {
        title: "MVC",
        post_text: "MVC is an architectural paradigm that utilized Models, Controller, and View folders for the seperation of concerns"
    }, 
    {
        title: "JAWS_DB question",
        post_text: "is JAWS_DB necessary for the applications deployment onto heroku?"
    }
];

const seedGallery = () => Post.bulkCreate(postData);

module.exports = seedGallery;
