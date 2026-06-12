require("dotenv").config({
  path: require("path").join(__dirname, "../.env"),
});

console.log(
  "Gemini Key Loaded:",
  !!process.env.GEMINI_API_KEY
);

const express = require("express");
const cors = require("cors");

const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze", (req, res, next) => {
  console.log("Analyze route hit");
  next();
});

app.use("/api/analyze", analyzeRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});