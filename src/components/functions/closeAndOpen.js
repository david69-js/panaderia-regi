const OpenNavigation = () => {
    let nav = document.querySelector('.header');
    document.querySelector('.hamburger').style.display = 'none';
    document.querySelector('.close').style.display = "block"
    nav.style.transition = "left 300ms";
    nav.style.left = '0';
}
const CloseNavigation = () => {
    let closenav = document.querySelector('.header');
    document.querySelector('.hamburger').style.display = 'block';
    document.querySelector('.close').style.display = "none"
    closenav.style.transition = "left 300ms";
    closenav.style.left = '-100%';
}

export { OpenNavigation, CloseNavigation }