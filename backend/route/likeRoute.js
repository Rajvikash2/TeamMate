const express = require("express");
const router = express.Router();
const {
  getPostLikes,
  toggleLike,
  check,
} = require("../controller/likeController");

// router.post("/:postId/like", likePost);
// router.post("/:postId/unlike", unlikePost);
router.post("/toggle/:postId/:googleId", toggleLike);
router.get("/:postId/likes", getPostLikes);
router.get("/check/:postId/:googleId", check);
module.exports = router;
