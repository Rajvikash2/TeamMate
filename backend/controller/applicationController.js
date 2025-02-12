const Applications = require("../models/applicationModel");

const apply_create = async (req, res) => {
  try {
    const googleId = req.params;
    const { posId, status } = req.body;

    const request = new Applications({
      posId,
      googleId,
      status,
    });
    res.status(201).json(request);
  } catch (e) {
    console.error("Error adding profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const apply_get_all = async (req, res) => {
  try {
    const googleId = req.params;
    const { posId, status } = req.body;

    const res = await Applications.find({ status: "Pending" });
    res.status(201).json(res);
  } catch (e) {
    console.error("Error getting applications", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const apply_get_by_status = async (req, res) => {
  try {
    const { googleId } = req.params;
    const { posId, status } = req.body;

    const res = await Applications.find({ status: "Accepted" });
    res.status(201).json({ success: true, res });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { apply_create, apply_get_all, apply_get_by_status };
