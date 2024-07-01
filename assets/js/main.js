function toggleNavbar() {
    const navbar = document.querySelector('nav ul');
    navbar.classList.toggle('active');
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('transparent');
    } else {
        navbar.classList.remove('transparent');
    }
});