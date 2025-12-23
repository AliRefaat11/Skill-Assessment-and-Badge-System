document.addEventListener("DOMContentLoaded", async () => {
  const tableCard = document.querySelector(".tableCard[data-assessment-id]");
  const tbody = document.getElementById("questionsTableBody");

  const assessmentId = tableCard?.dataset.assessmentId;
  if (!assessmentId) {
    tbody.innerHTML = `<tr><td colspan="3">Missing assessmentId</td></tr>`;
    return;
  }

  try {
    const res = await fetch(`/api/v1/questions/assessment/${assessmentId}`);
    const payload = await res.json();

    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="3">Failed to load questions</td></tr>`;
      return;
    }

    const questions = payload.data || [];

    if (!questions.length) {
      tbody.innerHTML = `<tr><td colspan="3">No questions yet</td></tr>`;
      return;
    }

    tbody.innerHTML = questions.map(q => `
      <tr>
        <td>${q.text}</td>
        <td>${q.correctAnswer}</td>
        <td>${q.points}</td>
      </tr>
    `).join("");

  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="3">Network error</td></tr>`;
  }
});
