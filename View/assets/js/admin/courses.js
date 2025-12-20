const input = document.getElementById("searchCourses");
const list = document.getElementById("coursesList");

if (input && list) {
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    [...list.querySelectorAll(".courseCard")].forEach(card => {
      const title = card.getAttribute("data-title") || "";
      card.style.display = title.includes(q) ? "" : "none";
    });
  });
}
