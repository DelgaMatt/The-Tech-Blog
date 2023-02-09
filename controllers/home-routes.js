const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const { Model } = require('sequelize');

//will contain all of the user facing routes (homepage, login)
//get and render all posts
//will render all posts / header will include login option in header
//will include a login route

//get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [ User, Comment ]
        });

        //serialize the data
        const posts = await postData.map((post) => post.get({ plain: true }));

        // res.render('homepage', {
        //     posts,
        //     loggedIn: req.session.loggedIn,
        // });

        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});

//get post by id
router.get('/post/:id', async (req, res) => {
    try {

        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id' });
            return;
        };

        // res.render('homepage', {
        //     posts,
        //     loggedIn: req.session.loggedIn,
        // }); 

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

//signup page render
router.get('/signup', (req, res) => {
    res.render('signup');
});

//login page render
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router ;