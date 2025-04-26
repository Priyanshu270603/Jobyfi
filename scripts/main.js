import { analyzeResume } from './analyzer.js';
import { getRecommendations } from './recommendations.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('resume-upload');
    const fileInfo = document.getElementById('file-info');
    const analyzeBtn = document.getElementById('analyze-btn');
    const uploadSection = document.getElementById('upload-section');
    const analysisSection = document.getElementById('analysis-section');
    
    // Event Listeners
    setupDragAndDrop();
    setupFileInput();
    setupAnalyzeButton();
    
    function setupDragAndDrop() {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        dropzone.addEventListener('drop', handleDrop, false);
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropzone.classList.add('active');
    }
    
    function unhighlight() {
        dropzone.classList.remove('active');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function setupFileInput() {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFiles(fileInput.files);
            }
        });
    }
    
    function handleFiles(files) {
        const file = files[0];
        
        // Validate file type
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a PDF, DOCX, or TXT file.');
            return;
        }
        
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB limit.');
            return;
        }
        
        // Display file info
        fileInfo.innerHTML = `
            <p><strong>${file.name}</strong> (${formatFileSize(file.size)})</p>
        `;
        fileInfo.classList.add('show');
        
        // Enable analysis
        analyzeBtn.disabled = false;
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
    
    function setupAnalyzeButton() {
        analyzeBtn.addEventListener('click', () => {
            if (!fileInput.files.length) {
                alert('Please upload a resume first.');
                return;
            }
            
            // Show loading state
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            
            // Simulate analysis process
            simulateAnalysis();
        });
    }
    
    function simulateAnalysis() {
        // Show analysis section
        uploadSection.classList.add('hidden');
        analysisSection.classList.remove('hidden');
        
        // Animate progress bar
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.floor(progress)}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                completeAnalysis();
            }
        }, 300);
    }
    
    function completeAnalysis() {
        // Get the uploaded file
        const file = fileInput.files[0];
        
        // Process the file (in a real app, you would upload to server here)
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            
            // Analyze the resume content
            const analysisResults = analyzeResume(content);
            
            // Display results
            displayAnalysisResults(analysisResults);
            
            // Get recommendations
            const recommendations = getRecommendations(analysisResults);
            displayRecommendations(recommendations);
        };
        
        if (file.type === 'application/pdf') {
            // For PDFs, we'd normally use a PDF parser library
            // For this demo, we'll just use the file name
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    }
    
    function displayAnalysisResults(results) {
        // Display overall score
        const scoreValue = document.getElementById('score-value');
        const scoreFeedback = document.getElementById('score-feedback');
        const scoreRing = document.querySelector('#score-card .progress-ring-circle');
        
        scoreValue.textContent = results.score;
        scoreFeedback.textContent = results.feedback;
        
        // Animate the score ring
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (results.score / 100) * circumference;
        scoreRing.style.strokeDashoffset = offset;
        
        // Display keywords
        const keywordsList = document.getElementById('keywords-list');
        keywordsList.innerHTML = '';
        
        results.keywords.forEach(keyword => {
            const keywordElement = document.createElement('span');
            keywordElement.className = `keyword ${keyword.matched ? 'matched' : ''}`;
            keywordElement.textContent = keyword.word;
            keywordsList.appendChild(keywordElement);
        });
        
        // Display match percentage
        document.getElementById('match-percentage').textContent = `${results.matchPercentage}%`;
    }
    
    function displayRecommendations(recommendations) {
        // Display suggestions
        const suggestionsList = document.getElementById('suggestions-list');
        suggestionsList.innerHTML = '';
        
        recommendations.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
        
        // Display recommended jobs
        const jobsList = document.getElementById('jobs-list');
        jobsList.innerHTML = '';
        
        recommendations.jobs.slice(0, 3).forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.className = 'job-item';
            jobElement.innerHTML = `
                <div class="job-title">${job.title}</div>
                <div class="job-company">${job.company}</div>
                <div class="job-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
            `;
            jobsList.appendChild(jobElement);
        });
        
        // Set up "View More" button
        document.getElementById('view-more-jobs').addEventListener('click', () => {
            alert('In a real application, this would show more job recommendations.');
        });
    }
});