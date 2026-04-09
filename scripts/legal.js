// Legal page translation functionality
async function initLegal() {
    await includeHTML();
    await loadTranslations();
    setInitialLanguageState();
    updateLegalPageTexts();
}

function updateLegalPageTexts() {
    // Update page title
    updateElementText('h1', 'legal.title');
    
    // Update imprint section
    updateElementText('.imprint-section h2', 'legal.imprint.title');
    
    // Update contact section (former "Exploring the Board")
    updateElementText('.contact-section h2', 'legal.imprint.contact');
    
    // Update terms section
    updateElementText('.terms-section h2', 'legal.terms.title');
    updateElementText('.terms-section p', 'legal.terms.text');
    
    // Update ownership section
    updateElementText('.ownership-section h2', 'legal.ownership.title');
    updateElementText('.ownership-section p', 'legal.ownership.text');
    
    // Update rights section
    updateElementText('.rights-section h2', 'legal.rights.title');
    updateElementText('.rights-section p', 'legal.rights.text');
    
    // Update usage section
    updateElementText('.usage-section h2', 'legal.usage.title');
    updateElementText('.usage-section p', 'legal.usage.text');
    
    // Update disclaimer section
    updateElementText('.disclaimer-section h2', 'legal.disclaimer.title');
    updateElementText('.disclaimer-section p', 'legal.disclaimer.text');
    
    // Update indemnity section
    updateElementText('.indemnity-section h2', 'legal.indemnity.title');
    updateElementText('.indemnity-section .legal-text:nth-child(2)', 'legal.indemnity.text');
    updateElementText('.indemnity-section .contact-info', 'legal.indemnity.contact');
    updateElementText('.indemnity-section .date-info', 'legal.indemnity.date');
}

// Override setLanguage function for legal page
async function setLanguage() {
    let englishBtn = document.getElementById('english-btn');
    let germanBtn = document.getElementById('german-btn');
    
    if (currentLanguage === 'EN') {
        currentLanguage = 'DE';
        englishBtn.classList.remove('active-language');
        germanBtn.classList.add('active-language');
    } else {
        currentLanguage = 'EN';
        germanBtn.classList.remove('active-language');
        englishBtn.classList.add('active-language');
    }
    
    localStorage.setItem('language', currentLanguage);
    updateLegalPageTexts();
    console.log(currentLanguage);
}
