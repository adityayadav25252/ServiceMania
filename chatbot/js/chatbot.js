// chatbot.js - Main chatbot functionality - RESPONSIVE ENHANCEMENTS

document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const clearChatBtn = document.getElementById('clearChat');
    const minimizeChatBtn = document.getElementById('minimizeChat');
    const contactFormContainer = document.getElementById('contactFormContainer');
    const chatbotContactForm = document.getElementById('chatbotContactForm');
    const cancelContactBtn = document.getElementById('cancelContact');
    const quickOptions = document.querySelectorAll('.quick-option');
    const suggestionButtons = document.querySelectorAll('.suggestion-quick-questions .suggestion-btn');
    const attachFileBtn = document.getElementById('attachFile');
    const quickQuestionsMessage = document.getElementById('quickQuestionsMessage');
    
    // Mobile detection
    const isMobile = window.innerWidth <= 768;
    
    // Initialize chat
    initChatbot();

    // Send message on button click
    sendMessageBtn.addEventListener('click', sendUserMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage();
        }
    });

    // Clear chat button
    clearChatBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all chat messages?')) {
            chatMessages.innerHTML = '';
            showWelcomeMessage();
            // Re-add quick questions message
            addQuickQuestionsMessage();
            // Clear history from localStorage
            localStorage.removeItem('chatbotHistory');
        }
    });

    // Minimize chat - Toggle chat visibility on mobile
    minimizeChatBtn.addEventListener('click', function() {
        if (isMobile) {
            toggleMobileMinimize();
        } else {
            alert('Desktop minimize feature coming soon!');
        }
    });

    // Quick option buttons
    quickOptions.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickOption(action);
        });
    });

    // Quick suggestion buttons (inside chatbox)
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question') || this.textContent;
            chatInput.value = question;
            chatInput.focus();
            
            // Auto-send on mobile for better UX
            if (isMobile && question.length < 50) {
                setTimeout(sendUserMessage, 100);
            }
        });
    });

    // Cancel contact form
    cancelContactBtn.addEventListener('click', function() {
        contactFormContainer.style.display = 'none';
        // Smooth scroll back to input
        setTimeout(() => {
            chatInput.focus();
            scrollToElement(chatInput);
        }, 100);
    });

    // Contact form submission
    chatbotContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmit();
    });

    // Attach file button
    attachFileBtn.addEventListener('click', function() {
        if (isMobile) {
            // Mobile file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*,.pdf,.doc,.docx';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
            
            fileInput.click();
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    addUserMessage(`📎 Attachment: ${fileName}`);
                    setTimeout(() => {
                        addBotMessage("I see you've attached a file. For security reasons, please describe what's in the file or contact support directly via WhatsApp for file sharing.");
                    }, 1000);
                }
                document.body.removeChild(fileInput);
            });
        } else {
            alert('File attachment feature will be available soon!');
        }
    });

    // Handle virtual keyboard on mobile
    if (isMobile) {
        chatInput.addEventListener('focus', function() {
            // Ensure input is visible when keyboard pops up
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }

    // Initialize chat function
    function initChatbot() {
        // Scroll to bottom of chat
        scrollToBottom();
        
        // Focus on input field
        setTimeout(() => {
            chatInput.focus();
            if (isMobile) {
                chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
        
        // Load previous chat if exists
        loadChatHistory();
        
        // Add quick questions message if not already present
        if (!quickQuestionsMessage || !document.body.contains(quickQuestionsMessage)) {
            addQuickQuestionsMessage();
        }
        
        // Add responsive class to body for mobile
        if (isMobile) {
            document.body.classList.add('mobile-view');
        }
        
        // Handle window resize
        window.addEventListener('resize', handleResize);
    }

    // Handle window resize
    function handleResize() {
        const currentIsMobile = window.innerWidth <= 768;
        if (currentIsMobile !== isMobile) {
            location.reload(); // Reload for consistent experience
        }
    }

    // Add quick questions message to chat
    function addQuickQuestionsMessage() {
        const quickQuestionsDiv = document.createElement('div');
        quickQuestionsDiv.className = 'message bot-message';
        quickQuestionsDiv.id = 'quickQuestionsMessage';
        
        quickQuestionsDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p class="message-text"><i class="fas fa-lightbulb"></i> Quick questions you can ask:</p>
                <div class="suggestion-quick-questions">
                    <button class="suggestion-btn" data-question="What services do you offer?">What services do you offer?</button>
                    <button class="suggestion-btn" data-question="How to book a service?">How to book a service?</button>
                    <button class="suggestion-btn" data-question="What are your prices?">What are your prices?</button>
                    <button class="suggestion-btn" data-question="Contact customer support">Contact customer support</button>
                    <button class="suggestion-btn" data-question="Are professionals verified?">Are professionals verified?</button>
                    <button class="suggestion-btn" data-question="What are your working hours?">What are your working hours?</button>
                    <button class="suggestion-btn" data-question="Can I reschedule?">Can I reschedule?</button>
                    <button class="suggestion-btn" data-question="What payment methods do you accept?">What payment methods do you accept?</button>
                </div>
                <span class="message-time">Suggestions</span>
            </div>
        `;
        
        chatMessages.appendChild(quickQuestionsDiv);
        
        // Add event listeners to new suggestion buttons
        setTimeout(() => {
            quickQuestionsDiv.querySelectorAll('.suggestion-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const question = this.getAttribute('data-question') || this.textContent;
                    chatInput.value = question;
                    chatInput.focus();
                    
                    if (isMobile && question.length < 50) {
                        setTimeout(sendUserMessage, 100);
                    }
                });
            });
        }, 100);
        
        scrollToBottom();
    }

    // Toggle mobile minimize
    function toggleMobileMinimize() {
        const chatbotSection = document.querySelector('.chatbot-container-section');
        const isMinimized = chatbotSection.classList.contains('minimized');
        
        if (isMinimized) {
            chatbotSection.classList.remove('minimized');
            minimizeChatBtn.innerHTML = '<i class="fas fa-minus"></i>';
            minimizeChatBtn.title = 'Minimize';
        } else {
            chatbotSection.classList.add('minimized');
            minimizeChatBtn.innerHTML = '<i class="fas fa-plus"></i>';
            minimizeChatBtn.title = 'Restore';
        }
    }

    // Send user message function
    function sendUserMessage() {
        const message = chatInput.value.trim();
        
        if (!message) {
            // Add shake animation to input
            chatInput.classList.add('shake');
            setTimeout(() => {
                chatInput.classList.remove('shake');
            }, 500);
            return;
        }
        
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get bot response after delay
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = ChatbotMessages.getResponse(message);
            addBotMessage(botResponse);
            
            // Check if response suggests contact form
            if (message.toLowerCase().includes('contact') || 
                message.toLowerCase().includes('book') ||
                message.toLowerCase().includes('appointment') ||
                botResponse.includes('contact form')) {
                setTimeout(() => {
                    showContactForm();
                }, 1000);
            }
            
            // Save to chat history
            saveChatHistory();
            
            // Auto-focus input again on mobile
            if (isMobile) {
                setTimeout(() => {
                    chatInput.focus();
                }, 300);
            }
        }, isMobile ? 1000 : 1500); // Faster response on mobile
    }

    // Add user message to chat
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p class="message-text">${escapeHtml(message)}</p>
                <span class="message-time">${timeString}</span>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        
        // Add animation
        messageDiv.style.animation = 'fadeIn 0.3s ease';
    }

    // Add bot message to chat
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Convert markdown-like formatting to HTML
        const formattedMessage = formatMessage(message);
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                ${formattedMessage}
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        
        // Add animation
        messageDiv.style.animation = 'fadeIn 0.3s ease';
        
        // Add event listeners to any buttons in the message
        setTimeout(() => {
            messageDiv.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.getAttribute('data-action') || this.textContent.toLowerCase();
                    handleQuickOption(action);
                });
            });
        }, 100);
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            setTimeout(() => {
                if (typingIndicator.parentNode) {
                    typingIndicator.remove();
                }
            }, 300);
        }
    }

    // Handle quick options
    function handleQuickOption(action) {
        let response = '';
        
        switch(action) {
            case 'services':
                response = ChatbotMessages.knowledgeBase.services.overview;
                break;
            case 'booking':
                response = ChatbotMessages.knowledgeBase.booking.process;
                break;
            case 'contact':
                response = ChatbotMessages.knowledgeBase.contact.support;
                break;
            case 'pricing':
                response = ChatbotMessages.knowledgeBase.pricing.general;
                break;
            default:
                response = `You selected: ${action}. How can I help you with this?`;
        }
        
        addBotMessage(response);
        
        // Show contact form for booking or contact
        if (action === 'booking' || action === 'contact') {
            setTimeout(() => {
                showContactForm();
            }, 1000);
        }
    }

    // Show contact form
    function showContactForm() {
        contactFormContainer.style.display = 'block';
        contactFormContainer.style.animation = 'slideUp 0.3s ease';
        
        if (isMobile) {
            // Smooth scroll to form on mobile
            setTimeout(() => {
                contactFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            contactFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Handle contact form submission
    function handleContactFormSubmit() {
        // Get form values
        const name = document.getElementById('chatbotName').value.trim();
        const email = document.getElementById('chatbotEmail').value.trim();
        const phone = document.getElementById('chatbotPhone').value.trim();
        const message = document.getElementById('chatbotMessage').value.trim();
        const service = document.getElementById('chatbotService').value;
        
        // Validation
        if (!name || !email || !phone || !message || !service) {
            showToast('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            showToast('Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        
        // Prepare form data
        const formData = {
            name: name,
            email: email,
            phone: cleanPhone,
            message: message,
            service: service
        };
        
        // Generate WhatsApp message
        const whatsappMessage = ChatbotMessages.generateWhatsAppMessage(formData);
        const whatsappNumber = "+918770753546";
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`;
        
        // Show confirmation message
        addBotMessage(`✅ Your contact request has been submitted! I've opened WhatsApp for you to send the details to our team. They'll get back to you shortly.`);
        
        // Reset form
        chatbotContactForm.reset();
        contactFormContainer.style.display = 'none';
        
        // Save to local storage
        saveContactRequest(formData);
        
        // Open WhatsApp in new tab
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 500);
        
        // Show success toast
        showToast('Contact form submitted successfully!', 'success');
    }

    // Show toast notification
    function showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.chatbot-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `chatbot-toast toast-${type}`;
        toast.textContent = message;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
            max-width: ${isMobile ? 'calc(100% - 40px)' : '300px'};
        `;
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }

    // Show welcome message
    function showWelcomeMessage() {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message bot-message';
        
        welcomeDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p class="message-text">Hello! 👋 I'm your Service Mania Assistant. I can help you with:</p>
                <div class="quick-options">
                    <button class="quick-option" data-action="services">Explore Services</button>
                    <button class="quick-option" data-action="booking">Book a Service</button>
                    <button class="quick-option" data-action="contact">Contact Support</button>
                    <button class="quick-option" data-action="pricing">Pricing Info</button>
                </div>
                <p class="message-text">Or simply type your question below!</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        
        chatMessages.appendChild(welcomeDiv);
        
        // Reattach event listeners to quick options
        setTimeout(() => {
            welcomeDiv.querySelectorAll('.quick-option').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.getAttribute('data-action');
                    handleQuickOption(action);
                });
            });
        }, 100);
    }

    // Save chat history to localStorage
    function saveChatHistory() {
        const messages = [];
        document.querySelectorAll('.message').forEach(msg => {
            // Skip quick questions message from being saved
            if (msg.id === 'quickQuestionsMessage') return;
            
            const isBot = msg.classList.contains('bot-message');
            const textElement = msg.querySelector('.message-text');
            const timeElement = msg.querySelector('.message-time');
            
            if (textElement && timeElement) {
                const text = textElement.textContent || '';
                const time = timeElement.textContent || '';
                if (text && !text.includes('Hello! 👋 I\'m your Service Mania Assistant')) {
                    messages.push({ isBot, text, time });
                }
            }
        });
        
        // Keep only last 50 messages
        const trimmedMessages = messages.slice(-50);
        localStorage.setItem('chatbotHistory', JSON.stringify(trimmedMessages));
    }

    // Load chat history from localStorage
    function loadChatHistory() {
        const history = localStorage.getItem('chatbotHistory');
        if (history) {
            try {
                const messages = JSON.parse(history);
                if (messages.length > 0) {
                    // Clear welcome message if exists
                    const welcomeMsg = chatMessages.querySelector('.bot-message .message-text');
                    if (welcomeMsg && welcomeMsg.textContent.includes('Hello! 👋')) {
                        chatMessages.innerHTML = '';
                    }
                    
                    // Add saved messages
                    messages.forEach(msg => {
                        if (msg.isBot) {
                            addBotMessage(msg.text);
                        } else {
                            addUserMessage(msg.text);
                        }
                    });
                    
                    // Add fresh welcome and quick questions if no messages yet
                    if (chatMessages.children.length === 0) {
                        showWelcomeMessage();
                        addQuickQuestionsMessage();
                    }
                }
            } catch (e) {
                console.error('Error loading chat history:', e);
                localStorage.removeItem('chatbotHistory');
            }
        }
    }

    // Save contact request
    function saveContactRequest(formData) {
        let requests = JSON.parse(localStorage.getItem('chatbotContactRequests') || '[]');
        formData.timestamp = new Date().toISOString();
        requests.push(formData);
        
        // Keep only last 20 requests
        const trimmedRequests = requests.slice(-20);
        localStorage.setItem('chatbotContactRequests', JSON.stringify(trimmedRequests));
    }

    // Format message with basic markdown
    function formatMessage(text) {
        // Bold text
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Lists
        text = text.replace(/•\s(.*?)(?=\n|$)/g, '<li>$1</li>');
        text = text.replace(/(\d+)\.\s(.*?)(?=\n|$)/g, '<li>$2</li>');
        
        // Convert lines with list items to proper list
        if (text.includes('<li>')) {
            text = text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
        }
        
        // Line breaks
        text = text.replace(/\n/g, '<br>');
        
        // Emojis and icons
        text = text.replace(/📞/g, '<i class="fas fa-phone"></i>');
        text = text.replace(/💰/g, '<i class="fas fa-rupee-sign"></i>');
        text = text.replace(/⏰/g, '<i class="fas fa-clock"></i>');
        text = text.replace(/✅/g, '<i class="fas fa-check-circle"></i>');
        text = text.replace(/👋/g, '<i class="fas fa-hand-wave"></i>');
        text = text.replace(/💬/g, '<i class="fas fa-comment"></i>');
        text = text.replace(/📅/g, '<i class="fas fa-calendar"></i>');
        text = text.replace(/📎/g, '<i class="fas fa-paperclip"></i>');
        text = text.replace(/💡/g, '<i class="fas fa-lightbulb"></i>');
        
        return `<p class="message-text">${text}</p>`;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        setTimeout(() => {
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }, 100);
    }

    // Scroll to element smoothly
    function scrollToElement(element) {
        if (element && element.scrollIntoView) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Add CSS animations for shake and toast
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s ease;
            border-color: #ef4444 !important;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .chatbot-toast {
            animation: slideIn 0.3s ease;
        }
        
        /* Mobile minimize styles */
        .chatbot-container-section.minimized {
            transform: translateY(calc(100% - 60px));
            transition: transform 0.3s ease;
        }
        
        .chatbot-container-section.minimized .chatbot-wrapper {
            height: 60px;
            overflow: hidden;
        }
        
        .mobile-view .chatbot-action-btn {
            touch-action: manipulation;
        }
        
        .mobile-view .suggestion-btn {
            touch-action: manipulation;
        }
    `;
    document.head.appendChild(style);

    // Handle footer form (from existing script)
    const footerContactForm = document.getElementById('footerContactForm');
    if (footerContactForm) {
        footerContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                contactName: document.getElementById('footerName').value,
                contactEmail: document.getElementById('footerEmail').value,
                contactPhone: document.getElementById('footerPhone').value,
                contactMessage: document.getElementById('footerMessage').value,
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

            // Validate phone number
            const phoneRegex = /^[0-9]{10,15}$/;
            const cleanPhone = formData.contactPhone.replace(/\D/g, "");
            if (!phoneRegex.test(cleanPhone)) {
                alert("Please enter a valid phone number (10-15 digits).");
                return;
            }

            // Generate WhatsApp message
            let message = `Hello Service Mania,\n\n`;
            message += `I have a query/inquiry:\n\n`;
            message += `📝 *CONTACT REQUEST*\n`;
            message += `─────────────────────────────\n`;
            message += `• *Name:* ${formData.contactName}\n`;
            message += `• *Email:* ${formData.contactEmail}\n`;
            message += `• *Phone:* ${cleanPhone}\n`;
            message += `• *Message:* ${formData.contactMessage}\n\n`;
            message += `Please get back to me at your earliest convenience. Thank you!`;
            message += `\n\n_This message was sent via Service Mania contact form._`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = "+918770753546";
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappUrl, "_blank");

            // Reset form
            footerContactForm.reset();
        });
    }
});