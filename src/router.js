import { Router } from 'express';
import * as Posts from './controllers/post_controller';
// our imports as usual
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

/// your routes will go here

// create a post

const handlePostCreate = async (req, res) => {
  const postFields = req.body;
  console.log(postFields);
  try {
    // use req.body etc to await some contoller function
    const result = await Posts.createPost(postFields, req.user);
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

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = await UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/posts')
  .post(requireAuth, handlePostCreate)
  .get(handleGetAllPost);

router.route('/posts/:id')
  .put(requireAuth, handlePut)
  .get(handlePostGet)
  .delete(requireAuth, handleDelete);

export default router;
