function mapToBackendType(uiType) {
  if (uiType === "mcq") return "mcq";
  if (uiType === "true_false") return "true-false";
  if (uiType === "text") return "short";
  return "mcq";
}


async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function showAlert(type, msg) {
  const box = document.getElementById("alertBox");
  if (!box) return;

  box.className = "alert " + (type === "success" ? "alert-success" : "alert-error");
  box.textContent = msg;
  box.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getEl(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = getEl("createQuestionForm");
  if (!form) return;

  const assessmentIdEl = getEl("assessmentId");
  const questionTextEl = getEl("questionText");
  const questionTypeEl = getEl("questionType");
  const pointsEl = getEl("points");
  const optionsWrap = getEl("optionsWrap");
  const correctAnswerEl = getEl("correctAnswer");
  const answersHint = getEl("answersHint");

  function setCorrectAnswer(value) {
    correctAnswerEl.value = value || "";
  }

  function renderMCQ() {
    answersHint.textContent = "Add 4 options and choose the correct one.";
    optionsWrap.innerHTML = "";

    const letters = ["A", "B", "C", "D"];

    for (let i = 0; i < 4; i++) {
      const row = document.createElement("div");
      row.className = "option-row";

      row.innerHTML = `
        <div class="badge-letter">${letters[i]}</div>
        <input type="text" class="optText" placeholder="Option ${letters[i]}" data-idx="${i}" />
        <div class="correct-chip">
          <input type="radio" name="correctOpt" value="${i}" />
          <span>Correct</span>
        </div>
      `;

      optionsWrap.appendChild(row);
    }

    correctAnswerEl.disabled = true;
    setCorrectAnswer("");
  }

  function renderTrueFalse() {
    answersHint.textContent = "Options are fixed: True or False. Choose the correct one.";
    optionsWrap.innerHTML = `
      <div class="tf-row">
        <div>Options: True, False</div>
        <select id="tfCorrect">
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      </div>
    `;

    correctAnswerEl.disabled = true;
    setCorrectAnswer("True");

    const tfCorrect = getEl("tfCorrect");
    tfCorrect.addEventListener("change", () => {
      setCorrectAnswer(tfCorrect.value);
    });
  }

  function renderText() {
    answersHint.textContent = "No options. Type the correct answer manually.";
    optionsWrap.innerHTML = "";
    correctAnswerEl.disabled = false;
    correctAnswerEl.placeholder = "Type the correct answer";
    setCorrectAnswer("");
  }

  function renderByType() {
    const type = questionTypeEl.value;

    if (type === "mcq") renderMCQ();
    if (type === "true_false") renderTrueFalse();
    if (type === "text") renderText();
  }

  function getMCQData() {
    const optInputs = optionsWrap.querySelectorAll(".optText");
    const options = Array.from(optInputs).map(i => i.value.trim());

    const checked = optionsWrap.querySelector("input[name='correctOpt']:checked");
    const correctIndex = checked ? Number(checked.value) : null;

    const correctAnswer = correctIndex !== null ? (options[correctIndex] || "") : "";
    return { options, correctAnswer, correctIndex };
  }

  optionsWrap.addEventListener("change", (e) => {
    if (questionTypeEl.value !== "mcq") return;

    if (e.target && e.target.name === "correctOpt") {
      const { correctAnswer } = getMCQData();
      setCorrectAnswer(correctAnswer);
    }
  });

  optionsWrap.addEventListener("input", () => {
    if (questionTypeEl.value !== "mcq") return;

    const checked = optionsWrap.querySelector("input[name='correctOpt']:checked");
    if (!checked) return;

    const { correctAnswer } = getMCQData();
    setCorrectAnswer(correctAnswer);
  });

  questionTypeEl.addEventListener("change", renderByType);
  renderByType();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const assessmentId = assessmentIdEl?.value;
    const questionText = questionTextEl.value.trim();
const uiQuestionType = questionTypeEl.value;
const backendType = mapToBackendType(uiQuestionType);
    const points = Number(pointsEl.value);
    const correctAnswer = correctAnswerEl.value.trim();

    if (!assessmentId) {
      showAlert("error", "Assessment ID is missing.");
      return;
    }

    if (!questionText) {
      showAlert("error", "Please enter the question text.");
      return;
    }

    if (Number.isNaN(points) || points <= 0) {
      showAlert("error", "Please enter valid points.");
      return;
    }

    let options = [];

    if (uiQuestionType  === "mcq") {
      const data = getMCQData();
      options = data.options;

      const emptyCount = options.filter(o => !o).length;
      if (emptyCount > 0) {
        showAlert("error", "Please fill all 4 MCQ options.");
        return;
      }

      if (!data.correctAnswer) {
        showAlert("error", "Please choose the correct MCQ option.");
        return;
      }
    }

    if (uiQuestionType  === "true_false") {
      options = ["True", "False"];
      if (!correctAnswer) {
        showAlert("error", "Please choose the correct answer.");
        return;
      }
    }

    if (uiQuestionType  === "text") {
      if (!correctAnswer) {
        showAlert("error", "Please type the correct answer for a text question.");
        return;
      }
    }

    try {
      const res = await fetch("/api/v1/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
  assessmentId,
  type: backendType,
  text: questionText,
  points,
  correctAnswer
})


      });

      const body = await safeJson(res);

      if (!res.ok) {
        showAlert("error", body?.message || "Failed to create question.");
        return;
      }

      showAlert("success", "Question created successfully.");

      setTimeout(() => {
        window.location.href = `/admin/assessments/${assessmentId}/questions`;
      }, 700);

    } catch (err) {
      showAlert("error", "Network error. Check server logs.");
    }
  });
});
