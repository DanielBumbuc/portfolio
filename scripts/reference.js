
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
    const visibleReferences = getVisibleReferences();
    if (!referenceCollection) return;
    referenceCollection.innerHTML = '';
    visibleReferences.forEach((reference, index) => {
        const position = index === 1 ? 'center' : (index === 0 ? 'left' : 'right');
        const isActive = index === 1;
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

function getVisibleReferences() {
    const visibleRefs = [];
    const prevIndex = currentReferenceIndex === 0 ? references.length - 1 : currentReferenceIndex - 1;
    const nextIndex = currentReferenceIndex === references.length - 1 ? 0 : currentReferenceIndex + 1;
    visibleRefs.push(references[prevIndex]);
    visibleRefs.push(references[currentReferenceIndex]);
    visibleRefs.push(references[nextIndex]);
    return visibleRefs;
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
    currentReferenceIndex = currentReferenceIndex === references.length - 1 ? 0 : currentReferenceIndex + 1;
    renderReferences();
    updateSliderIndicators();
}

function prevReference() {
    currentReferenceIndex = currentReferenceIndex === 0 ? references.length - 1 : currentReferenceIndex - 1;
    renderReferences();
    updateSliderIndicators();

}

function updateSliderIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentReferenceIndex);
    });
}


document.addEventListener('DOMContentLoaded', loadReferences);
