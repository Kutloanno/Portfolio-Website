document.addEventListener('DOMContentLoaded', () => {
  // theme switcher
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      createParticleBurst(isLight);
    });
  }

  const darkIcons = [
    // Star
    `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    // Bat
    `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%;"><path d="M2 9c2-2 4-1 6-3 1 2 2 2 4 0 2 2 3 2 4 0 2 2 4 1 6 3 0 3-3 6-10 6S2 12 2 9z"/></svg>`,
    // Planet
    `<svg viewBox="0 0 24 24" style="width:100%;height:100%;"><circle cx="12" cy="12" r="6" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="2" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(-15 12 12)"/></svg>`
  ];

  const lightIcons = [
    // Cloud
    `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%;"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>`,
    // Bird
    `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%;"><path d="M12 13c1.5-2.5 4.5-4.5 9.5-4.5-4.5 1-7 3.5-9.5 7.5-2.5-4-5-6.5-9.5-7.5 5 0 8 2 9.5 4.5z"/></svg>`
  ];

  const darkColors = ['#fbbf24', '#f59e0b', '#a78bfa', '#c084fc', '#38bdf8', '#22d3ee', '#fb7185'];
  const lightColors = ['#93c5fd', '#60a5fa', '#94a3b8', '#cbd5e1', '#fdba74', '#f97316'];

  const createParticleBurst = (isLight) => {
    const rect = themeToggleBtn.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    const count = 18;
    const icons = isLight ? lightIcons : darkIcons;
    const colors = isLight ? lightColors : darkColors;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'theme-particle';
      particle.innerHTML = icons[Math.floor(Math.random() * icons.length)];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.color = color;
      
      const size = Math.floor(16 + Math.random() * 16); // 16px to 32px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.position = 'fixed';
      particle.style.left = `${startX - size / 2}px`;
      particle.style.top = `${startY - size / 2}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.opacity = '1';

      // Randomize path: shooting down & right (45 +/- 35 degrees)
      const angle = (45 + (Math.random() - 0.5) * 70) * Math.PI / 180;
      const distance = 80 + Math.random() * 180; // 80px to 260px
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;
      const rotation = (Math.random() - 0.5) * 720;
      const duration = 0.8 + Math.random() * 0.7; // 0.8s to 1.5s

      particle.style.transition = `transform ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1), opacity ${duration}s cubic-bezier(0.5, 0, 0.7, 1)`;

      document.body.appendChild(particle);

      // Trigger transition next frame
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg)`;
        particle.style.opacity = '0';
      });

      // Clean up after animation complete
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }
  };

  // modal setup helper
  const setupModal = (triggerId, modalId, closeId) => {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);
    
    if (trigger && modal) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  };

  setupModal('fret-trigger', 'fret-modal', 'fret-modal-close');
  setupModal('kyoto-trigger', 'kyoto-modal', 'kyoto-modal-close');
});
