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

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus2Career Backend Running 🚀",
  });
});

app.use("/api/analyze", (req, res, next) => {
  console.log("Analyze route hit");
  next();
});

app.use("/api/analyze", analyzeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});