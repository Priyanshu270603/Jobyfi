// Sample resume analysis function
export function analyzeResume(content) {
    // In a real application, this would use NLP and AI techniques to analyze the resume
    // For this demo, we'll return mock data
    
    // Extract keywords (simplified)
    const keywords = extractKeywords(content);
    
    // Calculate score based on various factors
    const score = calculateScore(keywords);
    
    // Generate feedback
    const feedback = generateFeedback(score, keywords);
    
    // Calculate match percentage with a sample job description
    const matchPercentage = calculateMatchPercentage(keywords);
    
    return {
        score,
        feedback,
        keywords,
        matchPercentage
    };
}

function extractKeywords(content) {
    // In a real app, this would use NLP to extract important keywords
    // For demo purposes, we'll use a predefined list with some matches
    
    const allKeywords = [
        { word: 'JavaScript', matched: true },
        { word: 'React', matched: true },
        { word: 'Node.js', matched: true },
        { word: 'Python', matched: false },
        { word: 'HTML/CSS', matched: true },
        { word: 'Team Leadership', matched: true },
        { word: 'Project Management', matched: false },
        { word: 'Agile Methodology', matched: true },
        { word: 'REST APIs', matched: true },
        { word: 'Database Design', matched: false }
    ];
    
    // Randomly select 5-8 keywords for the demo
    const shuffled = allKeywords.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 4) + 5);
}

function calculateScore(keywords) {
    // Base score
    let score = 40;
    
    // Add points for matched keywords
    const matchedCount = keywords.filter(k => k.matched).length;
    score += matchedCount * 5;
    
    // Ensure score is between 0 and 100
    score = Math.min(100, Math.max(0, score));
    
    // Add some random variation for demo purposes
    score += Math.floor(Math.random() * 10) - 5;
    
    return Math.round(score);
}

function generateFeedback(score, keywords) {
    const matchedCount = keywords.filter(k => k.matched).length;
    const totalKeywords = keywords.length;
    
    if (score >= 80) {
        return 'Excellent resume! Strong match with job requirements.';
    } else if (score >= 60) {
        return 'Good resume. Consider adding more relevant keywords.';
    } else if (score >= 40) {
        return 'Fair resume. Needs more relevant skills and experience.';
    } else {
        return 'Weak resume. Significant improvements needed.';
    }
}

function calculateMatchPercentage(keywords) {
    const matchedCount = keywords.filter(k => k.matched).length;
    const totalKeywords = keywords.length;
    
    if (totalKeywords === 0) return 0;
    
    const percentage = (matchedCount / totalKeywords) * 100;
    return Math.round(percentage);
}