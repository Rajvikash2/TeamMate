const Post = require("../model/postModel");

const getPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    return res.status(404).json({ error: "No Posts found" });
  }
  res.status(200).json(posts);
};

const getPostByOwnerId = async (req, res) => {
  const { ownerGoogleId } = req.params;
  if (!ownerGoogleId) {
    return res.status(400).json({ error: "Owner ID is required" });
  }

  const posts = await Post.find({ ownerGoogleId });
  if (!posts) {
    return res.status(404).json({ error: "No posts found" });
  }
  res.status(200).json(posts);
};

const getApplication = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Return only the applications field
    res.status(200).json({ applications: post.applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getPosts, getPostByOwnerId, getApplication };