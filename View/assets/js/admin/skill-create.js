document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createSkillForm");
  const alertBox = document.getElementById("alertBox");

  function showAlert(msg, type) {
    alertBox.style.display = "block";
    alertBox.className = "alert " + (type === "success" ? "alert-success" : "alert-error");
    alertBox.textContent = msg;
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const skillName = document.getElementById("skillName").value.trim();
    const category = document.getElementById("category").value;
    const difficultyLevel = document.getElementById("difficultyLevel").value;

    try {
      const res = await fetch("/api/v1/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillName, category, difficultyLevel })
      });

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);


      if (!res.ok) {
        showAlert(data.message || "Failed to create skill", "error");
        return;
      }

      showAlert("Skill created successfully", "success");
      window.location.href = "/admin/skills";
    } catch (err) {
      showAlert("Network error while creating skill", "error");
    }
  });
});
