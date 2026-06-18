/**
 * Initializes the legal page by loading HTML partials, translations,
 * setting the language state, and updating all legal page texts.
 * @returns {Promise<void>}
 */
async function initLegal() {
    await includeHTML();
    await loadTranslations();
    setInitialLanguageState();
    updateLegalPageTexts();
    updatePrivacyPolicyTexts();
}

/**
 * Shows the privacy policy in the current language and hides the other.
 * Does nothing if either policy element is not found in the DOM.
 */
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