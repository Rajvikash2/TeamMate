const express = require("express");
const router = express.Router();
const { likePost, unlikePost, getPostLikes } = require("../controller/likeController");

router.post("/:postId/like", likePost);
router.post("/:postId/unlike", unlikePost); 
router.get("/:postId/likes", getPostLikes); 

module.exports = router;
