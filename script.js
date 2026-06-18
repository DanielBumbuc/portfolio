let currentLanguage = localStorage.getItem('language') || 'EN';
let translations = {};
let burgerMenuOpen = false;
let marqueeArr = [];
let marqueeFrameId = null;


async function init() {
    await includeHTML();
    await loadTranslations();
    setInitialLanguageState();
    loadCurrentLanguage();
    initMarquee();
    setBurgerMenu();
    checkContactBtn();
}

async function setLanguage() {
    let englishBtn = document.getElementById('english-btn');
    let germanBtn = document.getElementById('german-btn');
    checkCurrentLanguage(englishBtn, germanBtn);
    initMarquee();
    updateLegalPageTexts();
    updatePrivacyPolicyTexts();
    await loadCurrentLanguage();
}

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

function loadCurrentLanguage() {
    localStorage.setItem('language', currentLanguage);
    loadProjects();
    loadReferences();
    updatePageTexts();
}

function scrollToTop() {
    window.scrollTo({
        top: 0
    });
}

function initMarquee() {
    const marqueeContainer = document.getElementById('marquee_container');
    let marqueeLength = 3;
    if (marqueeFrameId) {
        cancelAnimationFrame(marqueeFrameId);
        marqueeFrameId = null;
    }
    marqueeArr = [];
    marqueeContainer.innerHTML = '';
    for (let index = 0; index < marqueeLength; index++) {
        pushMarqueeContent();
    }
    marqueeContainer.innerHTML = marqueeArr.join('');
    startMarqueeAnimation(marqueeContainer);
    watchFirstSpan(marqueeContainer);
}

function pushMarqueeContent() {
    marqueeArr.push(marqueeTemplate(currentLanguage));
}

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