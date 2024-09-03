document.addEventListener('DOMContentLoaded', function() {
    let slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Initialize the slider
    showSlide(currentIndex);

    // Optionally, you can add the function to the click events
    slides.forEach(slide => {
        slide.addEventListener('click', nextSlide);
    });
});
