// Enhanced Portfolio JavaScript - All Functions Working

let currentSlide = 0;
let skillsChart = null;

// Dark Mode Toggle
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunIcon = darkModeToggle.querySelector('.sun-icon');
  const moonIcon = darkModeToggle.querySelector('.moon-icon');
  
  // Check for saved theme preference or default to system preference
  const currentTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply initial theme
  applyTheme(currentTheme);
  
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
    
    // Update chart if it exists
    if (skillsChart) {
      updateChartTheme(theme === 'dark');
    }
  }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('.nav-menu');
  const hamburgerIcon = mobileMenuToggle.querySelector('.hamburger-icon');
  const closeIcon = mobileMenuToggle.querySelector('.close-icon');
  
  mobileMenuToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
      navMenu.classList.remove('active');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      navMenu.classList.add('active');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });
  
  // Close menu when clicking on nav links
  navMenu.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      navMenu.classList.remove('active');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
      }
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
      labels: [
        'Python',
        'Machine Learning',
        'TensorFlow/Keras',
        'Data Analysis',
        'Solar PV Systems',
        'Web Development',
        'Mathematics',
        'Statistical Analysis'
      ],
      datasets: [{
        label: 'Proficiency Level (%)',
        data: [95, 88, 85, 90, 80, 82, 85, 87],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointHoverBorderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: isDark ? '#f9fafb' : '#374151',
            padding: 20,
            font: {
              size: 12,
              family: "'Inter', sans-serif"
            }
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          titleColor: isDark ? '#f9fafb' : '#374151',
          bodyColor: isDark ? '#f9fafb' : '#374151',
          borderColor: isDark ? '#4b5563' : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed.r}%`;
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            stepSize: 25,
            color: isDark ? '#9ca3af' : '#6b7280',
            backdropColor: 'transparent',
            font: { 
              size: 10,
              family: "'Inter', sans-serif"
            }
          },
          grid: {
            color: isDark ? '#374151' : '#e5e7eb'
          },
          angleLines: {
            color: isDark ? '#374151' : '#e5e7eb'
          },
          pointLabels: {
            color: isDark ? '#f9fafb' : '#374151',
            font: {
              size: 11,
              family: "'Inter', sans-serif"
            }
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
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
  skillsChart.options.plugins.tooltip.titleColor = textColor;
  skillsChart.options.plugins.tooltip.bodyColor = textColor;
  skillsChart.options.plugins.tooltip.borderColor = gridColor;
  
  skillsChart.options.scales.r.ticks.color = isDark ? '#9ca3af' : '#6b7280';
  skillsChart.options.scales.r.grid.color = gridColor;
  skillsChart.options.scales.r.angleLines.color = gridColor;
  skillsChart.options.scales.r.pointLabels.color = textColor;
  
  skillsChart.update('none');
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
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        indicator.classList.add('bg-blue-600');
      } else {
        indicator.classList.remove('bg-blue-600');
        indicator.classList.add('bg-gray-300', 'dark:bg-gray-600');
      }
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
  
  // Auto-advance carousel every 8 seconds
  setInterval(nextSlide, 8000);
  
  // Touch/swipe support
  let startX = 0;
  let endX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  carousel.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });
  
  carousel.addEventListener('touchend', () => {
    const diffX = startX - endX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
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
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll Animations
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Contact Form
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
      <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
    } catch (error) {
      showNotification('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Notification System
function showNotification(message, type = 'info', duration = 5000) {
  // Remove existing notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());
  
  const notification = document.createElement('div');
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };
  
  const icons = {
    success: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>`,
    error: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>`,
    info: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`
  };
  
  notification.className = `notification ${colors[type]} text-white p-4 rounded-lg shadow-xl flex items-center gap-3`;
  notification.innerHTML = `
    ${icons[type]}
    <span class="flex-1">${message}</span>
    <button onclick="this.parentElement.remove()" class="text-white/80 hover:text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Auto remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Resume Download Function
function downloadResume() {
  // Create comprehensive CV content based on the provided CV data
  const cvContent = `SELLO PHAKOE - CURRICULUM VITAE
Data Scientist & AI/ML Engineer

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Address: 69 Ulondolozo Street, Mailula Park, Vosloorus
Phone: 073 125 0723
Email: u13238940@tuks.co.za
LinkedIn: linkedin.com/in/sello-phakoe-8375b6107
GitHub: github.com/SelloP28

PROFESSIONAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A highly motivated student in Applied Mathematics & Computer Science with a background in 
Physics and Electrical Engineering. Passionate about applying software development, machine 
learning, and artificial intelligence to optimize photovoltaic (PV) systems and renewable 
energy solutions. Seeking entry-level software development roles in solar PV technology, 
focusing on data analysis, system modeling, and energy optimization tools.

EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bachelor of Science - BSc Applied Mathematics and Computer Science (In-progress)
University of South Africa (UNISA) | Expected Graduation: 2028 | Pretoria
Relevant coursework passed:
• Differential Equations (APM2611)
• Applied Dynamical Systems (APM2614)
• Multivariable Calculus (MAT2615)
• Applied Linear Algebra (APM1513)

Bachelor of Science - BSc in Physics (Incomplete)
University of Pretoria | 2021 | Pretoria | Minor in Applied Mathematics
• Completed coursework in advanced mathematics, programming, and physics
• Achieved distinction in Mathematical Modeling (WTW152) with 76% pass
Relevant modules passed:
• Numerical Analysis (WTW123)
• Mathematical Modeling (WTW152)
• Imperative Programming (COS132)
• Waves, Thermodynamics & Modern Physics (PHY255)

N3 & N4: Electrical Engineering (Light Current)
Damelin - Boksburg Campus | 2013 | Boksburg
Subjects Taken:
• Electrotechnics - Industrial Electronics
• Engineering Science - Mathematics

Matric
Germiston High School | Germiston | 2012

TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Programming Languages: Python, C++, C#, R, Octave/Matlab
Data Science & ML: Pandas, NumPy, Scikit-learn, TensorFlow/Keras, PyTorch, Matplotlib, 
                   Kaggle, Jupyter Notebooks, Google Colab, SciPy
Web Development & Tools: Node.js, Django, React, Git/GitHub, HTML, CSS, JavaScript
Mathematical Expertise: Probability & Statistics, Calculus, Linear Algebra, Applied 
                        Mathematics, Differential Equations, Numerical Methods
Languages: English (fluent), Sesotho (Native), IsiZulu (Conversational), Afrikaans (Basic)
Soft Skills: Teamwork, Communication

PROFESSIONAL EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Software Developer (Co-founder)
Moon Core Digital | August 2023 – March 2025 | Germiston
• Co-founded a tech start-up specializing in website development, 3D modeling, and 
  digital marketing solutions
• Involved in end-to-end project development, from client consultation to deployment, 
  delivering custom digital solutions tailored to diverse industries
• Managed a cross-functional team, fostering collaboration and ensuring high-quality 
  deliverables within deadlines
• Engineered scalable web applications using React and Node.js, providing users with 
  seamless experiences

Web Developer
Zosi Group | August 2023 - November 2023 | Alrode
• Collaborated on the design and development of Zosi Group's corporate website, 
  enhancing its functionality and user experience
• Implemented responsive web designs using HTML, CSS, and JavaScript, ensuring seamless 
  performance across devices
• Conducted rigorous testing and debugging to ensure a secure, user-friendly platform

TECHNICAL PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Solar Panel Performance Prediction using Artificial Neural Networks (ANN)
Technologies: Python, TensorFlow/Keras, Pandas, Matplotlib
• Developed a machine learning model in Python (TensorFlow/Keras) to predict Maximum 
  Power Point Tracking (MPPT) voltage and power for solar panels based on environmental 
  factors like irradiance and temperature
• Performed data pre-processing with StandardScaler and utilized historical solar dataset 
  for training, achieving accurate predictions for PV system efficiency
• Created 3D visualizations using Matplotlib to illustrate power variations with voltage 
  and temperature, providing insights for renewable energy software optimization

Solar Energy Output Forecaster
Technologies: Python, Streamlit, TensorFlow, APIs
• Built a web-based tool for predicting solar PV energy output using ANN regression and 
  Forecast.Solar API
• Features user inputs for location and panel parameters, with Matplotlib visualizations 
  comparing ML and API forecasts
• Deployed on Streamlit Community Cloud, showcasing full-stack development for renewable 
  energy applications

PROFESSIONAL DEVELOPMENT & CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Solar PV GreenCard Programme (Completed)
Nepoworx | June 2025 - July 2025 | Riversands
• Qualified in August 2025 with comprehensive training in solar PV system design, 
  installations, component functionality (panels, inverters, batteries), and SHE 
  (Safety, Health, and Environment) standards for solar projects

CERTIFICATIONS:
• Introduction to Machine Learning | Kaggle | 2025
• CS50: Introduction to Python Programming | Harvard Online | 2025

COURSEWORK:
• Introduction to Probability & Statistics - MIT-18.05 | MIT OpenCourseWare | 2025
• Fundamentals of Photovoltaics – MIT-2.627 (In-Progress) | MIT OpenCourseWare | 2025

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated: ${new Date().toLocaleDateString()} | Portfolio: sellop28.github.io
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  
  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Sello_Phakoe_CV_2025.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('CV downloaded successfully!', 'success');
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core functionality
  initializeDarkMode();
  initializeMobileMenu();
  initializeSkillsChart();
  initializeCarousel();
  initializeSmoothScrolling();
  initializeScrollAnimations();
  initializeContactForm();
  
  // Add loading animation
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  console.log('🚀 Portfolio loaded successfully with all features working!');
});

// Handle window resize
window.addEventListener('resize', () => {
  if (skillsChart) {
    skillsChart.resize();
  }
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && skillsChart) {
    skillsChart.update();
  }
});

// Expose functions globally for HTML onclick handlers
window.downloadResume = downloadResume;
window.showNotification = showNotification;