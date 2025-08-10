// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const categoryBtns = document.querySelectorAll('.category-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const ugcItems = document.querySelectorAll('.ugc-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.querySelector('.contact-form');

// Global variables
let currentImageIndex = 0;
let currentImages = [];

// Page Transition Overlay
function initializePageTransitions() {
    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #faf8f5 0%, #f5f0eb 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    transitionOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 3px solid #e0e0e0; border-top: 3px solid #DAA520; border-radius: 50%; animation: luxurySpin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite; margin-bottom: 30px;"></div>
            <p style="color: #8b7355; font-family: 'Playfair Display', serif; font-size: 20px; letter-spacing: 3px; font-weight: 300;">SIMRAN</p>
            <div style="width: 100px; height: 2px; background: linear-gradient(90deg, transparent, #DAA520, transparent); margin: 20px auto; animation: luxuryPulse 2s ease-in-out infinite;"></div>
        </div>
    `;
    
    // Add luxury animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes luxurySpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes luxuryPulse {
            0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
            50% { opacity: 1; transform: scaleX(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(transitionOverlay);
    
    // Show transition on page load
    function showTransition() {
        transitionOverlay.style.opacity = '1';
        transitionOverlay.style.visibility = 'visible';
    }
    
    // Hide transition
    function hideTransition() {
        transitionOverlay.style.opacity = '0';
        setTimeout(() => {
            transitionOverlay.style.visibility = 'hidden';
        }, 500);
    }
    
    // Show on navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                showTransition();
                setTimeout(hideTransition, 800);
            }
        });
    });
    
    return { showTransition, hideTransition };
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePortfolio();
    initializeLightbox();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializePageTransitions();
    initializeUGCVideos();
});

// Navigation functionality
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Portfolio functionality
function initializePortfolio() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Reset category filters
            resetCategoryFilters();
        });
    });

    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const isUGC = this.closest('.tab-content').id === 'ugc';
            
            // Remove active class from all category buttons in current tab
            const currentTabCategoryBtns = this.closest('.tab-content').querySelectorAll('.category-btn');
            currentTabCategoryBtns.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter items
            if (isUGC) {
                filterUGCItems(category);
            } else {
                filterGalleryItems(category);
            }
        });
    });
}

function resetCategoryFilters() {
    // Reset all category buttons to show 'All' as active
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Show all items
    galleryItems.forEach(item => {
        item.style.display = 'block';
    });
    ugcItems.forEach(item => {
        item.style.display = 'block';
    });
}

function filterGalleryItems(category) {
    galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterUGCItems(category) {
    ugcItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// Lightbox functionality
function initializeLightbox() {
    // Open lightbox when clicking on gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            openLightbox(img.src, index);
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', closeLightboxModal);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });

    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightboxModal();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

function openLightbox(imageSrc, index) {
    // Get all visible gallery images
    currentImages = Array.from(galleryItems)
        .filter(item => item.style.display !== 'none')
        .map(item => item.querySelector('img').src);
    
    currentImageIndex = currentImages.indexOf(imageSrc);
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightboxModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImage.src = currentImages[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    lightboxImage.src = currentImages[currentImageIndex];
}

// Elegant scroll animations
function initializeScrollAnimations() {
    // Intersection Observer for elegant scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                // Remove animation class when scrolling away for re-trigger
                entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);

    // Observe About section elements
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutImage) animateObserver.observe(aboutImage);
    if (aboutContent) animateObserver.observe(aboutContent);

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        animateObserver.observe(title);
    });

    // Observe portfolio elements
    const portfolioSubtitle = document.querySelector('.portfolio-subtitle');
    const portfolioTabs = document.querySelector('.portfolio-tabs');
    
    if (portfolioSubtitle) animateObserver.observe(portfolioSubtitle);
    if (portfolioTabs) animateObserver.observe(portfolioTabs);

    // Staggered animation for gallery items
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const galleryItems = entry.target.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100); // 100ms delay between each item
                });
            } else {
                // Reset animations when scrolling away
                const galleryItems = entry.target.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    item.classList.remove('animate');
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe gallery grids
    document.querySelectorAll('.gallery-grid').forEach(grid => {
        galleryObserver.observe(grid);
    });

    // Subtle parallax effect for portrait
    let ticking = false;
    function updateParallax() {
        const portrait = document.querySelector('.portrait');
        if (portrait) {
            const scrolled = window.pageYOffset;
            const aboutSection = document.querySelector('.about');
            const aboutRect = aboutSection.getBoundingClientRect();
            
            if (aboutRect.top < window.innerHeight && aboutRect.bottom > 0) {
                const parallaxSpeed = 0.02;
                const yPos = scrolled * parallaxSpeed;
                portrait.style.transform = `translateY(${yPos}px)`;
            }
        }
        ticking = false;
    }

    function requestParallax() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallax, { passive: true });

    // Basic scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(218, 165, 32, 0.1);
        z-index: 1000;
    `;
    
    const progressBar = scrollIndicator.querySelector('.scroll-progress');
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #DAA520, #B8860B);
        width: 0%;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Enhanced Contact Form with Luxury Interactions
function initializeContactForm() {
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Enhanced input animations with luxury feel
    formInputs.forEach(input => {
        // Create floating label effect
        const formGroup = input.parentElement;
        
        input.addEventListener('focus', function() {
            formGroup.classList.add('focused');
            this.style.transform = 'translateY(-2px)';
            createRipple(event, formGroup);
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                formGroup.classList.remove('focused');
                this.style.transform = 'translateY(0)';
            }
        });

        // Real-time validation with luxury styling
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                formGroup.classList.add('has-content');
            } else {
                formGroup.classList.remove('has-content');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Enhanced validation with luxury styling
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                input.parentElement.classList.add('error');
                isValid = false;
                setTimeout(() => {
                    input.parentElement.classList.remove('error');
                }, 3000);
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Luxury loading animation
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.style.transform = 'scale(0.95)';
        submitButton.innerHTML = '<span class="loading-dots">Sending<span>.</span><span>.</span><span>.</span></span>';
        submitButton.disabled = true;
        
        // Add loading animation styles
        const style = document.createElement('style');
        style.textContent = `
            .loading-dots span {
                animation: loadingDots 1.5s infinite;
            }
            .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
            .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
            .loading-dots span:nth-child(4) { animation-delay: 0.6s; }
            @keyframes loadingDots {
                0%, 60%, 100% { opacity: 0.3; }
                30% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Simulate luxury form submission
        setTimeout(() => {
            submitButton.innerHTML = '✓ Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #DAA520, #B8860B)';
            submitButton.style.color = 'white';
            submitButton.style.transform = 'scale(1)';
            
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form with staggered animation
            setTimeout(() => {
                formInputs.forEach((input, index) => {
                    setTimeout(() => {
                        input.value = '';
                        input.parentElement.classList.remove('focused', 'has-content');
                        input.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.style.color = '';
                    submitButton.disabled = false;
                    document.head.removeChild(style);
                }, 1000);
            }, 2000);
        }, 2000);
    });

    // Luxury ripple effect function
    function createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(218, 165, 32, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 0;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            ripple.remove();
            document.head.removeChild(style);
        }, 600);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : 'background: linear-gradient(135deg, #f44336, #da190b);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Smooth scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#contact');
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// UGC video functionality
function initializeUGCVideos() {
    console.log('Initializing UGC videos...', ugcItems.length, 'items found');
    ugcItems.forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            console.log('Setting up video:', video.src || video.querySelector('source')?.src);
            // Remove default controls and make video clickable
            video.removeAttribute('controls');
            video.style.cursor = 'pointer';
            
            // Add load event listener for debugging
            video.addEventListener('loadstart', function() {
                console.log('Video load started:', video.src);
            });
            
            video.addEventListener('loadeddata', function() {
                console.log('Video data loaded:', video.src);
            });
            
            video.addEventListener('error', function(e) {
                console.error('Video error:', e, video.src);
            });
            
            // Add click event to play/pause video
            video.addEventListener('click', function() {
                console.log('Video clicked:', video.src, 'paused:', video.paused);
                if (video.paused) {
                    // Pause all other videos first
                    ugcItems.forEach(otherItem => {
                        const otherVideo = otherItem.querySelector('video');
                        if (otherVideo && otherVideo !== video) {
                            otherVideo.pause();
                            otherVideo.muted = true;
                            otherItem.classList.remove('playing');
                        }
                    });
                    // Unmute and play the clicked video
                    video.muted = false;
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            console.log('Video started playing successfully');
                            item.classList.add('playing');
                        }).catch(error => {
                            console.error('Error playing video:', error);
                            video.muted = true; // Fallback to muted if autoplay fails
                            video.play().then(() => {
                                console.log('Video playing muted as fallback');
                                item.classList.add('playing');
                            }).catch(err => {
                                console.error('Failed to play video even muted:', err);
                            });
                        });
                    } else {
                        item.classList.add('playing');
                    }
                } else {
                    video.pause();
                    video.muted = true;
                    item.classList.remove('playing');
                }
            });
            
            // Hide play button when video is playing
            video.addEventListener('play', function() {
                video.muted = false;
                item.classList.add('playing');
            });
            
            // Show play button when video is paused
            video.addEventListener('pause', function() {
                item.classList.remove('playing');
            });
            
            // Pause other videos when one starts playing
            video.addEventListener('play', function() {
                ugcItems.forEach(otherItem => {
                    const otherVideo = otherItem.querySelector('video');
                    if (otherVideo && otherVideo !== video) {
                        otherVideo.pause();
                    }
                });
            });
        }
    });
}

// Initialize UGC videos

// Preloader (optional)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #faf8f5 0%, #f5f0eb 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #e0e0e0; border-top: 3px solid #DAA520; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
            <p style="color: #8b7355; font-family: 'Playfair Display', serif; font-size: 18px; letter-spacing: 2px; margin: 0;">SIMRAN</p>
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(preloader)) {
                    document.body.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
if (document.readyState === 'loading') {
    showPreloader();
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// initializeLazyLoading();

// Utility function for debouncing scroll events
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-dependent animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading states for better UX
function addLoadingStates() {
    const buttons = document.querySelectorAll('button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                // Remove loading state after action completes
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Error handling for images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, #f0e6e0 0%, #e8ddd6 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '<span style="color: #8b7355; font-size: 14px;">Image not available</span>';
        });
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleImageErrors);

console.log('Simran Portfolio Website - Initialized Successfully');