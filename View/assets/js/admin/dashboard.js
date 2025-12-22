// Load stats
async function loadStats() {
  try {
    const response = await fetch('/api/admin/stats');
    const data = await response.json();
    if (data.success) {
      renderStats(data.data);
    } else {
      console.error('Failed to load stats');
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

function renderStats(stats) {
  document.getElementById('totalUsers').textContent = stats.totalUsers;
  document.getElementById('totalSkills').textContent = stats.totalSkills;
  document.getElementById('totalQuizzes').textContent = stats.totalQuizzes;
  document.getElementById('activeUsers').textContent = stats.activeUsers;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadStats);

// reserved for later charts or recent activity
