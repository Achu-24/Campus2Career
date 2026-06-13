const express = require("express");
const router = express.Router();

const {
  analyzeResume,
} = require("../controllers/analyzeController");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Analyze endpoint is active. Use POST request to analyze resumes.",
  });
});

router.post("/", analyzeResume);

module.exports = router;