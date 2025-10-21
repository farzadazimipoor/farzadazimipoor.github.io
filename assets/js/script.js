// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Create mailto link
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoLink = `mailto:farzad.azimipoor@gmail.com?subject=${subject}&body=${body}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Show success message
  const messageDiv = document.getElementById('formMessage');
  messageDiv.innerHTML = '<div class="alert alert-success">Thank you! Your email client should open with the message.</div>';
  messageDiv.style.display = 'block';
  
  // Reset form
  this.reset();
  
  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
});

// Load projects dynamically
fetch("data/projects.json")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(projects => {
    const grid = document.getElementById("projectGrid");
    if (!grid) return;
    
    grid.innerHTML = projects.map(p => {
      const title = escapeHtml(p.title || '');
      const description = escapeHtml(p.description || '');
      const image = escapeHtml(p.image || '');
      const github = p.github ? escapeHtml(p.github) : '';
      const link = p.link ? escapeHtml(p.link) : '';
      
      return `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img src="${image}" class="card-img-top" alt="${title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <div>
                ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm"><i class="fa-brands fa-github"></i> Code</a>` : ""}
                ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="btn btn-success btn-sm"><i class="fa-brands fa-google-play"></i> Play</a>` : ""}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  })
  .catch(err => {
    console.error('Failed to load projects:', err);
    const grid = document.getElementById("projectGrid");
    if (grid) {
      grid.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Projects will be available soon.</p></div>';
    }
  });

// HTML escape function to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all sections and timeline items
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.animate-on-scroll');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  sections.forEach(section => observer.observe(section));
  timelineItems.forEach(item => observer.observe(item));
});
