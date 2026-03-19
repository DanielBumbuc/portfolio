function validateForm(event) {
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    if (!name.trim() || !email.trim() || !message.trim()) {
        event.preventDefault();
        console.log('is not valid');
        return false;
    }
    return true;
}

function handleBlurWithError(input, defaultPlaceholder, errorMessage) {
    input.placeholder = input.getAttribute('data-placeholder') || !input.value.trim() ? errorMessage : defaultPlaceholder;

    if (!input.value.trim()) {
        input.placeholder = errorMessage;
        input.style.color = "rgba(236, 123, 123, 0.8)";
        input.style.borderColor = "#ec7b7b";
        input.classList.add('error-state');
    } else {
        input.placeholder = defaultPlaceholder;
        input.style.color = "#FFFFFF";
        input.style.borderColor = "#3DCFB6";
        input.classList.remove('error-state');
    }
}

function clearError(input) {
    input.style.color = "#FFFFFF";
    input.style.borderColor = "#3DCFB6";
    input.classList.remove('error-state');
}