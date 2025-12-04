// State
let currentSlide = 0;
let skillsChart = null;
const particles = [];

// Dark Mode
function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  const sunIcon = toggle.querySelector('.sun-icon');
  const moonIcon = toggle.querySelector('.moon-icon');
  
  const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (theme === 'dark') {
    html.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
  
  toggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (skillsChart) updateChartTheme(isDark);
  });
}

// Scroll Progress
function initScrollProgress() {
  const progress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrolled + '%';
  });
}

// Loading Screen
function hideLoadingScreen() {
  const loading = document.getElementById('loadingScreen');
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 1000);
}

// Particles Animation
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = document.documentElement.classList.contains('dark') 
        ? 'rgba(147, 197, 253, 0.5)' 
        : 'rgba(59, 130, 246, 0.3)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Skills Chart
function initSkillsChart() {
  const ctx = document.getElementById('skillsChart');
  if (!ctx) return;
  
  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#f9fafb' : '#374151';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  
  skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Python', 'ML', 'TensorFlow', 'Data Analysis', 'Solar PV', 'Web Dev', 'Math', 'Stats'],
      datasets: [{
        label: 'Proficiency (%)',
        data: [95, 88, 85, 90, 80, 82, 85, 87],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor, font: { size: 11 } }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 25, color: textColor, backdropColor: 'transparent' },
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          pointLabels: { color: textColor, font: { size: 10 } }
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
  skillsChart.options.scales.r.ticks.color = textColor;
  skillsChart.options.scales.r.grid.color = gridColor;
  skillsChart.options.scales.r.angleLines.color = gridColor;
  skillsChart.options.scales.r.pointLabels.color = textColor;
  skillsChart.update('none');
}

// Carousel
function initCarousel() {
  const carousel = document.getElementById('projectCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const slides = carousel.querySelectorAll('.carousel-slide');
  
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsContainer.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    updateCarousel();
  }
  
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  
  // Auto-advance
  setInterval(() => goToSlide(currentSlide + 1), 6000);
  
  // Touch support
  let startX = 0;
  carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  carousel.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(currentSlide + (diff > 0 ? 1 : -1));
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Message sent! I\'ll get back to you soon.');
    form.reset();
    
    btn.textContent = originalText;
    btn.disabled = false;
  });
}

// Mobile Menu
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('nav');
  
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
  
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initScrollProgress();
  initParticles();
  initSkillsChart();
  initCarousel();
  initSmoothScroll();
  initScrollAnimations();
  initContactForm();
  initMobileMenu();
  hideLoadingScreen();
});

window.addEventListener('resize', () => {
  if (skillsChart) skillsChart.resize();
});