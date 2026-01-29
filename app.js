// Pure vanilla JS implementation of Access Initiation
// No external dependencies, safe for GitHub Pages.

const ORANGE = "#ff6a00";
const QUESTION_DURATION_MS = 8000; // 8 seconds per question
const QUESTIONS_PER_RUN = 21;

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
  return list.slice().sort(() => Math.random() - 0.5);
}

const state = {
  stage: "intro", // intro | questions | form | done
  questions: [],
  index: 0,
  answers: [],
  form: {
    name: "",
    email: "",
    age: "",
    pronouns: "",
    location: "",
  },
  submitted: false,
  timerId: null,
  answered: false,
};

function clearTimer() {
  if (state.timerId !== null) {
    clearTimeout(state.timerId);
    state.timerId = null;
  }
}

function start() {
  const shuffled = shuffle(QUESTIONS);
  state.questions = shuffled.slice(0, Math.min(QUESTIONS_PER_RUN, shuffled.length));
  state.index = 0;
  state.answers = [];
  state.stage = "questions";
  state.answered = false;
  render();
  startQuestionTimer();
}

function startQuestionTimer() {
  clearTimer();
  if (state.stage !== "questions") return;
  state.answered = false;
  state.timerId = setTimeout(function () {
    if (!state.answered) {
      advance(null);
    }
  }, QUESTION_DURATION_MS);
}

function advance(choice) {
  if (state.answered) return;
  state.answered = true;

  state.answers.push(choice);

  const nextIndex = state.index + 1;
  if (nextIndex >= state.questions.length) {
    state.stage = "form";
    clearTimer();
    render();
  } else {
    state.index = nextIndex;
    render();
    startQuestionTimer();
  }
}

function handleChoice(side) {
  if (state.stage !== "questions") return;
  advance(side);
}

function handleFormChange(field, value) {
  state.form[field] = value;
}

function handleSubmit(e) {
  e.preventDefault();
  if (!state.form.name || !state.form.email) return;

  console.log("ACCESS APPLICATION", {
    form: state.form,
    answers: state.answers,
    questions: state.questions,
  });

  state.submitted = true;
  state.stage = "done";
  render();
}

function createElement(tag, props, children) {
  const el = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach(function (key) {
      if (key === "style") {
        Object.assign(el.style, props.style);
      } else if (key === "onClick") {
        el.addEventListener("click", props.onClick);
      } else if (key === "onSubmit") {
        el.addEventListener("submit", props.onSubmit);
      } else if (key === "type") {
        el.type = props.type;
      } else if (key === "value") {
        el.value = props.value;
      } else if (key === "placeholder") {
        el.placeholder = props.placeholder;
      } else {
        el.setAttribute(key, props[key]);
      }
    });
  }
  if (children !== undefined && children !== null) {
    if (Array.isArray(children)) {
      children.forEach(function (child) {
        if (typeof child === "string") {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      });
    } else if (typeof children === "string") {
      el.appendChild(document.createTextNode(children));
    } else if (children instanceof Node) {
      el.appendChild(children);
    }
  }
  return el;
}

function renderIntro(root) {
  const container = createElement("div", {
    class: "card",
    onClick: start,
    style: {
      maxWidth: "480px",
      textAlign: "center",
      cursor: "pointer",
    },
  });

  const h1 = createElement(
    "h1",
    {
      style: {
        fontSize: "24px",
        fontWeight: "600",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "12px",
      },
    },
    "ACCESS INITIATION"
  );

  const p1 = createElement(
    "p",
    {
      style: {
        fontSize: "14px",
        opacity: "0.9",
        marginBottom: "24px",
      },
    },
    "Let’s play a variation of 21 Questions. Answer quickly. Don’t overthink."
  );

  const p2 = createElement(
    "p",
    {
      style: {
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        opacity: "0.8",
      },
    },
    "Tap to proceed"
  );

  container.appendChild(h1);
  container.appendChild(p1);
  container.appendChild(p2);

  root.appendChild(container);
}

function renderQuestions(root) {
  const currentQuestion = state.questions[state.index];
  if (!currentQuestion) return;

  const wrapper = createElement(
    "div",
    {
      class: "card",
      style: {
        maxWidth: "520px",
        width: "100%",
        textAlign: "center",
      },
    },
    []
  );

  const status = createElement(
    "div",
    {
      style: {
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        marginBottom: "16px",
        opacity: "0.75",
      },
    },
    "SIGNAL WINDOW " + (state.index + 1) + " / " + state.questions.length
  );

  const promptEl = createElement(
    "div",
    {
      style: {
        fontSize: "22px",
        fontWeight: "600",
        lineHeight: "1.4",
        marginBottom: "32px",
      },
    },
    currentQuestion.prompt
  );

  const buttonRow = createElement(
    "div",
    {
      style: {
        display: "flex",
        gap: "12px",
      },
    },
    []
  );

  const leftBtn = createElement(
    "button",
    {
      type: "button",
      onClick: function () {
        handleChoice("left");
      },
      style: {
        flex: "1",
        padding: "16px 10px",
        borderRadius: "8px",
        border: "1px solid rgba(242,242,242,0.7)",
        background: "transparent",
        color: "#f2f2f2",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
      },
    },
    currentQuestion.left
  );

  const rightBtn = createElement(
    "button",
    {
      type: "button",
      onClick: function () {
        handleChoice("right");
      },
      style: {
        flex: "1",
        padding: "16px 10px",
        borderRadius: "8px",
        border: "1px solid rgba(242,242,242,0.7)",
        background: "transparent",
        color: "#f2f2f2",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
      },
    },
    currentQuestion.right
  );

  buttonRow.appendChild(leftBtn);
  buttonRow.appendChild(rightBtn);

  const footer = createElement(
    "div",
    {
      style: {
        marginTop: "24px",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        opacity: "0.6",
      },
    },
    "You have 8 seconds. Move instinctively."
  );

  wrapper.appendChild(status);
  wrapper.appendChild(promptEl);
  wrapper.appendChild(buttonRow);
  wrapper.appendChild(footer);

  root.appendChild(wrapper);
}

function renderForm(root) {
  const form = createElement(
    "form",
    {
      class: "card",
      onSubmit: handleSubmit,
      style: {
        maxWidth: "480px",
        width: "100%",
        textAlign: "left",
      },
    },
    []
  );

  const h2 = createElement(
    "h2",
    {
      style: {
        fontSize: "20px",
        fontWeight: "600",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "12px",
      },
    },
    "Enter details for consideration"
  );

  form.appendChild(h2);

  function addField(label, field, type) {
    const wrapper = createElement(
      "label",
      {
        style: {
          display: "block",
          marginBottom: "14px",
        },
      },
      []
    );

    const lab = createElement(
      "div",
      {
        style: {
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          marginBottom: "6px",
          opacity: "0.85",
        },
      },
      label
    );

    const input = createElement("input", {
      type: type || "text",
      value: state.form[field] || "",
      style: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(242,242,242,0.8)",
        background: "transparent",
        color: "#f2f2f2",
        fontSize: "14px",
        outline: "none",
      },
    });

    input.addEventListener("input", function (e) {
      handleFormChange(field, e.target.value);
    });

    wrapper.appendChild(lab);
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  }

  addField("Name", "name");
  addField("Email", "email", "email");
  addField("Age", "age");
  addField("Pronouns", "pronouns");
  addField("Location", "location");

  const submitBtn = createElement(
    "button",
    {
      type: "submit",
      style: {
        marginTop: "20px",
        width: "100%",
        padding: "12px 16px",
        borderRadius: "999px",
        border: "1px solid rgba(242,242,242,0.9)",
        background: "transparent",
        color: "#f2f2f2",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.16em",
      },
    },
    "Submit for consideration"
  );

  form.appendChild(submitBtn);

  root.appendChild(form);
}

function renderDone(root) {
  const container = createElement(
    "div",
    {
      class: "card",
      style: {
        maxWidth: "480px",
        textAlign: "center",
      },
    },
    []
  );

  const h2 = createElement(
    "h2",
    {
      style: {
        fontSize: "22px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "12px",
      },
    },
    "Application received"
  );

  const p = createElement(
    "p",
    {
      style: {
        fontSize: "14px",
        lineHeight: "1.5",
        opacity: "0.9",
      },
    },
    "Your responses and details have been recorded for consideration."
  );

  container.appendChild(h2);
  container.appendChild(p);
  root.appendChild(container);
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  // reset background in case anything changed
  document.body.style.background = ORANGE;
  app.innerHTML = "";

  const wrapper = createElement(
    "div",
    {
      class: "root",
    },
    []
  );

  if (state.stage === "intro") {
    renderIntro(wrapper);
  } else if (state.stage === "questions") {
    renderQuestions(wrapper);
  } else if (state.stage === "form") {
    renderForm(wrapper);
  } else if (state.stage === "done") {
    renderDone(wrapper);
  }

  app.appendChild(wrapper);
}

// Initial render
render();
