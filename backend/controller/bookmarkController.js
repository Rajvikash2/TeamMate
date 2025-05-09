const SavedProject = require("../model/bookmarkModel");
const Post = require("../model/postModel");

const getSavedProject = async (req, res) => {
  try {
    const { googleId } = req.params;
    if (!googleId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const savedProjects = await SavedProject.find({ googleId }).populate(
      {
        path:"postId",
        select:"-applications",
      }
    );
    res.status(200).json(savedProjects);
  } catch (error) {
    console.error("Error fetching saved projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getSavedProject };