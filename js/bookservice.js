// Book Service Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const bookingForm = document.getElementById("bookingForm");
  const serviceTypeSelect = document.getElementById("serviceType");
  const serviceSpecificContainer = document.getElementById(
    "serviceSpecificFieldsContainer"
  );
  const serviceFields = {
    tutor: document.getElementById("tutorFields"),
    gym: document.getElementById("gymFields"),
    caretaker: document.getElementById("caretakerFields"),
    physio: document.getElementById("physioFields"),
  };

  // Service type mapping
  const serviceMap = {
    "Home Tutor & Teaching Services": "tutor",
    "Fitness Trainer Services": "gym",
    "Caretaker Services": "caretaker",
    "Physiotherapist Services": "physio",
  };

  // Show/Hide service-specific fields
  function handleServiceTypeChange() {
    const selectedService = serviceTypeSelect.value;
    const serviceKey = serviceMap[selectedService];

    // Hide all service-specific fields first
    Object.values(serviceFields).forEach((field) => {
      if (field) {
        field.classList.remove("active");
        // Disable all inputs in this field
        const inputs = field.querySelectorAll("input, select");
        inputs.forEach((input) => {
          input.disabled = true;
          input.required = false;
        });
      }
    });

    // Hide container if no service selected
    if (!selectedService || !serviceKey) {
      serviceSpecificContainer.style.display = "none";
      return;
    }

    // Show container and the specific service fields
    serviceSpecificContainer.style.display = "block";
    const activeField = serviceFields[serviceKey];
    if (activeField) {
      activeField.classList.add("active");

      // Enable and set required fields
      const inputs = activeField.querySelectorAll("input, select");
      inputs.forEach((input) => {
        input.disabled = false;
        // Set required for fields marked with asterisk
        if (
          input.id === "classGrade" ||
          input.id === "fitnessGoal" ||
          input.id === "careType" ||
          input.id === "therapyType"
        ) {
          input.required = true;
        }
      });
    }
  }

  // Initialize service type change handler
  if (serviceTypeSelect) {
    serviceTypeSelect.addEventListener("change", handleServiceTypeChange);
    // Trigger once on load in case there's a preselected value
    handleServiceTypeChange();
  }

  // Form Validation Functions
  function validateForm() {
    let isValid = true;
    const errorMessages = [];

    // Required field validation
    const requiredFields = bookingForm.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        const fieldName = field.previousElementSibling?.textContent || field.name;
        errorMessages.push(`${fieldName} is required`);
        addErrorStyle(field);
      } else {
        removeErrorStyle(field);
      }
    });

    // Phone number validation
    const phoneInput = document.getElementById("phoneNumber");
    if (phoneInput && phoneInput.value.trim()) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneInput.value.replace(/\D/g, ""))) {
        isValid = false;
        errorMessages.push("Please enter a valid 10-digit phone number");
        addErrorStyle(phoneInput);
      } else {
        removeErrorStyle(phoneInput);
      }
    }

    // City validation
    const cityInput = document.getElementById("city");
    if (cityInput && cityInput.value.trim()) {
      if (cityInput.value.length < 2) {
        isValid = false;
        errorMessages.push("Please enter a valid city name");
        addErrorStyle(cityInput);
      } else {
        removeErrorStyle(cityInput);
      }
    }

    // Service-specific validation
    const selectedService = serviceTypeSelect?.value;
    if (selectedService) {
      switch (selectedService) {
        case "Home Tutor & Teaching Services":
          const classGrade = document.getElementById("classGrade");
          if (classGrade && !classGrade.value) {
            isValid = false;
            errorMessages.push("Please select class/grade for tutor service");
            addErrorStyle(classGrade);
          }
          break;

        case "Fitness Trainer Services":
          const fitnessGoal = document.getElementById("fitnessGoal");
          if (fitnessGoal && !fitnessGoal.value) {
            isValid = false;
            errorMessages.push("Please select fitness goal for trainer service");
            addErrorStyle(fitnessGoal);
          }
          break;

        case "Caretaker Services":
          const careType = document.getElementById("careType");
          if (careType && !careType.value) {
            isValid = false;
            errorMessages.push("Please select care type for caretaker service");
            addErrorStyle(careType);
          }
          break;

        case "Physiotherapist Services":
          const therapyType = document.getElementById("therapyType");
          if (therapyType && !therapyType.value) {
            isValid = false;
            errorMessages.push("Please select therapy type for physiotherapy service");
            addErrorStyle(therapyType);
          }
          break;
      }
    }

    return { isValid, errorMessages };
  }

  // Error styling functions
  function addErrorStyle(element) {
    element.style.borderColor = "#ef4444";
    element.style.backgroundColor = "#fef2f2";
  }

  function removeErrorStyle(element) {
    element.style.borderColor = "";
    element.style.backgroundColor = "";
  }

  // Generate WhatsApp Message
  function generateWhatsAppMessage(formData) {
    const {
      fullName,
      phoneNumber,
      serviceType,
      classGrade,
      subjects,
      fitnessGoal,
      sessionType,
      careType,
      shiftDuration,
      therapyType,
      condition,
      city,
      preferredTime,
      additionalNotes,
    } = formData;

    let message = `Hello Service Mania,\n\n`;
    message += `I would like to book a service:\n\n`;
    message += `📋 *SERVICE BOOKING REQUEST*\n`;
    message += `═══════════════════════════════════\n`;
    message += `👤 *Personal Details*\n`;
    message += `• *Name:* ${fullName}\n`;
    message += `• *Phone:* ${phoneNumber}\n`;
    message += `• *City:* ${city}\n`;
    message += `• *Preferred Time:* ${preferredTime || "Not specified"}\n\n`;

    message += `🔧 *Service Details*\n`;
    message += `• *Service Type:* ${serviceType}\n`;

    // Add service-specific details
    switch (serviceType) {
      case "Home Tutor & Teaching Services":
        message += `• *Class/Grade:* ${classGrade || "Not specified"}\n`;
        message += `• *Subjects:* ${subjects || "Not specified"}\n`;
        break;

      case "Fitness Trainer Services":
        message += `• *Fitness Goal:* ${fitnessGoal || "Not specified"}\n`;
        message += `• *Session Type:* ${sessionType || "Not specified"}\n`;
        break;

      case "Caretaker Services":
        message += `• *Care Type:* ${careType || "Not specified"}\n`;
        message += `• *Shift Duration:* ${shiftDuration || "Not specified"}\n`;
        break;

      case "Physiotherapist Services":
        message += `• *Therapy Type:* ${therapyType || "Not specified"}\n`;
        message += `• *Medical Condition:* ${condition || "Not specified"}\n`;
        break;
    }

    // Additional notes
    if (additionalNotes) {
      message += `\n📝 *Additional Notes:*\n${additionalNotes}\n`;
    }

    message += `\n═══════════════════════════════════\n`;
    message += `Please confirm availability and share further details.\n`;
    message += `Thank you!\n\n`;
    message += `_This booking was made via Service Mania website._`;

    return encodeURIComponent(message);
  }

  // Form Submission Handler
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      const validation = validateForm();
      if (!validation.isValid) {
        alert("Please fix the following errors:\n\n" + validation.errorMessages.join("\n"));
        return;
      }

      // Collect form data
      const formData = {
        fullName: document.getElementById("fullName").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        serviceType: document.getElementById("serviceType").value,
        classGrade: document.getElementById("classGrade")?.value || "",
        subjects: document.getElementById("subjects")?.value || "",
        fitnessGoal: document.getElementById("fitnessGoal")?.value || "",
        sessionType: document.getElementById("sessionType")?.value || "",
        careType: document.getElementById("careType")?.value || "",
        shiftDuration: document.getElementById("shiftDuration")?.value || "",
        therapyType: document.getElementById("therapyType")?.value || "",
        condition: document.getElementById("condition")?.value || "",
        city: document.getElementById("city").value.trim(),
        preferredTime: document.getElementById("preferredTime").value,
        additionalNotes: document.getElementById("additionalNotes").value.trim(),
      };

      // Generate WhatsApp message
      const message = generateWhatsAppMessage(formData);
      const whatsappNumber = "+918770753546";

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`;

      // Show loading state
      const submitBtn = bookingForm.querySelector(".btn-submit");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      submitBtn.disabled = true;

      // Open WhatsApp after a brief delay for better UX
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        
        // Reset button state after a moment
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          // Optional: Show success message
          alert("Thank you! You're being redirected to WhatsApp to complete your booking.");
          
          // Optional: Reset form after successful submission
          // bookingForm.reset();
          // handleServiceTypeChange(); // Reset service-specific fields
        }, 1000);
      }, 500);
    });
  }

  // Real-time validation for phone number
  const phoneInput = document.getElementById("phoneNumber");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      this.value = this.value.replace(/[^0-9+]/g, "");
      if (this.value.length > 15) {
        this.value = this.value.slice(0, 15);
      }
    });
  }

  // Real-time validation for city
  const cityInput = document.getElementById("city");
  if (cityInput) {
    cityInput.addEventListener("input", function (e) {
      // Remove special characters but allow spaces and hyphens
      this.value = this.value.replace(/[^a-zA-Z\s-]/g, "");
    });
  }

  // Add orange focus ring to all form elements
  const formElements = bookingForm.querySelectorAll("input, select, textarea");
  formElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.boxShadow = "0 0 0 3px rgba(255, 122, 0, 0.2)";
    });

    element.addEventListener("blur", function () {
      this.style.boxShadow = "";
    });

    // Add orange hover effect
    element.addEventListener("mouseenter", function () {
      if (!this.disabled) {
        this.style.borderColor = "#ff9a42";
        this.style.backgroundColor = "#fffaf5";
      }
    });

    element.addEventListener("mouseleave", function () {
      if (!this.disabled) {
        this.style.borderColor = "";
        this.style.backgroundColor = "";
      }
    });
  });

  // Initialize form state on page load
  handleServiceTypeChange();

  // Responsive adjustments
  function handleResponsiveAdjustments() {
    const screenWidth = window.innerWidth;
    const formGroups = document.querySelectorAll(".form-group-half");
    
    if (screenWidth <= 768) {
      // Mobile: Stack form groups vertically
      formGroups.forEach(group => {
        group.style.minWidth = "100%";
        group.style.flex = "0 0 100%";
      });
    } else {
      // Desktop/Tablet: Show two columns
      formGroups.forEach(group => {
        group.style.minWidth = "250px";
        group.style.flex = "1";
      });
    }
  }

  // Call on load and resize
  handleResponsiveAdjustments();
  window.addEventListener("resize", handleResponsiveAdjustments);

  // Add keyboard navigation support
  bookingForm.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.type !== "textarea" && e.target.type !== "submit") {
      e.preventDefault();
      const formElements = Array.from(bookingForm.elements);
      const currentIndex = formElements.indexOf(e.target);
      if (currentIndex > -1 && currentIndex < formElements.length - 1) {
        formElements[currentIndex + 1].focus();
      }
    }
  });

  // Form persistence (optional - saves form data in localStorage)
  function saveFormData() {
    const formData = {};
    const formElements = bookingForm.querySelectorAll("input, select, textarea");
    formElements.forEach(element => {
      if (element.name && element.type !== "password") {
        formData[element.name] = element.value;
      }
    });
    localStorage.setItem("bookingFormData", JSON.stringify(formData));
  }

  function loadFormData() {
    const savedData = localStorage.getItem("bookingFormData");
    if (savedData) {
      const formData = JSON.parse(savedData);
      Object.keys(formData).forEach(key => {
        const element = bookingForm.querySelector(`[name="${key}"]`);
        if (element) {
          element.value = formData[key];
        }
      });
      handleServiceTypeChange(); // Update service-specific fields
    }
  }

  // Uncomment to enable form persistence
  // loadFormData();
  
  // Save form data on input (uncomment to enable)
  // formElements.forEach(element => {
  //   element.addEventListener("input", saveFormData);
  // });
});