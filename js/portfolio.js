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
  const ctx = document.getElementById('skillsChart')?.getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'radar',
      data: { labels: ['Python','C++','Probability','Data Science','AI/ML'], datasets: [{ label:'Skills', data:[80,70,85,60,50], fill:true }] },
      options: { maintainAspectRatio:false, scales:{r:{beginAtZero:true,max:100}} }
    });
  }
  
  // Mobile menu
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  if (window.innerWidth <= 768) navMenu.classList.remove('active');
  menuButton?.addEventListener('click', () => navMenu.classList.toggle('active'));
  
  // Modals
  document.querySelectorAll('.open-modal').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.modal)?.classList.remove('hidden');
  }));
  document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => {
    btn.closest('.modal')?.classList.add('hidden');
  }));
  
  // PDF resume
  const pdfContainer = document.getElementById('resume-container');
  if (pdfContainer) {
    const path = 'resources/S-Phakoe-CV.pdf';
    if (!PDFObject.embed(path, pdfContainer))
      pdfContainer.innerHTML = `<p>Failed to load resume. <a href="${path}">Download instead</a>.</p>`;
    const adjust = () => { pdfContainer.style.height = window.innerWidth<768?'70vh':'85vh'; };
    window.addEventListener('resize', adjust); adjust();
  }