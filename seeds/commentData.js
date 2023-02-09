const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Man, this post is awesome!",
        user_id: 2
    },
    {
        comment_text: "Great advice!",
        user_id: 1
    },
    {
        comment_text: "Wow! cool!",
        user_id: 3
    }
];

const seedGallery = () => Comment.bulkCreate(commentData);

module.exports = seedGallery;