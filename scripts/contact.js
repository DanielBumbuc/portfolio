let validMail;
let emailState = null; // 'empty' | 'invalid' | 'valid'

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
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const privacyCheckbox = document.getElementById('privacy_checkbox');
    const uncheckedError = document.querySelector('.unchecked-error');
    event.preventDefault(); // ← Gleich am Anfang!

    if (!privacyCheckbox.checked) {
        uncheckedError.style.opacity = 1;
        event.preventDefault();
        return false;
    }

    if (!name || emailState !== 'valid' || !message) {
        if (!name) {
            showFieldError('name_input', translate('contact.validation.nameRequired'));
        }

        if (emailState === null || emailState === 'empty') {
            showFieldError('email_input', translate('contact.validation.emailRequired'));
        } else if (emailState === 'invalid') {
            showFieldError('email_input', translate('contact.validation.emailInvalid'));
        }

        if (!message) {
            showFieldError('message_input', translate('contact.validation.messageRequired'));
        }
        emailState = null; // Reset emailState für nächsten Versuch
        return false;
    }


    // ✅ NEU: EmailJS aufrufen statt normalen Submit
    await submitContactForm(event.target);
    return false; // Normalen Submit verhindern
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

// function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     console.log(email.value.trim());

//     // Leere Email
//     if (email.value.trim() === '') {
//         showFieldError('email_input', translate('contact.validation.emailRequired'));
//         emptyMail = true;

//         return false;
//     } else if (!emailRegex.test(email.value.trim())) {
//         showFieldError('email_input', translate('contact.validation.emailInvalid'));
//         console.log(!emailRegex.test(email.value.trim()));
//         return false;
//     }
//     validMail = true;
//     emptyMail = false;

// }



function isValidEmail(email) {
        validMail = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === '') {
            emailState = 'empty';
            showFieldError('email_input', translate('contact.validation.emailRequired'));
            return false;
        } else if (!emailRegex.test(email.value.trim())) {
            emailState = 'invalid';
            showFieldError('email_input', translate('contact.validation.emailInvalid'));
            return false;
        }

        emailState = 'valid';
        validMail = true;
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
    checkContactBtn();
}

// EmailJS-basierte Lösung
async function submitContactForm(form) {
    const submitBtn = form.querySelector('.contact-btn');
    const btnContent = submitBtn.querySelector('.marquee-btn-content');
    const originalText = btnContent.textContent;

    // Loading-Zustand
    btnContent.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(form);

        // EmailJS Parameter
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
            to_email: 'bumbucd@icloud.com', // Ihre E-Mail
            reply_to: formData.get('email')
        };

        // console.log('Sending email with params:', templateParams);

        // EmailJS senden
        const result = await emailjs.send(
            "service_7rmzd54",    // Nach Registrierung erhalten
            "template_twndl2f",   // Nach Setup erhalten
            templateParams
        );

        // console.log('Email sent successfully:', result);
        showMessageStatus('Thank you! Your message has been sent successfully.', 'success');
        resetContactForm();

    } catch (error) {
        console.error('Error sending email:', error);
        showMessageStatus('Sorry, there was an error sending your message. Please try again later.', 'error');
    } finally {
        // Button zurücksetzen
        btnContent.textContent = originalText || 'Say Hello ;)';
        submitBtn.disabled = false;
    }
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
                    </p>
    `;
    await new Promise(resolve => setTimeout(resolve, 50));
    successDiv.classList.add('slide-right-animation');
    setTimeout(() => {
        successDiv.innerHTML = '';
        successDiv.classList.remove('slide-right-animation');
        successDiv.style.transform = 'translateX(-200px)';
        successDiv.style.opacity = '0';
    }, 5000);
}

function resetContactForm() {
    document.getElementById('name_input').value = '';
    document.getElementById('email_input').value = '';
    document.getElementById('message_input').value = '';
    document.getElementById('privacy_checkbox').checked = false;
    emailState = null;
    validMail = false;
    // Error-States entfernen
    const inputs = document.querySelectorAll('.main-input');
    inputs.forEach(input => clearError(input));

    const uncheckedError = document.querySelector('.unchecked-error');
    if (uncheckedError) uncheckedError.style.opacity = 0;
}