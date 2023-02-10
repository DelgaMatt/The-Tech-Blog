const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const { post } = require('../controllers');

User.hasMany(Post, {
    //foreign key created in the post table -- sequelize
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    through: Post,
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment } ;