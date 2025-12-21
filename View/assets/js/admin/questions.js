// Load questions for the assessment
async function loadQuestions() {
  const assessmentId = window.location.pathname.split('/')[3]; // /admin/assessments/:assessmentId/questions

  try {
    const response = await fetch(`/api/admin/questions/assessment/${assessmentId}`);
    const data = await response.json();
    if (data.success) {
      renderQuestions(data.data);
    } else {
      console.error('Failed to load questions');
    }
  } catch (error) {
    console.error('Error loading questions:', error);
  }
}

function renderQuestions(questions) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  questions.forEach(q => {
    const row = `
      <tr>
        <td>${q.text}</td>
        <td><span class="pill">${q.type}</span></td>
        <td>${q.points}</td>
        <td class="rowActions">
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

// Load questions
async function loadQuestions() {
  const assessmentId = window.location.pathname.split('/')[3]; // /admin/assessments/:assessmentId/questions

  try {
    const response = await fetch(`/api/admin/questions/assessment/${assessmentId}`, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    });
    const data = await response.json();
    if (data.success) {
      renderQuestions(data.data);
    } else {
      console.error('Failed to load questions');
    }
  } catch (error) {
    console.error('Error loading questions:', error);
  }
}

function renderQuestions(questions) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  questions.forEach(q => {
    const row = `
      <tr>
        <td>${q.text}</td>
        <td><span class="pill">${q.type}</span></td>
        <td>${q.points}</td>
        <td class="rowActions">
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

const btn = document.getElementById("btnAddQuestion");

if (btn) {
  btn.addEventListener("click", () => {
    const assessmentId = btn.getAttribute("data-assessment-id");
    if (!assessmentId) return;
    window.location.href = `/admin/assessments/${assessmentId}/questions/new`;
  });
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadQuestions);

// Load on page load
document.addEventListener('DOMContentLoaded', loadQuestions);
