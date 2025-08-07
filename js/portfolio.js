// Professional Portfolio JavaScript - Clean & Minimal

// Dark mode toggle with persistence
function setupDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Get initial theme
  const getInitialTheme = () => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'enabled') return true;
    if (stored === 'disabled') return false;
    return prefersDark.matches;
  };

  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    updateChartTheme(isDark);
    
    // Update toggle icon
    const icon = darkModeToggle?.querySelector('svg path');
    if (icon) {
      icon.setAttribute('d', isDark ? 
        'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' :
        'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
      );
    }
  };

  // Initial setup
  applyTheme(getInitialTheme());

  // Toggle handler
  darkModeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    applyTheme(isDark);
  });

  // System preference change
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
      applyTheme(e.matches);
    }
  });
}

// Smooth scrolling navigation
function setupSmoothScrolling() {
  const offset = 80; // Header height
  
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Mobile menu functionality
function setupMobileMenu() {
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuButton || !navMenu) return;

  menuButton.addEventListener('click', () => {
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
}

function openMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuButton = document.querySelector('.menu-button');
  
  navMenu.classList.add('active');
  menuButton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuButton = document.querySelector('.menu-button');
  
  navMenu.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Modal system
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
  
  // Embed PDF if needed
  const pdfContainer = modal.querySelector('.pdf-container');
  if (pdfContainer && !pdfContainer.querySelector('iframe, object, embed')) {
    embedModalPDF(modal);
  }
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Skills chart with theme support
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
        'R Programming',
        'Data Analysis',
        'Statistics',
        'C++',
        'JavaScript',
        'Algorithms'
      ],
      datasets: [{
        label: 'Proficiency Level',
        data: [90, 80, 85, 85, 80, 75, 70, 75],
        backgroundColor: 'rgba(75, 85, 99, 0.1)',
        borderColor: 'rgba(75, 85, 99, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 85, 99, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
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
            padding: 15,
            font: {
              size: 13,
              family: "'Inter', system-ui, sans-serif"
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 25,
            color: textColor,
            backdropColor: 'transparent',
            font: { size: 11 }
          },
          grid: {
            color: gridColor
          },
          angleLines: {
            color: gridColor
          },
          pointLabels: {
            color: textColor,
            font: {
              size: 12,
              family: "'Inter', system-ui, sans-serif"
            }
          }
        }
      },
      animation: {
        duration: 1000
      }
    }
  });
}

function updateChartTheme(isDark) {
  if (!skillsChart) return;

  const textColor = isDark ? '#f9fafb' : '#374151';
  const gridColor = isDark ? '#4b5563' : '#e5e7eb';

  skillsChart.options.plugins.legend.labels.color = textColor;
  skillsChart.options.scales.r.ticks.color = textColor;
  skillsChart.options.scales.r.grid.color = gridColor;
  skillsChart.options.scales.r.angleLines.color = gridColor;
  skillsChart.options.scales.r.pointLabels.color = textColor;

  skillsChart.update();
}

// PDF embedding
function setupPDFEmbeds() {
  const resumeContainer = document.getElementById('resume-container');
  if (resumeContainer && typeof PDFObject !== 'undefined') {
    embedPDF(resumeContainer, 'resources/records/S-Phakoe-CV.pdf');
  }
}

function embedPDF(container, pdfPath) {
  const options = {
    pdfOpenParams: { 
      view: 'FitH',
      toolbar: 0
    },
    fallbackLink: `
      <div class="flex flex-col items-center justify-center h-full p-8 text-center">
        <svg class="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Unable to display PDF</p>
        <a href="${pdfPath}" target="_blank" class="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors">
          Open PDF
        </a>
      </div>
    `
  };

  try {
    const targetSelector = container.id ? `#${container.id}` : container;
    PDFObject.embed(pdfPath, targetSelector, options);
  } catch (error) {
    console.error('Error embedding PDF:', error);
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
    embedPDF(pdfContainer, pdfPath);
  }
}

// Contact form handling
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success feedback
      showNotification('Message sent successfully!', 'success');
      form.reset();
    } catch (error) {
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Simple notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `
    notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm
    ${type === 'success' ? 'bg-green-500 text-white' : ''}
    ${type === 'error' ? 'bg-red-500 text-white' : ''}
    ${type === 'info' ? 'bg-gray-500 text-white' : ''}
  `;
  
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <span>${message}</span>
      <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
        ×
      </button>
    </div>
  `;

  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => notification.remove(), 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupDarkMode();
  setupSmoothScrolling();
  setupMobileMenu();
  setupModals();
  setupSkillsChart();
  setupPDFEmbeds();
  setupContactForm();
});