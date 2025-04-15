const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    googleId: {
      type: String,
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.index({ postId: 1, googleId: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);
