// ===== DOM ELEMENTS =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');
const galleryItems = document.querySelectorAll('.gallery__item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');

// ===== MOBILE MENU =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== HEADER SCROLL EFFECT =====
function scrollHeader() {
    if (this.scrollY >= 100) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== ACTIVE LINK ON SCROLL =====
function scrollActive() {
    const scrollY = window.pageYOffset;
    
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        
        if (section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== SCROLL UP BUTTON =====
function scrollUpShow() {
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUpShow);

scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== TYPING ANIMATION =====
function typeWriter() {
    const textElement = document.querySelector('.typing-text');
    const texts = [
        'Discover English Culture',
        'Recognize its most notable cultural figures',
        'Celebrate their national holidays',
        'Honor History'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    if (textElement) {
        type();
    }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== SCROLL ANIMATIONS =====
function scrollAnimations() {
    const animateElements = [
        { selector: '[data-aos="fade-up"]', animation: 'fade-in-up' },
        { selector: '[data-aos="slide-right"]', animation: 'slide-in-right' },
        { selector: '[data-aos="slide-left"]', animation: 'slide-in-left' },
        { selector: '[data-aos="zoom-in"]', animation: 'zoom-in' }
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const animationClass = animateElements.find(item => 
                    item.selector.includes(animationType))?.animation;
                
                if (animationClass) {
                    element.classList.add(animationClass);
                    observer.unobserve(element);
                }
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(({ selector }) => {
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    });
}

// ===== GALLERY LIGHTBOX =====
function initGallery() {
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery__img');
            const title = item.querySelector('.gallery__title');
            const description = item.querySelector('.gallery__description');
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title.textContent;
            lightboxDescription.textContent = description.textContent;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name.trim() || !email.trim() || !message.trim()) {
            showFormError('Please fill in all fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address.');
            return;
        }
        
        const submitButton = contactForm.querySelector('.contact__button');
        const buttonText = submitButton.querySelector('.button__text');
        const buttonLoader = submitButton.querySelector('.button__loader');
        
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline-block';
        submitButton.disabled = true;
        
        setTimeout(() => {
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
            
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                contactSuccess.style.display = 'none';
                buttonText.style.display = 'inline';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;
            }, 5000);
        }, 2000);
    });
}

function showFormError(message) {
    alert(message);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeImg = document.querySelector('.home__img-main');
        
        if (homeImg) {
            const rate = scrolled * -0.5;
            homeImg.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
document.querySelector(".nav__logo-img").addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__logo-text").addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    animateCounters();
    scrollAnimations();
    initGallery();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffect();
    initLazyLoading();
    
    document.body.classList.add('loaded');
});

// ===== PERFORMANCE OPTIMIZATION =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(() => {
    scrollHeader();
    scrollActive();
    scrollUpShow();
}, 16));

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const firstFocusable = document.querySelector('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
});
