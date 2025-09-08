// Menu link active state
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
  link.style.cursor = 'pointer';
  const svg = link.querySelector('svg');
  if (svg) svg.style.cursor = 'pointer';

  link.addEventListener('click', () => {
    menuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Mobile sidebar toggle
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar-toggle');
const overlay = document.querySelector('.overlay-main');

toggleBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  overlay.classList.toggle('show');
});

// Close sidebar when clicking on overlay
overlay?.addEventListener('click', () => {
  sidebar.classList.remove('show');
  overlay.classList.remove('show');
});

// Keyboard shortcut to focus search box (Ctrl+K / Cmd+K)
const searchInput = document.querySelector('.search input');
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput?.focus();
    searchInput?.select();
  }
});

// Pro Box close
const proBox = document.querySelector('.pro-box');
const proClose = document.querySelector('.pro-close');

proClose?.addEventListener('click', () => {
  proBox?.classList.add('hide');
  
  const onEnd = () => {
    if (proBox) {
      proBox.style.visibility = 'hidden';
      proBox.style.pointerEvents = 'none';
      proBox.removeEventListener('transitionend', onEnd);
    }
  };

  proBox?.addEventListener('transitionend', onEnd);
});
