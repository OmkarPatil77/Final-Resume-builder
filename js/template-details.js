document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Get template ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('id');
    
    if (templateId) {
        loadTemplateDetails(templateId);
    } else {
        // Redirect to templates page if no ID provided
        window.location.href = 'templates.html';
    }
    
    // Set up button links
    setupButtonLinks(templateId);
});

// Template data with features
const templates = [
    {
        id: "modern",
        name: "Modern",
        description: "Clean and professional with a modern touch",
        category: "Professional",
        image: "Prof.webp",
        features: [
            "Clean layout with modern typography",
            "Skill bars for visual representation",
            "Sidebar for contact information",
            "Timeline for work experience",
            "ATS-friendly structure"
        ]
    },
    {
        id: "classic",
        name: "Classic",
        description: "Traditional layout for corporate environments",
        category: "Professional",
        image: "Tech.webp",
        features: [
            "Traditional chronological format",
            "Professional header with contact details",
            "Clearly defined sections",
            "Bullet points for achievements",
            "Formal design suitable for conservative industries"
        ]
    },
    {
        id: "creative",
        name: "Creative",
        description: "Stand out with a unique design for creative fields",
        category: "Creative",
        image: "Creative.webp",
        features: [
            "Unique visual layout",
            "Color accents to highlight key information",
            "Custom sections for portfolio and projects",
            "Infographic elements for skills",
            "Personal branding elements"
        ]
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Simple and elegant with focus on content",
        category: "Professional",
        image: "Student.webp",
        features: [
            "Clean, distraction-free design",
            "Maximized content space",
            "Strategic use of whitespace",
            "Subtle typography hierarchy",
            "Focus on readability"
        ]
    },
    {
        id: "academic",
        name: "Academic",
        description: "Simple and elegant with focus on content",
        category: "Professional",
        image: "Student.webp",
        features: [
            "Clean, distraction-free design",
            "Maximized content space",
            "Strategic use of whitespace",
            "Subtle typography hierarchy",
            "Focus on readability"
        ]
    },
    {
        id: "executive",
        name: "Executive",
        description: "Simple and elegant with focus on content",
        category: "Professional",
        image: "Dummyimage.webp",
        features: [
            "Clean, distraction-free design",
            "Maximized content space",
            "Strategic use of whitespace",
            "Subtle typography hierarchy",
            "Focus on readability"
        ]
    },
    {
        id: "startup",
        name: "Startup",
        description: "Simple and elegant with focus on content",
        category: "Professional",
        image: "Prof.webp",
        features: [
            "Clean, distraction-free design",
            "Maximized content space",
            "Strategic use of whitespace",
            "Subtle typography hierarchy",
            "Focus on readability"
        ]
    },
    {
        id: "tech",
        name: "Tech",
        description: "Optimized for technical roles and skills",
        category: "Technical",
        image: "Prof.webp",
        features: [
            "Technical skills matrix",
            "Project showcase section",
            "GitHub and portfolio links",
            "Code snippet styling",
            "Technical certification highlights"
        ]
    },
    {
        id: "professional",
        name: "Professional",
        description: "Balanced design for most industries",
        category: "Professional",
        image: "Tech.webp",
        features: [
            "Universal professional design",
            "Balanced content sections",
            "Achievements-focused layout",
            "Adaptable to multiple industries",
            "Perfect blend of modern and traditional elements"
        ]
    }
];

// Load template details
function loadTemplateDetails(templateId) {
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
        // Redirect to templates page if template not found
        window.location.href = 'templates.html';
        return;
    }
    
    // Update page title
    document.title = `${template.name} Template - ResumeBuilder`;
    
    // Update template details
    document.getElementById('template-name').textContent = `${template.name} Template`;
    document.getElementById('template-description').textContent = template.description;
    
    // Update template image
    const templateImage = document.getElementById('template-image');
    if (templateImage && template.image) {
        templateImage.src = template.image;   // Set image dynamically
        templateImage.alt = `${template.name} resume template preview`;
    }
    
    // Update features list
    const featuresList = document.getElementById('template-features-list');
    if (featuresList && template.features) {
        let featuresHTML = '';
        template.features.forEach(feature => {
            featuresHTML += `
                <li>
                    <i class="fas fa-check"></i>
                    <span>${feature}</span>
                </li>
            `;
        });
        featuresList.innerHTML = featuresHTML;
    }
}

// Set up button links
function setupButtonLinks(templateId) {
    const customizeBtn = document.getElementById('customize-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    if (customizeBtn) {
        customizeBtn.href = `editor.html?id=${templateId}`;
    }
    
    if (downloadBtn) {
        downloadBtn.href = `template-download.html?id=${templateId}`;
    }
}