async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

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

  function hideAlert() {
    if (!alertBox) return;
    alertBox.style.display = "none";
    alertBox.textContent = "";
  }

  function renderAssessments(assessments) {
    tbody.innerHTML = assessments
      .map(
        (a) => `
        <tr>
          <td>${a.duration ?? ""}</td>
          <td>${a.TotalMarks ?? a.totalMarks ?? ""}</td>
          <td>${a.status ?? ""}</td>
          <td style="display:flex; gap:10px; flex-wrap:wrap;">
            <a class="btnGhost" href="/admin/assessments/${a._id}/questions">View Questions</a>
            <a class="btnPrimary" href="/admin/assessments/${a._id}/questions/new">+ Add Question</a>

            <button
              type="button"
              class="btnDanger js-del-assessment"
              data-id="${a._id}">
              Delete
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  async function loadAssessments() {
    hideAlert();

    if (!skillId) {
      tbody.innerHTML = `<tr><td colspan="4">Missing skillId</td></tr>`;
      return;
    }

    tbody.innerHTML = `<tr><td colspan="4">Loading...</td></tr>`;

    try {
      const res = await fetch(`/api/v1/assessments/skill/${skillId}`);
      const payload = await safeJson(res);

      if (!res.ok) {
        tbody.innerHTML = `<tr><td colspan="4">Failed to load assessments</td></tr>`;
        showAlert(payload?.message || "Failed to load assessments");
        return;
      }

      const assessments = payload?.data || payload?.assessments || [];

      if (!assessments.length) {
        tbody.innerHTML = `<tr><td colspan="4">No assessments yet</td></tr>`;
        return;
      }

      renderAssessments(assessments);
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="4">Network error</td></tr>`;
      showAlert("Network error while loading assessments");
    }
  }

  await loadAssessments();

  // delete handler (event delegation)
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".js-del-assessment");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    const ok = confirm("Delete this assessment and all its questions?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/v1/assessments/${id}`, { method: "DELETE" });
      const body = await safeJson(res);

      if (!res.ok) {
        showAlert(body?.message || "Failed to delete assessment");
        return;
      }

      btn.closest("tr")?.remove();

      // if table became empty after delete
      if (!tbody.querySelector("tr")) {
        tbody.innerHTML = `<tr><td colspan="4">No assessments yet</td></tr>`;
      }
    } catch {
      showAlert("Network error while deleting assessment");
    }
  });
});
