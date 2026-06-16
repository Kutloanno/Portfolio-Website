// fail-proof initialization wrapper
function initPortfolio() {
  console.log("Initializing portfolio scripts...");
  
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

      const angle = (45 + (Math.random() - 0.5) * 70) * Math.PI / 180;
      const distance = 80 + Math.random() * 180;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;
      const rotation = (Math.random() - 0.5) * 720;
      const duration = 0.8 + Math.random() * 0.7;

      particle.style.transition = `transform ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1), opacity ${duration}s cubic-bezier(0.5, 0, 0.7, 1)`;

      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg)`;
        particle.style.opacity = '0';
      });

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

  // Running character and typewriter setup
  const charCanvas = document.getElementById('character-canvas');
  const charArea = document.getElementById('character-area');
  const typingTextEl = document.getElementById('typing-text');

  if (charCanvas && charArea && typingTextEl) {
    console.log("Animation components loaded successfully!");
    
    const textToType = typingTextEl.textContent.trim();
    typingTextEl.textContent = ''; // Clear heading text immediately for typewriter
    
    // Create and configure video element
    const video = document.createElement('video');
    video.src = 'assests/running.mp4';
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.className = 'hidden-video';
    document.body.appendChild(video);

    const ctx = charCanvas.getContext('2d');
    charCanvas.width = 480;
    charCanvas.height = 270;

    let hasStartedAnimation = false;
    let typingStarted = false;
    let isLooping = false;
    let isAnimationComplete = false;

    function startLoop() {
      if (!isLooping) {
        console.log("Video started playing. Beginning animation rendering loop...");
        isLooping = true;
        requestAnimationFrame(drawFrame);
      }
    }

    // Safety fallback timeout: if the video doesn't start, force the animation and typing
    let fallbackTimeout;
    function setFallback() {
      clearTimeout(fallbackTimeout);
      fallbackTimeout = setTimeout(() => {
        if (!hasStartedAnimation) {
          console.warn("Video play timeout fallback triggered.");
          charArea.classList.add('animating');
          hasStartedAnimation = true;
        }
        if (!typingStarted) {
          typingStarted = true;
          startTypewriter();
        }
      }, 5000);
    }

    // Drawing loop
    function drawFrame() {
      if (video.ended) {
        console.log("Video ended. Render stopped, freezing on final frame.");
        ctx.drawImage(video, 0, 0, charCanvas.width, charCanvas.height);
        chromaKey();
        return;
      }

      // If video is seeking or not ready, clear canvas to prevent old frames from showing
      if (video.seeking || video.readyState < 2) {
        ctx.clearRect(0, 0, charCanvas.width, charCanvas.height);
      } else {
        // Start horizontal animation
        if (!hasStartedAnimation) {
          console.log("Starting horizontal translation animation.");
          charArea.classList.add('animating');
          hasStartedAnimation = true;
        }

        ctx.drawImage(video, 0, 0, charCanvas.width, charCanvas.height);
        chromaKey();

        // Start typing at 8.2 seconds (7.2s when fully sat down + 1s delay)
        if (video.currentTime >= 8.2 && !typingStarted) {
          console.log("Character is seated. Starting typewriter heading animation.");
          typingStarted = true;
          startTypewriter();
        }
      }

      requestAnimationFrame(drawFrame);
    }

    function chromaKey() {
      const imgData = ctx.getImageData(0, 0, charCanvas.width, charCanvas.height);
      const data = imgData.data;
      
      // Select top-left pixel as key color, default to video background black (0, 0, 0)
      let keyR = data[0];
      let keyG = data[1];
      let keyB = data[2];
      
      if (keyR === 0 && keyG === 0 && keyB === 0) {
        keyR = 0;
        keyG = 0;
        keyB = 0;
      }
      
      const tolerance = 20; // Tight tolerance to prevent keying out character dark details (hair, eyes)

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];

        // Euclidean color distance
        const dist = Math.sqrt(
          (r - keyR) ** 2 +
          (g - keyG) ** 2 +
          (b - keyB) ** 2
        );

        if (dist < tolerance) {
          data[i+3] = 0; // Transparent
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // Typewriter logic
    function startTypewriter() {
      let charIndex = 0;
      const speed = 75; // Type speed in ms per letter

      function type() {
        if (charIndex < textToType.length) {
          typingTextEl.textContent += textToType.charAt(charIndex);
          charIndex++;
          setTimeout(type, speed + (Math.random() - 0.5) * 35); // organic natural typing rhythm
        } else {
          console.log("Typing completed.");
          // Set animation as complete and make character clickable to replay
          isAnimationComplete = true;
          charArea.classList.add('complete');
          console.log("Heading animation finished. Character is now clickable to replay.");
        }
      }
      type();
    }

    // Click to replay logic
    charArea.addEventListener('click', () => {
      if (isAnimationComplete) {
        console.log("Replaying character and heading animations (Hard Reset)...");
        isAnimationComplete = false;
        isLooping = false; // Fix: Allow the render loop to restart
        charArea.classList.remove('complete');
        
        // Fix: Instantly erase the sitting frame
        ctx.clearRect(0, 0, charCanvas.width, charCanvas.height);

        // 1. Reset the Video: Set video.currentTime = 0; and immediately call video.play();
        video.currentTime = 0;
        video.play().catch(err => console.error("Playback failed on replay", err));
        
        // 2. Reset the Typewriter: Clear heading container and reset typing state boolean
        typingTextEl.innerHTML = '';
        typingStarted = false;
        
        // 3. Force CSS Reflow: Remove animation from character container, trigger reflow, and reapply it
        charArea.classList.remove('animating');
        charArea.style.animation = 'none';
        void charArea.offsetWidth; // Trigger reflow
        charArea.style.animation = 'runAcross 9.01s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        hasStartedAnimation = true;
        
        // Reset fallback timeout
        setFallback();
      }
    });

    video.addEventListener('playing', () => {
      clearTimeout(fallbackTimeout);
      startLoop();
    });

    video.addEventListener('play', startLoop);

    // Trigger video playback
    setFallback();
    video.play().then(startLoop).catch(err => {
      console.warn("Autoplay blocked. Waiting for click interaction to start.", err);
      const playFallback = () => {
        video.play().then(() => {
          clearTimeout(fallbackTimeout);
          startLoop();
          window.removeEventListener('click', playFallback);
          window.removeEventListener('touchstart', playFallback);
        });
      };
      window.addEventListener('click', playFallback);
      window.addEventListener('touchstart', playFallback);
    });
  }

  // GitHub Live Commits Widget
  const commitList = document.getElementById('commit-list');
  if (commitList) {
    fetch('https://api.github.com/users/Kutloanno/events/public')
      .then(response => response.json())
      .then(data => {
        // Filter for push events
        const pushes = data.filter(event => event.type === 'PushEvent');
        commitList.innerHTML = ''; // Clear loading text
        
        if (pushes.length === 0) {
          commitList.innerHTML = '<li class="commit-item">No recent activity.</li>';
          return;
        }

        // Grab the 3 most recent commits
        let commitsAdded = 0;
        for (const push of pushes) {
          if (commitsAdded >= 3) break;
          
          const repoName = push.repo.name.split('/')[1] || 'repo'; // Get just the repo name
          const commits = push.payload.commits || [];
          
          for (const commit of commits) {
            if (commitsAdded >= 3) break;
            
            const li = document.createElement('li');
            li.className = 'commit-item';
            // Format: repo-name: commit message
            li.innerHTML = `<span class="commit-repo">${repoName}</span>: <span class="commit-msg">${commit.message}</span>`;
            commitList.appendChild(li);
            commitsAdded++;
          }
        }
      })
      .catch(err => {
        console.error('Failed to fetch GitHub commits:', err);
        commitList.innerHTML = '<li class="commit-item">Offline: Activity hidden.</li>';
      });
  }
}

// Fail-proof readyState listener wrapper
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
