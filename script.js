function init() {
    initMarquee();
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

document.addEventListener('DOMContentLoaded', initMarquee);
window.addEventListener('resize', initMarquee);

