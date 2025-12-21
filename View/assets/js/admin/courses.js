// Load skills
async function loadSkills() {
  try {
    const response = await fetch('/api/admin/skills');
    const data = await response.json();
    if (data.success) {
      renderSkills(data.data);
    } else {
      console.error('Failed to load skills');
    }
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}

function renderSkills(skills) {
  const list = document.getElementById("skillsList");
  list.innerHTML = '';
  skills.forEach(skill => {
    const card = `
      <div class="skillCard" data-title="${skill.name}">
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
        <a href="/admin/skills/${skill._id}/assessments">View Assessments</a>
      </div>
    `;
    list.innerHTML += card;
  });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const input = document.getElementById("searchSkills");
const list = document.getElementById("skillsList");

if (input && list) {
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    [...list.querySelectorAll(".skillCard")].forEach(card => {
      const title = card.getAttribute("data-title") || "";
      card.style.display = title.includes(q) ? "" : "none";
    });
  });
}

const btnAddSkill = document.getElementById("btnAddSkill");
if (btnAddSkill) {
  btnAddSkill.addEventListener("click", () => {
    window.location.href = "/admin/skills/new";
  });
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadSkills);
