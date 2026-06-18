
let references = [];
let currentReferenceIndex = 0;

/**
 * Fetches the references data from the JSON file, filters it by the current language,
 * and triggers rendering of the reference cards and slider indicators.
 * @returns {Promise<void>}
 */
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

/**
 * Clears the reference collection container and renders the five visible
 * reference cards based on the current slider position.
 */
function renderReferences() {
    const referenceCollection = document.querySelector('.reference-collection');
    if (!referenceCollection) return;
    referenceCollection.innerHTML = '';
    getReferencePosititon().forEach((reference, index) => {
        const { position, isActive } = getPositionData(index);
        referenceCollection.innerHTML += referenceCardTemplate(reference, position, isActive);
    });
}

/**
 * Returns the CSS position class name and active state for a reference card
 * based on its index in the five-item slider window.
 * @param {number} index - The position index (0–4) in the visible slider range.
 * @returns {{ position: string, isActive: boolean }}
 */
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

/**
 * Calculates the five references to display centered around the current index,
 * wrapping around the array with modulo arithmetic.
 * @returns {Array<Object>} An array of five reference objects with an added id property.
 */
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

/**
 * Renders the dot indicators for the reference slider, marking the
 * indicator at the current index as active.
 */
function renderIndicators() {
    const sliderIndicator = document.getElementById('slider_indicator');
    let indicatorsHTML = '';
    references.forEach((reference, index) => {
        indicatorsHTML += indicatorTemplate(index, currentReferenceIndex);
    });
    sliderIndicator.innerHTML = indicatorsHTML;
}

/**
 * Advances the slider to the next reference by animating the current elements,
 * then re-rendering after the animation completes.
 */
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

/**
 * Moves the slider to the previous reference by animating the current elements,
 * then re-rendering after the animation completes.
 */
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

/**
 * Syncs the active CSS class on all dot indicators with the current reference index.
 */
function updateSliderIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentReferenceIndex);
    });
}

/**
 * Applies a CSS transform, height, and opacity to a single slider element.
 * @param {HTMLElement} element - The slider card element to style.
 * @param {number} translateX - The horizontal translation distance in pixels.
 * @param {string} height - The target height, e.g. '300px'.
 * @param {string} opacity - The target opacity, e.g. '0.7'.
 */
function setElementStyle(element, translateX, height, opacity) {
    element.style.transform = `translateX(${translateX}px)`;
    element.style.height = height;
    element.style.opacity = opacity;
}

/**
 * Reads and returns the bounding client rects for all five slider card elements.
 * @param {{ active: HTMLElement, left: HTMLElement, right: HTMLElement, outerLeft: HTMLElement, outerRight: HTMLElement }} elements
 * @returns {{ active: DOMRect, left: DOMRect, right: DOMRect, outerLeft: DOMRect, outerRight: DOMRect }}
 */
function getElementRects(elements) {
    return {
        active: elements.active.getBoundingClientRect(),
        left: elements.left.getBoundingClientRect(),
        right: elements.right.getBoundingClientRect(),
        outerLeft: elements.outerLeft.getBoundingClientRect(),
        outerRight: elements.outerRight.getBoundingClientRect()
    };
}

/**
 * Animates all five slider cards for a forward (next) transition by
 * calculating pixel distances from the current rects and applying styles.
 * @param {{ active: HTMLElement, left: HTMLElement, right: HTMLElement, outerLeft: HTMLElement, outerRight: HTMLElement }} elements
 * @param {{ active: DOMRect, left: DOMRect, right: DOMRect, outerLeft: DOMRect, outerRight: DOMRect }} r - The bounding rects before animation.
 */
function animateNext(elements, r) {
    elements.right.innerHTML += '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">';
    setElementStyle(elements.outerLeft, r.outerLeft.right - r.left.right, '300px', '0');
    setElementStyle(elements.outerRight, r.right.left - r.outerRight.left, '300px', '0.7');
    setElementStyle(elements.right, r.active.left - r.right.left, '350px', '1');
    setElementStyle(elements.active, r.left.right - r.active.right, '300px', '0.7');
    setElementStyle(elements.left, r.left.right - r.active.right, '300px', '0.7');
}

/**
 * Animates all five slider cards for a backward (prev) transition by
 * calculating pixel distances from the current rects and applying styles.
 * @param {{ active: HTMLElement, left: HTMLElement, right: HTMLElement, outerLeft: HTMLElement, outerRight: HTMLElement }} elements
 * @param {{ active: DOMRect, left: DOMRect, right: DOMRect, outerLeft: DOMRect, outerRight: DOMRect }} r - The bounding rects before animation.
 */
function animatePrev(elements, r) {
    elements.left.innerHTML += '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">';
    setElementStyle(elements.outerRight, r.outerRight.right - r.right.left, '300px', '0');
    setElementStyle(elements.outerLeft, r.left.right - r.outerLeft.right, '300px', '0.7');
    setElementStyle(elements.left, r.active.right - r.left.right, '350px', '1');
    setElementStyle(elements.active, r.right.right - r.active.right, '300px', '0.7');
    setElementStyle(elements.right, r.right.right - r.active.right, '300px', '0.7');
}

/**
 * Entry point for the slider animation. Captures current element rects,
 * removes the quotes icon from the active card, and delegates to
 * animateNext or animatePrev based on the direction.
 * @param {{ active: HTMLElement, left: HTMLElement, right: HTMLElement, outerLeft: HTMLElement, outerRight: HTMLElement }} elements
 * @param {'next'|'prev'} direction - The direction of the slide animation.
 */
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