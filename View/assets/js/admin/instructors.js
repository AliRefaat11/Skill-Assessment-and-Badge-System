// Load instructors
async function loadInstructors() {
  try {
    const response = await fetch('/api/admin/users/role/Instructor');
    const data = await response.json();
    if (data) {
      renderInstructors(data);
    } else {
      console.error('Failed to load instructors');
    }
  } catch (error) {
    console.error('Error loading instructors:', error);
  }
}

function renderInstructors(instructors) {
  const body = document.getElementById("instructorsBody");
  body.innerHTML = '';
  instructors.forEach(user => {
    const row = `
      <tr data-name="${user.FName} ${user.LName}">
        <td>${user.FName} ${user.LName}</td>
        <td>${user.Email}</td>
        <td>${user.PhoneNumber || '-'}</td>
        <td class="rowActions">
          <button class="btnIcon">✎</button>
          <button class="btnDanger">🗑</button>
        </td>
      </tr>
    `;
    body.innerHTML += row;
  });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const input = document.getElementById("searchInstructors");
const tbody = document.getElementById("instructorsBody");

if (input && tbody) {
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    [...tbody.querySelectorAll("tr")].forEach(row => {
      const name = row.getAttribute("data-name") || "";
      row.style.display = name.includes(q) ? "" : "none";
    });
  });
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadInstructors);
