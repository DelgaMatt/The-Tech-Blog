const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

//localhost:3001/api/users
//localhost:3001/api/posts
//localhost:3001/api/comments

// router.use('/user', userRoutes);
router.use('/post', postRoutes);
// router.use('/comment', commentRoutes);

module.exports = router ;