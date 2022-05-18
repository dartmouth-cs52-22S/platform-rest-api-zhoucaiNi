import Post from '../models/post_model';

export async function createPost(postFields) {
  const newPost = new Post();
  newPost.title = postFields.title;
  newPost.tags = postFields.tags;
  newPost.content = postFields.content;
  newPost.coverUrl = postFields.coverUrl;
  // await creating a post
  // return post
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
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }

  // return posts
}
export async function getPost(id) {
  try {
    const post = await Post.findById(id);
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
