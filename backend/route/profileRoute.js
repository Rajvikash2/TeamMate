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

router.post("/", addProfile);
router.get("/users", getProfiles);
router.get("/:googleId", getProfile);
router.put("/:googleId", updateProfile);
router.delete("/:googleId", deleteProfile);
router.get("/", searchProfile);

module.exports = router;
