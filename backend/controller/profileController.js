const Profile = require("../model/profileModel");
const generateUsername = require("../utils/generateUsername");

// Get profile by Google ID
const getProfile = async (req, res) => {
  try {
    const { googleId } = req.params;
    if (!googleId) {
      return res.status(400).json({ error: "Google ID is required" });
    }

    const profile = await Profile.findOne({ googleId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({}, "googleId name");

    if (!profiles || profiles.length === 0) {
      return res
        .status(200)
        .json({ message: "No profiles found", profiles: [] });
    }

    res.status(200).json({ profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a profile
const addProfile = async (req, res) => {
  try {
    const {
      googleId,
      name,
      email,
      githubLink,
      bio = "",
      skills = [],
      // doi = [],
    } = req.body;

    if (!googleId || !name || !email || !githubLink) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    console.log("Adding profile:", req.body);
    let username = generateUsername(name);
    let count = 1;
    while (await Profile.findOne({ username })) {
      username = generateUsername(name) + count++;
    }

    const newProfile = await Profile.create({
      googleId,
      name,
      username,
      email,
      skills,
      githubLink,
      bio,
    });
    console.log("New profile created:", newProfile);

    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error adding profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { googleId } = req.params;
    if (!googleId) {
      return res.status(400).json({ error: "Google ID is required" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { googleId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const { googleId } = req.params;
    if (!googleId) {
      return res.status(400).json({ error: "Google ID is required" });
    }

    const deletedProfile = await Profile.findOneAndDelete({ googleId });
    if (!deletedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search profiles
const searchProfile = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const profiles = await Profile.find({
      $or: [
        { googleId: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { skills: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
    });

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error searching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProfile,
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
  searchProfile,
};
