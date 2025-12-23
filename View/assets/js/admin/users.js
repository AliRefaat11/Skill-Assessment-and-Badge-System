async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}

// Load users
async function loadUsers() {
  const body = document.getElementById("usersBody");

  try {
    const response = await fetch("/api/admin/users");
    const data = await safeJson(response);

    if (!response.ok) {
      console.error("Failed to load users");
      body.innerHTML = `<tr><td colspan="5">Failed to load users</td></tr>`;
      return;
    }

    const users = Array.isArray(data) ? data : (data?.data || data?.users || []);
    renderUsers(users);

  } catch (error) {
    console.error("Error loading users:", error);
    body.innerHTML = `<tr><td colspan="5">Network error</td></tr>`;
  }
}

function renderUsers(users) {
  const body = document.getElementById("usersBody");
  body.innerHTML = "";

  if (!users.length) {
    body.innerHTML = `<tr><td colspan="5">No users found</td></tr>`;
    return;
  }

  users.forEach(user => {
    const userId = user._id || user.id;

    const row = `
      <tr data-name="${(user.FName || "")} ${(user.LName || "")}">
        <td>${user.FName || ""} ${user.LName || ""}</td>
        <td>${user.Email || ""}</td>
        <td>${user.Role || ""}</td>
        <td>${user.PhoneNumber || "-"}</td>
        <td class="rowActions">
          <button type="button" class="btnIcon">✎</button>

          <button
            type="button"
            class="btnDanger js-del-user"
            data-id="${userId}">
            🗑
          </button>
        </td>
      </tr>
    `;

    body.innerHTML += row;
  });
}

const input = document.getElementById("searchUsers");
const tbody = document.getElementById("usersBody");

if (input && tbody) {
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    [...tbody.querySelectorAll("tr")].forEach(row => {
      const name = (row.getAttribute("data-name") || "").toLowerCase();
      row.style.display = name.includes(q) ? "" : "none";
    });
  });
}

// Delete (event delegation)
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".js-del-user");
  if (!btn) return;

  const id = btn.dataset.id;
  if (!id) return;

  const ok = confirm("Delete this user?");
  if (!ok) return;

  try {
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const body = await safeJson(res);

    if (!res.ok) {
      alert(body?.message || "Failed to delete user");
      return;
    }

    btn.closest("tr")?.remove();

    // if table becomes empty
    const usersBody = document.getElementById("usersBody");
    if (usersBody && usersBody.querySelectorAll("tr").length === 0) {
      usersBody.innerHTML = `<tr><td colspan="5">No users found</td></tr>`;
    }

  } catch (err) {
    alert("Network error while deleting user");
  }
});

// Load on page load
document.addEventListener("DOMContentLoaded", loadUsers);
