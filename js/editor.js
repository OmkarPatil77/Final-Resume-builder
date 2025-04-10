document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Get template ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('id');
    
    if (!templateId) {
        // Redirect to templates page if no ID provided
        window.location.href = 'templates.html';
        return;
    }
    
    // Set up back button
    setupBackButton(templateId);
    
    // Initialize resume data
    initResumeData();
    
    // Set up tab switching
    setupTabs();
    
    // Set up form event listeners
    setupFormListeners();
    
    // Set up download buttons
    setupDownloadButtons();
    
    // Set up save button
    setupSaveButton();
});

// Resume data
let resumeData = {
    personalInfo: {
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        location: "New York, NY",
        summary: "Experienced software engineer with a passion for building scalable web applications and solving complex problems."
    },
    experience: [
        {
            id: "exp1",
            company: "Tech Company Inc.",
            position: "Senior Software Engineer",
            startDate: "2020-01",
            endDate: "",
            description: "Led development of cloud-based solutions. Improved system performance by 40%. Mentored junior developers."
        },
        {
            id: "exp2",
            company: "Digital Solutions LLC",
            position: "Software Developer",
            startDate: "2017-06",
            endDate: "2019-12",
            description: "Developed and maintained web applications using React and Node.js. Collaborated with design team to implement UI/UX improvements."
        }
    ],
    education: [
        {
            id: "edu1",
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            startDate: "2013-09",
            endDate: "2017-05",
            description: "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development."
        }
    ],
    skills: [
        "JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "Git", "RESTful APIs", "SQL", "MongoDB", "AWS"
    ]
};

// Initialize resume data
function initResumeData() {
    // Populate personal info fields
    document.getElementById('full-name').value = resumeData.personalInfo.name;
    document.getElementById('job-title').value = resumeData.personalInfo.title;
    document.getElementById('email').value = resumeData.personalInfo.email;
    document.getElementById('phone').value = resumeData.personalInfo.phone;
    document.getElementById('location').value = resumeData.personalInfo.location;
    document.getElementById('summary').value = resumeData.personalInfo.summary;
    
    // Populate experience items
    renderExperienceItems();
    
    // Populate education items
    renderEducationItems();
    
    // Populate skills
    document.getElementById('skills').value = resumeData.skills.join(', ');
    renderSkillsTags();
    
    // Render resume preview
    updateResumePreview();
}

// Set up tab switching
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            this.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// Set up form event listeners
function setupFormListeners() {
    // Personal info listeners
    document.getElementById('full-name').addEventListener('input', function() {
        resumeData.personalInfo.name = this.value;
        updateResumePreview();
    });
    
    document.getElementById('job-title').addEventListener('input', function() {
        resumeData.personalInfo.title = this.value;
        updateResumePreview();
    });
    
    document.getElementById('email').addEventListener('input', function() {
        resumeData.personalInfo.email = this.value;
        updateResumePreview();
    });
    
    document.getElementById('phone').addEventListener('input', function() {
        resumeData.personalInfo.phone = this.value;
        updateResumePreview();
    });
    
    document.getElementById('location').addEventListener('input', function() {
        resumeData.personalInfo.location = this.value;
        updateResumePreview();
    });
    
    document.getElementById('summary').addEventListener('input', function() {
        resumeData.personalInfo.summary = this.value;
        updateResumePreview();
    });
    
    // Add experience button
    document.getElementById('add-experience').addEventListener('click', function() {
        addExperience();
    });
    
    // Add education button
    document.getElementById('add-education').addEventListener('click', function() {
        addEducation();
    });
    
    // Skills input
    document.getElementById('skills').addEventListener('input', function() {
        updateSkills(this.value);
        renderSkillsTags();
        updateResumePreview();
    });
}

// Render experience items
function renderExperienceItems() {
    const experienceContainer = document.getElementById('experience-items');
    if (!experienceContainer) return;
    
    let experienceHTML = '';
    resumeData.experience.forEach(exp => {
        experienceHTML += `
            <div class="experience-item" data-id="${exp.id}">
                <button class="remove-item-btn" onclick="removeExperience('${exp.id}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="company-input" value="${exp.company}" onchange="updateExperience('${exp.id}', 'company', this.value)">
                </div>
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="position-input" value="${exp.position}" onchange="updateExperience('${exp.id}', 'position', this.value)">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="month" class="start-date-input" value="${exp.startDate}" onchange="updateExperience('${exp.id}', 'startDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="month" class="end-date-input" value="${exp.endDate}" placeholder="Present" onchange="updateExperience('${exp.id}', 'endDate', this.value)">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="description-input" rows="3" onchange="updateExperience('${exp.id}', 'description', this.value)">${exp.description}</textarea>
                </div>
            </div>
        `;
    });
    
    experienceContainer.innerHTML = experienceHTML;
}

// Add new experience
function addExperience() {
    const newId = `exp${resumeData.experience.length + 1}`;
    resumeData.experience.push({
        id: newId,
        company: "Company Name",
        position: "Position Title",
        startDate: "",
        endDate: "",
        description: "Describe your responsibilities and achievements"
    });
    
    renderExperienceItems();
    updateResumePreview();
}

// Update experience
function updateExperience(id, field, value) {
    const expIndex = resumeData.experience.findIndex(exp => exp.id === id);
    if (expIndex !== -1) {
        resumeData.experience[expIndex][field] = value;
        updateResumePreview();
    }
}

// Remove experience
function removeExperience(id) {
    resumeData.experience = resumeData.experience.filter(exp => exp.id !== id);
    renderExperienceItems();
    updateResumePreview();
}

// Render education items
function renderEducationItems() {
    const educationContainer = document.getElementById('education-items');
    if (!educationContainer) return;
    
    let educationHTML = '';
    resumeData.education.forEach(edu => {
        educationHTML += `
            <div class="education-item" data-id="${edu.id}">
                <button class="remove-item-btn" onclick="removeEducation('${edu.id}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" class="institution-input" value="${edu.institution}" onchange="updateEducation('${edu.id}', 'institution', this.value)">
                </div>
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" class="degree-input" value="${edu.degree}" onchange="updateEducation('${edu.id}', 'degree', this.value)">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="month" class="start-date-input" value="${edu.startDate}" onchange="updateEducation('${edu.id}', 'startDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="month" class="end-date-input" value="${edu.endDate}" onchange="updateEducation('${edu.id}', 'endDate', this.value)">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="description-input" rows="3" onchange="updateEducation('${edu.id}', 'description', this.value)">${edu.description}</textarea>
                </div>
            </div>
        `;
    });
    
    educationContainer.innerHTML = educationHTML;
}

// Add new education
function addEducation() {
    const newId = `edu${resumeData.education.length + 1}`;
    resumeData.education.push({
        id: newId,
        institution: "Institution Name",
        degree: "Degree",
        startDate: "",
        endDate: "",
        description: "Describe your studies and achievements"
    });
    
    renderEducationItems();
    updateResumePreview();
}

// Update education
function updateEducation(id, field, value) {
    const eduIndex = resumeData.education.findIndex(edu => edu.id === id);
    if (eduIndex !== -1) {
        resumeData.education[eduIndex][field] = value;
        updateResumePreview();
    }
}

// Remove education
function removeEducation(id) {
    resumeData.education = resumeData.education.filter(edu => edu.id !== id);
    renderEducationItems();
    updateResumePreview();
}

// Update skills
function updateSkills(skillsString) {
    resumeData.skills = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
}

// Render skills tags
function renderSkillsTags() {
    const skillsTagsContainer = document.getElementById('skills-tags');
    if (!skillsTagsContainer) return;
    
    let tagsHTML = '';
    resumeData.skills.forEach(skill => {
        tagsHTML += `<span class="skill-tag">${skill}</span>`;
    });
    
    skillsTagsContainer.innerHTML = tagsHTML;
}

// Update resume preview
function updateResumePreview() {
    const previewContainer = document.getElementById('resume-preview-content');
    if (!previewContainer) return;
    
    const previewHTML = `
        <div class="preview-header">
            <h1>${resumeData.personalInfo.name}</h1>
            <p class="preview-title">${resumeData.personalInfo.title}</p>
            <div class="preview-contact">
                <span>${resumeData.personalInfo.email}</span>
                <span>${resumeData.personalInfo.phone}</span>
                <span>${resumeData.personalInfo.location}</span>
            </div>
        </div>
        
        <div class="preview-section">
            <h2>Summary</h2>
            <p>${resumeData.personalInfo.summary}</p>
        </div>
        
        <div class="preview-section">
            <h2>Experience</h2>
            ${resumeData.experience.map(exp => `
                <div class="preview-item">
                    <div class="preview-item-header">
                        <h3>${exp.position}</h3>
                        <span>${exp.startDate ? formatDate(exp.startDate) : ''} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                    </div>
                    <p class="preview-item-subheader">${exp.company}</p>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="preview-section">
            <h2>Education</h2>
            ${resumeData.education.map(edu => `
                <div class="preview-item">
                    <div class="preview-item-header">
                        <h3>${edu.degree}</h3>
                        <span>${edu.startDate ? formatDate(edu.startDate) : ''} - ${edu.endDate ? formatDate(edu.endDate) : ''}</span>
                    </div>
                    <p class="preview-item-subheader">${edu.institution}</p>
                    <p>${edu.description}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="preview-section">
            <h2>Skills</h2>
            <div class="preview-skills">
                ${resumeData.skills.map(skill => `<span class="preview-skill">${skill}</span>`).join('')}
            </div>
        </div>
    `;
    
    previewContainer.innerHTML = previewHTML;
    
    // Add styles to preview
    const previewStyles = document.createElement('style');
    previewStyles.textContent = `
        .preview-header {
            text-align: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .preview-header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
        }
        
        .preview-title {
            color: #6b7280;
            margin-bottom: 0.5rem;
        }
        
        .preview-contact {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
            font-size: 0.875rem;
        }
        
        .preview-section {
            margin-bottom: 1.5rem;
        }
        
        .preview-section h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            padding-bottom: 0.25rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .preview-item {
            margin-bottom: 1rem;
        }
        
        .preview-item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        
        .preview-item-header h3 {
            font-weight: 600;
            font-size: 1rem;
        }
        
        .preview-item-header span {
            font-size: 0.875rem;
            color: #6b7280;
        }
        
        .preview-item-subheader {
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }
        
        .preview-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .preview-skill {
            background-color: #f3f4f6;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
        }
    `;
    
    previewContainer.appendChild(previewStyles);
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    return `${month} ${year}`;
}

// Set up back button
function setupBackButton(templateId) {
    const backButton = document.getElementById('back-to-template');
    
    if (backButton) {
        backButton.href = `template-details.html?id=${templateId}`;
    }
}

// Set up download buttons
function setupDownloadButtons() {
    const downloadPdfBtn = document.getElementById('download-pdf');
    const downloadDocxBtn = document.getElementById('download-docx');
    const downloadTxtBtn = document.getElementById('download-txt');
    const downloadModal = document.getElementById('download-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeDownloadModalBtn = document.getElementById('close-download-modal');
    const downloadProgress = document.querySelector('.download-progress');
    const downloadSuccess = document.querySelector('.download-success');

    // Download PDF button
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function() {
            showDownloadModal('pdf');
            downloadAsPdf();
        });
    }

    // Download DOCX button
    if (downloadDocxBtn) {
        downloadDocxBtn.addEventListener('click', function() {
            showDownloadModal('docx');
            downloadAsDocx();
        });
    }

    // Download TXT button
    if (downloadTxtBtn) {
        downloadTxtBtn.addEventListener('click', function() {
            showDownloadModal('txt');
            downloadAsTxt();
        });
    }

    // Close modal button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            downloadModal.classList.remove('active');
            resetDownloadModal();
        });
    }

    // Close download success button
    if (closeDownloadModalBtn) {
        closeDownloadModalBtn.addEventListener('click', function() {
            downloadModal.classList.remove('active');
            resetDownloadModal();
        });
    }

    // Show download modal
    function showDownloadModal(format) {
        downloadModal.classList.add('active');
        
        // Update format type in success message
        document.getElementById('format-type').textContent = format.toUpperCase();
        
        // Simulate download process
        setTimeout(function() {
            downloadProgress.classList.add('hidden');
            downloadSuccess.classList.remove('hidden');
        }, 2000);
    }

    // Reset download modal
    function resetDownloadModal() {
        setTimeout(function() {
            downloadProgress.classList.remove('hidden');
            downloadSuccess.classList.add('hidden');
        }, 500);
    }
}

// Download as PDF
function downloadAsPdf() {
    // Get the resume preview content
    const previewContent = document.getElementById('resume-preview-content');
    
    if (!previewContent) {
        alert('Resume preview not found');
        return;
    }
    
    // Create a clone of the preview content to avoid modifying the original
    const clone = previewContent.cloneNode(true);
    
    // Apply additional styles for PDF
    clone.style.padding = '20px';
    clone.style.backgroundColor = 'white';
    clone.style.color = 'black';
    clone.style.width = '210mm'; // A4 width
    clone.style.minHeight = '297mm'; // A4 height
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    
    // Add the clone to the document
    document.body.appendChild(clone);
    
    // Use html2canvas to convert the HTML to a canvas
    html2canvas(clone, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        // Remove the clone from the document
        document.body.removeChild(clone);
        
        // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Calculate the width and height of the PDF
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add the canvas as an image to the PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Save the PDF
        pdf.save('resume.pdf');
        
        // Redirect to success page after a delay
        setTimeout(() => {
            window.location.href = `download-success.html?format=pdf`;
        }, 1000);
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    });
}

// Download as DOCX
function downloadAsDocx() {
    // Use docx.js to create a DOCX document
    const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;
    
    // Create a new document
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                // Header with name and title
                new Paragraph({
                    text: resumeData.personalInfo.name || 'Your Name',
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    text: resumeData.personalInfo.title || 'Your Title',
                    alignment: AlignmentType.CENTER
                }),
                
                // Contact info
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun(resumeData.personalInfo.email || 'email@example.com'),
                        new TextRun(' | '),
                        new TextRun(resumeData.personalInfo.phone || '(123) 456-7890'),
                        new TextRun(' | '),
                        new TextRun(resumeData.personalInfo.location || 'City, State')
                    ]
                }),
                
                // Summary
                new Paragraph({
                    text: 'SUMMARY',
                    heading: HeadingLevel.HEADING_2
                }),
                new Paragraph({
                    text: resumeData.personalInfo.summary || 'Professional summary goes here.'
                }),
                
                // Experience
                new Paragraph({
                    text: 'EXPERIENCE',
                    heading: HeadingLevel.HEADING_2
                }),
                
                // Experience items
                ...(resumeData.experience && resumeData.experience.length ? 
                    resumeData.experience.flatMap(exp => [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: exp.position || 'Position',
                                    bold: true
                                }),
                                new TextRun({
                                    text: ` | ${exp.company || 'Company'}`,
                                    italics: true
                                })
                            ]
                        }),
                        new Paragraph({
                            text: `${formatDate(exp.startDate) || 'Start Date'} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`
                        }),
                        new Paragraph({
                            text: exp.description || 'Description'
                        })
                    ]) : 
                    [new Paragraph({ text: 'No experience listed.' })]),
                
                // Education
                new Paragraph({
                    text: 'EDUCATION',
                    heading: HeadingLevel.HEADING_2
                }),
                
                // Education items
                ...(resumeData.education && resumeData.education.length ? 
                    resumeData.education.flatMap(edu => [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: edu.degree || 'Degree',
                                    bold: true
                                }),
                                new TextRun({
                                    text: ` | ${edu.institution || 'Institution'}`,
                                    italics: true
                                })
                            ]
                        }),
                        new Paragraph({
                            text: `${formatDate(edu.startDate) || 'Start Date'} - ${formatDate(edu.endDate) || 'End Date'}`
                        }),
                        new Paragraph({
                            text: edu.description || 'Description'
                        })
                    ]) : 
                    [new Paragraph({ text: 'No education listed.' })]),
                
                // Skills
                new Paragraph({
                    text: 'SKILLS',
                    heading: HeadingLevel.HEADING_2
                }),
                new Paragraph({
                    text: resumeData.skills && resumeData.skills.length ? resumeData.skills.join(', ') : 'No skills listed.'
                })
            ]
        }]
    });
    
    // Generate the DOCX file
    docx.Packer.toBlob(doc).then(blob => {
        // Save the file using FileSaver.js
        saveAs(blob, 'resume.docx');
        
        // Redirect to success page after a delay
        setTimeout(() => {
            window.location.href = `download-success.html?format=docx`;
        }, 1000);
    }).catch(error => {
        console.error('Error generating DOCX:', error);
        alert('Failed to generate DOCX. Please try again.');
    });
}

// Download as TXT
function downloadAsTxt() {
    // Generate text content
    const textContent = generateTextResume(resumeData);
    
    // Create a Blob with the text content
    const blob = new Blob([textContent], { type: 'text/plain' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Redirect to success page after a delay
    setTimeout(() => {
        window.location.href = `download-success.html?format=txt`;
    }, 1000);
}

// Generate text resume
function generateTextResume(resumeData) {
    let content = "";
    
    // Name and title
    content += (resumeData.personalInfo.name || "").toUpperCase() + "\n";
    content += (resumeData.personalInfo.title || "") + "\n\n";
    
    // Contact info
    content += "Email: " + (resumeData.personalInfo.email || "") + "\n";
    content += "Phone: " + (resumeData.personalInfo.phone || "") + "\n";
    content += "Location: " + (resumeData.personalInfo.location || "") + "\n\n";
    
    // Summary
    content += "SUMMARY\n";
    content += "-".repeat(30) + "\n";
    content += (resumeData.personalInfo.summary || "") + "\n\n";
    
    // Experience
    content += "EXPERIENCE\n";
    content += "-".repeat(30) + "\n";
    if (resumeData.experience && resumeData.experience.length) {
        resumeData.experience.forEach(exp => {
            content += (exp.position || "") + "\n";
            content += (exp.company || "") + " | " + (exp.startDate ? formatDate(exp.startDate) : "") + " - " + (exp.endDate ? formatDate(exp.endDate) : "Present") + "\n";
            content += (exp.description || "") + "\n\n";
        });
    } else {
        content += "No experience listed.\n\n";
    }
    
    // Education
    content += "EDUCATION\n";
    content += "-".repeat(30) + "\n";
    if (resumeData.education && resumeData.education.length) {
        resumeData.education.forEach(edu => {
            content += (edu.degree || "") + "\n";
            content += (edu.institution || "") + " | " + (edu.startDate ? formatDate(edu.startDate) : "") + " - " + (edu.endDate ? formatDate(edu.endDate) : "") + "\n";
            content += (edu.description || "") + "\n\n";
        });
    } else {
        content += "No education listed.\n\n";
    }
    
    // Skills
    content += "SKILLS\n";
    content += "-".repeat(30) + "\n";
    if (resumeData.skills && resumeData.skills.length) {
        content += resumeData.skills.join(", ");
    } else {
        content += "No skills listed.";
    }
    
    return content;
}

// Set up save button
function setupSaveButton() {
    const saveBtn = document.getElementById('save-btn');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // In a real app, this would save to a database or local storage
            alert('Resume saved successfully!');
        });
    }
}

// Make functions available globally
window.updateExperience = updateExperience;
window.removeExperience = removeExperience;
window.updateEducation = updateEducation;
window.removeEducation = removeEducation;