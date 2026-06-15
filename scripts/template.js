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

function indicatorTemplate(index, currentIndex) {
    return `<span class="indicator ${index === currentIndex ? 'active' : ''}">•</span>`;
}
