let currentLanguage = 'EN';

function init() {
    loadCurrentLanguage();
    initMarquee();
}

function setLanguage() {
    let englishBtn = document.getElementById('english-btn');
    let germanBtn = document.getElementById('german-btn');
    localStorage.getItem('language', currentLanguage);
    if (currentLanguage === 'EN') {
        currentLanguage = 'DE';
        englishBtn.classList.remove('active-language');
        germanBtn.classList.add('active-language');
    } else {
        currentLanguage = 'EN';
        germanBtn.classList.remove('active-language');
        englishBtn.classList.add('active-language');
    }
    loadCurrentLanguage();
}

function loadCurrentLanguage() {
    localStorage.setItem('language', currentLanguage);
    loadProjects();
    loadReferences();
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

// function switchLanguage(language) {
//     currentLanguage = language;
//     loadProjects();
// }

document.addEventListener('DOMContentLoaded', initMarquee);
window.addEventListener('resize', initMarquee);

