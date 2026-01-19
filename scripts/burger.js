// burgerMenu.js

export function initBurgerMenu() {
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.header-nav__items.row');

    if (!burgerBtn || !navMenu) {
        console.warn('Burger menu elements not found');
        return;
    }

    burgerBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Блокировка скролла
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.header-nav__items a, .header-nav__items button');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

}