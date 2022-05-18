import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

/// your routes will go here

// create a post

const handlePostCreate = async (req, res) => {
  const postFields = req.body;
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.createPost(postFields);
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleGetAllPost = async (req, res) => {
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.getPosts();
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(404).json({ error });
  }
};

const handlePut = async (req, res) => {
  const { id } = req.params;
  const postFields = req.body;
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.updatePost(id, postFields);
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handlePostGet = async (req, res) => {
  const { id } = req.params;
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.getPost(id);
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(404).json({ error });
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.params;
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.deletePost(id);
    // send back the result
    if (result == null) {
      res.status(404).json(null);
    } else {
      res.json(result);
    }
  } catch (error) {
    // or catch the error and send back an error
    res.status(401).json({ error });
  }
};

router.route('/posts')
  .post(handlePostCreate)
  .get(handleGetAllPost);

router.route('/posts/:id')
  .put(handlePut)
  .get(handlePostGet)
  .delete(handleDelete);

export default router;
