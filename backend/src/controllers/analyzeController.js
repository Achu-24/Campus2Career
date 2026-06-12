const { analyzeWithAI } = require("../services/aiService");

const analyzeResume = async (req, res) => {
  try {
    const { resume, role } = req.body;

    // Validation
    if (!resume || !role) {
      return res.status(400).json({
        success: false,
        message: "Resume and role are required",
      });
    }

    console.log("Controller hit");
    console.log("Role:", role);

    const result = await analyzeWithAI(resume, role);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};