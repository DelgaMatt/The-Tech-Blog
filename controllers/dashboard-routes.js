// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth.js');

//all user posts
router.get('/', async (req, res) => {
    try{
        const userPostData = await Post.findAll({
            //have to figure out how to pull from req.session.user
            where: {user_id: 2},
            include: [ Comment, User ]
        });

        const posts = await userPostData.map((post) => post.get({ plain: true }));

        // res.render('dashboard', { posts, loggedIn: true});

        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
});

//add a new blog post
router.post('/', async (req, res) => {
    try{
        const newPostData = await Post.create({
            title: req.body.title,
            post_text: req.body.post_text
        });

        res.status(200).json(newPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update a user post
router.put('/:id', async (req, res) => {
    try{
      const updatedPostData = await Post.update(req.body, {
        where: {id: req.params.id}
      });
  
      if (!updatedPostData) {
        res.status(404).json({message: "No post found with that id"});
        return;
      };
  
      res.status(202).json(updatedPostData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
      const userPostData = await Post.destroy({
        where: {id: req.params.id}
      });
  
      if (!userPostData) {
        res.status(404).json({message: 'No post found with that id'});
        return;
      };
  
      res.status(200).json(userPostData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router ;