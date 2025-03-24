const Like = require("../model/likeModel")
const Post = require("../model/postModel");

// Like a Post
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { googleId } = req.body;

    const existingLike = await Like.findOne({ postId, googleId });

    if (existingLike) {
      return res.status(400).json({ message: "Already liked this post" });
    }

    const like = new Like({ postId, googleId });
    await like.save();

    res.status(201).json({ message: "Post liked", like });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unlike a Post
const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { googleId } = req.body;

    const like = await Like.findOneAndDelete({ postId, googleId });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Likes for a Post
const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const likes = await Like.find({ postId })
      .populate("googleId", "name") 
      .select("googleId");

    res.status(200).json({
      count: likes.length,
      likedBy: likes.map((like) => ({
        name: like.googleId.name,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { likePost, unlikePost, getPostLikes }