const express = require("express");
const { getProfile, addProfile, updateProfile, deleteProfile, searchProfile } = require("../controller/profileController");
const router = express.Router();

router.get("/:username", getProfile); 
router.post("/", addProfile); 
router.put("/:username", updateProfile); 
router.delete("/:username", deleteProfile);
router.get("/", searchProfile); 

module.exports = router;