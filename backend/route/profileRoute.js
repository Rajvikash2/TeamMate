const express = require("express");
const { getProfile,addProfile } = require("../controller/profileController");

const router = express.Router();

router.get("/:googleId", getProfile);
router.post("/:googleId",addProfile);

module.exports = router;
