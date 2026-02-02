// Scroll Progress Bar
document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector('.scroll-progress-bar');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;

            progressBar.style.width = scrollPercentage + '%';
        });
    }
});
