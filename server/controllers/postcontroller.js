const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.id,
      slug: req.body.title.toLowerCase().replace(/ /g, '-')
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = category ? { category } : {};

  const posts = await Post.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });

  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ error: 'Forbidden' });

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });

  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ error: 'Forbidden' });

  await post.deleteOne();
  res.json({ message: 'Deleted' });
};
