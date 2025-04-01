const express = require("express");
const router = express.router();

const {
  apply_create,
  apply_get_by_status,
  apply_get_all,
} = require("../controller/applicationController");

const app=express();

router.get("/", apply_get_all);
router.get("/create", apply_create);

router.get("/accepted", apply_get_by_status);

module.exports = router;
