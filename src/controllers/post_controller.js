import Post from '../models/post_model';

export async function createPost(postFields, user) {
  const newPost = new Post();
  newPost.title = postFields.title;
  newPost.tags = postFields.tags;
  newPost.content = postFields.content;
  newPost.coverUrl = postFields.coverUrl;
  newPost.author = user._id;
  // user.populate('userName');
  // newPost.author = ;
  // console.log(user.userName);
  // console.log(user.populate('userName'));
  // await creating a post
  // return post
  console.log(newPost);
  try {
    const savedpost = await newPost.save();
    return savedpost;
  } catch (error) {
    console.log(error);
    throw new Error(`create post error: ${error}`);
  }
}
export async function getPosts() {
  // await finding posts
  try {
    const posts = await Post.find({}).populate('author');
    console.log(posts);
    return posts;
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }

  // return posts
}
export async function getPost(id) {
  try {
    const post = await Post.findById(id);
    console.log(post);
    return post;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
}
export async function deletePost(id) {
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
}
export async function updatePost(id, postFields) {
  try {
    await Post.findByIdAndUpdate(id, postFields);
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
}
