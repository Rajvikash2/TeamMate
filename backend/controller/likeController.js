const Like = require("../model/likeModel");
const Post = require("../model/postModel");
const { post } = require("../route/applicationRoute");

// Like a Post

const check = async (req, res) => {
  const { postId, googleId } = req.params;

  try {
    // console.log(postId, googleId);
    const existingLike = await Like.findOne({ postId, googleId });

    if (existingLike) {
      // Unlike

      return res.status(200).json({ message: "Like ", hasLiked: true });
    } else {
      // Like

      return res.status(201).json({ message: "unlike", hasLiked: false });
    }
  } catch (error) {
    console.error("Error check like:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
const toggleLike = async (req, res) => {
  const { postId, googleId } = req.params;

  try {
    console.log(postId, googleId);
    const existingLike = await Like.findOne({ postId, googleId });

    if (existingLike) {
      // Unlike
      await Like.deleteOne({ _id: existingLike._id });
      return res.status(200).json({ message: "Like removed", hasLiked: false });
    } else {
      // Like
      await Like.create({ postId, googleId });
      return res.status(201).json({ message: "Post liked", hasLiked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ error: "Something went wrong" });
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

module.exports = { check, toggleLike, getPostLikes };
