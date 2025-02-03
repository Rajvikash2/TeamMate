const { getPosts, getPostByOwnerId, getApplication } = require('../controller/postController');
const express = require('express');
const router = express.Router();

router.get('/', getPosts);
router.get('/:ownerGoogleId', getPostByOwnerId);
router.get('/applications/:postId', getApplication);

module.exports = router;