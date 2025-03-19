document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');

    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    const nav = document.querySelector('nav');
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '☰';
    toggleButton.classList.add('toggle');
    nav.parentNode.insertBefore(toggleButton, nav);

    toggleButton.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggleButton.textContent = nav.classList.contains('open') ? '✖' : '☰';
    });
});