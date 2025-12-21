function showAlert(message, type) {
  const box = document.getElementById("alertBox");
  if (!box) return;
  box.style.display = "block";
  box.textContent = message;
  box.style.borderColor = type === "success" ? "green" : "crimson";
}

const form = document.getElementById("createQuestionForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const assessmentId = form.getAttribute("data-assessment-id");
    const text = document.getElementById("text").value.trim();
    const type = document.getElementById("type").value;
    const points = Number(document.getElementById("points").value);
    const correctAnswer = document.getElementById("correctAnswer").value.trim();

    try {
      const res = await fetch("/api/v1/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId, text, type, points, correctAnswer })
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert(data.message || "Failed to create question", "error");
        return;
      }

      showAlert("Question created successfully", "success");
      window.location.href = `/admin/assessments/${assessmentId}/questions`;
    } catch (err) {
      showAlert("Network error while creating question", "error");
    }
  });
}
