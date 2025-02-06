const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    doi: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
