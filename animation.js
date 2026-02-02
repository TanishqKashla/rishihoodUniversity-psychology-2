// Program Stats Count-up Animation
document.addEventListener("DOMContentLoaded", function () {
    const statNumbers = document.querySelectorAll(".program-stat-number");

    const animateValue = (obj, start, end, duration, suffix) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Easing function for smooth animation (easeOutQuad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);

            const value = Math.floor(easeProgress * (end - start) + start);
            obj.innerHTML = value + (suffix || "");
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end + (suffix || ""); // Ensure final value is exact
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.innerText.trim();
                const hasPlus = text.includes("+");
                const endValue = parseInt(text.replace(/\D/g, ""), 10);

                if (!isNaN(endValue)) {
                    // Set initial value to 0 before starting animation
                    element.innerText = "0" + (hasPlus ? "+" : "");
                    animateValue(element, 0, endValue, 2000, hasPlus ? "+" : "");
                }

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    statNumbers.forEach((stat) => {
        observer.observe(stat);
    });
});
