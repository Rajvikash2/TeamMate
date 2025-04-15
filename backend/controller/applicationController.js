const Application = require("../model/applicationModel");
const Post = require("../model/postModel");
const Profile = require("../model/profileModel");

const createApplication = async (req, res) => {
  try {
    const { postId, googleId } = req.params;
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    if (!googleId) {
      return res.status(400).json({ error: "Google ID is required" });
    }

    const existingApplication = await Application.findOne({
      postId,
      googleId,
    });
    if (existingApplication) {
      return res
        .status(409)
        .json({ error: "Application already exists for this user and job" });
    }

    const application = await Application.create({
      postId,
      googleId,
    });
    res.status(201).json(application);
  } catch (error) {
    console.error("Error adding profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getApplicationsForPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const applications = await Application.find({
      postId,
      status: "Pending",
    });

    const googleIds = applications.map((app) => app.googleId);

    const profiles = await Profile.find({ googleId: { $in: googleIds } });

    const profileMap = {};
    profiles.forEach((profile) => {
      profileMap[profile.googleId] = profile;
    });

    const applicationsWithProfiles = applications.map((app) => ({
      ...app._doc,
      profile: profileMap[app.googleId] || null,
    }));

    res.status(200).json(applicationsWithProfiles);
  } catch (error) {
    console.error("Error getting applications", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPendingApplicationByGoogleId = async (req, res) => {
  try {
    const { googleId } = req.params;

    const applications = await Application.find({
      googleId,
      status: "Pending",
    });

    const postIds = applications.map((app) => app.postId);

    const posts = await Post.find({ _id: { $in: postIds } });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting applications", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAcceptedApplicationByGoogleId = async (req, res) => {
  try {
    const { googleId } = req.params;

    const applications = await Application.find({
      googleId,
      status: "Accepted",
    });

    const postIds = applications.map((app) => app.postId);

    const posts = await Post.find({ _id: { $in: postIds } });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting accepted posts", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRejectedApplicationByGoogleId = async (req, res) => {
  try {
    const { googleId } = req.params;

    const applications = await Application.find({
      googleId,
      status: "Rejected",
    });

    const postIds = applications.map((app) => app.postId);

    const posts = await Post.find({ _id: { $in: postIds } });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting rejected posts", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const getPostsByGoogleIdAndStatus = async (req, res) => {
//   try {
//     const { googleId, status } = req.params;

//     if (!["Pending", "Accepted", "Rejected"].includes(status)) {
//       return res.status(400).json({ error: "Invalid status value" });
//     }

//     const applications = await Application.find({
//       googleId,
//       status,
//     });

//     const postIds = applications.map((app) => app.postId);

//     const posts = await Post.find({ _id: { $in: postIds } });

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(`Error getting ${status} posts for ${googleId}`, error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = {
  createApplication,
  getApplicationsForPost,
  getPendingApplicationByGoogleId,
  getAcceptedApplicationByGoogleId,
  getRejectedApplicationByGoogleId,
  // getPostsByGoogleIdAndStatus,
};
