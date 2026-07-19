let currentLanguage = localStorage.getItem('language') || 'EN';
let translations = {};
let burgerMenuOpen = false;
let marqueeArr = [];
let marqueeFrameId = null;


/**
 * Initializes the application by loading translations,
 * setting the language state, loading content, and setting up the UI.
 * @returns {Promise<void>}
 */
async function init() {
    await loadTranslations();
    setInitialLanguageState();
    loadCurrentLanguage();
    initMarquee();
    setBurgerMenu();
    checkContactBtn();
    AOS.init();

}

/**
 * Toggles the current language, reinitializes the marquee,
 * updates legal page texts, and reloads all translated content.
 * @returns {Promise<void>}
 */
async function setLanguage() {
    let englishBtn = document.getElementById('english-btn');
    let germanBtn = document.getElementById('german-btn');
    checkCurrentLanguage(englishBtn, germanBtn);
    initMarquee();
    updateLegalPageTexts();
    updatePrivacyPolicyTexts();
    await loadCurrentLanguage();
}

/**
 * Switches the active language between EN and DE, updates the
 * language button styles, and persists the choice to localStorage.
 * @param {HTMLElement} englishBtn - The English language toggle button.
 * @param {HTMLElement} germanBtn - The German language toggle button.
 */
function checkCurrentLanguage(englishBtn, germanBtn) {
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
}

/**
 * Persists the current language to localStorage and triggers
 * a full reload of projects, references, and page texts.
 */
function loadCurrentLanguage() {
    localStorage.setItem('language', currentLanguage);
    loadProjects();
    loadReferences();
    updatePageTexts();
}

/**
 * Scrolls the page back to the top.
 */
function scrollToTop() {
    window.scrollTo({
        top: 0
    });
}

/**
 * Initializes the marquee by cancelling any running animation frame,
 * building the initial HTML from templates, and starting the scroll animation.
 */
function initMarquee() {
    const marqueeContainer = document.getElementById('marquee_container');
    let marqueeLength = 3;
    if (marqueeFrameId) {
        cancelAnimationFrame(marqueeFrameId);
        marqueeFrameId = null;
    }
    marqueeArr = [];
    if (!marqueeContainer) return;
    marqueeContainer.innerHTML = '';
    for (let index = 0; index < marqueeLength; index++) {
        pushMarqueeContent();
    }
    marqueeContainer.innerHTML = marqueeArr.join('');
    startMarqueeAnimation(marqueeContainer);
    watchFirstSpan(marqueeContainer);
}

/**
 * Appends a new marquee content item for the current language to the marquee array.
 */
function pushMarqueeContent() {
    marqueeArr.push(marqueeTemplate(currentLanguage));
}

/**
 * Starts the CSS scroll animation on the marquee container,
 * calculating the duration based on the total content width and a fixed speed.
 * @param {HTMLElement} element - The marquee container element.
 */
function startMarqueeAnimation(element) {
    element.style.animation = 'none';
    const totalWidth = element.scrollWidth;
    const speed = 100;
    const duration = totalWidth / speed;
    element.style.setProperty('--translate-distance', `-${totalWidth}px`);
    element.style.setProperty('--animation-duration', `${duration}s`);
    requestAnimationFrame(() => {
        element.style.animation = `marqueeScroll var(--animation-duration) linear 1 forwards`;
    });
}

/**
 * Watches the first span in the marquee container using requestAnimationFrame.
 * Once it scrolls out of view, removes it from the array, appends new content,
 * and restarts the animation to create a seamless loop.
 * @param {HTMLElement} container - The marquee container element.
 */
function watchFirstSpan(container) {
    const firstSpan = container.querySelector('span');
    if (!firstSpan) return;
    const marqueeWrapper = container.parentElement;
    function check() {
        const wrapperRect = marqueeWrapper.getBoundingClientRect();
        const spanRect = firstSpan.getBoundingClientRect();
        if (spanRect.right <= wrapperRect.left) {
            marqueeArr.splice(0, 1);
            pushMarqueeContent();
            startMarqueeAnimation(container);
            watchFirstSpan(container);
            return;
        }
        marqueeFrameId = requestAnimationFrame(check);
    }
    marqueeFrameId = requestAnimationFrame(check);
}

// ===== TRANSLATION SYSTEM =====

/**
 * Sets the initial active state of the language toggle buttons
 * based on the language stored in localStorage.
 */
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

/**
 * Fetches the translations JSON file and stores it in the global
 * translations object.
 * @returns {Promise<void>}
 */
async function loadTranslations() {
    try {
        const response = await fetch('./data/translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

/**
 * Looks up a translation value by dot-notation key for the current language.
 * Falls back to the key itself if no translation is found.
 * @param {string} key - Dot-notation translation key, e.g. 'contact.form.submit'.
 * @returns {string} The translated string, or the key if not found.
 */
function translate(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
        value = value?.[k];
    }
    return value || key;
}

/**
 * Shows or hides the burger menu icon based on the current viewport width.
 * Automatically closes the menu when switching to desktop view.
 */
function setBurgerMenu() {
    const burgerMenuIcon = document.querySelector('.burger-menu-icon');
    setTimeout(() => {
        if (window.innerWidth <= 900) {
            burgerMenuIcon.classList.remove('d-none');
        } else {
            burgerMenuIcon.classList.add('d-none');
            closeBurgerMenu();
        }
    }, 200);
}

/**
 * Opens the burger menu by applying the overlay and menu styles,
 * or closes it if it is already open.
 */
function openBurgerMenu() {
    const overlay = document.getElementById('overlay');
    const leftContainer = document.getElementById('left_container');
    const burgerMenuIcon = document.querySelector('.burger-menu-icon');
    if (!burgerMenuOpen) {
        overlay.classList.add('overlay');
        overlay.classList.remove('modal-overlay');
        overlay.classList.remove('d-none');
        burgerMenuIcon.classList.add('active');
        leftContainer.classList.remove('left-container');
        leftContainer.classList.add('burger-menu');
        burgerMenuOpen = true;
    } else {
        closeBurgerMenu();
    }
}

/**
 * Closes the burger menu by removing the overlay and resetting
 * all related element classes to their default state.
 */
function closeBurgerMenu() {
    const overlay = document.getElementById('overlay');
    const leftContainer = document.getElementById('left_container');
    const burgerMenuIcon = document.querySelector('.burger-menu-icon');
    overlay.classList.remove('overlay');
    overlay.classList.add('modal-overlay');
    overlay.classList.add('d-none');
    burgerMenuIcon.classList.remove('active');
    leftContainer.classList.add('left-container');
    leftContainer.classList.remove('burger-menu');
    burgerMenuOpen = false;
}

window.translate = translate;
addEventListener('resize', setBurgerMenu);