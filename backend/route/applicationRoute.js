const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplicationsForPost,
  getPendingApplicationByGoogleId,
  getAcceptedApplicationByGoogleId,
  getRejectedApplicationByGoogleId,
//   getPostsByGoogleIdAndStatus,  
} = require("../controller/applicationController");

router.post("/create/:postId/:googleId", createApplication);

router.get("/:postId", getApplicationsForPost);
router.get("/pending/:googleId", getPendingApplicationByGoogleId);
router.get("/accepted/:googleId", getAcceptedApplicationByGoogleId);
router.get("/rejected/:googleId", getRejectedApplicationByGoogleId);

// router.get("/applications/:googleId/:status", getPostsByGoogleIdAndStatus);


module.exports = router;
