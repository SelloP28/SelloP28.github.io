// Enhanced Portfolio JavaScript - Professional & Interactive

// Dark mode functionality with proper theme management
function setupDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Get initial theme preference
  const getInitialTheme = () => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'enabled') return true;
    if (stored === 'disabled') return false;
    return prefersDark.matches;
  };

  // Apply theme to document and update UI elements
  const applyTheme = (isDark) => {
    const html = document.documentElement;
    
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Update chart theme if chart exists
    updateChartTheme(isDark);
    
    // Update toggle button icons
    updateToggleIcons(isDark);
    
    // Store preference
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  };

  // Update toggle button icons
  const updateToggleIcons = (isDark) => {
    const lightIcon = darkModeToggle?.querySelector('.light-icon');
    const darkIcon = darkModeToggle?.querySelector('.dark-icon');
    
    if (lightIcon && darkIcon) {
      if (isDark) {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      } else {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      }
    }
  };

  // Initialize theme
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Toggle handler with smooth transition
  darkModeToggle?.addEventListener('click', () => {
    const currentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = !currentlyDark;
    
    // Add transition class
    document.documentElement.style.transition = 'all 0.3s ease';
    
    applyTheme(newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
    
    // Add button press effect
    darkModeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      darkModeToggle.style.transform = '';
    }, 150);
  });

  // System preference change handler
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
      applyTheme(e.matches);
    }
  });
}

// Enhanced smooth scrolling with offset calculation
function setupSmoothScrolling() {
  const getHeaderOffset = () => {
    const header = document.querySelector('header');
    return header ? header.offsetHeight + 20 : 80;
  };
  
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - getHeaderOffset();
        
        // Add active state to nav link
        updateActiveNavLink(targetId);
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('text-blue-600', 'dark:text-blue-400');
    
    if (link.getAttribute('href') === targetId) {
      link.classList.add('text-blue-600', 'dark:text-blue-400');
    }
  });
}

// Intersection Observer for scroll-based navigation highlighting
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        
        navLinks.forEach(link => {
          link.classList.remove('text-blue-600', 'dark:text-blue-400');
          
          if (link.getAttribute('href') === id) {
            link.classList.add('text-blue-600', 'dark:text-blue-400');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0.1
  });
  
  sections.forEach(section => observer.observe(section));
}

// Enhanced mobile menu with animation
function setupMobileMenu() {
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuButton || !navMenu) return;

  // Create hamburger to X animation
  const updateMenuIcon = (isOpen) => {
    const svg = menuButton.querySelector('svg');
    const path = svg.querySelector('path');
    
    if (isOpen) {
      path.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      menuButton.setAttribute('aria-label', 'Close menu');
    } else {
      path.setAttribute('d', 'M4 6h16M4 12h16m-16 6h16');
      menuButton.setAttribute('aria-label', 'Open menu');
    }
  };

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  function openMobileMenu() {
    navMenu.classList.add('active');
    menuButton.setAttribute('aria-expanded', 'true');
    updateMenuIcon(true);
    document.body.style.overflow = 'hidden';
    
    // Add staggered animation to menu items
    const menuItems = navMenu.querySelectorAll('a');
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  function closeMobileMenu() {
    navMenu.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    updateMenuIcon(false);
    document.body.style.overflow = '';
    
    // Reset menu item styles
    const menuItems = navMenu.querySelectorAll('a');
    menuItems.forEach(item => {
      item.style.transition = '';
      item.style.opacity = '';
      item.style.transform = '';
    });
  }

  // Expose functions globally for use in other parts
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
}

// Enhanced modal system with animations
function setupModals() {
  // Open modal handlers
  document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = button.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Close modal handlers
  document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(button.closest('.modal'));
    });
  });

  // Close on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal:not(.hidden)');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Add opening animation
  const modalContent = modal.querySelector('> div');
  if (modalContent) {
    modalContent.style.transform = 'scale(0.95) translateY(20px)';
    modalContent.style.opacity = '0';
    
    requestAnimationFrame(() => {
      modalContent.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      modalContent.style.transform = 'scale(1) translateY(0)';
      modalContent.style.opacity = '1';
    });
  }
  
  // Embed PDF if needed
  const pdfContainer = modal.querySelector('.pdf-container');
  if (pdfContainer && !pdfContainer.querySelector('iframe, object, embed')) {
    embedModalPDF(modal);
  }
}

function closeModal(modal) {
  if (!modal) return;
  
  const modalContent = modal.querySelector('> div');
  if (modalContent) {
    modalContent.style.transition = 'all 0.2s ease-out';
    modalContent.style.transform = 'scale(0.95) translateY(20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      
      // Reset styles
      modalContent.style.transition = '';
      modalContent.style.transform = '';
      modalContent.style.opacity = '';
    }, 200);
  } else {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Enhanced skills chart with better animations and responsiveness
let skillsChart = null;

function setupSkillsChart() {
  const ctx = document.getElementById('skillsChart');
  if (!ctx) return;

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#f9fafb' : '#374151';
  const gridColor = isDark ? '#4b5563' : '#e5e7eb';

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
        label: 'Proficiency Level',
        data: [95, 88, 85, 90, 80, 82, 85, 87],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
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
            color: textColor,
            padding: 20,
            font: {
              size: 14,
              family: "'Inter', system-ui, sans-serif",
              weight: '500'
            }
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: gridColor,
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
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
            color: textColor,
            backdropColor: 'transparent',
            font: { 
              size: 12,
              family: "'Inter', system-ui, sans-serif"
            }
          },
          grid: {
            color: gridColor,
            lineWidth: 1
          },
          angleLines: {
            color: gridColor,
            lineWidth: 1
          },
          pointLabels: {
            color: textColor,
            font: {
              size: 13,
              family: "'Inter', system-ui, sans-serif",
              weight: '500'
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      interaction: {
        intersect: false,
        mode: 'point'
      }
    }
  });
}

function updateChartTheme(isDark) {
  if (!skillsChart) return;

  const textColor = isDark ? '#f9fafb' : '#374151';
  const gridColor = isDark ? '#4b5563' : '#e5e7eb';

  // Update chart colors
  skillsChart.options.plugins.legend.labels.color = textColor;
  skillsChart.options.plugins.tooltip.backgroundColor = isDark ? '#1f2937' : '#ffffff';
  skillsChart.options.plugins.tooltip.titleColor = textColor;
  skillsChart.options.plugins.tooltip.bodyColor = textColor;
  skillsChart.options.plugins.tooltip.borderColor = gridColor;
  
  skillsChart.options.scales.r.ticks.color = textColor;
  skillsChart.options.scales.r.grid.color = gridColor;
  skillsChart.options.scales.r.angleLines.color = gridColor;
  skillsChart.options.scales.r.pointLabels.color = textColor;

  skillsChart.update('none');
}

// Enhanced PDF embedding with better error handling
function setupPDFEmbeds() {
  const resumeContainer = document.getElementById('resume-container');
  if (resumeContainer && typeof PDFObject !== 'undefined') {
    embedPDF(resumeContainer, 'S-Phakoe-CV-UPDATED.pdf');
  }
}

function embedPDF(container, pdfPath) {
  const options = {
    pdfOpenParams: { 
      view: 'FitH',
      toolbar: 1,
      navpanes: 0,
      scrollbar: 1,
      page: 1
    },
    suppressConsole: true,
    fallbackLink: `
      <div class="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 dark:bg-gray-700 rounded-xl">
        <svg class="w-20 h-20 mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Unable to display PDF</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Your browser doesn't support embedded PDFs</p>
        <a href="${pdfPath}" target="_blank" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Open PDF in New Tab
        </a>
      </div>
    `
  };

  try {
    const targetSelector = container.id ? `#${container.id}` : container;
    const success = PDFObject.embed(pdfPath, targetSelector, options);
    
    if (!success) {
      container.innerHTML = options.fallbackLink;
    }
  } catch (error) {
    console.warn('PDF embedding failed:', error);
    container.innerHTML = options.fallbackLink;
  }
}

function embedModalPDF(modal) {
  const modalId = modal.id;
  const pdfPaths = {
    'academic-record-unisa': 'resources/records/Unisa Academic Record.pdf',
    'academic-record-up': 'resources/records/UP_ACAD_RCD.pdf'
  };

  const pdfPath = pdfPaths[modalId];
  if (pdfPath) {
    const pdfContainer = modal.querySelector('.pdf-container');
    if (pdfContainer) {
      embedPDF(pdfContainer, pdfPath);
    }
  }
}

// Enhanced contact form with validation and feedback
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Add real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      showNotification('Please correct the errors in the form.', 'error');
      return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = `
      <svg class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual endpoint)
      await simulateFormSubmission(new FormData(form));
      
      // Success feedback
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
      // Add success animation to form
      form.classList.add('animate-pulse');
      setTimeout(() => form.classList.remove('animate-pulse'), 1000);
      
    } catch (error) {
      showNotification('Failed to send message. Please try again or contact me directly.', 'error');
      console.error('Form submission error:', error);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';

  // Remove existing error styling
  clearFieldError(field);

  // Required field validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = 'This field is required.';
    isValid = false;
  }

  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address.';
      isValid = false;
    }
  }

  // Name validation
  if (field.name === 'name' && value) {
    if (value.length < 2) {
      errorMessage = 'Name must be at least 2 characters long.';
      isValid = false;
    }
  }

  // Message validation
  if (field.name === 'message' && value) {
    if (value.length < 10) {
      errorMessage = 'Message must be at least 10 characters long.';
      isValid = false;
    }
  }

  // Show error if validation failed
  if (!isValid) {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('border-red-500', 'dark:border-red-400');
  
  // Create or update error message
  let errorDiv = field.parentNode.querySelector('.error-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 dark:text-red-400 text-sm mt-1';
    field.parentNode.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove('border-red-500', 'dark:border-red-400');
  
  const errorDiv = field.parentNode.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

async function simulateFormSubmission(formData) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Simulate occasional failure for testing
  if (Math.random() < 0.1) {
    throw new Error('Network error');
  }
  
  // Log form data (replace with actual submission)
  console.log('Form submitted:', Object.fromEntries(formData));
}

// Enhanced notification system with better styling and animations
function showNotification(message, type = 'info', duration = 5000) {
  // Remove existing notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());
  
  const notification = document.createElement('div');
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
  
  const colors = {
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    info: 'bg-blue-500 border-blue-400'
  };
  
  notification.className = `
    notification fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl max-w-sm
    ${colors[type]} text-white border-l-4
    transform translate-x-full transition-all duration-300 ease-out
  `;
  
  notification.innerHTML = `
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0 mt-0.5">
        ${icons[type]}
      </div>
      <div class="flex-1">
        <p class="font-medium">${message}</p>
      </div>
      <button class="flex-shrink-0 ml-2 text-white/80 hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;

  document.body.appendChild(notification);
  
  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
  });
  
  // Auto remove after duration
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Scroll animations using Intersection Observer
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

// Carousel functionality
function setupCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const inner = carousel.querySelector('.carousel-inner');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const items = inner.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    inner.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

  // Swipe support for mobile
  let startX = 0;
  let endX = 0;

  inner.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  inner.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling while swiping
    endX = e.touches[0].clientX;
  });

  inner.addEventListener('touchend', () => {
    if (startX - endX > 50) {
      showSlide(currentIndex + 1);
    } else if (endX - startX > 50) {
      showSlide(currentIndex - 1);
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Core functionality
  setupDarkMode();
  setupSmoothScrolling();
  setupScrollSpy();
  setupMobileMenu();
  setupModals();
  
  // Charts and visualizations
  setupSkillsChart();
  
  // PDF handling
  setupPDFEmbeds();
  
  // Form handling
  setupContactForm();
  
  // Animations
  setupScrollAnimations();
  
  // Carousel
  setupCarousel();
  
  // Add loading complete class for CSS animations
  document.body.classList.add('loaded');
  
  console.log('🚀 Portfolio loaded successfully!');
});

// Handle resize events
window.addEventListener('resize', () => {
  if (skillsChart) {
    skillsChart.resize();
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && skillsChart) {
    skillsChart.update();
  }
});