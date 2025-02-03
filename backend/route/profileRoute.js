const express = require("express");
const { getProfile } = require("../controller/profileController");

const router = express.Router();

router.get("/:googleId", getProfile);

module.exports = router;
