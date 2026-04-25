// chatbot-messages.js - Contains all chatbot responses and conversation logic

const ChatbotMessages = {
    // Knowledge base for the chatbot
    knowledgeBase: {
        greetings: [
            "Hello! 👋 How can I assist you today?",
            "Hi there! Welcome to Service Mania. What can I help you with?",
            "Greetings! I'm your Service Mania assistant. Ready to help!",
            "Welcome! How can I make your service booking experience better today?"
        ],
        
        services: {
            overview: "We offer four premium services:\n\n1. **Home Tutor Services** - Personalized educational support\n2. **Fitness Trainer** - Custom workout plans and guidance\n3. **Caretaker Services** - Professional care for your loved ones\n4. **Physiotherapist** - Rehabilitation and pain management\n\nWhich service are you interested in learning more about?",
            
            tutor: "**🏫 Home Tutor Services**\n\n• Personalized one-on-one tutoring\n• Certified teachers for all subjects\n• Flexible timing (online/offline)\n• Exam preparation and homework help\n• Special needs education support\n\n📞 Contact us for detailed information about pricing and availability!",
            
            fitness: "**💪 Fitness Trainer Services**\n\n• Personal training at home or gym\n• Customized workout plans\n• Nutrition and diet guidance\n• Progress tracking and motivation\n• Specialized programs (weight loss, muscle gain)\n\n📞 Contact us for personalized fitness plans!",
            
            caretaker: "**👵 Caretaker Services**\n\n• Elderly care and companionship\n• Medical assistance supervision\n• Meal preparation and feeding\n• Personal hygiene assistance\n• Special needs care\n\n📞 Contact us to discuss specific care requirements!",
            
            physio: "**🩹 Physiotherapist Services**\n\n• Home visit physiotherapy\n• Pain management therapy\n• Post-surgery rehabilitation\n• Sports injury recovery\n• Geriatric care and mobility\n\n📞 Contact us for rehabilitation consultation!"
        },
        
        booking: {
            process: "**📋 Booking Process:**\n\n1. Share your service requirements\n2. We match you with verified professionals\n3. Review profiles and credentials\n4. Confirm booking via WhatsApp\n5. Service delivered at your doorstep\n\nWould you like to proceed with booking?",
            
            requirements: "To book a service, I'll need:\n\n• Your name and contact details\n• Service type and preferred timing\n• Location/address for service\n• Any special requirements\n\nShall we proceed with the contact form?",
            
            confirmation: "Great! I'll help you connect with our team via WhatsApp for booking confirmation. Our team will:\n\n• Share professional profiles\n• Discuss timing and availability\n• Confirm booking details\n• Provide ongoing support"
        },
        
        pricing: {
            general: "**💰 Pricing Information:**\n\nOur pricing is based on:\n• Service type and duration\n• Professional experience level\n• Location and timing\n• Specific requirements\n\nPlease contact us for detailed pricing information tailored to your needs.",
            
            tutorPrices: "Home Tutor Pricing:\n\nContact us for detailed pricing based on your educational requirements and preferred schedule.",
            
            fitnessPrices: "Fitness Trainer Pricing:\n\nGet personalized pricing based on your fitness goals and training frequency.",
            
            caretakerPrices: "Caretaker Pricing:\n\nPricing varies based on care requirements, duration, and specific needs.",
            
            physioPrices: "Physiotherapist Pricing:\n\nContact us for pricing based on your rehabilitation needs and session frequency."
        },
        
        contact: {
            support: "**📞 Contact Support**\n\n• Phone: +91 8770753546\n• Email: devcubetech@gmail.com\n• WhatsApp: Direct booking available\n• Hours: 8 AM - 10 PM (7 days)\n\nWould you like me to connect you with our team?",
            
            emergency: "For urgent matters, please call:\n\n🆘 Emergency: +91 8770753546\n\nWe respond to emergency calls 24/7."
        },
        
        about: {
            company: "**🏢 About Service Mania**\n\nEstablished in 2026, we connect clients with verified professionals for premium services at their doorstep.\n\n• Verified professionals\n• Services at your doorstep\n• WhatsApp-based booking system\n• Quality assurance\n\nOur mission: Making premium services accessible and convenient."
        },
        
        faq: {
            common: "**❓ Frequently Asked Questions:**\n\n1. **How do I book?** - Use our booking form or WhatsApp\n2. **Are professionals verified?** - Yes, all are background checked\n3. **Can I reschedule?** - Yes, 24 hours notice required\n4. **Payment methods?** - Cash, UPI, or online transfer\n5. **Refund policy?** - Case-by-case basis\n\nAny specific question?"
        }
    },
    
    // Function to get response based on user input
    getResponse: function(userMessage) {
        const message = userMessage.toLowerCase().trim();
        
        // Greetings
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return this.getRandomResponse(this.knowledgeBase.greetings);
        }
        
        // Services
        if (message.includes('service') || message.includes('offer') || message.includes('provide')) {
            return this.knowledgeBase.services.overview;
        }
        
        if (message.includes('tutor') || message.includes('teacher') || message.includes('education')) {
            return this.knowledgeBase.services.tutor;
        }
        
        if (message.includes('fitness') || message.includes('trainer') || message.includes('gym') || message.includes('workout')) {
            return this.knowledgeBase.services.fitness;
        }
        
        if (message.includes('caretaker') || message.includes('care') || message.includes('elderly') || message.includes('nurse')) {
            return this.knowledgeBase.services.caretaker;
        }
        
        if (message.includes('physio') || message.includes('therapy') || message.includes('rehab')) {
            return this.knowledgeBase.services.physio;
        }
        
        // Booking
        if (message.includes('book') || message.includes('booking') || message.includes('appointment')) {
            return this.knowledgeBase.booking.process;
        }
        
        if (message.includes('how to book') || message.includes('book a service')) {
            return this.knowledgeBase.booking.requirements;
        }
        
        // Pricing
        if (message.includes('price') || message.includes('cost') || message.includes('charge') || message.includes('rate')) {
            if (message.includes('tutor')) return this.knowledgeBase.pricing.tutorPrices;
            if (message.includes('fitness')) return this.knowledgeBase.pricing.fitnessPrices;
            if (message.includes('caretaker')) return this.knowledgeBase.pricing.caretakerPrices;
            if (message.includes('physio')) return this.knowledgeBase.pricing.physioPrices;
            return this.knowledgeBase.pricing.general;
        }
        
        // Contact
        if (message.includes('contact') || message.includes('call') || message.includes('phone') || message.includes('email')) {
            if (message.includes('emergency')) return this.knowledgeBase.contact.emergency;
            return this.knowledgeBase.contact.support;
        }
        
        // About
        if (message.includes('about') || message.includes('company') || message.includes('story')) {
            return this.knowledgeBase.about.company;
        }
        
        // FAQ
        if (message.includes('faq') || message.includes('question') || message.includes('help')) {
            return this.knowledgeBase.faq.common;
        }
        
        // Location
        if (message.includes('where') || message.includes('location') || message.includes('city') || message.includes('area')) {
            return "We serve customers across multiple locations. Our services are available at your doorstep. Please share your location to check availability in your area.";
        }
        
        // Timing
        if (message.includes('time') || message.includes('hour') || message.includes('available') || message.includes('schedule')) {
            return "**⏰ Service Hours:**\n\n• Regular: 8 AM - 10 PM\n• Emergency: 24/7 available\n• Booking: Anytime via WhatsApp\n• Response time: Within 15 minutes\n\nNeed specific timing for a service?";
        }
        
        // Payment
        if (message.includes('payment') || message.includes('pay') || message.includes('cash') || message.includes('upi')) {
            return "**💳 Payment Options:**\n\n• Cash on service completion\n• UPI (PhonePe, GPay, Paytm)\n• Bank transfer\n• No advance payment required\n• Receipt provided for all payments";
        }
        
        // Verification
        if (message.includes('verify') || message.includes('trust') || message.includes('safe') || message.includes('background')) {
            return "**✅ Verification Process:**\n\n• Identity verification\n• Background checks\n• Experience validation\n• Customer reviews\n• Regular training updates\n\nAll our professionals are thoroughly verified for your safety.";
        }
        
        // Default response
        const defaultResponses = [
            "I understand you're asking about: \"" + userMessage + "\"\n\nI can help you with:\n• Service information\n• Booking process\n• Pricing details\n• Contact support\n\nCould you please rephrase or ask about one of these topics?",
            "I'm here to help with Service Mania related queries. You can ask me about:\n\n• Our services (tutoring, fitness, etc.)\n• How to book\n• Contact details\n• Service availability\n\nWhat would you like to know?",
            "That's an interesting question! I specialize in Service Mania services. Try asking about:\n\n• 'What services do you offer?'\n• 'How do I book a service?'\n• 'What are your contact details?'\n• 'Tell me about your verification process'"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    },
    
    // Helper function to get random response from array
    getRandomResponse: function(responsesArray) {
        return responsesArray[Math.floor(Math.random() * responsesArray.length)];
    },
    
    // Function to generate WhatsApp message from contact form
    generateWhatsAppMessage: function(formData) {
        const { name, email, phone, message, service } = formData;
        
        let whatsappMessage = `*NEW CHATBOT CONTACT REQUEST* 📞\n\n`;
        whatsappMessage += `════════════════════════\n`;
        whatsappMessage += `👤 *Customer Details:*\n`;
        whatsappMessage += `• Name: ${name}\n`;
        whatsappMessage += `• Email: ${email}\n`;
        whatsappMessage += `• Phone: ${phone}\n`;
        whatsappMessage += `• Service: ${service}\n\n`;
        whatsappMessage += `💬 *Message:*\n${message}\n\n`;
        whatsappMessage += `📅 *Submitted:* ${new Date().toLocaleString('en-IN')}\n`;
        whatsappMessage += `🌐 *Source:* Service Mania Chatbot\n`;
        whatsappMessage += `════════════════════════\n\n`;
        whatsappMessage += `Please follow up with the customer. This message was generated from the chatbot contact form.`;
        
        return encodeURIComponent(whatsappMessage);
    }
};

// Make it available globally
window.ChatbotMessages = ChatbotMessages;