const { analyzeWithAI } = require("../services/aiService");

const analyzeResume = async (req, res) => {
  try {
    console.log("========== CONTROLLER HIT ==========");
    console.log("Request Body:", req.body);

    const { resume, role } = req.body;

    if (!resume || !role) {
      return res.status(400).json({
        success: false,
        message: "Resume and role are required",
      });
    }

    console.log("Resume Received:");
    console.log(resume);

    console.log("Role:");
    console.log(role);

    const result = await analyzeWithAI(resume, role);

    console.log("========== AI RESULT ==========");
    console.log(result);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("========== ANALYSIS ERROR ==========");
    console.error(error);

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