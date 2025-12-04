let currentSlide = 0;
let skillsChart = null;

// Dark Mode Toggle
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunIcon = darkModeToggle.querySelector('.sun-icon');
  const moonIcon = darkModeToggle.querySelector('.moon-icon');
  
  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  applyTheme(currentTheme);
  
  darkModeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    sunIcon.classList.toggle('hidden', theme === 'dark');
    moonIcon.classList.toggle('hidden', theme !== 'dark');
    if (skillsChart) updateChartTheme(theme === 'dark');
  }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('.nav-menu');
  const hamburgerIcon = mobileMenuToggle.querySelector('.hamburger-icon');
  const closeIcon = mobileMenuToggle.querySelector('.close-icon');
  
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  navMenu.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      navMenu.classList.remove('active');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

// Skills Chart
function initializeSkillsChart() {
  const ctx = document.getElementById('skillsChart');
  if (!ctx) return;
  
  const isDark = document.documentElement.classList.contains('dark');
  
  skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Python', 'Machine Learning', 'TensorFlow/Keras', 'Data Analysis', 'Solar PV Systems', 'Web Development', 'Mathematics', 'Statistical Analysis'],
      datasets: [{
        label: 'Proficiency Level (%)',
        data: [95, 88, 85, 90, 80, 82, 85, 87],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#ffffff',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: isDark ? '#f9fafb' : '#374151' } },
        tooltip: { backgroundColor: isDark ? '#1f2937' : '#ffffff', bodyColor: isDark ? '#f9fafb' : '#374151' }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { color: isDark ? '#9ca3af' : '#6b7280' },
          grid: { color: isDark ? '#374151' : '#e5e7eb' },
          angleLines: { color: isDark ? '#374151' : '#e5e7eb' },
          pointLabels: { color: isDark ? '#f9fafb' : '#374151' }
        }
      }
    }
  });
}

function updateChartTheme(isDark) {
  if (!skillsChart) return;
  
  const textColor = isDark ? '#f9fafb' : '#374151';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  
  skillsChart.options.plugins.legend.labels.color = textColor;
  skillsChart.options.plugins.tooltip.backgroundColor = isDark ? '#1f2937' : '#ffffff';
  skillsChart.options.scales.r.ticks.color = isDark ? '#9ca3af' : '#6b7280';
  skillsChart.options.scales.r.grid.color = gridColor;
  skillsChart.options.scales.r.angleLines.color = gridColor;
  skillsChart.options.scales.r.pointLabels.color = textColor;
  
  skillsChart.update();
}

// Carousel Functionality
function initializeCarousel() {
  const carousel = document.getElementById('projectCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  const totalSlides = carousel.children.length;
  
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    indicators.forEach((ind, idx) => {
      ind.classList.toggle('bg-blue-600', idx === currentSlide);
      ind.classList.toggle('bg-gray-300', idx !== currentSlide && !document.documentElement.classList.contains('dark'));
      ind.classList.toggle('dark:bg-gray-600', idx !== currentSlide);
    });
  }
  
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });
  
  indicators.forEach((ind, idx) => {
    ind.addEventListener('click', () => {
      currentSlide = idx;
      updateCarousel();
    });
  });
  
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, 8000);
  
  // Touch support
  let startX = 0;
  carousel.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
  carousel.addEventListener('touchend', (e) => {
    const diffX = startX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      currentSlide = diffX > 0 ? (currentSlide + 1) % totalSlides : (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }
  });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });
}

// Scroll Animations
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Contact Form
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Sending...';
    submitBtn.disabled = true;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showNotification('Message sent successfully!', 'success');
      form.reset();
    } catch {
      showNotification('Failed to send message.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Notification System
function showNotification(message, type = 'info', duration = 5000) {
  const notification = document.createElement('div');
  const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500' };
  notification.className = `notification ${colors[type]} text-white p-4 rounded-lg shadow-lg flex items-center gap-3`;
  notification.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()">X</button>`;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => notification.remove(), duration);
}

// Resume Download
function downloadResume() {
  const a = document.createElement('a');
  a.href = 'resources/records/S-Phakoe-CV.pdf';
  a.download = 'S-Phakoe-CV.pdf';
  a.click();
  showNotification('CV downloaded!', 'success');
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initializeDarkMode();
  initializeMobileMenu();
  initializeSkillsChart();
  initializeCarousel();
  initializeSmoothScrolling();
  initializeScrollAnimations();
  initializeContactForm();
  const embedSuccess = PDFObject.embed('resources/records/S-Phakoe-CV.pdf', '#resume-container');
  if (!embedSuccess) {
    document.getElementById('resume-container').innerHTML = '<p>Failed to load PDF. Please download it instead.</p>';
  }
});

// Resize Handler
window.addEventListener('resize', () => {
  if (skillsChart) skillsChart.resize();
});

// Global Functions
window.downloadResume = downloadResume;
window.showNotification = showNotification;