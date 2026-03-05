
let references = [];

async function loadReferences() {
    try {
        const response = await fetch('./data/data.json');
        const data = await response.json();
        references = data[currentLanguage];
        renderReferences();
    } catch (error) {
        console.error('Error loading references:', error);
    }
}

function renderReferences() {
    const referenceCollection = document.querySelector('.reference-collection');
    if (!referenceCollection) return;
    referenceCollection.innerHTML = '';
    references.forEach((reference, index) => {
        // const referenceHTML = `
        //     <span class="single-reference-container" data-reference="${index}">
        //         <div class="left-reference-side">
        //             <p class="reference-name">${reference.name} 
        //                 <img class="arrow-icon d-none" src="./assets/img/arrow_outward.svg" alt="">
        //             </p>
        //             <p class="reference-info">
        //                 ${reference.technologies.map(tech => tech.name).join(' | ')}
        //             </p>
        //         </div>
        //         <img class="reference-preview-img d-none" src="${reference.image}" alt="${reference.name} Preview">
        //         <img class="preview-img-bg d-none" src="./assets/img/preview-img_bg.svg" alt="">
        //     </span>
        // `;
        referenceCollection.innerHTML += referenceHTML;
    });


    addReferenceEventListeners();
}