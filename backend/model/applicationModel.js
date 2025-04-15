const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    googleId: {
      type: String,
      ref: "Profile",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Middleware to auto-reject applications after 7 days
applicationSchema.pre("save", function (next) {
  const currentDate = new Date();
  const sevenDaysLater = new Date(this.appliedAt);
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 10);

  if (currentDate >= sevenDaysLater && this.status === "Pending") {
    this.status = "Rejected";
  }
  next();
});

module.exports = mongoose.model("Application", applicationSchema);