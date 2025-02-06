const { getPosts, getPostByOwnerId, getApplication,updatePost } = require('../controller/postController');
const express = require('express');
const router = express.Router();

router.get('/', getPosts);
router.get('/:ownerGoogleId', getPostByOwnerId);
router.get('/applications/:postId', getApplication);
router.put('/update/:postId/:googleId',updatePost);

module.exports = router;