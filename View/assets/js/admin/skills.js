// Load skills
async function loadSkills() {
  try {
    console.log('Fetching skills from API...');
    const response = await fetch('/api/admin/skills');
    const data = await response.json();
    console.log('API response:', data);
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
  const container = document.getElementById('skillsList');
  container.innerHTML = '';
  skills.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'card';
    skillCard.innerHTML = `
      <h3>${skill.skillName}</h3>
      <p>${skill.description}</p>
      <p><strong>Category:</strong> ${skill.category}</p>
      <p><strong>Difficulty:</strong> ${skill.difficultyLevel}</p>
    `;
    container.appendChild(skillCard);
  });
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadSkills);