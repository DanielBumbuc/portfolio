function validateForm(event) {
    const formData = new FormData(event.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const uncheckedError = document.querySelector('.unchecked-error');


    if (!privacyCheckbox.checked) {
        uncheckedError.style.opacity = 1;
        event.preventDefault();
        return false;
    }


    if (!name || !isValidEmail(email) || !message) {
        event.preventDefault();
        console.log('is not valid');
        if (!name) {
            showFieldError('name_input', translate('contact.validation.nameRequired'));
        }
        if (!message) {
            showFieldError('message_input', translate('contact.validation.messageRequired'));
        }
        return false;
    }
    return true;
}

// function handleBlurWithError(input, defaultPlaceholder, errorMessage) {

//     input.placeholder = input.getAttribute('data-placeholder') || !input.value.trim() ? errorMessage : defaultPlaceholder;

//     if (!input.value.trim()) {
//         input.placeholder = errorMessage;
//         input.style.color = "rgba(236, 123, 123, 0.8)";
//         input.style.borderColor = "#ec7b7b";
//         input.classList.add('error-state');
//     } else {
//         input.placeholder = defaultPlaceholder;
//         input.style.color = "#FFFFFF";
//         input.style.borderColor = "#3DCFB6";
//         input.classList.remove('error-state');
//     }

// }

function handleBlurWithError(input, defaultPlaceholder, errorKey) {
    let errorMessage;
    
    // ✅ translate() zur Laufzeit aufrufen
    if (errorKey === 'nameRequired') {
        errorMessage = translate('contact.validation.nameRequired') || 'Please enter your name';
    } else if (errorKey === 'messageRequired') {
        errorMessage = translate('contact.validation.messageRequired') || 'Please enter your message';
    } else {
        errorMessage = errorKey; // Fallback für andere Fälle
    }

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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(email.value.trim());

    // Leere Email
    if (email.value.trim() === '') {

        showFieldError('email_input', translate('contact.validation.emailRequired'));
        return false;
    } else if (!emailRegex.test(email.value.trim())) {
        showFieldError('email_input', translate('contact.validation.emailInvalid'));
        console.log(!emailRegex.test(email.value.trim()));
        return false;
    }
    return true;
}

function showFieldError(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    input.classList.add('error-state');
    input.placeholder = errorMessage;
    input.value = '';
}

function clearErrorCheckbox() {
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const uncheckedError = document.querySelector('.unchecked-error');
    if (privacyCheckbox.checked) {
        uncheckedError.style.opacity = 0;
    }
}