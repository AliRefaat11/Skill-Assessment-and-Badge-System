document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createQuestionForm");
  const alertBox = document.getElementById("alertBox");

  function showAlert(msg, type = "error") {
    if (!alertBox) return;
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    alertBox.className = "alert " + (type === "success" ? "alert-success" : "alert-error");
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const assessmentId = document.getElementById("assessmentID").value;
    const text = document.getElementById("questionText").value.trim();
    const correctAnswer = document.getElementById("correctAnswer").value.trim();
    const points = Number(document.getElementById("points").value || 1);
    const type = document.getElementById("type")?.value || "mcq";

    try {
      const res = await fetch("/api/v1/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId,
          text,
          type,
          points,
          correctAnswer
        })
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert(data.message || "Failed to create question");
        return;
      }

      showAlert("Question created successfully", "success");
      window.location.href = `/admin/assessments/${assessmentId}/questions`;

    } catch (err) {
      showAlert("Network error while creating question");
    }
  });
});
