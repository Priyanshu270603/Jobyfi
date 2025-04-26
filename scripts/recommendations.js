// Sample recommendations based on analysis results
export function getRecommendations(analysisResults) {
    // In a real application, this would use the analysis results
    // to generate personalized recommendations
    
    const suggestions = generateSuggestions(analysisResults);
    const jobs = generateJobRecommendations(analysisResults);
    
    return {
        suggestions,
        jobs
    };
}

function generateSuggestions(analysisResults) {
    const suggestions = [];
    
    if (analysisResults.score < 70) {
        suggestions.push(
            "Add more relevant keywords from the job description",
            "Highlight your most recent and relevant experience first",
            "Include measurable achievements with numbers where possible"
        );
    }
    
    if (analysisResults.matchPercentage < 60) {
        suggestions.push(
            "Tailor your resume to better match the job requirements",
            "Consider adding a skills section with relevant technical skills"
        );
    }
    
    // Always include these general suggestions
    suggestions.push(
        "Keep your resume to 1-2 pages maximum",
        "Use action verbs like 'developed', 'led', 'implemented'",
        "Proofread for spelling and grammar errors"
    );
    
    return suggestions;
}

function generateJobRecommendations(analysisResults) {
    // In a real app, this would connect to a job API or database
    // For demo, we'll return mock data based on keywords
    
    const allJobs = [
        {
            title: "Frontend Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA (Remote)"
        },
        {
            title: "Full Stack JavaScript Engineer",
            company: "WebSolutions LLC",
            location: "New York, NY"
        },
        {
            title: "React Developer",
            company: "Digital Innovations",
            location: "Austin, TX (Hybrid)"
        },
        {
            title: "Node.js Backend Developer",
            company: "Cloud Systems",
            location: "Remote"
        },
        {
            title: "UI/UX Developer",
            company: "Creative Minds",
            location: "Chicago, IL"
        },
        {
            title: "JavaScript Architect",
            company: "Enterprise Tech",
            location: "Boston, MA"
        }
    ];
    
    // Filter jobs based on matched keywords (simplified for demo)
    const matchedKeywords = analysisResults.keywords.filter(k => k.matched).map(k => k.word.toLowerCase());
    
    if (matchedKeywords.includes('javascript') && matchedKeywords.includes('react')) {
        return allJobs.filter(job => 
            job.title.includes('JavaScript') || 
            job.title.includes('React') ||
            job.title.includes('Frontend')
        );
    } else if (matchedKeywords.includes('node.js')) {
        return allJobs.filter(job => 
            job.title.includes('Node.js') || 
            job.title.includes('Backend')
        );
    }
    
    // Default return all jobs if no specific matches
    return allJobs;
}