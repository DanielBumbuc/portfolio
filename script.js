let currentLanguage = localStorage.getItem('language') || 'EN';
let translations = {};

async function init() {
    await includeHTML();
    await loadTranslations();
    setInitialLanguageState();
    loadCurrentLanguage();
    initMarquee();
}

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
    
    await loadCurrentLanguage();
    initMarquee(); // Restart marquee with new content
}

function loadCurrentLanguage() {
    localStorage.setItem('language', currentLanguage);
    loadProjects();
    loadReferences();
    updatePageTexts();
    console.log(currentLanguage);
}

function initMarquee() {
    const marquee = document.querySelector('.marquee');
    const marqueeContent = document.querySelector('.marquee-content');
    const originalContent = marqueeContent.innerHTML;
    if (!marquee || !marqueeContent) return;
    marqueeContent.innerHTML = originalContent + originalContent;
    startMarqueeAnimation(marqueeContent);
}

function startMarqueeAnimation(element) {
    element.style.animation = 'none';
    // element.offsetHeight;
    const singleCopyWidth = element.scrollWidth / 2;
    const speed = 100;
    const duration = singleCopyWidth / speed;
    element.style.setProperty('--translate-distance', `-${singleCopyWidth}px`);
    element.style.setProperty('--animation-duration', `${duration}s`);   
    requestAnimationFrame(() => {
        element.style.animation = `marqueeScroll var(--animation-duration) linear infinite`;
    });
}

// ===== TRANSLATION SYSTEM =====
function setInitialLanguageState() {
    let englishBtn = document.getElementById('english-btn');
    let germanBtn = document.getElementById('german-btn');
    
    if (currentLanguage === 'DE') {
        englishBtn.classList.remove('active-language');
        germanBtn.classList.add('active-language');
    } else {
        germanBtn.classList.remove('active-language');
        englishBtn.classList.add('active-language');
    }
}

async function loadTranslations() {
    try {
        const response = await fetch('./data/translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function translate(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
        value = value?.[k];
    }
    return value || key;
}

// Make translation function globally available
window.translate = translate;

function updatePageTexts() {
    // Update navigation
    updateElementText('.nav-links li:nth-child(1) a', 'navigation.about');
    updateElementText('.nav-links li:nth-child(2) a', 'navigation.skills');
    updateElementText('.nav-links li:nth-child(3) a', 'navigation.projects');
    
    // Update landing page
    updateElementText('.second-headline', 'landing.role');
    updateElementText('.nav-btn:nth-child(1) .marquee-btn-content', 'landing.checkWork');
    updateElementText('.nav-btn:nth-child(2) .marquee-btn-content', 'landing.contactMe');
    
    // Update marquee content
    updateMarqueeTexts();
    
    // Update about section
    updateElementText('.about-title', 'about.title');
    updateElementText('.about-info h2', 'about.heading');
    updateElementText('.main-about-info', 'about.intro');
    updateElementText('.single-info:nth-child(3) .info-text', 'about.location.text');
    updateElementText('.single-info:nth-child(4) .info-text', 'about.mindset.text');
    updateElementText('.single-info:nth-child(5) .info-text', 'about.approach.text');
    
    // Update skills section
    updateElementText('.skills-title', 'skills.title');
    updateElementText('.skill-content h2', 'skills.heading');
    updateElementText('.main-skill-info', 'skills.intro');
    updateElementText('.contact-headline', 'skills.contact.headline');
    updateElementText('.contact-text', 'skills.contact.text');
    updateElementText('.contact-request-btn .marquee-btn-content', 'skills.contact.button');
    
    // Update projects section
    updateElementText('.project-title', 'projects.title');
    updateElementText('.project-content h2', 'projects.heading');
    updateElementText('.main-project-info', 'projects.intro');
    
    // Update references section
    updateElementText('.reference-title', 'references.heading');
    
    // Update contact section
    updateElementText('.contact-title', 'contact.title');
    updateElementText('.contact-content h2', 'contact.heading');
    updateElementText('.main-contact-headline', 'contact.subheading');
    updateElementText('.main-contact-info', 'contact.intro');
    updateElementText('.green-text', 'contact.highlight');
    
    // Update contact form
    updateElementText('label[for="name"]', 'contact.form.nameLabel');
    updateElementText('label[for="email"]', 'contact.form.emailLabel');
    updateElementText('label[for="message"]', 'contact.form.messageLabel');
    updateElementText('.checkbox-text', 'contact.form.privacy');
    updateElementText('.contact-btn .marquee-btn-content', 'contact.form.submit');
    updateElementText('.unchecked-error', 'contact.validation.privacyRequired');
    
    // Update placeholders
    updatePlaceholder('#name_input', 'contact.form.namePlaceholder');
    updatePlaceholder('#email_input', 'contact.form.emailPlaceholder');
    updatePlaceholder('#message_input', 'contact.form.messagePlaceholder');
    
    // Update footer
    updateElementText('.footer-info p:nth-child(1)', 'footer.role');
    updateElementText('.footer-info p:nth-child(2)', 'footer.location');
    updateElementText('.copy-right', 'footer.copyright');
    updateElementText('.footer-links li:nth-child(1) a', 'footer.links.github');
    updateElementText('.footer-links li:nth-child(2) a', 'footer.links.linkedin');
    updateElementText('.footer-links li:nth-child(3) a', 'footer.links.email');
    updateElementText('.footer-links li:nth-child(4) a', 'footer.links.legal');
}

function updateElementText(selector, translationKey) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = translate(translationKey);
    }
}

function updatePlaceholder(selector, translationKey) {
    const element = document.querySelector(selector);
    if (element) {
        element.placeholder = translate(translationKey);
        // Update blur placeholder as well based on existing onfocus/onblur
        element.setAttribute('data-placeholder', translate(translationKey));
    }
}

function updateMarqueeTexts() {
    const marqueeContent = document.querySelector('.marquee-content span');
    if (marqueeContent) {
        marqueeContent.innerHTML = `
            ${translate('landing.available')}
            <span class="separator">•</span>
            ${translate('landing.developer')}
            <span class="separator">•</span>
            ${translate('landing.based')}
            <span class="separator">•</span>
            ${translate('landing.relocate')}
            <span class="separator">•</span>
        `;
    }
}

// ===== END TRANSLATION SYSTEM =====

const debouncedInitMarquee = debounce(() => {
  requestAnimationFrame(() => {
    initMarquee();
  });
}, 200);

document.addEventListener('DOMContentLoaded', initMarquee);
window.addEventListener('resize', debouncedInitMarquee);
