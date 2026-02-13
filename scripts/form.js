const modalForm = document.querySelector(".modal form")
const modalNameInp = document.querySelector(".modal-form__name")
const modalEmailInp = document.querySelector(".modal-form__email")
const modalPhoneInp = document.querySelector(".modal-form__phone")
const modalMessageInp = document.querySelector(".modal-form__message")
const modal = document.querySelector(".modal")
const modPositivMessage = document.querySelector(".modal__positiv-message")

const contactForm = document.querySelector(".contact-form .form")
const contactNameInp = document.querySelector(".contact-input__name")
const contactEmailInp = document.querySelector(".contact-input__email")
const contactPhoneInp = document.querySelector(".contact-input__phone")
const contactMessageInp = document.querySelector(".contact-input__message")

const targetNumber = "33783239262"

// Функция для показа уведомлений
function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ff4444' : '#44ff44'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        font-size: 16px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ✅ Функция проверки на кириллицу
function hasCyrillic(text) {
    return /[а-яА-ЯёЁ]/.test(text);
}

// ✅ Функция проверки на опасные символы (SQL, XSS, HTML)
function hasDangerousCharacters(text) {
    // Проверка на HTML теги
    if (/<|>/.test(text)) {
        return true;
    }

    // Проверка на опасные символы
    if (/['"`;]/.test(text)) {
        return true;
    }

    // Проверка на SQL команды (регистронезависимо)
    const sqlPatterns = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|SCRIPT|UNION|TABLE|WHERE|FROM)\b/gi;
    if (sqlPatterns.test(text)) {
        return true;
    }

    // Проверка на SQL комментарии
    if (/--|\/\*|\*\//.test(text)) {
        return true;
    }

    return false;
}

// ✅ Функция санитизации (очистка данных)
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    return input
        .replace(/[<>]/g, '')
        .replace(/['"`;]/g, '')
        .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|SCRIPT|UNION|OR|AND)\b)/gi, '')
        .replace(/--/g, '')
        .replace(/\/\*/g, '')
        .replace(/\*\//g, '')
        .trim();
}

// ✅ Функция валидации email
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// ✅ Функция валидации телефона
function isValidPhone(phone) {
    const phoneRegex = /^(0[1-9][\d\s]{8,12}|\+33[\d\s]{9,13})$/;
    return phoneRegex.test(phone);
}

// ✅ Функция полной валидации формы
function validateFormData(name, email, phone, message) {
    // Проверка имени на кириллицу
    if (hasCyrillic(name)) {
        showNotification("Le nom ne doit contenir que des caractères latins", 'error');
        return false;
    }

    // ✅ НОВАЯ ПРОВЕРКА: опасные символы в имени
    if (hasDangerousCharacters(name)) {
        showNotification("Le nom contient des caractères interdits", 'error');
        return false;
    }

    if (name.length < 2 || name.length > 50) {
        showNotification("Le nom doit contenir entre 2 et 50 caractères", 'error');
        return false;
    }

    // Проверка email
    if (!isValidEmail(email)) {
        showNotification("Veuillez entrer une adresse email valide", 'error');
        return false;
    }

    // ✅ НОВАЯ ПРОВЕРКА: опасные символы в email (кроме @ и .)
    if (/<|>|['";]|--|\/\*|\*\//.test(email)) {
        showNotification("L'email contient des caractères interdits", 'error');
        return false;
    }

    // Проверка телефона
    if (!isValidPhone(phone)) {
        showNotification("Veuillez entrer un numéro de téléphone français valide", 'error');
        return false;
    }

    // Проверка сообщения на кириллицу
    if (hasCyrillic(message)) {
        showNotification("Le message ne doit contenir que des caractères latins", 'error');
        return false;
    }

    // ✅ НОВАЯ ПРОВЕРКА: опасные символы в сообщении
    if (hasDangerousCharacters(message)) {
        showNotification("Le message contient des caractères ou commandes interdits", 'error');
        return false;
    }

    if (message.length < 10 || message.length > 500) {
        showNotification("Le message doit contenir entre 10 et 500 caractères", 'error');
        return false;
    }

    return true;
}

// ✅ Функция отправки формы
function submitForm(nameValue, emailValue, phoneValue, messageValue) {
    // Валидация ДО санитизации
    if (!validateFormData(nameValue, emailValue, phoneValue, messageValue)) {
        return;
    }

    // Санитизация данных (дополнительная защита)
    const sanitizedName = sanitizeInput(nameValue);
    const sanitizedEmail = sanitizeInput(emailValue);
    const sanitizedPhone = sanitizeInput(phoneValue);
    const sanitizedMessage = sanitizeInput(messageValue);

    // Формирование сообщения
    const message = `Bonjour! Mon nom est:\n${sanitizedName}.\n\nMon email:\n${sanitizedEmail}.\n\nMon téléphone:\n${sanitizedPhone}.\n\nMessage:\n${sanitizedMessage}`;

    const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    modPositivMessage.classList.add("pozitiv-active");
    setTimeout(() => {
        modPositivMessage.classList.remove("pozitiv-active");
        modal.classList.remove("modal-active");
    }, 2500);
}

// ✅ Основная функция
function form() {
    // Обработка формы на странице контактов
    if (contactForm !== null) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                showNotification("Veuillez remplir correctement tous les champs", 'error');
                return;
            }

            submitForm(
                contactNameInp.value,
                contactEmailInp.value,
                contactPhoneInp.value,
                contactMessageInp.value
            );

            // Очистка полей
            contactNameInp.value = "";
            contactEmailInp.value = "";
            contactPhoneInp.value = "";
            contactMessageInp.value = "";
        });
    }

    // Обработка модальной формы
    if (modalForm !== null) {
        modalForm.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!modalForm.checkValidity()) {
                modalForm.reportValidity();
                showNotification("Veuillez remplir correctement tous les champs", 'error');
                return;
            }

            submitForm(
                modalNameInp.value,
                modalEmailInp.value,
                modalPhoneInp.value,
                modalMessageInp.value
            );

            // Очистка полей
            modalNameInp.value = "";
            modalEmailInp.value = "";
            modalPhoneInp.value = "";
            modalMessageInp.value = "";
        });
    }
}

export default form