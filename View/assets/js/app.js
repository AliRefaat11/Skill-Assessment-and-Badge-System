// Minimal JS for tabs and dialogs
document.addEventListener('click', function(e){
  const t = e.target.closest('[data-tab]');
  if(t){
    const group = t.getAttribute('data-group');
    const value = t.getAttribute('data-tab');
    document.querySelectorAll('[data-tab][data-group="'+group+'"]').forEach(x=>x.classList.remove('bg-card','shadow-sm'));
    t.classList.add('bg-card','shadow-sm');
    document.querySelectorAll('[data-tab-content][data-group="'+group+'"]').forEach(c=>{
      c.classList.toggle('hidden', c.getAttribute('data-tab-content')!==value);
    });
  }
});

// Simple modal open/close
document.addEventListener('click', function(e){
  const openBtn = e.target.closest('[data-dialog-open]');
  if(openBtn){
    const id = openBtn.getAttribute('data-dialog-open');
    const dlg = document.getElementById(id);
    if(dlg) dlg.classList.remove('hidden');
  }
  const closeBtn = e.target.closest('[data-dialog-close]');
  if(closeBtn){
    const dlg = closeBtn.closest('[data-dialog]');
    if(dlg) dlg.classList.add('hidden');
  }
});

// -----------------------------
// Admin frontend (in-memory)
// -----------------------------
;(function(){
  const courseListEl = document.getElementById('course-list');
  const addBtn = document.getElementById('btn-add-course');
  const selectCourse = document.getElementById('select-course');
  const addOptionBtn = document.getElementById('btn-add-option');
  const addQuestionBtn = document.getElementById('btn-add-question');
  if(!courseListEl) return; // Not on admin page

  const get = id => document.getElementById(id);
  const courses = window._courses || (window._courses = []);
  const questions = window._questions || (window._questions = {}); // by courseId

  function renderCourses(){
    courseListEl.innerHTML = '';
    courses.forEach((c, idx) => {
      const div = document.createElement('div');
      div.className = 'p-3 rounded-md border border-border bg-white/5';
      div.innerHTML = `<div class="flex items-center justify-between">
        <div>
          <div class="font-semibold text-foreground">${c.title}</div>
          <div class="text-xs text-muted-foreground">${c.category} • ${c.estimatedTime} • ${c.difficulty}</div>
        </div>
        <button data-del="${idx}" class="text-sm border border-border px-2 py-1 rounded">Remove</button>
      </div>`;
      courseListEl.appendChild(div);
    });
    // update select
    if(selectCourse){
      selectCourse.innerHTML = '';
      courses.forEach((c, i)=>{
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = c.title;
        selectCourse.appendChild(opt);
      });
      // if custom select is installed, rebuild menu
      if(selectCourse.previousElementSibling && selectCourse.previousElementSibling.classList.contains('select')){
        selectCourse.previousElementSibling.remove();
        enhanceSelect(selectCourse);
      }
    }
  }

  courseListEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-del]');
    if(!btn) return;
    const idx = Number(btn.getAttribute('data-del'));
    courses.splice(idx,1);
    renderCourses();
  });

  if(addBtn){
    addBtn.addEventListener('click', () => {
      const title = get('course-title').value.trim();
      const category = get('course-category').value.trim();
      const description = get('course-description').value.trim();
      const estimatedTime = get('course-time').value.trim();
      const difficulty = get('course-difficulty').value;
      if(!title) return alert('Please enter a course title');
      courses.push({ title, category, description, estimatedTime, difficulty });
      renderCourses();
      get('form-add-course').reset();
    });
  }

  if(addOptionBtn){
    addOptionBtn.addEventListener('click', () => {
      const wrap = document.getElementById('options');
      const row = document.createElement('div');
      row.className = 'flex gap-2';
      row.innerHTML = '<input class="flex-1 bg-white input rounded-md px-3 py-2 border" placeholder="Option">\
        <input type="radio" name="correct">';
      wrap.appendChild(row);
    });
  }

  if(addQuestionBtn){
    addQuestionBtn.addEventListener('click', () => {
      const idx = Number(selectCourse.value || 0);
      const qText = document.getElementById('question-text').value.trim();
      if(!courses[idx]) return alert('Add a course first');
      if(!qText) return alert('Type a question');
      const optionRows = Array.from(document.querySelectorAll('#options .flex.gap-2'));
      const options = optionRows.map(row => {
        return {
          text: row.querySelector('input[type="text"], input:not([type])')?.value || row.querySelector('input').value,
          correct: row.querySelector('input[type="radio"]').checked
        };
      });
      if(options.length < 2) return alert('Add at least two options');
      questions[idx] = questions[idx] || [];
      questions[idx].push({ text: qText, options });
      document.getElementById('question-text').value = '';
      document.getElementById('question-list').innerHTML = renderQuestionList(idx);
    });
  }

  function renderQuestionList(idx){
    const list = questions[idx] || [];
    return list.map(q => {
      const opts = q.options.map(o => `<li class="text-sm ${o.correct? 'text-success' : 'text-muted-foreground'}">${o.correct?'✓ ':''}${escapeHtml(o.text)}</li>`).join('');
      return `<div class="p-3 rounded-md border border-border bg-white/5"><div class="font-medium text-foreground mb-2">${escapeHtml(q.text)}</div><ul class="list-disc pl-5">${opts}</ul></div>`;
    }).join('');
  }

  function escapeHtml(s){
    return (s||'').replace(/[&<>"]+/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  }

  // initial render
  renderCourses();
})();

// Improve dropdown theming on some browsers (force background on open)
document.addEventListener('mousedown', function(e){
  const sel = e.target.closest('select.input');
  if(!sel) return;
  sel.classList.add('opened');
});
// Custom select component
function enhanceSelect(native, items){
  const wrap = document.createElement('div');
  wrap.className = 'select';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'select-btn';
  const label = document.createElement('span');
  label.textContent = native.options[native.selectedIndex]?.text || 'Select';
  const chevron = document.createElement('span');
  chevron.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  btn.appendChild(label); btn.appendChild(chevron);
  const menu = document.createElement('div');
  menu.className = 'select-menu';
  const build = (arr)=>{
    menu.innerHTML = '';
    arr.forEach((text, idx)=>{
      const it = document.createElement('div');
      it.className = 'select-item' + (native.selectedIndex===idx ? ' active':'');
      it.textContent = text;
      it.addEventListener('click', ()=>{
        native.selectedIndex = idx;
        label.textContent = text;
        wrap.classList.remove('open');
        native.dispatchEvent(new Event('change'));
      });
      menu.appendChild(it);
    });
  };
  const arr = items || Array.from(native.options).map(o=>o.text);
  build(arr);
  btn.addEventListener('click', ()=> wrap.classList.toggle('open'));
  document.addEventListener('click', (e)=>{ if(!wrap.contains(e.target)) wrap.classList.remove('open'); });
  wrap.appendChild(btn); wrap.appendChild(menu);
  native.style.display = 'none';
  native.parentNode.insertBefore(wrap, native);
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('select[data-custom-select]').forEach(sel=> enhanceSelect(sel));
});
document.addEventListener('blur', function(e){
  const sel = e.target.closest && e.target.closest('select.input');
  if(sel) sel.classList.remove('opened');
}, true);

