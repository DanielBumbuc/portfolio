
let projects = [];
let currentLanguage = 'EN';

async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        projects = data[currentLanguage];
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects() {
    const projectCollection = document.querySelector('.project-collection');
    if (!projectCollection) return;
    projectCollection.innerHTML = '';
    projects.forEach((project, index) => {
        const projectHTML = `
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
        projectCollection.innerHTML += projectHTML;
    });


    addProjectEventListeners();
}

function addProjectEventListeners() {
    const projectContainers = document.querySelectorAll('.single-project-container');
    projectContainers.forEach((container, index) => {
        const projectSide = container.querySelector('.left-project-side');
        const previewImg = container.querySelector('.project-preview-img');
        const bgImg = container.querySelector('.preview-img-bg');
        const projectSection = document.querySelector('.projects');
        const modalOverlay = document.querySelector('.modal-overlay');

        projectSide.addEventListener('mouseenter', () => {
            previewImg.classList.remove('d-none');
            bgImg.classList.remove('d-none');
        });

        projectSide.addEventListener('mouseleave', () => {
            previewImg.classList.add('d-none');
            bgImg.classList.add('d-none');
        });

        projectSide.addEventListener('click', () => {
            document.body.classList.add('modal-open');
            const projectHTML = `
            <div class="project-modal">
                <div class="left-modal-side">
                            <h2 class="project-index">0${index + 1}</h2>
                            <h3 class="project-modal-name">${projects[index].name}</h3>
                            <span class="modal-project-info">
                                <h3 class="title">What is this project about?</h3>
                                <p class="description">
                                    ${projects[index].description}
                                </p>
                            </span>
                            <span class="used-technologies">
                                ${projects[index].technologies.map(tech => `
                                    <img class="technologie-icon" src="${tech.icon}" alt="${tech.name}">
                                    <p class="technologie-name">${tech.name}</p>
                                `).join('')}
                            </span>
                            <div class="project-btn-container">
                                <span class="project-btn">GitHub<img class="arrow-icon" src="./assets/img/icons/arrow_outward_green.svg" alt="GitHub"></span>
                                <span class="project-btn">Live Test<img class="arrow-icon" src="./assets/img/icons/arrow_outward_green.svg" alt="Live Test"></span>
                            </div>
                        </div>
                    <div class="modal-right-side">
                        <img class="close-btn" src="./assets/img/icons/default_icon.svg" alt="close icon" onclick="closeModal()" onmouseenter="this.src='./assets/img/icons/default_hover_icon.svg'" onmouseleave="this.src='./assets/img/icons/default_icon.svg'">
                        <img class="modal-preview-img" src="assets/img/el_pollo_loco_preview_modal.png" alt="preview image">
                        <span class="next-project">Next project<img class="next-icon" src="./assets/img/icons/right_arrow_green.svg" alt="arrow icon"></span>
                    </div>

                </div>`;
            projectSection.innerHTML += projectHTML;
            modalOverlay.classList.remove('d-none');
        });
    });
}

function closeModal() {
    const modal = document.querySelector('.project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
    if (modalOverlay) {
        modalOverlay.classList.add('d-none');
    }
    addProjectEventListeners();
    document.body.classList.remove('modal-open');
}

document.addEventListener('DOMContentLoaded', loadProjects);
