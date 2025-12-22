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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createAssessmentForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const skillId = document.getElementById("skillId").value;
    const durationMins = Number(document.getElementById("durationMins").value);
    const status = document.getElementById("status").value;
    const totalMarks = Number(document.getElementById("totalMarks").value);

    if (!skillId || !durationMins || Number.isNaN(durationMins) || durationMins <= 0) {
      showAlert("error", "Please enter a valid duration.");
      return;
    }

    if (Number.isNaN(totalMarks) || totalMarks < 0) {
      showAlert("error", "Please enter a valid total marks.");
      return;
    }

    try {
      // IMPORTANT: this must match your backend route mount
       const res = await fetch("/api/v1/assessments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    skillId,
    duration: durationMins,
    status,
    totalMarks
  })
});

const body = await safeJson(res);

if (!res.ok) {
  const msg = body?.message || "Failed to create assessment.";
  showAlert("error", msg);
  return;
}

showAlert("success", "Assessment created successfully.");

setTimeout(() => {
  window.location.href = `/admin/skills/${skillId}/assessments`;
}, 800);


    } catch (err) {
      showAlert("error", "Network error. Check server logs.");
    }
  });
});
