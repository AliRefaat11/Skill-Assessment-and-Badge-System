// public/js/modal.js

function setupModal(id, openBtnId, formId) {
  const modal = document.getElementById(id);
  if (!modal) return;

  const openBtn = document.getElementById(openBtnId);
  const form = formId ? document.getElementById(formId) : null;

  const show = () => modal.classList.add("visible");
  const hide = () => modal.classList.remove("visible");

  if (openBtn) openBtn.addEventListener("click", show);

  document.querySelectorAll(`[data-close-modal="${id}"]`).forEach(btn => {
    btn.addEventListener("click", hide);
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) hide();
  });

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      console.log(`Submitting ${id}`, data);
      hide();
      form.reset();
    });
  }
}
