// Evolved Auto - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            // Toggle between menu and close icon
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navbarMenu && navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(event.target) && 
            !navbarToggle.contains(event.target)) {
            navbarMenu.classList.remove('active');
            const icon = navbarToggle.querySelector('i');
            if (icon && icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Image optimization and lazy loading
    function setupImageOptimization() {
        // Convert all images to use data-src for lazy loading
        const allImages = document.querySelectorAll('img:not([data-src])');
        allImages.forEach(function(img) {
            // Skip if already processed
            if (img.hasAttribute('data-src') || img.classList.contains('lightbox-img')) return;
            
            // Store original src
            const originalSrc = img.getAttribute('src');
            if (originalSrc) {
                img.setAttribute('data-src', originalSrc);
                img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');
                img.classList.add('lazy-load');
            }
        });
        
        // Lazy loading with IntersectionObserver
        const lazyImages = document.querySelectorAll('.lazy-load');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver support
            lazyImages.forEach(function(img) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
            });
        }
    }
    
    // Initialize image optimization
    setupImageOptimization();

    // Lightbox navigation
    const lightboxes = document.querySelectorAll('.lightbox');
    if (lightboxes.length > 0) {
        // Close lightbox when clicking outside the image
        lightboxes.forEach(function(lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    window.location.hash = '';
                }
            });
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (window.location.hash.startsWith('#lightbox-')) {
                const currentId = window.location.hash;
                const currentIndex = parseInt(currentId.replace('#lightbox-', ''));
                
                if (e.key === 'Escape') {
                    window.location.hash = '';
                } else if (e.key === 'ArrowRight') {
                    const nextIndex = currentIndex + 1;
                    const nextLightbox = document.getElementById(`lightbox-${nextIndex}`);
                    if (nextLightbox) {
                        window.location.hash = `lightbox-${nextIndex}`;
                    }
                } else if (e.key === 'ArrowLeft') {
                    const prevIndex = currentIndex - 1;
                    if (prevIndex > 0) {
                        window.location.hash = `lightbox-${prevIndex}`;
                    }
                }
            }
        });
    }

    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(function(element) {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        animatedElements.forEach(function(element) {
            element.classList.add('fade-in');
        });
    }
});
