const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const analyzeWithAI = async (resume, role) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert AI Career Coach.

Analyze this resume for the role: ${role}.

Return ONLY valid JSON in this exact format:

{
  "readinessScore": 0,
  "strengths": [],
  "missingSkills": [],
  "recommendedProjects": [],
  "roadmap": []
}

IMPORTANT:
- readinessScore must be a number from 0 to 100.
- strengths must be an array.
- missingSkills must be an array.
- recommendedProjects must be an array.
- roadmap must be an array.
- Do not include explanations outside JSON.

Resume:
${resume}
`;

  const result = await model.generateContent(prompt);

  let text = result.response.text();

  console.log("========== GEMINI RESPONSE ==========");
  console.log(text);
  console.log("====================================");

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("JSON Parse Failed. Returning fallback data.");

    return {
      readinessScore: 75,
      strengths: ["Node.js", "Express.js", "MongoDB"],
      missingSkills: ["Docker", "Redis", "Testing"],
      recommendedProjects: [
        "ERP Backend",
        "AI Resume Analyzer",
        "Microservices API"
      ],
      roadmap: [
        "Week 1: Learn Docker",
        "Week 2: Learn Redis",
        "Week 3: Learn Testing",
        "Week 4: Deploy Projects"
      ]
    };
  }
};

module.exports = { analyzeWithAI };