// Error Taxonomy (MQM Framework)
const errorTaxonomy = {
    accuracy: {
        label: 'Accuracy',
        types: {
            mistranslation: 'Mistranslation',
            omission: 'Omission',
            addition: 'Addition',
            untranslated: 'Untranslated'
        }
    },
    fluency: {
        label: 'Fluency',
        types: {
            grammar: 'Grammar',
            spelling: 'Spelling',
            punctuation: 'Punctuation',
            inconsistency: 'Inconsistency'
        }
    },
    style: {
        label: 'Style',
        types: {
            awkward: 'Awkward',
            unidiomatic: 'Unidiomatic',
            register: 'Inappropriate Register'
        }
    },
    terminology: {
        label: 'Terminology',
        types: {
            inappropriate: 'Inappropriate Term',
            inconsistent: 'Inconsistent Term'
        }
    }
};

// Global state
let currentProject = {
    name: '',
    sourceLang: '',
    targetLang: '',
    sourceText: '',
    targetText: '',
    errors: [],
    timestamp: null
};

let selectedText = '';
let selectionRange = null;

// DOM Elements
const projectNameInput = document.getElementById('projectName');
const sourceLangSelect = document.getElementById('sourceLang');
const targetLangSelect = document.getElementById('targetLang');
const sourceTextArea = document.getElementById('sourceText');
const targetTextArea = document.getElementById('targetText');
const loadTextsBtn = document.getElementById('loadTexts');

const annotationSection = document.getElementById('annotationSection');
const displaySourceText = document.getElementById('displaySourceText');
const displayTargetText = document.getElementById('displayTargetText');
const errorListContainer = document.getElementById('errorListContainer');
const errorCountSpan = document.getElementById('errorCount');

const statsSection = document.getElementById('statsSection');
const totalErrorsSpan = document.getElementById('totalErrors');
const criticalErrorsSpan = document.getElementById('criticalErrors');
const majorErrorsSpan = document.getElementById('majorErrors');
const minorErrorsSpan = document.getElementById('minorErrors');

const modal = document.getElementById('errorModal');
const closeModal = document.querySelector('.close');
const selectedTextSpan = document.getElementById('selectedText');
const errorCategorySelect = document.getElementById('errorCategory');
const errorTypeSelect = document.getElementById('errorType');
const errorSeveritySelect = document.getElementById('errorSeverity');
const errorNoteTextarea = document.getElementById('errorNote');
const saveErrorBtn = document.getElementById('saveError');

const exportJSONBtn = document.getElementById('exportJSON');
const exportCSVBtn = document.getElementById('exportCSV');
const clearAllBtn = document.getElementById('clearAll');

// File upload elements - will be initialized after DOM loads
let sourceFileInput;
let targetFileInput;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize file inputs after DOM is ready
    sourceFileInput = document.getElementById('sourceFile');
    targetFileInput = document.getElementById('targetFile');
    
    loadFromLocalStorage();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    loadTextsBtn.addEventListener('click', loadTextsForAnnotation);
    
    displayTargetText.addEventListener('mouseup', handleTextSelection);
    
    errorCategorySelect.addEventListener('change', updateErrorTypeOptions);
    
    saveErrorBtn.addEventListener('click', saveError);
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    exportJSONBtn.addEventListener('click', exportToJSON);
    exportCSVBtn.addEventListener('click', exportToCSV);
    clearAllBtn.addEventListener('click', clearAllData);
    
    // File upload listeners - with null checks
    if (sourceFileInput) {
        sourceFileInput.addEventListener('change', (e) => handleFileUpload(e, 'source'));
        console.log('✓ Source file input listener attached');
    } else {
        console.error('❌ Source file input not found');
    }
    
    if (targetFileInput) {
        targetFileInput.addEventListener('change', (e) => handleFileUpload(e, 'target'));
        console.log('✓ Target file input listener attached');
    } else {
        console.error('❌ Target file input not found');
    }
}

// Handle file upload
function handleFileUpload(event, textType) {
    console.log('handleFileUpload called for:', textType);
    
    const file = event.target.files[0];
    
    if (!file) {
        console.log('No file selected');
        return;
    }
    
    console.log('File selected:', file.name, 'Size:', file.size, 'bytes', 'Type:', file.type);
    
    // Check file size (max 1MB)
    if (file.size > 1048576) {
        alert('File is too large. Maximum size is 1MB');
        event.target.value = ''; // Reset input
        return;
    }
    
    // Read file
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const content = e.target.result;
        console.log('File loaded successfully! Content length:', content.length);
        
        if (textType === 'source') {
            sourceTextArea.value = content;
            console.log('Content added to source textarea');
        } else if (textType === 'target') {
            targetTextArea.value = content;
            console.log('Content added to target textarea');
        }
        
        // Show success message
        const textarea = textType === 'source' ? sourceTextArea : targetTextArea;
        const existingMessage = textarea.parentNode.querySelector('.upload-success');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'upload-success';
        message.textContent = `✓ File "${file.name}" loaded successfully!`;
        message.style.cssText = 'color: #27AE60; font-size: 0.9rem; margin-top: 8px; font-weight: 600; animation: fadeIn 0.3s;';
        
        textarea.parentNode.insertBefore(message, textarea.nextSibling);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.opacity = '0';
                message.style.transition = 'opacity 0.3s';
                setTimeout(() => message.remove(), 300);
            }
        }, 3000);
        
        // Reset file input for re-upload
        event.target.value = '';
    };
    
    reader.onerror = function(error) {
        console.error('Error reading file:', error);
        alert('Error reading file. Please try again.');
        event.target.value = ''; // Reset input
    };
    
    console.log('Starting to read file...');
    reader.readAsText(file, 'UTF-8');
}

// Load texts for annotation
function loadTextsForAnnotation() {
    const projectName = projectNameInput.value.trim();
    const sourceLang = sourceLangSelect.value;
    const targetLang = targetLangSelect.value;
    const sourceText = sourceTextArea.value.trim();
    const targetText = targetTextArea.value.trim();
    
    if (!projectName || !sourceText || !targetText) {
        alert('Please fill in all required fields (Project Name, Source Text, and Target Text)');
        return;
    }
    
    currentProject = {
        name: projectName,
        sourceLang: sourceLang,
        targetLang: targetLang,
        sourceText: sourceText,
        targetText: targetText,
        errors: currentProject.errors || [],
        timestamp: currentProject.timestamp || new Date().toISOString()
    };
    
    displaySourceText.textContent = sourceText;
    displayTargetText.textContent = targetText;
    
    annotationSection.style.display = 'block';
    statsSection.style.display = 'block';
    
    renderErrors();
    updateStatistics();
    saveToLocalStorage();
    
    // Smooth scroll to annotation section
    annotationSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle text selection
function handleTextSelection() {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text && selection.rangeCount > 0) {
        selectedText = text;
        selectionRange = selection.getRangeAt(0);
        openErrorModal();
    }
}

// Open error annotation modal
function openErrorModal() {
    selectedTextSpan.textContent = `"${selectedText}"`;
    
    // Reset form
    errorCategorySelect.value = '';
    errorTypeSelect.value = '';
    errorTypeSelect.disabled = true;
    errorSeveritySelect.value = '';
    errorNoteTextarea.value = '';
    
    modal.style.display = 'block';
}

// Update error type options based on category
function updateErrorTypeOptions() {
    const category = errorCategorySelect.value;
    errorTypeSelect.innerHTML = '<option value="">-- Select Type --</option>';
    
    if (category && errorTaxonomy[category]) {
        errorTypeSelect.disabled = false;
        const types = errorTaxonomy[category].types;
        
        for (const [key, label] of Object.entries(types)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = label;
            errorTypeSelect.appendChild(option);
        }
    } else {
        errorTypeSelect.disabled = true;
    }
}

// Save error annotation
function saveError() {
    const category = errorCategorySelect.value;
    const type = errorTypeSelect.value;
    const severity = errorSeveritySelect.value;
    const note = errorNoteTextarea.value.trim();
    
    if (!category || !type || !severity) {
        alert('Please select Category, Type, and Severity');
        return;
    }
    
    const error = {
        id: Date.now(),
        text: selectedText,
        category: category,
        categoryLabel: errorTaxonomy[category].label,
        type: type,
        typeLabel: errorTaxonomy[category].types[type],
        severity: severity,
        note: note,
        timestamp: new Date().toISOString()
    };
    
    currentProject.errors.push(error);
    
    renderErrors();
    updateStatistics();
    saveToLocalStorage();
    
    modal.style.display = 'none';
    
    // Clear selection
    window.getSelection().removeAllRanges();
}

// Render errors list
function renderErrors() {
    errorCountSpan.textContent = currentProject.errors.length;
    
    if (currentProject.errors.length === 0) {
        errorListContainer.innerHTML = '<div class="empty-state">No errors annotated yet. Select text in the translation to start annotating.</div>';
        return;
    }
    
    errorListContainer.innerHTML = '';
    
    currentProject.errors.forEach(error => {
        const errorItem = document.createElement('div');
        errorItem.className = `error-item ${error.severity}`;
        
        errorItem.innerHTML = `
            <div class="error-info">
                <div class="error-text">"${error.text}"</div>
                <div class="error-details">
                    <span class="error-badge badge-${error.severity}">${error.severity.toUpperCase()}</span>
                    <strong>${error.categoryLabel}</strong> → ${error.typeLabel}
                </div>
                ${error.note ? `<div class="error-note">Note: ${error.note}</div>` : ''}
            </div>
            <button class="btn-delete" onclick="deleteError(${error.id})">Delete</button>
        `;
        
        errorListContainer.appendChild(errorItem);
    });
}

// Delete error
function deleteError(errorId) {
    if (confirm('Are you sure you want to delete this error annotation?')) {
        currentProject.errors = currentProject.errors.filter(e => e.id !== errorId);
        renderErrors();
        updateStatistics();
        saveToLocalStorage();
    }
}

// Update statistics
function updateStatistics() {
    const errors = currentProject.errors;
    
    const totalErrors = errors.length;
    const criticalErrors = errors.filter(e => e.severity === 'critical').length;
    const majorErrors = errors.filter(e => e.severity === 'major').length;
    const minorErrors = errors.filter(e => e.severity === 'minor').length;
    
    totalErrorsSpan.textContent = totalErrors;
    criticalErrorsSpan.textContent = criticalErrors;
    majorErrorsSpan.textContent = majorErrors;
    minorErrorsSpan.textContent = minorErrors;
    
    updateChart();
}

// Update chart (simple text-based representation - you can integrate Chart.js later)
function updateChart() {
    const canvas = document.getElementById('errorChart');
    const ctx = canvas.getContext('2d');
    
    // Count errors by category
    const categoryCounts = {};
    errorTaxonomy && Object.keys(errorTaxonomy).forEach(key => {
        categoryCounts[key] = 0;
    });
    
    currentProject.errors.forEach(error => {
        categoryCounts[error.category]++;
    });
    
    // Simple bar chart
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const categories = Object.keys(categoryCounts);
    const maxCount = Math.max(...Object.values(categoryCounts), 1);
    const barWidth = canvas.width / categories.length - 20;
    const barSpacing = 10;
    
    categories.forEach((category, index) => {
        const count = categoryCounts[category];
        const barHeight = (count / maxCount) * (canvas.height - 60);
        const x = index * (barWidth + barSpacing) + barSpacing;
        const y = canvas.height - barHeight - 30;
        
        // Draw bar
        ctx.fillStyle = getColorForCategory(category);
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw count
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(count.toString(), x + barWidth / 2, y - 5);
        
        // Draw label
        ctx.font = '12px Arial';
        ctx.fillText(errorTaxonomy[category].label, x + barWidth / 2, canvas.height - 10);
    });
}

function getColorForCategory(category) {
    const colors = {
        accuracy: '#E74C3C',
        fluency: '#3498DB',
        style: '#9B59B6',
        terminology: '#E67E22'
    };
    return colors[category] || '#95A5A6';
}

// Export to JSON
function exportToJSON() {
    const dataStr = JSON.stringify(currentProject, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentProject.name.replace(/\s+/g, '_')}_report.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Export to CSV
function exportToCSV() {
    const headers = ['Error Text', 'Category', 'Type', 'Severity', 'Notes'];
    const rows = currentProject.errors.map(error => [
        `"${error.text}"`,
        error.categoryLabel,
        error.typeLabel,
        error.severity,
        `"${error.note || ''}"`
    ]);
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentProject.name.replace(/\s+/g, '_')}_errors.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data and start a new project? This cannot be undone.')) {
        currentProject = {
            name: '',
            sourceLang: '',
            targetLang: '',
            sourceText: '',
            targetText: '',
            errors: [],
            timestamp: null
        };
        
        projectNameInput.value = '';
        sourceTextArea.value = '';
        targetTextArea.value = '';
        
        annotationSection.style.display = 'none';
        statsSection.style.display = 'none';
        
        localStorage.removeItem('translationQAProject');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('translationQAProject', JSON.stringify(currentProject));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('translationQAProject');
    if (saved) {
        currentProject = JSON.parse(saved);
        
        if (currentProject.name) {
            projectNameInput.value = currentProject.name;
            sourceLangSelect.value = currentProject.sourceLang;
            targetLangSelect.value = currentProject.targetLang;
            sourceTextArea.value = currentProject.sourceText;
            targetTextArea.value = currentProject.targetText;
            
            if (currentProject.errors.length > 0) {
                loadTextsForAnnotation();
            }
        }
    }
}
