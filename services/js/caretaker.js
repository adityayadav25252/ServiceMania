// Caretaker Page Specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Caretaker-specific contact form handler
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = {
                contactName: document.getElementById("contactName").value,
                contactEmail: document.getElementById("contactEmail").value,
                contactPhone: document.getElementById("contactPhone").value,
                contactMessage: document.getElementById("contactMessage").value,
            };

            // Validate form
            if (!formData.contactName || !formData.contactEmail || !formData.contactPhone || !formData.contactMessage) {
                alert("Please fill in all fields in the contact form.");
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.contactEmail)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Generate WhatsApp message for caretaker services
            const message = `Hello Service Mania,\n\nI'm interested in Caretaker Services.\n\n🩺 CARETAKER SERVICES INQUIRY\n────────────────────────────\n• Name: ${formData.contactName}\n• Email: ${formData.contactEmail}\n• Phone: ${formData.contactPhone}\n• Message: ${formData.contactMessage}\n\nPlease provide details about available caretakers, services, and pricing. Thank you!\n\n_This message was sent via Caretaker Services page._`;

            const whatsappNumber = "+918770753546";
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, "_blank");
            contactForm.reset();
        });
    }
    
    // Scroll animations for caretaker page elements
    const animatedElements = document.querySelectorAll('.service-card, .care-card, .benefit-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.background = '#ff7a00';
                icon.style.color = 'white';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.background = '#fff3e8';
                icon.style.color = '#ff7a00';
            }
        });
    });
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        const buttons = document.querySelectorAll('.btn, .btn-outline-white, .btn-whatsapp');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Direct WhatsApp buttons functionality
    const directWhatsAppButtons = document.querySelectorAll('a[href*="wa.me"]');
    directWhatsAppButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.href.includes('text=')) {
                e.preventDefault();
                const phone = '+918770753546';
                const message = "Hello Service Mania,\n\nI'm interested in Caretaker Services and would like to know more about:\n• Available caretakers\n• Service packages\n• Pricing information\n• Scheduling options\n• Specialized care programs\n\nPlease provide details at your convenience. Thank you!";
                const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });
});

// Image fallback handler
function handleImageError(img) {
    const defaultImages = {
        'caretaker-main.jpg': 'img/Caretaker.png'
    };
    
    const filename = img.src.split('/').pop();
    if (defaultImages[filename]) {
        img.src = defaultImages[filename];
        img.alt = "Professional Caretaker Services";
    }
}