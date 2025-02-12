const { getPosts, getPostByOwnerId, getApplication, createPost, updatePost } = require('../controller/postController');
const express = require('express');
const router = express.Router();

router.get('/', getPosts);
router.get('/:ownerGoogleId', getPostByOwnerId);
router.get('/applications/:postId', getApplication);
router.post('/create/:ownerGoogleId', createPost);
router.put('/update/:postId/:googleId',updatePost);


module.exports = router;