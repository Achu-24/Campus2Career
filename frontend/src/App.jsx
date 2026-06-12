import axios from "axios";
import { useState } from "react";

function App() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("Backend Developer");
  const [data, setData] = useState(null);

  const analyze = async () => {
    try {
      console.log("Button clicked");

      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          resume,
          role,
        }
      );

      console.log(res.data);

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus2Career</h1>

      <textarea
        rows="10"
        cols="60"
        placeholder="Paste Resume Here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <br />
      <br />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Backend Developer</option>
        <option>Frontend Developer</option>
        <option>Data Analyst</option>
        <option>AI Engineer</option>
      </select>

      <br />
      <br />

      <button onClick={analyze}>
        Analyze Resume
      </button>

      {data && (
        <>
          <h2>Score: {data.score}</h2>

          <h3>Strengths</h3>
          <ul>
            {data.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3>Missing Skills</h3>
          <ul>
            {data.missingSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3>Projects</h3>
          <ul>
            {data.projects.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;