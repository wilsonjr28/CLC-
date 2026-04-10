// Selectors
const navbar = document.getElementById('navbar');
const animateElements = document.querySelectorAll('.animate-up');

// Sticky Navbar Logic
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observeElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
            // Unobserve after showing so it stays visible
            observeElements.unobserve(entry.target);
        }
    });
}, observerOptions);

// Trigger initial animations on page load
window.addEventListener('load', () => {
    animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // If element is already in the viewport on load
        if(rect.top < window.innerHeight) {
            el.classList.add('show');
        } else {
            // Otherwise wait for scroll
            observeElements.observe(el);
        }
    });
});

// Hero Slideshow Logic
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;
if (slides.length > 0) {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4500); // Transitions every 4.5 seconds
}

// Lightbox Logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryLinks = document.querySelectorAll(".gallery-item a");
const closeBtn = document.querySelector(".lightbox-close");

let currentImageIndex = 0;
const imagesArray = Array.from(galleryLinks).map(link => link.getAttribute('href'));

if (galleryLinks.length > 0 && lightbox) {
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            lightbox.style.display = "block";
            lightboxImg.src = this.getAttribute('href');
            currentImageIndex = index;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    window.changeImage = function(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= imagesArray.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = imagesArray.length - 1;
        }
        lightboxImg.src = imagesArray[currentImageIndex];
    }
}
