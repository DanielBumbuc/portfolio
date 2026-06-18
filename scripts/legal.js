async function initLegal() {
    await includeHTML();
    await loadTranslations();
    setInitialLanguageState();
    updateLegalPageTexts();
    updatePrivacyPolicyTexts();
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