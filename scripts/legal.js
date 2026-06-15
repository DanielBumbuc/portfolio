async function initLegal() {
    await includeHTML();
    await loadTranslations();
    setInitialLanguageState();
    updateLegalPageTexts();
    updatePrivacyPolicyTexts();
}

function updateLegalPageTexts() {
    updateElementText('.imprint-headline', 'legal.title');
    updateElementText('.privacy-headline', 'legal.privacyPolicy.title');
    updateElementText('.imprint-section h2', 'legal.imprint.title');
    updateElementText('.contact-section h2', 'legal.imprint.contact');
    updateElementText('.terms-section h2', 'legal.terms.title');
    updateElementText('.terms-section p', 'legal.terms.text');
    updateElementText('.ownership-section h2', 'legal.ownership.title');
    updateElementText('.ownership-section p', 'legal.ownership.text');
    updateElementText('.rights-section h2', 'legal.rights.title');
    updateElementText('.rights-section p', 'legal.rights.text');
    updateElementText('.usage-section h2', 'legal.usage.title');
    updateElementText('.usage-section p', 'legal.usage.text');
    updateElementText('.disclaimer-section h2', 'legal.disclaimer.title');
    updateElementText('.disclaimer-section p', 'legal.disclaimer.text');
    updateElementText('.indemnity-section h2', 'legal.indemnity.title');
    updateElementText('.indemnity-section .legal-text:nth-child(2)', 'legal.indemnity.text');
    updateElementText('.indemnity-section .contact-info', 'legal.indemnity.contact');
    updateElementText('.indemnity-section .date-info', 'legal.indemnity.date');
}

function updatePrivacyPolicyTexts() {
    let germanPrivacyPolicy = document.getElementById('german_privacy_policy');
    let englishPrivacyPolicy = document.getElementById('english_privacy_policy');
    if (!germanPrivacyPolicy || !englishPrivacyPolicy) return;
    if (currentLanguage === 'EN') {
        englishPrivacyPolicy.classList.remove('d-none');
        germanPrivacyPolicy.classList.add('d-none');
    } else {
        germanPrivacyPolicy.classList.remove('d-none');
        englishPrivacyPolicy.classList.add('d-none');
    }
}