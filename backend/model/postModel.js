const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    ownerGoogleId: {
      type: String,
      ref: "Profile",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    roleReq: {
      type: [String],
      required: true,
    },
    desc: {
      type: String,
      maxlength: 500,
    },
    jobType: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: true,
    },
    image: {
      type: String,
    },
    domain: {
      type: String,
      required: true,
    },
    // applications: [
    //   {
    //     googleId: {
    //       type: String,
    //       ref: "Profile",
    //       required: true,
    //     },
    //     appliedAt: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
