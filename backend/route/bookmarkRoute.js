const express = require('express');
const router = express.Router();

const { getSavedProject } = require('../controller/bookmarkController');

router.get('/:googleId', getSavedProject);

module.exports = router;