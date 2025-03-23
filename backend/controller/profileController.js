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

// Add a profile
const addProfile = async (req, res) => {
  try {
    const { googleId, name, email, skills, doi, githubLink, bio } = req.body;

    if (
      !googleId ||
      !name ||
      !email ||
      !skills ||
      !doi ||
      !githubLink ||
      !bio
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate unique username
    let username = generateUsername(name);
    let usernameExists = await Profile.findOne({ username });

    // Ensure username uniqueness
    while (usernameExists) {
      username = generateUsername(name);
      usernameExists = await Profile.findOne({ username });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
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
        { skills: { $in: [query] } },
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
  addProfile,
  updateProfile,
  deleteProfile,
  searchProfile,
};
