
let projects = [];
let scrollY = window.scrollY;

/**
 * Fetches the projects data from the JSON file, filters it by the current language,
 * and triggers rendering and preview image cleanup.
 * @returns {Promise<void>}
 */
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

/**
 * Clears the project collection container and renders all project cards
 * using the project card template, then attaches event listeners.
 */
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

/**
 * Queries all rendered project containers and attaches hover and click
 * event listeners to each one.
 */
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

/**
 * Defines mouseenter, mouseleave, and click event listeners for a single project.
 * On click, renders the project modal and shows the overlay.
 * @param {HTMLElement} projectSide - The clickable left side of the project card.
 * @param {HTMLElement} previewImg - The preview image element to show on hover.
 * @param {HTMLElement} bgImg - The background image element to show on hover.
 * @param {HTMLElement} projectSection - The section element to append the modal to.
 * @param {HTMLElement} modalOverlay - The overlay element to show when modal is open.
 * @param {number} index - The index of the project in the projects array.
 */
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
    document.body.insertAdjacentHTML('beforeend', projectHTML);  // ← Fix
    modalOverlay.classList.remove('d-none');
    });
}

/**
 * Closes the currently open project modal, hides the overlay,
 * removes the modal from the DOM, and re-attaches project event listeners.
 */
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
}

/**
 * Replaces the current modal with the next project in the list.
 * Wraps around to the first project if the end is reached.
 * @param {number} index - The index of the currently displayed project.
 */
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

/**
 * Removes preview images from the DOM on small screens (< 1075px) and resets
 * the margin of the left project side. Re-renders projects on larger screens.
 */
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