const express = require("express");
const {
  getProfile,
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
  searchProfile,
} = require("../controller/profileController");
const router = express.Router();

router.get("/users", getProfiles);
router.get("/:googleId", getProfile);
router.post("/", addProfile);
router.put("/:googleId", updateProfile);
router.delete("/:googleId", deleteProfile);
router.get("/", searchProfile);

module.exports = router;
