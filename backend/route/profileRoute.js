const express = require("express");
const { getProfile, getProfiles ,addProfile, updateProfile, deleteProfile, searchProfile } = require("../controller/profileController");
const router = express.Router();

router.get("/users", getProfiles);
router.get("/:username", getProfile);
router.post("/", addProfile);
router.put("/:username", updateProfile); 
router.delete("/:username", deleteProfile);
router.get("/", searchProfile); 

module.exports = router;