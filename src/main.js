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
    });
  }

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
