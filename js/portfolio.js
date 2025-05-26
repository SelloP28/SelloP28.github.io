// Dark mode toggle with persistence
function toggleDarkMode() {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6;
    const pref = localStorage.getItem('darkMode');
    if (pref === 'enabled') document.documentElement.classList.add('dark');
    else if (pref === 'disabled') document.documentElement.classList.remove('dark');
    else isNight ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  }
  toggleDarkMode(); setInterval(toggleDarkMode, 3600000);
  
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  }));
  
  // Skills radar chart
  const skillsChartCtx = document.getElementById('skillsChart');
    if (skillsChartCtx) {
        new Chart(skillsChartCtx, {
            type: 'radar',
            data: {
                labels: ['Python', 'C++', 'R', 'Machine Learning', 'Data Analysis', 'Statistics', 'Algorithms'],
                datasets: [{
                    label: 'Proficiency',
                    data: [90, 75, 70, 85, 70, 80, 70], // Example data, adjust as needed
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            backdropColor: 'transparent' // For dark mode readability
                        },
                        pointLabels: {
                             font: {
                                size: 14 // Adjust as needed
                            }
                        }
                    }
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                             font: {
                                size: 14 // Adjust as needed
                            }
                        }
                    }
                }
            }
        });
    }

  
  // Mobile menu
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  if (window.innerWidth <= 768) navMenu.classList.remove('active');
  menuButton?.addEventListener('click', () => navMenu.classList.toggle('active'));
  
// Adjust chart responsiveness
const resizeChart = () => {
  const chart = Chart.getChart('skillsChart');
  if (chart) {
      const aspectRatio = window.innerWidth < 768 ? 1 : 2;
      chart.options.aspectRatio = aspectRatio;
      chart.update();
  }
};
window.addEventListener('resize', resizeChart);
resizeChart();

// Modal open/close functionality
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', function () {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('hidden');
  });
});
document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', function () {
      const modal = this.closest('.fixed');
      if (modal) modal.classList.add('hidden');
  });
});

// Improve modal responsiveness
document.querySelectorAll('.modal-content').forEach(modal => {
  modal.style.maxHeight = '90vh';
  modal.style.overflowY = 'auto';
});

// Touch-friendly event handling for modals
document.addEventListener('touchstart', function(e) {
  if (e.target.classList.contains('modal')) {
      e.target.classList.add('hidden');
  }
});

  // PDF resume
  const resumeContainer = document.getElementById('resume-container');
  if (resumeContainer && typeof PDFObject !== 'undefined') {
      PDFObject.embed("resources/records/S-Phakoe-CV.pdf", "#resume-container", {
          pdfOpenParams: { view: 'FitH' },
          fallbackLink: "<p>This browser does not support embedded PDFs. Please <a href='resources/records/S-Phakoe-CV.pdf'>download the PDF</a> to view it.</p>"
      });
  }