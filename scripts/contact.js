let validMail;
let emailState = null;

function checkContactBtn() {
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const submitBtn = document.querySelector('.contact-btn');
    if (!privacyCheckbox.checked) {
        submitBtn.setAttribute('disabled', '');
    } else {
        submitBtn.removeAttribute('disabled');
    }
}

async function validateForm(event) {
    const formData = new FormData(event.target);
    const name = formData.get('name').trim();
    const message = formData.get('message').trim();
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const uncheckedError = document.querySelector('.unchecked-error');
    event.preventDefault();
    if (!privacyCheckbox.checked) {
        uncheckedError.style.opacity = 1;
        event.preventDefault();
        return false;
    }
    if (checkFormValidation(name, message)) return false;
    await submitContactForm(event.target);
    return false;
}

function checkFormValidation(name, message) {
    if (!name || emailState !== 'valid' || !message) {
        if (!name) {
            showFieldError('name_input', 'contact.validation.nameRequired');
        }
        if (emailState === null || emailState === 'empty') {
            showFieldError('email_input', 'contact.validation.emailRequired');
        } else if (emailState === 'invalid') {
            showFieldError('email_input', 'contact.validation.emailInvalid');
        }
        if (!message) {
            showFieldError('message_input', 'contact.validation.messageRequired');
        }
        emailState = null;
        return false;
    }
}

function handleBlurWithError(input, placeholderKey, errorKey) {
    const defaultPlaceholder = translate(placeholderKey);
    const fullKey = 'contact.validation.' + errorKey;
    styleError(input, translate(fullKey), defaultPlaceholder, fullKey);
}



function styleError(input, errorMessage, defaultPlaceholder, translationKey) {
    if (!input.value.trim()) {
        input.placeholder = errorMessage;
        input.style.color = "rgba(236, 123, 123, 0.8)";
        input.style.borderColor = "#ec7b7b";
        input.classList.add('error-state');
        input.setAttribute('data-error-key', translationKey);  // ← jetzt gesetzt
    } else {
        input.placeholder = defaultPlaceholder;
        input.style.color = "#FFFFFF";
        input.style.borderColor = "#3DCFB6";
        input.classList.remove('error-state');
        input.removeAttribute('data-error-key');
    }
}

function clearError(input) {
    input.style.color = "#FFFFFF";
    input.style.borderColor = "#3DCFB6";
    input.classList.remove('error-state');
    input.removeAttribute('data-error-key');
}

function isValidEmail(email) {
    validMail = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        emailState = 'empty';
        showFieldError('email_input', 'contact.validation.emailRequired');
        return false;
    } else if (!emailRegex.test(email.value.trim())) {
        emailState = 'invalid';
        showFieldError('email_input', 'contact.validation.emailInvalid');
        return false;
    }
    emailState = 'valid';
    validMail = true;
}

function showFieldError(inputId, translationKey) {
    const input = document.getElementById(inputId);
    input.classList.add('error-state');
    input.placeholder = translate(translationKey);
    input.setAttribute('data-error-key', translationKey);
    input.value = '';
}

function clearErrorCheckbox() {
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const uncheckedError = document.querySelector('.unchecked-error');
    if (privacyCheckbox.checked) {
        uncheckedError.style.opacity = 0;
    }
    checkContactBtn();
}

async function submitContactForm(form) {
    const submitBtn = form.querySelector('.contact-btn');
    const btnContent = submitBtn.querySelector('.marquee-btn-content');
    const originalText = btnContent.textContent;
    btnContent.textContent = 'Sending...';
    submitBtn.disabled = true;
    try {
        await getContactParams(form);
        showMessageStatus('Thank you! Your message has been sent successfully.', 'success');
        resetContactForm();
    } catch (error) {
        console.error('Error sending email:', error);
        showMessageStatus('Sorry, there was an error sending your message. Please try again later.', 'error');
    } finally {
        btnContent.textContent = originalText || 'Say Hello ;)';
        submitBtn.disabled = false;
    }
}

async function getContactParams(form) {
    const formData = new FormData(form);
    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: 'bumbucd@icloud.com',
        reply_to: formData.get('email')
    };
    const result = await emailjs.send(
        "service_7rmzd54",
        "template_twndl2f",
        templateParams
    );
}

async function showMessageStatus(message, type) {
    const successDiv = document.getElementById('message_container');
    successDiv.classList.remove('slide-right-animation');
    successDiv.style.transform = 'translateX(-200px)';
    successDiv.style.opacity = '0';
    successDiv.innerHTML = '';
    successDiv.innerHTML = `
        <p id="send_message" class="send-message ${type}-message">
                        ${message}
                    </p>`;
    await new Promise(resolve => setTimeout(resolve, 50));
    successDiv.classList.add('slide-right-animation');
    setTimeout(() => {
        styleMessageStatus(successDiv);
    }, 5000);
}

function styleMessageStatus(successDiv) {
    successDiv.innerHTML = '';
    successDiv.classList.remove('slide-right-animation');
    successDiv.style.transform = 'translateX(-200px)';
    successDiv.style.opacity = '0';
}

function resetContactForm() {
    document.getElementById('name_input').value = '';
    document.getElementById('email_input').value = '';
    document.getElementById('message_input').value = '';
    document.getElementById('privacy_checkbox').checked = false;
    emailState = null;
    validMail = false;
    const inputs = document.querySelectorAll('.main-input');
    inputs.forEach(input => clearError(input));
    const uncheckedError = document.querySelector('.unchecked-error');
    if (uncheckedError) uncheckedError.style.opacity = 0;
}