const router = require('express').Router();
const { Post, User, Comment } = require('../../models')

//get all posts
//localhost:3001/api/post
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [ User, Comment ]
        });

        //serialize the data
        const posts = await postData.map((post) => post.get({ plain: true }));

        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  try {
      const postData = await Post.create({
        title: req.body.title,
        post_text: req.body.post_text
      });
      
      res.status(200).json(postData)
  } catch(err) {
      res.status(500).json(err);
  }
});

//get post by id
router.get('/:id', async (req, res) => {
    try {

        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id' });
            return;
        };

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
      const postData = await Post.update(req.body, {
        where: {id: req.params.id}
      });
  
      if (!postData) {
        res.status(404).json({message: "No post found with that id"});
        return;
      };
  
      res.status(202).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
      const postData = await Post.destroy({
        where: {id: req.params.id}
      });
  
      if (!postData) {
        res.status(404).json({message: 'No post found with that id'});
        return;
      };
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router ;