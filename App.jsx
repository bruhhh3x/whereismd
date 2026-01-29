import React, { useState, useEffect, useRef } from "react";

const ORANGE = "#ff6a00";
const QUESTION_DURATION_MS = 8000; // 8 seconds per question
const QUESTIONS_PER_RUN = 21;

// Expanded question base, including A/B versions
const QUESTIONS = [
  { id: "intent_1A", prompt: "Why do you go out?", left: "The music", right: "The energy" },
  { id: "intent_1B", prompt: "When you step out at night, what are you really chasing?", left: "A feeling", right: "A story" },
  { id: "intent_2A", prompt: "Nights are mostly for…", left: "Expression", right: "Escape" },
  { id: "intent_2B", prompt: "At the core, nightlife is…", left: "Art in motion", right: "Time off the clock" },
];

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [stage, setStage] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const answeredRef = useRef(false);

  function start() {
    setQuestions(shuffle(QUESTIONS));
    setIndex(0);
    answeredRef.current = false;
    setStage("questions");
  }

  useEffect(() => {
    if (stage !== "questions") return;
    const t = setTimeout(() => {
      if (!answeredRef.current) setIndex((i) => i + 1);
    }, QUESTION_DURATION_MS);
    return () => clearTimeout(t);
  }, [stage, index]);

  return (
    <div style={{ background: ORANGE, minHeight: "100vh", color: "#fff" }}>
      {stage === "intro" && <button onClick={start}>Start</button>}
      {stage === "questions" && questions[index] && (
        <div>
          <h2>{questions[index].prompt}</h2>
          <button>Left</button>
          <button>Right</button>
        </div>
      )}
    </div>
  );
}
