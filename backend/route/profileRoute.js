const express = require("express");
const { getProfile,addProfile, updateProfile, deleteProfile, searchProfile } = require("../controller/profileController");

const router = express.Router();

router.get("/:googleId", getProfile);
router.post("/:googleId",addProfile);
router.put("/:googleId", updateProfile);
router.delete("/:googleId", deleteProfile);
router.get("/", searchProfile);

module.exports = router;