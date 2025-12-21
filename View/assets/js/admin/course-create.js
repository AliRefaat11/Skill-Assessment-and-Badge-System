function showAlert(message, type) {
  const box = document.getElementById("alertBox");
  if (!box) return;
  box.style.display = "block";
  box.textContent = message;
  box.style.borderColor = type === "success" ? "green" : "crimson";
}

const form = document.getElementById("createCourseForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const skillID = document.getElementById("skillID").value;
    const instructorID = document.getElementById("instructorID").value;
    const difficultyLevel = document.getElementById("difficultyLevel").value;
    const duration = Number(document.getElementById("duration").value);
    const price = Number(document.getElementById("price").value);

    try {
      const res = await fetch("/api/v1/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, skillID, instructorID, difficultyLevel, duration, price })
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert(data.message || "Failed to create course", "error");
        return;
      }

      showAlert("Course created successfully", "success");
      window.location.href = "/admin/courses";
    } catch (err) {
      showAlert("Network error while creating course", "error");
    }
  });
}
