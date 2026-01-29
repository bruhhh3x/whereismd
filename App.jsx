import React, { useState, useEffect, useRef } from "react";

const ORANGE = "#ff6a00";
const QUESTION_DURATION_MS = 8000; // 8 seconds per question
const QUESTIONS_PER_RUN = 21;

// Expanded question base, including A/B versions
const QUESTIONS = [
  // INTENT
  { id: "intent_1A", prompt: "Why do you go out?", left: "The music", right: "The energy" },
  { id: "intent_1B", prompt: "When you step out at night, what are you really chasing?", left: "A feeling", right: "A story" },
  { id: "intent_2A", prompt: "Nights are mostly for…", left: "Expression", right: "Escape" },
  { id: "intent_2B", prompt: "At the core, nightlife is…", left: "Art in motion", right: "Time off the clock" },

  // TIME BEHAVIOR
  { id: "time_1A", prompt: "How do you arrive?", left: "Early, feel the room", right: "Late, hit the peak" },
  { id: "time_1B", prompt: "When do you like to walk in?", left: "Opening hours", right: "When it’s already moving" },
  { id: "time_2A", prompt: "You leave when…", left: "When the arc feels complete", right: "When the lights come on" },
  { id: "time_2B", prompt: "End of night timing:", left: "I know when to ghost", right: "I stay until they push us out" },

  // PHONE / DOCUMENTATION
  { id: "phone_1A", prompt: "Phone in the room?", left: "Mostly away", right: "In hand a lot" },
  { id: "phone_1B", prompt: "How does your phone behave when the room is right?", left: "Pocketed", right: "Recording" },
  { id: "phone_2A", prompt: "What matters more to you?", left: "How it feels", right: "How it looks online" },

  // SOCIAL ROLE
  { id: "social_1A", prompt: "In a packed room you…", left: "Mostly listen / watch", right: "Help steer the energy" },
  { id: "social_1B", prompt: "Your role on a good night:", left: "Sink into the moment", right: "Orchestrate the moment" },
  { id: "social_2A", prompt: "Friends would describe your presence as…", left: "Quiet gravity", right: "Loud signal" },

  // SUBSTANCES
  { id: "subs_1A", prompt: "For a night to work…", left: "Vibes are enough", right: "Enhancement is expected" },
  { id: "subs_1B", prompt: "If the room is right, you need:", left: "Just the room", right: "A little something extra" },

  // DENSITY / SPACE
  { id: "density_1A", prompt: "Ideal crowd size?", left: "Intimate, space to breathe", right: "Packed, shoulder to shoulder" },
  { id: "density_1B", prompt: "When the floor fills up:", left: "I like room to move", right: "I like to be in the swarm" },

  // ENERGY SOURCE
  { id: "energy_1A", prompt: "Who really carries the night?", left: "The DJ / booth", right: "The crowd" },
  { id: "energy_1B", prompt: "When it works, where does the magic start?", left: "In the set", right: "In the people" },

  // MUSIC / ROOM FEEL
  { id: "music_1A", prompt: "When the system is loud and full…", left: "I let it take over", right: "I want more control" },
  { id: "music_1B", prompt: "How do you relate to the DJ?", left: "I track who’s playing", right: "I discover in the room" },

  // CLUB / NIGHTLIFE HABITS
  { id: "habit_1A", prompt: "First thing you clock when you walk in:", left: "Sound and lighting", right: "People and layout" },
  { id: "habit_1B", prompt: "Your best nights happen…", left: "With a loose plan", right: "With no plan at all" },

  // SAFETY / INTUITION
  { id: "safety_1A", prompt: "When the energy shifts in the room…", left: "I notice early", right: "I notice late" },
  { id: "safety_1B", prompt: "If something feels off…", left: "I adjust quickly", right: "I wait and see" },
];

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [stage, setStage] = useState("intro"); // intro | questions | form | done
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [form, setForm] = useState({ name: "", email: "", age: "", pronouns: "", location: "" });
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = stage === "questions" && questions.length > 0 ? questions[index] : null;

  const answeredRef = useRef(false);

  function start() {
    const shuffled = shuffle(QUESTIONS);
    const selected = shuffled.slice(0, Math.min(QUESTIONS_PER_RUN, shuffled.length));
    setQuestions(selected);
    setIndex(0);
    setAnswers([]);
    answeredRef.current = false;
    setStage("questions");
  }

  function advance(choice) {
    if (answeredRef.current) return;
    answeredRef.current = true;

    setAnswers((prev) => [...prev, choice]);

    setIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= questions.length) {
        setStage("form");
        return prevIndex;
      } else {
        answeredRef.current = false;
        return nextIndex;
      }
    });
  }

  useEffect(() => {
    if (stage !== "questions" || !currentQuestion) return;

    answeredRef.current = false;

    const timerId = setTimeout(() => {
      if (!answeredRef.current) advance(null);
    }, QUESTION_DURATION_MS);

    return () => clearTimeout(timerId);
  }, [stage, index, currentQuestion]);

  function handleChoice(side) {
    if (!currentQuestion) return;
    advance(side);
  }

  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) return;

    console.log("ACCESS APPLICATION", { form, answers, questions });
    setSubmitted(true);
    setStage("done");
  }

  return (
    <div
      style={{
        background: ORANGE,
        color: "#f2f2f2",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        boxSizing: "border-box",
        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, -system-ui, 'SF Pro Text', sans-serif",
      }}
    >
      {stage === "intro" && (
        <div onClick={start} style={{ maxWidth: 480, textAlign: "center", cursor: "pointer" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>ACCESS INITIATION</h1>
          <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 24 }}>Let’s play a variation of 21 Questions. Answer quickly. Don’t overthink.</p>
          <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.8 }}>Tap to proceed</p>
        </div>
      )}

      {stage === "questions" && currentQuestion && (
        <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16, opacity: 0.75 }}>
            SIGNAL WINDOW {index + 1} / {questions.length}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.4, marginBottom: 32 }}>{currentQuestion.prompt}</div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => handleChoice("left")} style={{ flex: 1, padding: "16px 10px", borderRadius: 8, border: "1px solid rgba(242,242,242,0.7)", background: "transparent", color: "#f2f2f2", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em" }}>{currentQuestion.left}</button>
            <button onClick={() => handleChoice("right")} style={{ flex: 1, padding: "16px 10px", borderRadius: 8, border: "1px solid rgba(242,242,242,0.7)", background: "transparent", color: "#f2f2f2", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em" }}>{currentQuestion.right}</button>
          </div>
          <div style={{ marginTop: 24, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", opacity: 0.6 }}>You have 8 seconds. Move instinctively.</div>
        </div>
      )}

      {stage === "form" && !submitted && (
        <form onSubmit={handleSubmit} style={{ maxWidth: 480, width: "100%" }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Enter details for consideration</h2>
          <Field label="Name" value={form.name} onChange={(v) => handleFormChange("name", v)} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => handleFormChange("email", v)} />
          <Field label="Age" value={form.age} onChange={(v) => handleFormChange("age", v)} />
          <Field label="Pronouns" value={form.pronouns} onChange={(v) => handleFormChange("pronouns", v)} />
          <Field label="Location" value={form.location} onChange={(v) => handleFormChange("location", v)} />
          <button type="submit" style={{ marginTop: 20, width: "100%", padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(242,242,242,0.9)", background: "transparent", color: "#f2f2f2", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.16em" }}>Submit for consideration</button>
        </form>
      )}

      {stage === "done" && submitted && (
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h2 style={{ fontSize: 22, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Application received</h2>
          <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.9 }}>Your responses and details have been recorded for consideration.</p>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 6, opacity: 0.85 }}>{label}</div>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(242,242,242,0.8)", background: "transparent", color: "#f2f2f2", fontSize: 14, outline: "none" }} />
    </label>
  );
}
