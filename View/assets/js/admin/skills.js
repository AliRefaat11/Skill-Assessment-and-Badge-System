document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("skillsTableBody");
  const alertBox = document.getElementById("alertBox");

  function showAlert(msg) {
    if (!alertBox) return;
    alertBox.style.display = "block";
    alertBox.textContent = msg;
  }

  try {
    const res = await fetch("/api/v1/skills");
    const payload = await res.json();

    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="3">Failed to load skills</td></tr>`;
      showAlert(payload.message || "Failed to load skills");
      return;
    }

    const skills = payload.data || payload.skills || [];

    if (!skills.length) {
      tbody.innerHTML = `<tr><td colspan="3">No skills yet</td></tr>`;
      return;
    }

    tbody.innerHTML = skills
      .map(
        (s) => `
        <tr>
          <td>${s.skillName || s.name || ""}</td>
          <td>${s.category || ""}</td>
          <td>
            <a class="btnGhost" href="/admin/skills/${s._id}/assessments">View Assessments</a>
            <a class="btnPrimary" href="/admin/skills/${s._id}/assessments/new">+ Add Assessment</a>
          </td>
        </tr>
      `
      )
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="3">Network error</td></tr>`;
    showAlert("Network error while loading skills");
  }
});
