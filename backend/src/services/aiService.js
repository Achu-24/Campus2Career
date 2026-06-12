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

Return ONLY valid JSON.

{
  "readinessScore": 0,
  "strengths": [],
  "missingSkills": [],
  "recommendedProjects": [],
  "roadmap": []
}

Resume:
${resume}
`;

  const result = await model.generateContent(prompt);

  let text = result.response.text();

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};

module.exports = { analyzeWithAI };