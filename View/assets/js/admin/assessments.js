// Load assessments for the skill
async function loadAssessments() {
  const urlParams = new URLSearchParams(window.location.search);
  const skillId = window.location.pathname.split('/')[3]; // /admin/skills/:skillId/assessments

  try {
    const response = await fetch(`/api/admin/assessments?skillId=${skillId}`);
    const data = await response.json();
    if (data.success) {
      renderAssessments(data.data);
    } else {
      console.error('Failed to load assessments');
    }
  } catch (error) {
    console.error('Error loading assessments:', error);
  }
}

function renderAssessments(assessments) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  assessments.forEach(a => {
    const row = `
      <tr>
        <td><span class="pill">${a.status}</span></td>
        <td>${a.duration} mins</td>
        <td>${a.totalQuestions}</td>
        <td>${a.grade || '-'}</td>
        <td class="rowActions">
          <a class="btnGhost" href="/admin/assessments/${a._id}/questions">Questions</a>
          <button class="btnIcon">✎</button>
          <button class="btnDanger">🗑</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadAssessments);
