/**
 * Finds a DOM element by CSS selector and sets its text content
 * to the translated value of the given key.
 * @param {string} selector - A CSS selector for the target element.
 * @param {string} translationKey - A dot-notation translation key.
 */
function updateElementText(selector, translationKey) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = translate(translationKey);
    }
}

/**
 * Updates the placeholder of an input element. If the element currently
 * has an error state with a stored error key, the error message is re-translated
 * instead of the default placeholder, ensuring language switches preserve errors.
 * Also updates the data-placeholder attribute with the default translated value.
 * @param {string} selector - A CSS selector for the target input element.
 * @param {string} translationKey - A dot-notation translation key for the default placeholder.
 */
function updatePlaceholder(selector, translationKey) {
    const element = document.querySelector(selector);
    if (!element) return;
    const errorKey = element.getAttribute('data-error-key');
    if (element.classList.contains('error-state') && errorKey) {
        element.placeholder = translate(errorKey);
    } else {
        element.placeholder = translate(translationKey);
    }
    element.setAttribute('data-placeholder', translate(translationKey));
}

/**
 * Renders the privacy policy checkbox label as HTML, embedding a translated
 * anchor link for the privacy policy page.
 * @param {string} selector - A CSS selector for the label element.
 */
function updatePrivacyText(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const before = translate('contact.form.privacyBefore');
        const linkText = translate('contact.form.privacyLinkText');
        const linkUrl = translate('contact.form.privacyLinkUrl');
        const after = translate('contact.form.privacyAfter');
        element.innerHTML = `${before}<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>${after}`;
    }
}

/**
 * Updates all translatable text content on the main index page,
 * including navigation, sections, the contact form, placeholders, and footer.
 */
function updatePageTexts() {
    updateElementText('.nav-links li:nth-child(1) a', 'navigation.about');
    updateElementText('.nav-links li:nth-child(2) a', 'navigation.skills');
    updateElementText('.nav-links li:nth-child(3) a', 'navigation.projects');
    updateElementText('.second-headline', 'landing.role');
    updateElementText('.nav-btn:nth-child(1) .marquee-btn-content', 'landing.checkWork');
    updateElementText('.nav-btn:nth-child(2) .marquee-btn-content', 'landing.contactMe');
    updateElementText('.about-title', 'about.title');
    updateElementText('.about-info h2', 'about.heading');
    updateElementText('.main-about-info', 'about.intro');
    updateElementText('.single-info:nth-child(3) .info-text', 'about.location.text');
    updateElementText('.single-info:nth-child(4) .info-text', 'about.mindset.text');
    updateElementText('.single-info:nth-child(5) .info-text', 'about.approach.text');
    updateElementText('.skills-title', 'skills.title');
    updateElementText('.skill-content h2', 'skills.heading');
    updateElementText('.main-skill-info', 'skills.intro');
    updateElementText('.contact-headline', 'skills.contact.headline');
    updateElementText('.contact-text', 'skills.contact.text');
    updateElementText('.contact-request-btn .marquee-btn-content', 'skills.contact.button');
    updateElementText('.project-title', 'projects.title');
    updateElementText('.project-content h2', 'projects.heading');
    updateElementText('.main-project-info', 'projects.intro');
    updateElementText('.reference-title', 'references.heading');
    updateElementText('.contact-title', 'contact.title');
    updateElementText('.contact-content h2', 'contact.heading');
    updateElementText('.main-contact-headline', 'contact.subheading');
    updateElementText('.main-contact-info', 'contact.intro');
    updateElementText('.green-text', 'contact.highlight');
    updateElementText('label[for="name"]', 'contact.form.nameLabel');
    updateElementText('label[for="email"]', 'contact.form.emailLabel');
    updateElementText('label[for="message"]', 'contact.form.messageLabel');
    updatePrivacyText('.checkbox-text');
    updateElementText('.contact-btn .marquee-btn-content', 'contact.form.submit');
    updateElementText('.unchecked-error', 'contact.validation.privacyRequired');
    updatePlaceholder('#name_input', 'contact.form.namePlaceholder');
    updatePlaceholder('#email_input', 'contact.form.emailPlaceholder');
    updatePlaceholder('#message_input', 'contact.form.messagePlaceholder');
    updateElementText('.footer-info p:nth-child(1)', 'footer.role');
    updateElementText('.footer-info p:nth-child(2)', 'footer.location');
    updateElementText('.copy-right', 'footer.copyright');
    updateElementText('.footer-links li:nth-child(1) a', 'footer.links.github');
    updateElementText('.footer-links li:nth-child(2) a', 'footer.links.linkedin');
    updateElementText('.footer-links li:nth-child(3) a', 'footer.links.email');
    updateElementText('.footer-links li:nth-child(4) a', 'footer.links.legal');
}

/**
 * Updates all translatable text content on the legal (imprint) page.
 */
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
