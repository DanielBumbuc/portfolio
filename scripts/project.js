
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
                        ${project.technologies.join(' | ')}
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
                            <h2 class="project-index">${index + 1}</h2>
                            <h3 class="project-modal-name">${projects[index].name}</h3>
                            <span class="modal-project-info">
                                <h3 class="title">What is this project about?</h3>
                                <p class="description">
                                    ${projects[index].description}
                                </p>
                            </span>
                            <span class="used-technologies">
                                <img class="technologie-icon" src="#" alt="">
                                <p class="technologie-name">${projects[index].technologies.join(' | ')}</p>
                            </span>
                            <div class="project-btn-container">
                                <span class="project-btn">GitHub<img class="arrow-icon" src="./assets/img/arrow_outward.svg" alt="GitHub"></span>
                                <span class="project-btn">Live Test<img class="arrow-icon" src="./assets/img/arrow_outward.svg" alt="Live Test"></span>
                            </div>
                        </div>
                </div>`;
            projectSection.innerHTML += projectHTML;
            modalOverlay.classList.remove('d-none');
        });
        initProjectTechnologies(index);
    });
}

// function initProjectTechnologies(index) {
//     const technologyElements = document.getElementById(`technologie-name-${index}`);
//     technologyElements.innerHTML += index
            
 

// console.log(technologyElements.innerHTML);

// }

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
