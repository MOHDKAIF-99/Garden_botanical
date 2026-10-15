/* Shared script for both pages (works on mobile & laptop) */
(function () {
  const layer = document.getElementById('petals');
  const symbols = ['🍃', '🌿', '🌸', '🌼', '🍂'];

  function spawnPetal(burst) {
    if (!layer) return;
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (14 + Math.random() * 20) + 'px';
    p.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    p.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
    const dur = burst ? 3 + Math.random() * 3 : 8 + Math.random() * 8;
    p.style.animationDuration = dur + 's';
    layer.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000 + 200);
  }

  // gentle ambient falling leaves
  const isSmall = window.innerWidth < 600;
  setInterval(() => spawnPetal(false), isSmall ? 1400 : 900);
  for (let i = 0; i < 6; i++) setTimeout(() => spawnPetal(false), i * 300);

  // ---- Page 1: little tap effect before navigating ----
  const go = document.getElementById('goBtn');
  if (go) {
    go.addEventListener('click', function (e) {
      e.preventDefault();
      for (let i = 0; i < 30; i++) setTimeout(() => spawnPetal(true), i * 40);
      const href = go.getAttribute('href');
      setTimeout(() => { window.location.href = href; }, 900);
    });
  }

  // ---- Page 2: reveal notes as she scrolls ----
  const notes = document.querySelectorAll('.note');
  if (notes.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
        });
      }, { threshold: 0.2 });
      notes.forEach((n) => io.observe(n));
    } else {
      notes.forEach((n) => n.classList.add('show'));
    }
  }

  // ---- Page 2: final surprise ----
  const btn = document.getElementById('smileBtn');
  const smile = document.getElementById('smile');
  const msg = document.getElementById('finalMsg');
  if (btn && smile && msg) {
    const lines = [
      'There it is... that smile 😊',
      'Keep smiling, it suits you 🌷',
      'You made someone very happy today 💛'
    ];
    let count = 0;
    btn.addEventListener('click', function () {
      smile.textContent = count === 0 ? '😊' : ['🥰', '😄', '🌻'][count % 3];
      smile.classList.remove('pop');
      void smile.offsetWidth; // restart animation
      smile.classList.add('pop');
      msg.textContent = lines[count % lines.length];
      btn.textContent = 'Again 🌸';
      for (let i = 0; i < 40; i++) setTimeout(() => spawnPetal(true), i * 50);
      count++;
    });
  }
})();