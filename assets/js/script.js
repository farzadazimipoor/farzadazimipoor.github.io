// Dynamic year with error handling
try {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
} catch (error) {
  console.error('Error setting year:', error);
}

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate inputs
    if (!name || !email || !message) {
      showMessage('Please fill in all fields.', 'danger');
      return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:farzad.azimipoor@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showMessage('Thank you! Your email client should open with the message.', 'success');
    
    // Reset form
    this.reset();
  });
}

// Helper function for showing messages
function showMessage(text, type) {
  const messageDiv = document.getElementById('formMessage');
  if (messageDiv) {
    messageDiv.innerHTML = `<div class="alert alert-${type}">${escapeHtml(text)}</div>`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  }
}

// Load projects dynamically with security improvements
function loadProjects() {
  fetch("data/projects.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(projects => {
      const grid = document.getElementById("projectGrid");
      if (!grid || !Array.isArray(projects)) return;
      
      // Create projects using DOM methods instead of innerHTML
      grid.innerHTML = ''; // Clear existing content
      
      projects.forEach(project => {
        const projectCard = createProjectCard(project);
        grid.appendChild(projectCard);
      });
    })
    .catch(err => {
      console.error('Failed to load projects:', err);
      const grid = document.getElementById("projectGrid");
      if (grid) {
        grid.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Projects will be available soon.</p></div>';
      }
    });
}

// Create project card using DOM methods for security
function createProjectCard(project) {
  const col = document.createElement('div');
  col.className = 'col-md-4';
  
  const card = document.createElement('div');
  card.className = 'card h-100 shadow-sm';
  
  const img = document.createElement('img');
  img.src = project.image || '';
  img.className = 'card-img-top';
  img.alt = project.title || '';
  img.onerror = function() {
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  };
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  
  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = project.title || '';
  
  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = project.description || '';
  
  const buttonContainer = document.createElement('div');
  
  if (project.github) {
    const githubBtn = document.createElement('a');
    githubBtn.href = project.github;
    githubBtn.target = '_blank';
    githubBtn.rel = 'noopener noreferrer';
    githubBtn.className = 'btn btn-outline-dark btn-sm me-2';
    githubBtn.innerHTML = '<i class="fa-brands fa-github"></i> Code';
    buttonContainer.appendChild(githubBtn);
  }
  
  if (project.link) {
    const playBtn = document.createElement('a');
    playBtn.href = project.link;
    playBtn.target = '_blank';
    playBtn.rel = 'noopener noreferrer';
    playBtn.className = 'btn btn-success btn-sm';
    playBtn.innerHTML = '<i class="fa-brands fa-google-play"></i> Play';
    buttonContainer.appendChild(playBtn);
  }
  
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(buttonContainer);
  
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);
  
  return col;
}

// HTML escape function to prevent XSS
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Scroll animations with performance optimization
let observer;

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Stop observing once animated to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and timeline items
  const sections = document.querySelectorAll('.animate-on-scroll');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  sections.forEach(section => observer.observe(section));
  timelineItems.forEach(item => observer.observe(item));
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.checked = savedTheme === 'dark';
  
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      const newTheme = themeToggle.checked ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}



// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  loadProjects();
  initThemeToggle();
});
