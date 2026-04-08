
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
    // const visibleReferences = getVisibleReferences();
    if (!referenceCollection) return;

    // Zeige 3 Elemente für den Slider an
    const allRefs = getReferencePosititon(); //getExtendedReferences(); // 3 Elemente
    referenceCollection.innerHTML = '';

    allRefs.forEach((reference, index) => {
        let position;
        let isActive = false;
        
        
        console.log(reference.id, index);
        

        switch (index) {
            case 0: position = 'outer-left'; break;
            case 1: position = 'left'; break;
            case 2: position = 'center'; isActive = true; break;
            case 3: position = 'right'; break;
            case 4: position = 'outer-right'; break;
        }


        const referenceHTML = `
            <div class="single-reference ${position} ${isActive ? 'active' : ''}">
                ${isActive ? '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">' : ''}
                <p class="reference-text">${reference.reference}</p>
                <div class="reference-info">
                    <span class="horizontal-line"></span>
                    <p class="reference-name">${reference.name} - ${reference.role}</p>
                </div>
            </div>
        `;
        referenceCollection.innerHTML += referenceHTML;
    });
}

function getReferencePosititon() {
    const extendedRefs = [];
    const totalRefs = references.length;
    
    // Berechne die 5 Positionen basierend auf currentReferenceIndex
    // Position 2 (center) sollte immer der currentReferenceIndex sein
    for (let i = 0; i < 5; i++) {
        // -2, -1, 0, +1, +2 relativ zum currentReferenceIndex
        let relativeIndex = i - 2; // Das macht aus [0,1,2,3,4] -> [-2,-1,0,1,2]
        let actualIndex = (currentReferenceIndex + relativeIndex + totalRefs) % totalRefs;
        extendedRefs.push({
            ...references[actualIndex],
            id: actualIndex // Original-Index für Debugging
        });
    }
    
    return extendedRefs;
}

function renderIndicators() {
    const sliderIndicator = document.getElementById('slider_indicator');

    let indicatorsHTML = '';
    references.forEach((reference, index) => {
        indicatorsHTML += `<span class="indicator ${index === currentReferenceIndex ? 'active' : ''}">•</span>`;
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

function animateIndividualReferences(elements, direction) {
    // Aktuelle Positionen ermitteln
    const activeRect = elements.active.getBoundingClientRect();
    const leftRect = elements.left.getBoundingClientRect();
    const rightRect = elements.right.getBoundingClientRect();
    const outerLeftRect = elements.outerLeft.getBoundingClientRect();
    const outerRightRect = elements.outerRight.getBoundingClientRect();
    const quotesIcon = elements.active.querySelector('.quotes-icon');
    quotesIcon.remove();


    if (direction === 'next') {
        elements.right.innerHTML += '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">';

        // Präzise Berechnung der Bewegungsdistanzen
        const rightToActiveDistance = activeRect.left - rightRect.left;
        const activeToLeftDistance = leftRect.right - activeRect.right;
        const outerRightToRightDistance = rightRect.left - outerRightRect.left;
        const leftToOuterLeftDistance = outerLeftRect.right - leftRect.right;


        if (elements.outerLeft) {
            elements.outerLeft.style.transform = `translateX(${leftToOuterLeftDistance}px)`;
            elements.outerLeft.style.height = '300px';
            elements.outerLeft.style.opacity = '0';
        }

        if (elements.outerRight) {
            elements.outerRight.style.transform = `translateX(${outerRightToRightDistance}px)`;
            elements.outerRight.style.height = '300px';
            elements.outerRight.style.opacity = '0.7';
        }

        if (elements.right) {
            elements.right.style.transform = `translateX(${rightToActiveDistance}px)`;
            elements.right.style.height = '350px';
            elements.right.style.opacity = '1';
        }

        if (elements.active) {

            elements.active.style.transform = `translateX(${activeToLeftDistance}px)`;
            elements.active.style.height = '300px';
            elements.active.style.opacity = '0.7';
        }

        if (elements.left) {
            elements.left.style.transform = `translateX(${activeToLeftDistance}px)`;
            elements.left.style.height = '300px';
            elements.left.style.opacity = '0.7';
        }
    } else { // prev
        // Präzise Berechnung der Bewegungsdistanzen
        elements.left.innerHTML += '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">';

        const leftToActiveDistance = activeRect.right - leftRect.right;
        const activeToRightDistance = rightRect.right - activeRect.right;
        const rightToOuterRightDistance = outerRightRect.right - rightRect.left;
        const outerLeftToLeftDistance = leftRect.right - outerLeftRect.right;

        if (elements.outerRight) {
            elements.outerRight.style.transform = `translateX(${rightToOuterRightDistance}px)`;
            elements.outerRight.style.height = '300px';
            elements.outerRight.style.opacity = '0';
        }

        if (elements.outerLeft) {
            elements.outerLeft.style.transform = `translateX(${outerLeftToLeftDistance}px)`;
            elements.outerLeft.style.height = '300px';
            elements.outerLeft.style.opacity = '0.7';
        }

        // Left → Active
        if (elements.left) {
            elements.left.style.transform = `translateX(${leftToActiveDistance}px)`;
            elements.left.style.height = '350px';
            elements.left.style.opacity = '1';
        }

        // Active → Right  
        if (elements.active) {
            elements.active.style.transform = `translateX(${activeToRightDistance}px)`;
            elements.active.style.height = '300px';
            elements.active.style.opacity = '0.7';
        }

        // Right → Out
        if (elements.right) {
            elements.right.style.transform = `translateX(${activeToRightDistance}px)`;
            elements.right.style.height = '300px';
            elements.right.style.opacity = '0.7';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadReferences);
