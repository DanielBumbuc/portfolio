
let projects = [];

async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        projects = data[currentLanguage];
        renderProjects();
        deletePreviewImages();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects() {
    const projectCollection = document.querySelector('.project-collection');
    if (!projectCollection) return;
    projectCollection.innerHTML = '';
    projects.forEach((project, index) => {
        const projectHTML = projectCardTemplate(project, index);
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
        defineEventListeners(projectSide, previewImg, bgImg, projectSection, modalOverlay, index);
    });
}

function defineEventListeners(projectSide, previewImg, bgImg, projectSection, modalOverlay, index) {
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
        const projectHTML = projectModalTemplate(projects[index], index);
        projectSection.innerHTML += projectHTML;
        modalOverlay.classList.remove('d-none');
    });
}

function closeModal() {
    const modal = document.querySelector('.project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const allPreviewImages = document.querySelectorAll('.project-preview-img, .preview-img-bg');
    allPreviewImages.forEach(img => {
        img.classList.add('d-none');
    });
    if (modal) {
        modal.remove();
    }
    if (modalOverlay) {
        modalOverlay.classList.add('d-none');
    }
    document.body.classList.remove('modal-open');
    addProjectEventListeners();
}

function nextProject(index) {
    const modal = document.querySelector('.project-modal');
    let nextIndex = index + 1;
    if (nextIndex >= projects.length) {
        nextIndex = 0;
    }
    const projectHTML = projectModalTemplate(projects[nextIndex], nextIndex);
    modal.innerHTML = '';
    modal.outerHTML = projectHTML;
}

function deletePreviewImages() {
    const allPreviewImages = document.querySelectorAll('.project-preview-img, .preview-img-bg');
    const leftSides = document.querySelectorAll('.left-project-side');
    if (window.innerWidth < 1075) {
        allPreviewImages.forEach(img => {
            img.remove();
        });
        leftSides.forEach(side => {
            side.style.marginRight = '0';
        });
    } else {
        renderProjects();
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);
window.addEventListener('resize', deletePreviewImages);