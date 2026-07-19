let validMail;
let emailState = null;

/**
 * Checks the state of the privacy checkbox and enables or disables
 * the contact form submit button accordingly.
 */
function checkContactBtn() {
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const submitBtn = document.querySelector('.contact-btn');
    if (!privacyCheckbox.checked) {
        submitBtn.setAttribute('disabled', '');
    } else {
        submitBtn.removeAttribute('disabled');
    }
}

/**
 * Validates the contact form on submission. Prevents sending if the
 * privacy checkbox is unchecked or required fields are invalid.
 * @param {SubmitEvent} event - The form submit event.
 * @returns {Promise<false>} Always returns false to prevent default form submission.
 */
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

/**
 * Checks whether name, email, and message fields are valid and shows
 * field-level errors for any that are not. Resets emailState on failure.
 * Name must be at least 3 characters, message at least 10 characters.
 * @param {string} name - The trimmed value of the name field.
 * @param {string} message - The trimmed value of the message field.
 * @returns {true|undefined} Returns true if validation fails (errors present), undefined if valid.
 */
function checkFormValidation(name, message) {
    const nameInvalid = !name || name.length < 3;
    const messageInvalid = !message || message.length < 10;
    if (nameInvalid || emailState !== 'valid' || messageInvalid) {
        showFieldErrors(name, message);
        emailState = null;
        return true;
    }
}

/**
 * Shows field-level error messages for name, email, and message inputs
 * based on their current values and the global emailState.
 * @param {string} name - The trimmed value of the name field.
 * @param {string} message - The trimmed value of the message field.
 */
function showFieldErrors(name, message) {
    if (!name) {
        showFieldError('name_input', 'contact.validation.nameRequired');
    } else if (name.length < 3) {
        showFieldError('name_input', 'contact.validation.nameTooShort');
    }
    if (emailState === null || emailState === 'empty') {
        showFieldError('email_input', 'contact.validation.emailRequired');
    } else if (emailState === 'invalid') {
        showFieldError('email_input', 'contact.validation.emailInvalid');
    }
    if (!message) {
        showFieldError('message_input', 'contact.validation.messageRequired');
    } else if (message.length < 10) {
        showFieldError('message_input', 'contact.validation.messageTooShort');
    }
}

/**
 * Handles the blur event on a form input. Shows a translated error message
 * if the field is empty or below the minimum length, or restores the default placeholder if valid.
 * Stores the translation key as a data attribute for later re-translation on language change.
 * The tooShort translation key is derived by replacing 'Required' with 'TooShort' in the fullKey.
 * @param {HTMLInputElement} input - The input element that lost focus.
 * @param {string} placeholderKey - Translation key for the default placeholder text.
 * @param {string} errorKey - Short error key, e.g. 'nameRequired', appended to 'contact.validation.'.
 * @param {number} [minLength=0] - Optional minimum character length. Shows a tooShort error if not met.
 */
function handleBlurWithError(input, placeholderKey, errorKey, minLength = 0) {
    const defaultPlaceholder = translate(placeholderKey);
    const fullKey = 'contact.validation.' + errorKey;
    const tooShortKey = fullKey.replace('Required', 'TooShort');
    if (!input.value.trim()) {
        styleError(input, translate(fullKey), defaultPlaceholder, fullKey);
    } else if (minLength > 0 && input.value.trim().length < minLength) {
        input.placeholder = translate(tooShortKey);
        input.style.color = 'rgba(236, 123, 123, 0.8)';
        input.style.borderColor = '#ec7b7b';
        input.classList.add('error-state');
        input.setAttribute('data-error-key', tooShortKey);
        input.value = '';
    } else {
        styleError(input, translate(fullKey), defaultPlaceholder, fullKey);
    }
}



/**
 * Applies or removes the error style on an input field depending on whether
 * it has a value. Sets or removes the data-error-key attribute accordingly.
 * @param {HTMLInputElement} input - The input element to style.
 * @param {string} errorMessage - The translated error message to show as placeholder.
 * @param {string} defaultPlaceholder - The translated default placeholder to restore when valid.
 * @param {string} translationKey - The full translation key stored as data-error-key.
 */
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

/**
 * Removes the error styling and data-error-key attribute from an input field.
 * @param {HTMLInputElement} input - The input element to clear.
 */
function clearError(input) {
    input.style.color = "#FFFFFF";
    input.style.borderColor = "#3DCFB6";
    input.classList.remove('error-state');
    input.removeAttribute('data-error-key');
}

/**
 * Validates the email input value using a regex pattern.
 * Updates the global emailState to 'empty', 'invalid', or 'valid'.
 * @param {HTMLInputElement} email - The email input element.
 * @returns {boolean|undefined} Returns false if invalid or empty, undefined if valid.
 */
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

/**
 * Applies error styling to a form field, sets the translated error message
 * as placeholder, stores the translation key for re-translation, and clears the value.
 * @param {string} inputId - The id of the input element.
 * @param {string} translationKey - The dot-notation translation key for the error message.
 */
function showFieldError(inputId, translationKey) {
    const input = document.getElementById(inputId);
    input.classList.add('error-state');
    input.placeholder = translate(translationKey);
    input.setAttribute('data-error-key', translationKey);
    input.value = '';
}

/**
 * Hides the privacy checkbox error message if the checkbox is checked,
 * then updates the submit button state.
 */
function clearErrorCheckbox() {
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const uncheckedError = document.querySelector('.unchecked-error');
    if (privacyCheckbox.checked) {
        uncheckedError.style.opacity = 0;
    }
    checkContactBtn();
}

/**
 * Submits the contact form via EmailJS. Disables the button during submission
 * and shows a success or error status message when done.
 * @param {HTMLFormElement} form - The contact form element.
 * @returns {Promise<void>}
 */
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
        submitBtn.disabled = false;
    } finally {
        btnContent.textContent = originalText || 'Say Hello ;)';
    }
}

/**
 * Builds the EmailJS template parameters from the form data and sends the email.
 * @param {HTMLFormElement} form - The contact form element.
 * @returns {Promise<void>}
 */
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

/**
 * Displays a status message (success or error) in the message container
 * with a slide-in animation, then clears it after 5 seconds.
 * @param {string} message - The message text to display.
 * @param {string} type - The message type ('success' or 'error'), applied as a CSS class.
 * @returns {Promise<void>}
 */
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

/**
 * Resets the message container to its hidden state after the display timeout.
 * @param {HTMLElement} successDiv - The message container element.
 */
function styleMessageStatus(successDiv) {
    successDiv.innerHTML = '';
    successDiv.classList.remove('slide-right-animation');
    successDiv.style.transform = 'translateX(-200px)';
    successDiv.style.opacity = '0';
}

/**
 * Resets all contact form fields to their default empty state,
 * clears validation state, and hides all error indicators.
 */
function resetContactForm() {
    document.getElementById('name_input').value = '';
    document.getElementById('email_input').value = '';
    document.getElementById('email_input').placeholder = translate('contact.form.emailPlaceholder');
    document.getElementById('message_input').value = '';
    document.getElementById('privacy_checkbox').checked = false;
    emailState = null;
    validMail = false;
    const inputs = document.querySelectorAll('.main-input');
    inputs.forEach(input => clearError(input));
    const uncheckedError = document.querySelector('.unchecked-error');
    if (uncheckedError) uncheckedError.style.opacity = 0;
    checkContactBtn();
}