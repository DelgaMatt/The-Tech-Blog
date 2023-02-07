const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Man, this post is awesome!"
    },
    {
        comment_text: "Great advice!"
    },
    {
        comment_text: "Wow! cool!"
    }
];

const seedGallery = () => Comment.bulkCreate(commentData);

module.exports = seedGallery;