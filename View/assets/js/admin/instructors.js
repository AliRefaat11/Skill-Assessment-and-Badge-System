const input = document.getElementById("searchInstructors");
const body = document.getElementById("instructorsBody");

if (input && body) {
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    [...body.querySelectorAll("tr")].forEach(row => {
      const name = row.getAttribute("data-name") || "";
      row.style.display = name.includes(q) ? "" : "none";
    });
  });
}
