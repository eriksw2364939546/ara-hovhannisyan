export function initServicesTextToggle() {
    const paragraphs = document.querySelectorAll('.services-items__card p');

    paragraphs.forEach(paragraph => {
        paragraph.addEventListener('click', () => {
            paragraph.classList.toggle('expanded');
        });
    });
}
