document.addEventListener("DOMContentLoaded", async () => {
  const tableCard = document.querySelector(".tableCard[data-skill-id]");
  const tbody = document.getElementById("assessmentsTableBody");
  const alertBox = document.getElementById("alertBox");

  const skillId = tableCard ? tableCard.getAttribute("data-skill-id") : null;

  function showAlert(msg) {
    if (!alertBox) return;
    alertBox.style.display = "block";
    alertBox.textContent = msg;
  }

  if (!skillId) {
    tbody.innerHTML = `<tr><td colspan="4">Missing skillId</td></tr>`;
    return;
  }

  try {
    const res = await fetch(`/api/v1/assessments/skill/${skillId}`);
    const payload = await res.json();

    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="4">Failed to load assessments</td></tr>`;
      showAlert(payload.message || "Failed to load assessments");
      return;
    }

    const assessments = payload.data || payload.assessments || [];

    if (!assessments.length) {
      tbody.innerHTML = `<tr><td colspan="4">No assessments yet</td></tr>`;
      return;
    }

    tbody.innerHTML = assessments
      .map(
        (a) => `
        <tr>
          <td>${a.duration ?? ""}</td>
          <td>${a.TotalMarks ?? a.totalMarks ?? ""}</td>
          <td>${a.status ?? ""}</td>
          <td>
            <a class="btnGhost" href="/admin/assessments/${a._id}/questions">View Questions</a>
            <a class="btnPrimary" href="/admin/assessments/${a._id}/questions/new">+ Add Question</a>
          </td>
        </tr>
      `
      )
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4">Network error</td></tr>`;
    showAlert("Network error while loading assessments");
  }
});
