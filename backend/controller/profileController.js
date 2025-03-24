const Profile = require("../model/profileModel");
const generateUsername = require("../utils/generateUsername");

// Get profile by username
const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const profile = await Profile.findOne({ username });
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
    const profiles = await Profile.find({}, "username name");

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
      doi = [],
    } = req.body;

    if (!googleId || !name || !email || !githubLink) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

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
      doi,
      githubLink,
      bio,
    });

    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error adding profile:", error);
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Prevent changing username
    if (req.body.username) {
      return res.status(400).json({ error: "Username cannot be changed" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { username },
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
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const deletedProfile = await Profile.findOneAndDelete({ username });
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
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { skills: { $elemMatch: { $regex: query, $options: "i" } } }, // Case-insensitive skill search
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
