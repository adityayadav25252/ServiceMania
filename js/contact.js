// Contact Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Generate WhatsApp Message for Contact Page Form
    function generateContactPageMessage(formData) {
        const { fullName, email, phone, service, message } = formData;

        let messageText = `Hello Service Mania,\n\n`;
        messageText += `I'm interested in your services:\n\n`;
        messageText += `📝 *CONTACT REQUEST*\n`;
        messageText += `─────────────────────────────\n`;
        messageText += `• *Name:* ${fullName}\n`;
        messageText += `• *Email:* ${email}\n`;
        messageText += `• *Phone:* ${phone}\n`;
        
        if (service) {
            const serviceNames = {
                'home-tutor': 'Home Tutor & Teaching Services',
                'fitness-trainer': 'Fitness Trainer Services',
                'caretaker': 'Caretaker Services',
                'physiotherapist': 'Physiotherapist Services',
                'other': 'Other Inquiry'
            };
            messageText += `• *Service Interest:* ${serviceNames[service] || service}\n`;
        }
        
        messageText += `• *Message:* ${message}\n\n`;
        messageText += `Please contact me to discuss further details. Thank you!`;
        messageText += `\n\n_This message was sent via Service Mania contact form._`;

        return encodeURIComponent(messageText);
    }

    // Handle Contact Page Form Submission
    const contactPageForm = document.getElementById("contactPageForm");
    if (contactPageForm) {
        contactPageForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = {
                fullName: document.getElementById("fullName").value.trim(),
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("phone").value.trim(),
                service: document.getElementById("service").value,
                message: document.getElementById("message").value.trim()
            };

            // Validate required fields
            if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
                alert("Please fill in all required fields (marked with *).");
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Validate phone number
            const phoneRegex = /^[0-9]{10,15}$/;
            const cleanPhone = formData.phone.replace(/\D/g, "");
            if (!phoneRegex.test(cleanPhone)) {
                alert("Please enter a valid phone number (10-15 digits).");
                return;
            }

            // Generate WhatsApp message
            const message = generateContactPageMessage(formData);
            const whatsappNumber = "+918770753546";

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`;

            // Directly open WhatsApp
            window.open(whatsappUrl, "_blank");

            // Reset form
            contactPageForm.reset();
            
            // Show success message
            showNotification("Message prepared! Opening WhatsApp...");
        });
    }

    // Handle Footer Contact Form Submission (from index.html)
    const footerContactForm = document.getElementById("footerContactForm");
    if (footerContactForm) {
        footerContactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = {
                fullName: document.getElementById("footerName").value.trim(),
                email: document.getElementById("footerEmail").value.trim(),
                phone: document.getElementById("footerPhone").value.trim(),
                message: document.getElementById("footerMessage").value.trim()
            };

            // Validate required fields
            if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Validate phone number
            const phoneRegex = /^[0-9]{10,15}$/;
            const cleanPhone = formData.phone.replace(/\D/g, "");
            if (!phoneRegex.test(cleanPhone)) {
                alert("Please enter a valid phone number (10-15 digits).");
                return;
            }

            // Generate WhatsApp message
            let message = `Hello Service Mania,\n\n`;
            message += `I have a query/inquiry:\n\n`;
            message += `📝 *CONTACT REQUEST*\n`;
            message += `─────────────────────────────\n`;
            message += `• *Name:* ${formData.fullName}\n`;
            message += `• *Email:* ${formData.email}\n`;
            message += `• *Phone:* ${formData.phone}\n`;
            message += `• *Message:* ${formData.message}\n\n`;
            message += `Please get back to me at your earliest convenience. Thank you!`;
            message += `\n\n_This message was sent via Service Mania contact form._`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = "+918770753546";
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

            // Directly open WhatsApp
            window.open(whatsappUrl, "_blank");

            // Reset form
            footerContactForm.reset();
            
            // Show success message
            showNotification("Message prepared! Opening WhatsApp...");
        });
    }

    // Phone number input formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((input) => {
        input.addEventListener("input", function (e) {
            this.value = this.value.replace(/[^0-9+]/g, "");
        });
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answer
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isVisible = answer.style.display === 'block';
            
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('p').style.display = 'none';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current answer
            answer.style.display = isVisible ? 'none' : 'block';
            item.classList.toggle('active', !isVisible);
        });
    });

    // Notification function
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 500;
            max-width: 350px;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .faq-item.active {
                background: #fff3e8;
            }
            
            .form-group.focused label {
                color: #ff7a00;
            }
        `;
        document.head.appendChild(style);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = window.innerWidth <= 768 ? 70 : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});