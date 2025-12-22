async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const tableCard = document.querySelector(".tableCard[data-assessment-id]");
  const tbody = document.getElementById("questionsTableBody");
  const alertBox = document.getElementById("alertBox");

  const assessmentId = tableCard?.dataset.assessmentId;

  function showAlert(msg) {
    if (!alertBox) return;
    alertBox.style.display = "block";
    alertBox.textContent = msg;
  }

  function hideAlert() {
    if (!alertBox) return;
    alertBox.style.display = "none";
    alertBox.textContent = "";
  }

  function renderQuestions(questions) {
    tbody.innerHTML = questions
      .map(
        (q) => `
        <tr>
          <td>${q.text || ""}</td>
          <td>${q.correctAnswer || ""}</td>
          <td>${q.points ?? ""}</td>
          <td style="display:flex; gap:10px; flex-wrap:wrap;">
            <button
              type="button"
              class="btnDanger js-del-question"
              data-id="${q._id}">
              Delete
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  async function loadQuestions() {
    hideAlert();

    if (!assessmentId) {
      tbody.innerHTML = `<tr><td colspan="4">Missing assessmentId</td></tr>`;
      return;
    }

    tbody.innerHTML = `<tr><td colspan="4">Loading...</td></tr>`;

    try {
      const res = await fetch(`/api/v1/questions/assessment/${assessmentId}`);
      const payload = await safeJson(res);

      if (!res.ok) {
        tbody.innerHTML = `<tr><td colspan="4">Failed to load questions</td></tr>`;
        showAlert(payload?.message || "Failed to load questions");
        return;
      }

      const questions = payload?.data || payload?.questions || [];

      if (!questions.length) {
        tbody.innerHTML = `<tr><td colspan="4">No questions yet</td></tr>`;
        return;
      }

      renderQuestions(questions);
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="4">Network error</td></tr>`;
      showAlert("Network error while loading questions");
    }
  }

  await loadQuestions();

  // delete handler (event delegation)
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".js-del-question");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    const ok = confirm("Delete this question?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/v1/questions/${id}`, { method: "DELETE" });
      const body = await safeJson(res);

      if (!res.ok) {
        showAlert(body?.message || "Failed to delete question");
        return;
      }

      btn.closest("tr")?.remove();

      if (!tbody.querySelector("tr")) {
        tbody.innerHTML = `<tr><td colspan="4">No questions yet</td></tr>`;
      }
    } catch {
      showAlert("Network error while deleting question");
    }
  });
});
