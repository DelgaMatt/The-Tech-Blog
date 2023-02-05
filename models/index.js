const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
    
});

User.hasMany(Comment, {

})

Post.belongsTo(User, {

});

Post.hasMany(Comment, {

})

Comment.belongsTo(User, {

});

module.exports = { User, Post, Comment }