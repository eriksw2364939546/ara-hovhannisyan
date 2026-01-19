const modal = document.querySelector(".modal")
const openModBtn = document.querySelectorAll(".open-modal")
const closeModal = document.querySelector(".close-modal")


function Modal() {
    openModBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("modal-active")
        })
    })

    closeModal.addEventListener("click", () => {
        modal.classList.remove("modal-active")
    })
}



export default Modal
