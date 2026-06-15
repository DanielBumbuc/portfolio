
let references = [];
let currentReferenceIndex = 0;

async function loadReferences() {
    try {
        const response = await fetch('./data/reference.json');
        const data = await response.json();
        references = data[currentLanguage];
        renderReferences();
        renderIndicators();
    } catch (error) {
        console.error('Error loading references:', error);
    }
}

function renderReferences() {
    const referenceCollection = document.querySelector('.reference-collection');
    if (!referenceCollection) return;
    referenceCollection.innerHTML = '';
    getReferencePosititon().forEach((reference, index) => {
        const { position, isActive } = getPositionData(index);
        referenceCollection.innerHTML += referenceCardTemplate(reference, position, isActive);
    });
}

function getPositionData(index) {
    let position;
    let isActive = false;
    switch (index) {
        case 0: position = 'outer-left'; break;
        case 1: position = 'left'; break;
        case 2: position = 'center'; isActive = true; break;
        case 3: position = 'right'; break;
        case 4: position = 'outer-right'; break;
    }
    return { position, isActive };
}

function getReferencePosititon() {
    const extendedRefs = [];
    const totalRefs = references.length;
    for (let i = 0; i < 5; i++) {
        let relativeIndex = i - 2;
        let actualIndex = (currentReferenceIndex + relativeIndex + totalRefs) % totalRefs;
        extendedRefs.push({
            ...references[actualIndex],
            id: actualIndex
        });
    }
    return extendedRefs;
}

function renderIndicators() {
    const sliderIndicator = document.getElementById('slider_indicator');
    let indicatorsHTML = '';
    references.forEach((reference, index) => {
        indicatorsHTML += indicatorTemplate(index, currentReferenceIndex);
    });
    sliderIndicator.innerHTML = indicatorsHTML;
}

function nextReference() {
    const currentElements = {
        outerLeft: document.querySelector('.single-reference.outer-left'),
        left: document.querySelector('.single-reference.left'),
        active: document.querySelector('.single-reference.active'),
        right: document.querySelector('.single-reference.right'),
        outerRight: document.querySelector('.single-reference.outer-right')
    };
    animateIndividualReferences(currentElements, 'next');
    setTimeout(() => {
        currentReferenceIndex = currentReferenceIndex === references.length - 1 ? 0 : currentReferenceIndex + 1;
        renderReferences();
        updateSliderIndicators();
    }, 350);
}

function prevReference() {
    const currentElements = {
        outerLeft: document.querySelector('.single-reference.outer-left'),
        left: document.querySelector('.single-reference.left'),
        active: document.querySelector('.single-reference.active'),
        right: document.querySelector('.single-reference.right'),
        outerRight: document.querySelector('.single-reference.outer-right')
    };
    animateIndividualReferences(currentElements, 'prev');
    setTimeout(() => {
        currentReferenceIndex = currentReferenceIndex === 0 ? references.length - 1 : currentReferenceIndex - 1;
        renderReferences();
        updateSliderIndicators();
    }, 350);
}

function updateSliderIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentReferenceIndex);
    });
}

function setElementStyle(element, translateX, height, opacity) {
    element.style.transform = `translateX(${translateX}px)`;
    element.style.height = height;
    element.style.opacity = opacity;
}

function getElementRects(elements) {
    return {
        active: elements.active.getBoundingClientRect(),
        left: elements.left.getBoundingClientRect(),
        right: elements.right.getBoundingClientRect(),
        outerLeft: elements.outerLeft.getBoundingClientRect(),
        outerRight: elements.outerRight.getBoundingClientRect()
    };
}

function animateNext(elements, r) {
    elements.right.innerHTML += '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">';
    setElementStyle(elements.outerLeft, r.outerLeft.right - r.left.right, '300px', '0');
    setElementStyle(elements.outerRight, r.right.left - r.outerRight.left, '300px', '0.7');
    setElementStyle(elements.right, r.active.left - r.right.left, '350px', '1');
    setElementStyle(elements.active, r.left.right - r.active.right, '300px', '0.7');
    setElementStyle(elements.left, r.left.right - r.active.right, '300px', '0.7');
}

function animatePrev(elements, r) {
    elements.left.innerHTML += '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">';
    setElementStyle(elements.outerRight, r.outerRight.right - r.right.left, '300px', '0');
    setElementStyle(elements.outerLeft, r.left.right - r.outerLeft.right, '300px', '0.7');
    setElementStyle(elements.left, r.active.right - r.left.right, '350px', '1');
    setElementStyle(elements.active, r.right.right - r.active.right, '300px', '0.7');
    setElementStyle(elements.right, r.right.right - r.active.right, '300px', '0.7');
}

function animateIndividualReferences(elements, direction) {
    const rects = getElementRects(elements);
    elements.active.querySelector('.quotes-icon').remove();
    if (direction === 'next') {
        animateNext(elements, rects);
    } else {
        animatePrev(elements, rects);
    }
}

document.addEventListener('DOMContentLoaded', loadReferences);