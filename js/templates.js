document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Load all templates
    loadAllTemplates();
    
    // Set up filter functionality
    setupFilters();
});

// Template data
const templates = [
    {
        id: "modern",
        name: "Modern",
        description: "Clean and professional with a modern touch",
        category: "Professional",
        popular: true,
         overlayImage: "Prof.webp"
    },
    {
        id: "classic",
        name: "Classic",
        description: "Traditional layout for corporate environments",
        category: "Professional",
        popular: false,
         overlayImage: "Tech.webp"
    },
    {
        id: "creative",
        name: "Creative",
        description: "Stand out with a unique design for creative fields",
        category: "Creative",
        popular: true,
         overlayImage: "Creative.webp"
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Simple and elegant with focus on content",
        category: "Professional",
        popular: false,
         overlayImage: "Student.webp"
    },
    {
        id: "executive",
        name: "Executive",
        description: "Sophisticated design for senior positions",
        category: "Professional",
        popular: false,
        overlayImage: "Dummyimage.webp"
    },
    {
        id: "tech",
        name: "Tech",
        description: "Optimized for technical roles and skills",
        category: "Technical",
        popular: true,
        overlayImage: "Tech.webp"
    },
    {
        id: "academic",
        name: "Academic",
        description: "Ideal for academic and research positions",
        category: "Academic",
        popular: false,
        overlayImage: "Student.webp"
    },
    {
        id: "startup",
        name: "Startup",
        description: "Modern design for innovative companies",
        category: "Creative",
        popular: false,
         overlayImage: "Dummyimage.webp"
    },
    {
        id: "professional",
        name: "Professional",
        description: "Balanced design for most industries",
        category: "Professional",
        popular: true,
        overlayImage: "Tech.webp"
    }
];

// Load all templates
function loadAllTemplates() {
    const templatesGrid = document.getElementById('templates-grid');
    if (!templatesGrid) return;
    
    renderTemplates(templates, templatesGrid);
}

// Render templates to the grid
function renderTemplates(templatesArray, container) {
    let templatesHTML = '';
    
    if (templatesArray.length === 0) {
        container.innerHTML = '<p class="no-results">No templates found matching your criteria.</p>';
        return;
    }
    
    templatesArray.forEach(template => {
        templatesHTML += `
            <div class="template-card" data-category="${template.category}" data-popular="${template.popular}">
                ${template.popular ? '<div class="popular-badge">Popular</div>' : ''}
                <div class="template-image">
                  
                </div>
                <div class="template-overlay">
                 <img src="${template.overlayImage}" alt="${template.name} overlay" class="overlay-image">
                    <div class="template-overlay-buttons">
                        <a href="template-details.html?id=${template.id}" class="secondary-btn">Preview</a>
                        <a href="template-download.html?id=${template.id}" class="secondary-btn">Download</a>
                    </div>
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <span class="template-category">${template.category}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = templatesHTML;
}

// Set up filter functionality
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const templatesGrid = document.getElementById('templates-grid');
    
    if (!categoryFilter || !sortFilter || !templatesGrid) return;
    
    // Apply filters when changed
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    function applyFilters() {
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;
        
        // Filter templates by category
        let filteredTemplates = templates;
        if (category !== 'all') {
            filteredTemplates = templates.filter(template => template.category === category);
        }
        
        // Sort templates
        filteredTemplates = sortTemplates(filteredTemplates, sortBy);
        
        // Render filtered and sorted templates
        renderTemplates(filteredTemplates, templatesGrid);
    }
    
    function sortTemplates(templatesArray, sortBy) {
        const sortedTemplates = [...templatesArray];
        
        switch (sortBy) {
            case 'popular':
                return sortedTemplates.sort((a, b) => b.popular - a.popular);
            case 'newest':
                // In a real app, you would sort by date added
                return sortedTemplates.reverse();
            case 'name':
                return sortedTemplates.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sortedTemplates;
        }
    }
}