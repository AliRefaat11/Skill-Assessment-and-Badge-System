const input = document.getElementById("searchUsers");
const body = document.getElementById("usersBody");

if (input && body) {
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    [...body.querySelectorAll("tr")].forEach(row => {
      const name = row.getAttribute("data-name") || "";
      row.style.display = name.includes(q) ? "" : "none";
    });
  });
}
