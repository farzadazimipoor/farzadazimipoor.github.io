// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Load projects dynamically
fetch("../../data/projects.json")
  .then(res => res.json())
  .then(projects => {
    const grid = document.getElementById("projectGrid");
    grid.innerHTML = projects.map(p => `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top" alt="${p.title}">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text">${p.description}</p>
            <div>
              ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-outline-dark btn-sm"><i class="fa-brands fa-github"></i> Code</a>` : ""}
              ${p.link ? `<a href="${p.link}" target="_blank" class="btn btn-success btn-sm"><i class="fa-brands fa-google-play"></i> Play</a>` : ""}
            </div>
          </div>
        </div>
      </div>
    `).join("");
  });
