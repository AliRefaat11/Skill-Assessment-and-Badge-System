async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("skillsTableBody");
  const alertBox = document.getElementById("alertBox");

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

  function renderSkills(skills) {
    tbody.innerHTML = skills
      .map(
        (s) => `
        <tr>
          <td>${s.skillName || s.name || ""}</td>
          <td>${s.category || ""}</td>
          <td style="display:flex; gap:10px; flex-wrap:wrap;">
            <a class="btnGhost" href="/admin/skills/${s._id}/assessments">View Assessments</a>
            <a class="btnPrimary" href="/admin/skills/${s._id}/assessments/new">+ Add Assessment</a>

            <button
              type="button"
              class="btnDanger js-del-skill"
              data-id="${s._id}">
              Delete
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  async function loadSkills() {
    hideAlert();
    tbody.innerHTML = `<tr><td colspan="3">Loading...</td></tr>`;

    try {
      const res = await fetch("/api/v1/skills");
      const payload = await safeJson(res);

      if (!res.ok) {
        tbody.innerHTML = `<tr><td colspan="3">Failed to load skills</td></tr>`;
        showAlert(payload?.message || "Failed to load skills");
        return;
      }

      const skills = payload?.data || payload?.skills || [];

      if (!skills.length) {
        tbody.innerHTML = `<tr><td colspan="3">No skills yet</td></tr>`;
        return;
      }

      renderSkills(skills);
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="3">Network error</td></tr>`;
      showAlert("Network error while loading skills");
    }
  }

  // initial load
  await loadSkills();

  // delete handler (event delegation)
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".js-del-skill");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    const ok = confirm("Delete this skill, its assessments, and all related questions?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/v1/skills/${id}`, { method: "DELETE" });
      const body = await safeJson(res);

      if (!res.ok) {
        showAlert(body?.message || "Failed to delete skill");
        return;
      }

      // remove row immediately
      btn.closest("tr")?.remove();

      // if table became empty after delete
      if (!tbody.querySelector("tr")) {
        tbody.innerHTML = `<tr><td colspan="3">No skills yet</td></tr>`;
      }
    } catch {
      showAlert("Network error while deleting skill");
    }
  });
});
