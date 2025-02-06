const SavedProject = require("../model/bookmarkModel");
const Post = require("../model/postModel");

const getSavedProject = async (req, res) => {
  try {
    const { googleId } = req.params; // Assuming googleId is stored in session
    if (!googleId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find saved projects by the user
    const savedProjects = await SavedProject.find({ googleId }).populate(
      "postId"
    );
    res.status(200).json(savedProjects);
  } catch (error) {
    console.error("Error fetching saved projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getSavedProject };