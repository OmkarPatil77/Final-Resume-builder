document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Get template ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('id');
    
    if (templateId) {
        loadTemplateInfo(templateId);
        setupDownloadButtons(templateId);
        setupBackButton(templateId);
    } else {
        // Redirect to templates page if no ID provided
        window.location.href = 'templates.html';
    }
});

// Template data
const templates = [
    {
        id: "modern",
        name: "Modern",
        description: "Clean and professional with a modern touch",
        category: "Professional"
    },
    {
        id: "classic",
        name: "Classic",
        description: "Traditional layout for corporate environments",
        category: "Professional"
    },
    {
        id: "creative",
        name: "Creative",
        description: "Stand out with a unique design for creative fields",
        category: "Creative"
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Simple and elegant with focus on content",
        category: "Professional"
    },
    {
        id: "tech",
        name: "Tech",
        description: "Optimized for technical roles and skills",
        category: "Technical"
    },
    {
        id: "professional",
        name: "Professional",
        description: "Balanced design for most industries",
        category: "Professional"
    }
];

// Load template info
function loadTemplateInfo(templateId) {
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
        // Redirect to templates page if template not found
        window.location.href = 'templates.html';
        return;
    }
    
    // Update page title
    document.title = `Download ${template.name} Template - ResumeBuilder`;
    
    // Update template name
    const templateNameElements = document.querySelectorAll('#template-name');
    templateNameElements.forEach(element => {
        element.textContent = template.name;
    });
}

// Set up download buttons
function setupDownloadButtons(templateId) {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const format = this.getAttribute('data-format');
            simulateDownload(templateId, format);
        });
    });
}

// Simulate download process
function simulateDownload(templateId, format) {
    // In a real app, this would trigger an actual download
    // For this demo, we'll just show a success message
    
    alert(`Downloading template in ${format.toUpperCase()} format...`);
    
    // Simulate download delay
    setTimeout(() => {
        window.location.href = `download-success.html?format=${format}`;
    }, 1500);
}

// Set up back button
function setupBackButton(templateId) {
    const backButton = document.getElementById('back-to-template');
    
    if (backButton) {
        backButton.href = `template-details.html?id=${templateId}`;
    }
}