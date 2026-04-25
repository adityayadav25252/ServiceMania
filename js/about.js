// About Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
    // Value cards animation on scroll
    const valueCards = document.querySelectorAll('.value-card');
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    const createScrollObserver = (elements, threshold = 0.1) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold });
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    };
    
    // Initialize animations
    if (valueCards.length > 0) createScrollObserver(valueCards);
    if (benefitItems.length > 0) createScrollObserver(benefitItems, 0.05);
    
    // Animate stats counter in hero section
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    };
    
    // Initialize counters when stats section is in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = document.querySelectorAll('.hero-stats h3');
                stats.forEach(stat => {
                    const currentText = stat.textContent;
                    const target = parseInt(currentText.replace('+', ''));
                    if (!isNaN(target)) {
                        stat.textContent = '0' + (currentText.includes('+') ? '+' : '');
                        setTimeout(() => {
                            animateCounter(stat, target, 1500);
                        }, 500);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);
    
    // Story image parallax effect
    const storyImage = document.querySelector('.story-image');
    if (storyImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            storyImage.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === 'javascript:void(0)') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Calculate offset
                const headerHeight = window.innerWidth <= 768 ? 70 : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in nav
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage.includes('about') && currentPage.includes('about'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Form submission handling for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                contactName: document.getElementById('contactName').value,
                contactEmail: document.getElementById('contactEmail').value,
                contactPhone: document.getElementById('contactPhone').value,
                contactMessage: document.getElementById('contactMessage').value
            };
            
            // Validate form
            if (!formData.contactName || !formData.contactEmail || 
                !formData.contactPhone || !formData.contactMessage) {
                alert('Please fill in all fields in the contact form.');
                return;
            }
            
            // Generate WhatsApp message
            let message = `Hello Service Mania,\n\n`;
            message += `I have a query/inquiry from About page:\n\n`;
            message += `📝 *CONTACT REQUEST*\n`;
            message += `─────────────────────────────\n`;
            message += `• *Name:* ${formData.contactName}\n`;
            message += `• *Email:* ${formData.contactEmail}\n`;
            message += `• *Phone:* ${formData.contactPhone}\n`;
            message += `• *Message:* ${formData.contactMessage}\n\n`;
            message += `Please get back to me at your earliest convenience. Thank you!`;
            message += `\n\n_This message was sent via Service Mania About page._`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = '+918770753546';
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            const submitBtn = contactForm.querySelector('.btn-whatsapp');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT SUCCESSFULLY!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.about-cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});