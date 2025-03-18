const express = require("express");
const authenticateToken = require("../controllers/authentication");
const {
  getVisitorsByFlat,
  updateVisitorStatus,
  addDummyVisitors,
} = require("../controllers/visitorController");
const router = express.Router();

router.get("/", authenticateToken, getVisitorsByFlat);
router.post("/", addDummyVisitors);
router.put("/:id", authenticateToken, updateVisitorStatus);

module.exports = router;
