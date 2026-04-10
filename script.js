/**
 * ============================================
 * SANJANA DAMECHA - PORTFOLIO JAVASCRIPT
 * ============================================
 * Features:
 * - Dark/Light Mode Toggle
 * - Mobile Navigation Menu
 * - Smooth Scrolling
 * - Active Navigation Link Highlighting
 * - Skill Bar Animation
 * - Scroll to Top Button
 * - Lightbox for Gallery
 * - Navbar Background on Scroll
 * ============================================
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const skillBars = document.querySelectorAll('.skill-progress');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// ============================================
// DARK/LIGHT MODE TOGGLE
// ============================================

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// MOBILE NAVIGATION MENU
// ============================================

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLLING & ACTIVE LINK HIGHLIGHTING
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navigation link based on scroll position
function highlightActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function toggleScrollTopButton() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// SKILL BAR ANIMATION
// ============================================

// Animate skill bars when they come into view
function animateSkillBars() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

// ============================================
// LIGHTBOX FOR GALLERY
// ============================================

// Open lightbox with clicked image
function openLightbox(element) {
    const img = element.querySelector('img');
    
    if (img) {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt || 'Gallery Image';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Close lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// ============================================
// RESUME DOWNLOAD MESSAGE
// ============================================

function showResumeMessage(e) {
    e.preventDefault();
    alert('Resume will be available soon! Please contact me directly for my latest resume.');
}

// ============================================
// SCROLL ANIMATIONS (Fade In Elements)
// ============================================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.about-card, .certificate-card, .project-card, .award-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Add CSS class for visible elements
const style = document.createElement('style');
style.textContent = `
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// TYPING EFFECT FOR HOME SECTION (Optional)
// ============================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// MAIN SCROLL EVENT LISTENER
// ============================================

window.addEventListener('scroll', () => {
    highlightActiveLink();
    updateNavbar();
    toggleScrollTopButton();
    animateSkillBars();
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars if already in view
    animateSkillBars();
    
    // Add loaded class to body for any initial animations
    document.body.classList.add('loaded');
    
    console.log('🎉 Sanjana Damecha Portfolio Loaded Successfully!');
    console.log('✨ Features: Dark Mode, Smooth Scroll, Mobile Menu, Skill Bars, Lightbox');
});

// ============================================
// FORM VALIDATION (If contact form is added later)
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        if (input.type === 'email' && input.value) {
            if (!validateEmail(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6C63FF;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #6B6B7B;');
console.log('%cFeel free to connect with me!', 'font-size: 14px; color: #FF6B9D;');
