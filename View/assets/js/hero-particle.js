(function(){
  const hero = document.querySelector('.hero-bg');
  if(!hero) return;

  let lastSpawn = 0;
  const throttle = 20; // ms between particle spawns

  function makeParticle(x,y){
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = 6 + Math.random()*10;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    // color changes with x position
    const hue = Math.round((x / hero.clientWidth) * 360);
    p.style.background = `radial-gradient(circle at 30% 30%, hsla(${hue},90%,95%,0.95), hsla(${hue},80%,60%,0.6))`;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    hero.appendChild(p);
    // force reflow then animate
    requestAnimationFrame(()=> p.classList.add('animate'));
    // remove after animation
    p.addEventListener('animationend', ()=> p.remove());
  }

  function onMove(e){
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // update CSS variables for gradient center
    hero.style.setProperty('--mx', `${x}px`);
    hero.style.setProperty('--my', `${y}px`);

    const now = Date.now();
    if (now - lastSpawn > throttle) {
      lastSpawn = now;
      makeParticle(x,y);
    }
  }

  hero.addEventListener('mouseenter', () => hero.classList.add('hovering'));
  hero.addEventListener('mouseleave', () => {
    hero.classList.remove('hovering');
    hero.style.setProperty('--mx', '50%');
    hero.style.setProperty('--my', '50%');
  });
  hero.addEventListener('mousemove', onMove);
})();