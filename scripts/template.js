/**
 * Returns the HTML string for a single project card in the project list.
 * @param {Object} project - The project data object.
 * @param {string} project.name - The project name.
 * @param {string} project.image - The URL of the preview image.
 * @param {Array<{name: string}>} project.technologies - The list of technologies used.
 * @param {number} index - The index of the project in the projects array.
 * @returns {string} The HTML string for the project card.
 */
function projectCardTemplate(project, index) {
    return `
        <span class="single-project-container" data-project="${index}">
            <div class="left-project-side">
                <p class="project-name">${project.name} 
                    <img class="arrow-icon d-none" src="./assets/img/arrow_outward.svg" alt="">
                </p>
                <p class="project-info">
                    ${project.technologies.map(tech => tech.name).join(' | ')}
                </p>
            </div>
            <img class="project-preview-img d-none" src="${project.image}" alt="${project.name} Preview">
            <img class="preview-img-bg d-none" src="./assets/img/preview-img_bg.svg" alt="">
        </span>
    `;
}

/**
 * Returns the HTML string for the full project detail modal.
 * @param {Object} project - The project data object.
 * @param {string} project.name - The project name.
 * @param {string} project.description - The project description.
 * @param {string} project.modalImg - The URL of the modal preview image.
 * @param {string} project.githubUrl - The GitHub repository URL.
 * @param {string} project.liveUrl - The live demo URL.
 * @param {Array<{name: string, icon: string}>} project.technologies - The list of technologies used.
 * @param {number} index - The index of the project, used for navigation and display.
 * @returns {string} The HTML string for the project modal.
 */
function projectModalTemplate(project, index) {
    return `
        <div class="project-modal">
            <div class="left-modal-side">
                <h2 class="project-index">0${index + 1}</h2>
                <h3 class="project-modal-name">${project.name}</h3>
                <span class="modal-project-info">
                    <h3 class="title">${translate ? translate('projects.modal.about') : 'What is this project about?'}</h3>
                    <p class="description">
                        ${project.description}
                    </p>
                </span>
                <span class="used-technologies">
                    ${project.technologies.map(tech => `
                        <span class="technologie-container">
                            <img class="technologie-icon" src="${tech.icon}" alt="${tech.name}">
                            <p class="technologie-name">${tech.name}</p>
                        </span>
                    `).join('')}
                </span>
                <div class="project-btn-container">
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
                        <span class="project-btn">${translate ? translate('projects.modal.github') : 'GitHub'}<img class="arrow-icon" src="./assets/img/icons/arrow_outward_green.svg" alt="GitHub">
                        </span>
                    </a>
                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
                        <span class="project-btn">
                            ${translate ? translate('projects.modal.liveTest') : 'Live Test'}<img class="arrow-icon" src="./assets/img/icons/arrow_outward_green.svg" alt="Live Test">
                        </span>
                    </a>
                </div>
                <span class="next-project-responsive d-none" onclick="nextProject(${index})">${translate ? translate('projects.modal.nextProject') : 'Next project'}<img class="next-icon" src="./assets/img/icons/right_arrow_green.svg" alt="arrow icon"></span>
            </div>
            <div class="modal-right-side">
                <img class="close-btn" src="./assets/img/icons/default_icon.svg" alt="close icon" onclick="closeModal()" onmouseenter="this.src='./assets/img/icons/default_hover_icon.svg'" onmouseleave="this.src='./assets/img/icons/default_icon.svg'">
                <img class="modal-preview-img" src="${project.modalImg}" alt="${project.name} Preview">
                <span class="next-project" onclick="nextProject(${index})">${translate ? translate('projects.modal.nextProject') : 'Next project'}<img class="next-icon" src="./assets/img/icons/right_arrow_green.svg" alt="arrow icon"></span>
            </div>
        </div>
    `;
}

/**
 * Returns the HTML string for a single reference card in the slider.
 * @param {Object} reference - The reference data object.
 * @param {string} reference.reference - The reference quote text.
 * @param {string} reference.name - The name of the person giving the reference.
 * @param {string} reference.role - The role/title of the person.
 * @param {string} position - The CSS position class, e.g. 'center', 'left', 'outer-right'.
 * @param {boolean} isActive - Whether this card is the currently active (center) card.
 * @returns {string} The HTML string for the reference card.
 */
function referenceCardTemplate(reference, position, isActive) {
    return `
        <div class="single-reference ${position} ${isActive ? 'active' : ''}">
            ${isActive ? '<img class="quotes-icon" src="./assets/img/icons/quotes.svg" alt="">' : ''}
            <p class="reference-text">${reference.reference}</p>
            <div class="reference-info">
                <span class="horizontal-line"></span>
                <p class="reference-name">${reference.name} - ${reference.role}</p>
            </div>
        </div>
    `;
}

/**
 * Returns the HTML string for a single slider dot indicator.
 * @param {number} index - The index of this indicator.
 * @param {number} currentIndex - The index of the currently active reference.
 * @returns {string} The HTML string for the indicator span.
 */
function indicatorTemplate(index, currentIndex) {
    return `<span class="indicator ${index === currentIndex ? 'active' : ''}">•</span>`;
}

/**
 * Returns the HTML string for a single marquee content span
 * in the given language.
 * @param {'EN'|'DE'} language - The language code to render content for.
 * @returns {string} The HTML string for the marquee content span.
 */
function marqueeTemplate(language) {
    if (language === 'DE') {
        return `<span class="marquee-content">
                    Verfügbar für Remote-Arbeit
                    <span class="separator">•</span>
                    Frontend Entwickler
                    <span class="separator">•</span>
                    Ansässig in Sindelfingen
                    <span class="separator">•</span>
                    Offen für Umzug
                    <span class="separator">•</span>
                </span>`;
    }
    return `<span class="marquee-content">
                    Available for remote work
                    <span class="separator">•</span>
                    Frontend Developer
                    <span class="separator">•</span>
                    Based in Sindelfingen
                    <span class="separator">•</span>
                    Open to relocate
                    <span class="separator">•</span>
                </span>`;
}
