async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function formatNow() {
  return new Date().toLocaleString();
}

let chartAssessments = null;
let chartQuestions = null;

function destroyCharts() {
  if (chartAssessments) {
    chartAssessments.destroy();
    chartAssessments = null;
  }
  if (chartQuestions) {
    chartQuestions.destroy();
    chartQuestions = null;
  }
}

function normalizeAssessmentsStatus(data) {
  const order = ["not-started", "in-progress", "submitted"];
  const map = {};

  (data || []).forEach(d => {
    map[d._id] = d.count;
  });

  return {
    labels: order.map(s => s.replace("-", " ")),
    counts: order.map(s => map[s] || 0)
  };
}

function normalizeQuestionsType(data) {
  const order = ["mcq", "true-false", "short"];
  const map = {};

  (data || []).forEach(d => {
    map[d._id] = d.count;
  });

  return {
    labels: ["MCQ", "True / False", "Short"],
    counts: order.map(t => map[t] || 0)
  };
}

function buildCharts(metrics) {
  const aCanvas = document.getElementById("chartAssessmentsStatus");
  const qCanvas = document.getElementById("chartQuestionsType");
  if (!aCanvas || !qCanvas) return;

  destroyCharts();

  const a = normalizeAssessmentsStatus(
    metrics.charts.assessmentsByStatus
  );

  const q = normalizeQuestionsType(
    metrics.charts.questionsByType
  );

  chartAssessments = new Chart(aCanvas, {
    type: "doughnut",
    data: {
      labels: a.labels,
      datasets: [{ data: a.counts }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });

  chartQuestions = new Chart(qCanvas, {
    type: "bar",
    data: {
      labels: q.labels,
      datasets: [{ data: q.counts }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function renderList(containerId, items, emptyText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `<div class="listEmpty">${emptyText}</div>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="listItem">
      <div class="listLeft">
        <div class="listTitle">${item.title}</div>
        <div class="listMeta">${item.meta}</div>
      </div>
    </div>
  `).join("");
}

function buildLatest(metrics) {
  renderList(
    "latestUsers",
    metrics.latest.users.map(u => ({
      title: u._id,
      meta: u.createdAt
    })),
    "No users yet"
  );

  renderList(
    "latestSkills",
    metrics.latest.skills.map(s => ({
      title: s._id,
      meta: s.createdAt
    })),
    "No skills yet"
  );

  renderList(
    "latestAssessments",
    metrics.latest.assessments.map(a => ({
      title: a._id,
      meta: a.createdAt
    })),
    "No assessments yet"
  );

  renderList(
    "latestQuestions",
    metrics.latest.questions.map(q => ({
      title: q._id,
      meta: q.createdAt
    })),
    "No questions yet"
  );
}

async function loadDashboard() {
  setText("lastUpdated", "Loading...");

  const res = await fetch("/admin/dashboard/metrics");
  const body = await safeJson(res);

  if (!res.ok || !body || body.status !== "success") {
    setText("lastUpdated", "Failed to load");
    return;
  }

  const metrics = body.data;

  setText("kpiUsers", metrics.totals.users);
  setText("kpiSkills", metrics.totals.skills);
  setText("kpiAssessments", metrics.totals.assessments);
  setText("kpiQuestions", metrics.totals.questions);

  buildCharts(metrics);
  buildLatest(metrics);

  setText("lastUpdated", formatNow());
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("refreshBtn");
  if (btn) btn.addEventListener("click", loadDashboard);
  loadDashboard();
});
