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

function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
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
    }, 3000);
}

function form() {
    if (contactForm !== null) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                showNotification("Veuillez remplir correctement tous les champs", 'error');
                return;
            }

            const message = `Bonjour! Mon nom est:\n${contactNameInp.value}.\n\nMon email:\n${contactEmailInp.value}.\n\nMon téléphone:\n${contactPhoneInp.value}.\n\nMessage:\n${contactMessageInp.value}`
            const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
            modPositivMessage.classList.add("pozitiv-active");
            setTimeout(() => {
                modPositivMessage.classList.remove("pozitiv-active");
                modal.classList.remove("modal-active");
            }, 2500);
            contactNameInp.value = ""
            contactEmailInp.value = ""
            contactPhoneInp.value = ""
            contactMessageInp.value = ""
        });
    }

    if (modalForm !== null) {
        modalForm.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!modalForm.checkValidity()) {
                modalForm.reportValidity();
                showNotification("Veuillez remplir correctement tous les champs", 'error');
                return;
            }

            const message = `Bonjour! Mon nom est:\n${modalNameInp.value}.\n\nMon email:\n${modalEmailInp.value}.\n\nMon téléphone:\n${modalPhoneInp.value}.\n\nMessage:\n${modalMessageInp.value}`
            const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
            modPositivMessage.classList.add("pozitiv-active");
            setTimeout(() => {
                modPositivMessage.classList.remove("pozitiv-active");
                modal.classList.remove("modal-active");
            }, 2500);
            modalNameInp.value = ""
            modalEmailInp.value = ""
            modalPhoneInp.value = ""
            modalMessageInp.value = ""
        });
    }
}

export default form