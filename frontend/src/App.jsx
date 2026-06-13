import axios from "axios";
import { useState } from "react";
import {
  Target,
  TrendingUp,
  AlertCircle,
  FolderKanban,
  Map,
} from "lucide-react";

function App() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("Backend Developer");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          resume,
          role,
        }
      );

      setData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm mb-4">
            🚀 AI Powered Career Coach
          </div>

          <h1 className="text-6xl font-bold">
            Campus2Career
          </h1>

          <p className="text-slate-400 mt-4 text-xl">
            Upload your resume. Choose your dream role.
          </p>

          <p className="text-slate-500 mt-2">
            Get an AI-powered roadmap to become job-ready.
          </p>

          <div className="flex justify-center gap-3 mt-5 flex-wrap">
            <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
              Resume Analysis
            </span>

            <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
              Skill Gap Detection
            </span>

            <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
              AI Roadmap
            </span>

            <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
              Project Recommendations
            </span>
          </div>
        </div>

        {/* Resume Form */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">

          <textarea
            className="w-full h-48 bg-slate-800 rounded-xl p-4 outline-none border border-slate-700"
            placeholder="Paste your resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-4 mt-4">

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-800 p-3 rounded-xl border border-slate-700"
            >
              <option>Backend Developer</option>
              <option>Frontend Developer</option>
              <option>Data Analyst</option>
              <option>AI Engineer</option>
            </select>

            <button
              onClick={analyze}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

          </div>
        </div>

        {/* Results Dashboard */}
        {data && (
          <>
            {/* Score Card */}
            <div className="mt-10 flex justify-center">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center w-72 shadow-lg">
                <Target
                  size={40}
                  className="mx-auto mb-3 text-green-400"
                />

                <h2 className="text-6xl font-bold text-green-400">
                  {data.readinessScore}
                </h2>

                <p className="text-slate-400 mt-2">
                  Career Readiness Score
                </p>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">

              {/* Strengths */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-green-400" />
                  <h2 className="text-xl font-bold">
                    Strengths
                  </h2>
                </div>

                <ul>
                  {data.strengths?.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 text-sm leading-6"
                    >
                      ✅ {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="text-red-400" />
                  <h2 className="text-xl font-bold">
                    Missing Skills
                  </h2>
                </div>

                <ul>
                  {data.missingSkills?.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 text-sm leading-6"
                    >
                      ⚠️ {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <FolderKanban className="text-blue-400" />
                  <h2 className="text-xl font-bold">
                    Recommended Projects
                  </h2>
                </div>

                <ul>
                  {data.recommendedProjects?.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 text-sm leading-6"
                    >
                      🚀 {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Roadmap */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Map className="text-yellow-400" />
                  <h2 className="text-xl font-bold">
                    Learning Roadmap
                  </h2>
                </div>

                <ul>
                  {data.roadmap?.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 text-sm leading-6"
                    >
                      📌 {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </>
        )}

        

      </div>
    </div>
  );
}

export default App;