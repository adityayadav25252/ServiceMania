// JavaScript for responsive navbar, animations, and WhatsApp integration

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Set current year in footer
  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Service card animations with responsive thresholds
  const serviceAlternates = document.querySelectorAll(".service-alternate");
  if (serviceAlternates.length > 0) {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -30px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    serviceAlternates.forEach((service, index) => {
      service.style.opacity = "0";
      service.style.transform = "translateY(30px)";
      service.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      service.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(service);
    });
  }

  // Generate WhatsApp Message for Contact Form
  function generateContactMessage(formData) {
    const { contactName, contactEmail, contactPhone, contactMessage } =
      formData;

    let message = `Hello Service Mania,\n\n`;
    message += `I have a query/inquiry:\n\n`;
    message += `📝 *CONTACT REQUEST*\n`;
    message += `─────────────────────────────\n`;
    message += `• *Name:* ${contactName}\n`;
    message += `• *Email:* ${contactEmail}\n`;
    message += `• *Phone:* ${contactPhone}\n`;
    message += `• *Message:* ${contactMessage}\n\n`;
    message += `Please get back to me at your earliest convenience. Thank you!`;
    message += `\n\n_This message was sent via Service Mania contact form._`;

    return encodeURIComponent(message);
  }

  // Handle Contact Form Submission - Direct WhatsApp Integration
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
      if (
        !formData.contactName ||
        !formData.contactEmail ||
        !formData.contactPhone ||
        !formData.contactMessage
      ) {
        alert("Please fill in all fields in the contact form.");
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactEmail)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Validate phone number
      const phoneRegex = /^[0-9]{10,15}$/;
      const cleanPhone = formData.contactPhone.replace(/\D/g, "");
      if (!phoneRegex.test(cleanPhone)) {
        alert("Please enter a valid phone number (10-15 digits).");
        return;
      }

      // Generate WhatsApp message
      const message = generateContactMessage(formData);
      const whatsappNumber = "+918770753546"; // Default contact number

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
        /\D/g,
        ""
      )}?text=${message}`;

      // Directly open WhatsApp without any popup
      window.open(whatsappUrl, "_blank");

      // Reset form
      contactForm.reset();
    });
  }

  // Smooth scroll for anchor links with mobile offset adjustment
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "javascript:void(0)") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Close mobile menu if open
        if (hamburger && navMenu.classList.contains("active")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.style.overflow = "";
        }

        // Calculate offset based on screen size
        const headerHeight = window.innerWidth <= 768 ? 70 : 80;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Form validation for better UX
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      this.value = this.value.replace(/[^0-9+]/g, "");
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn, .btn-whatsapp");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Handle window resize for responsive adjustments
  let resizeTimer;
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close mobile menu on resize to large screen
      if (window.innerWidth > 768 && navMenu && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    }, 250);
  });

  // Add touch support for service cards
  serviceAlternates.forEach((card) => {
    card.addEventListener("touchstart", function() {
      this.classList.add("touch-active");
    }, { passive: true });
    
    card.addEventListener("touchend", function() {
      this.classList.remove("touch-active");
    }, { passive: true });
  });
});

// Add CSS for ripple effect and touch states
const responsiveStyles = document.createElement("style");
responsiveStyles.textContent = `
  .ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .btn, .btn-whatsapp {
    position: relative;
    overflow: hidden;
  }
  
  /* Touch feedback for mobile */
  .service-alternate.touch-active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
  
  /* Prevent text selection on mobile */
  .nav-links a,
  .btn,
  .btn-whatsapp,
  .btn-submit {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  
  /* Improve touch targets on mobile */
  @media (max-width: 768px) {
    .nav-links a {
      padding: 12px 0;
    }
    
    .btn, .btn-whatsapp {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  /* Safe area for notch phones */
  @supports (padding: max(0px)) {
    .navbar {
      padding-left: max(20px, env(safe-area-inset-left));
      padding-right: max(20px, env(safe-area-inset-right));
    }
    
    .hero, .footer {
      padding-left: max(15px, env(safe-area-inset-left));
      padding-right: max(15px, env(safe-area-inset-right));
    }
  }
`;
document.head.appendChild(responsiveStyles);