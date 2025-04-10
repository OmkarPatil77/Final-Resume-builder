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
    
    // Load templates for homepage
    loadHomeTemplates();
    
    // Load testimonials
    loadTestimonials();
    
    // Handle newsletter form submission
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = ctaForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            }
        });
    }
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
    }
];

// Testimonial data
const testimonials = [
    {
        name: "Ganesh Zinjad",
        role: "Software Engineer",
        quote: "I landed my dream job at a top tech company after using ResumeBuilder. The templates are professional and the AI suggestions helped me highlight my skills perfectly."
    },
    {
        name: "Devesh Bhavsar",
        role: "Graphic Designer",
        quote: "As a creative professional, I needed a resume that showcased my personality while remaining professional. ResumeBuilder delivered exactly what I needed."
    },
    {
        name: "David Rogers",
        role: "Project Manager",
        quote: "The expert tips provided throughout the resume building process were invaluable. They helped me quantify my achievements in a way that really stood out."
    }
];

// Load templates for homepage
function loadHomeTemplates() {
    const templatesGrid = document.querySelector('.templates-grid');
    if (!templatesGrid) return;
    
    // Display only first 6 templates on homepage
    const homeTemplates = templates.slice(0, 6);
    
    let templatesHTML = '';
    homeTemplates.forEach(template => {
        templatesHTML += `
            <div class="template-card">
                ${template.popular ? '<div class="popular-badge">Popular</div>' : ''}
                <div class="template-image">
                    <img src="images/placeholder.png" alt="${template.name} template">
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
    
    templatesGrid.innerHTML = templatesHTML;
}

// Load testimonials
function loadTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;
    
    let testimonialsHTML = '';
    testimonials.forEach(testimonial => {
        const initials = testimonial.name.split(' ').map(n => n[0]).join('');
        
        testimonialsHTML += `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">
                        ${initials}
                    </div>
                    <div class="testimonial-info">
                        <h3>${testimonial.name}</h3>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
                <div class="testimonial-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <blockquote class="testimonial-quote">
                    "${testimonial.quote}"
                </blockquote>
            </div>
        `;
    });
    
    testimonialsGrid.innerHTML = testimonialsHTML;
}