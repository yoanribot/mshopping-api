import DBController from "../db/controller";
import Post from "../models/post";
import User from "../models/user";
import Review from "../models/review";

const collectionName = "users";
const { findByAuthId, getAll, get, insert, update, remove } = DBController;

const getPosts = async (req, res) => {
  try {
    const data = await Post.find({}).populate({
      path: "author",
      select: "name lastname",
    });
    res.send(data);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getPost = async (req, res) => {
  const data = await Post.findById(req.params.id)
    .populate({
      path: "author",
      select: "name lastname",
    })
    .populate({
      path: "reviews",
      select: "text userId date",
      populate: {
        path: "userId",
        select: "name lastname",
      },
    });
  res.send(data);
};

const createPost = async (req, res) => {
  try {
    const { title, author, content } = req.body.post;
    const data = { title, author, content };

    if (!!title && !!author && !!content) {
      const newPost = new Post(data);

      await newPost.save();

      const user = await User.findById({ _id: newPost.author });

      user.posts.push(newPost);
      await user.save();

      res.status(201).json(data);
    } else {
      res.status(422).send({ message: "Invalid params" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const removePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Post
    const post = await Post.findById({ _id: id });
    const author = await User.findById({ _id: post.author });

    author.posts.remove(post);

    post.remove();
    await author.save();

    res.status(201).send({ message: "Post removed" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updatePost = async (req, res) => {
  await update(collectionName, req.params.id, req.body);
  res.send({ message: `${collectionName} updated` });
};

const incVote = async (req, res) => {
  const data = await Post.findById(req.params.id).update({
    $inc: { votes: 1 },
  });
  res.send(data);
};

const decVote = async (req, res) => {
  const data = await Post.findById(req.params.id).update({
    $inc: { votes: -1 },
  });
  res.send(data);
};

const addReview = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    if (!!postId && !!userId && !!text) {
      // Review
      const review = new Review({ postId, userId, text });

      await review.save();

      // User
      const user = await User.findById({ _id: userId });

      user.reviews.push(review);
      await user.save();

      // Post
      const post = await Post.findById({ _id: postId });

      post.reviews.push(review);
      await post.save();

      res.status(201).send({ message: "Review added" });
    } else {
      res.status(422).send({ message: "Invalid params" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const removeReview = async (req, res) => {
  try {
    const { postId, reviewId } = req.params;

    // Post
    const review = await Review.findById({ _id: reviewId });
    const post = await Post.findById({ _id: postId });
    const author = await User.findById({ _id: review.userId });

    post.reviews.remove(review);
    author.reviews.remove(review);

    review.remove();
    await post.save();
    await author.save();

    res.status(201).send({ message: "Review removed" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  getPosts,
  getPost,
  createPost,
  updatePost,
  removePost,
  incVote,
  decVote,
  addReview,
  removeReview,
};
