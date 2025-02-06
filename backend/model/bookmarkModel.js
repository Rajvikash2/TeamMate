const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedProjectSchema = new Schema(
  {
    googleId: { 
        type: String, 
        ref: "Profile", 
        required: true 
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedProject", savedProjectSchema);