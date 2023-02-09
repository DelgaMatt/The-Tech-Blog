//the dashboard will get and render all user posts
//dashboard will enable a user to update/edit/delete posts
//dashboard will enable a user to view all of their comments
//if user is not loged in, we will redirect them to the login
//else dashboard user infor will not be accessible

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');

//all user posts
router.get('/dashboard', async (req, res) => {
    try{
        const userPostData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: ( Comment, User )
        });

        const posts = await userPostData.map((post) => post.get({ plain: true }));

        // res.render('dashboard', {});

        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
});

//

module.exports = router ;