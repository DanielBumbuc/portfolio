function init() {
    initMarquee();
}

// Marquee Animation
function initMarquee() {
    
    const marquee = document.querySelector('.marquee');
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (!marquee || !marqueeContent) return;
    
    // Klone den ursprünglichen Inhalt mehrfach für nahtlose Wiederholung
    const originalContent = marqueeContent.innerHTML;
    const windowWidth = window.innerWidth;
    
    // Berechne wie oft der Inhalt dupliziert werden muss basierend auf Fensterbreite
    const contentWidth = marqueeContent.scrollWidth;
    const repetitions = Math.ceil((windowWidth * 2) / contentWidth) + 2;
    
    // Erstelle genügend Kopien für nahtlose Animation
    let repeatedContent = '';
    for (let i = 0; i < repetitions; i++) {
        repeatedContent += originalContent;
    }
    
    marqueeContent.innerHTML = repeatedContent;
    
    // Starte Animation
    startMarqueeAnimation(marqueeContent);
}

function startMarqueeAnimation(element) {
    // Entferne vorherige Animation falls vorhanden
    element.style.animation = 'none';
    
    // Berechne die Dauer basierend auf der Breite für konstante Geschwindigkeit
    const contentWidth = element.scrollWidth / 2; // Hälfte wegen Duplikation
    const speed = 100; // Pixel pro Sekunde - anpassbar
    const duration = contentWidth / speed;
    
    // Setze CSS Custom Property für die Animation
    element.style.setProperty('--marquee-duration', `${duration}s`);
    
    // Starte Animation mit kurzer Verzögerung
    requestAnimationFrame(() => {
        element.style.animation = `marqueeScroll var(--marquee-duration) linear infinite`;
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initMarquee);
window.addEventListener('resize', initMarquee);

