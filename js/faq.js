// faq.js - FAQ Page Functionality

document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            faqItem.classList.toggle('active', !isActive);
        });
    });

    // Category Filter Functionality
    const categoryCards = document.querySelectorAll('.category-card');
    const faqCategoryGroups = document.querySelectorAll('.faq-category-group');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Update active category card
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Show/hide FAQ category groups
            faqCategoryGroups.forEach(group => {
                if (category === 'all' || group.getAttribute('data-category') === category) {
                    group.classList.remove('hidden');
                } else {
                    group.classList.add('hidden');
                }
            });
            
            // Scroll to top of FAQ items
            document.querySelector('.faq-items').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // FAQ Search Functionality
    const searchInput = document.getElementById('faqSearch');
    const searchButton = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // Reset all FAQ items
            faqCategoryGroups.forEach(group => group.classList.remove('hidden'));
            faqQuestions.forEach(question => {
                const faqItem = question.parentElement;
                faqItem.classList.remove('hidden');
                faqItem.classList.remove('active');
                const answer = question.nextElementSibling;
                answer.innerHTML = answer.innerHTML.replace(/<span class="highlighted">|<\/span>/g, '');
            });
            return;
        }
        
        let hasResults = false;
        
        // Search through all FAQ items
        faqQuestions.forEach(question => {
            const faqItem = question.parentElement;
            const questionText = question.querySelector('h3').textContent.toLowerCase();
            const answer = question.nextElementSibling;
            const answerText = answer.textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                faqItem.classList.remove('hidden');
                faqItem.classList.add('active'); // Expand to show answer
                
                // Highlight search term in question
                const questionHTML = question.querySelector('h3').innerHTML;
                const highlightedQuestion = questionHTML.replace(
                    new RegExp(searchTerm, 'gi'),
                    match => `<span class="highlighted">${match}</span>`
                );
                question.querySelector('h3').innerHTML = highlightedQuestion;
                
                // Highlight search term in answer
                const answerHTML = answer.innerHTML;
                const highlightedAnswer = answerHTML.replace(
                    new RegExp(searchTerm, 'gi'),
                    match => `<span class="highlighted">${match}</span>`
                );
                answer.innerHTML = highlightedAnswer;
                
                hasResults = true;
                
                // Show the category group
                const categoryGroup = faqItem.closest('.faq-category-group');
                categoryGroup.classList.remove('hidden');
            } else {
                faqItem.classList.add('hidden');
            }
        });
        
        // Hide empty category groups
        faqCategoryGroups.forEach(group => {
            const visibleItems = group.querySelectorAll('.faq-item:not(.hidden)');
            if (visibleItems.length === 0) {
                group.classList.add('hidden');
            }
        });
        
        // Show message if no results
        if (!hasResults) {
            showNoResultsMessage(searchTerm);
        }
    }
    
    function showNoResultsMessage(searchTerm) {
        const faqItems = document.querySelector('.faq-items');
        
        // Check if message already exists
        let noResultsMsg = document.querySelector('.no-results-message');
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            faqItems.appendChild(noResultsMsg);
        }
        
        noResultsMsg.innerHTML = `
            <div class="no-results-content">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No results found for "${searchTerm}"</h3>
                <p>Try different keywords or browse our FAQ categories</p>
                <button class="btn primary" id="clearSearch">Clear Search</button>
            </div>
        `;
        
        // Add event listener to clear search button
        document.getElementById('clearSearch').addEventListener('click', clearSearch);
    }
    
    function clearSearch() {
        searchInput.value = '';
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
        performSearch();
        
        // Reset to "All Questions" category
        categoryCards.forEach(card => {
            if (card.getAttribute('data-category') === 'all') {
                card.click();
            }
        });
    }
    
    // Event listeners for search
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Clear search when input is cleared
        searchInput.addEventListener('input', () => {
            if (!searchInput.value.trim()) {
                clearSearch();
            }
        });
    }

    // Add smooth scrolling to FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.faq-question')) {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Initialize all FAQ items as closed
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to FAQ link in navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.href.includes('faq.html')) {
            link.classList.add('active');
        }
    });

    // Add CSS for no results message
    const style = document.createElement('style');
    style.textContent = `
        .no-results-message {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            border: 2px solid #ffedd5;
            margin: 30px 0;
        }
        
        .no-results-content {
            max-width: 400px;
            margin: 0 auto;
        }
        
        .no-results-icon {
            width: 80px;
            height: 80px;
            background: #fff3e8;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 2rem;
            color: #ff7a00;
        }
        
        .no-results-message h3 {
            color: #111827;
            margin-bottom: 10px;
            font-size: 1.3rem;
        }
        
        .no-results-message p {
            color: #6b7280;
            margin-bottom: 25px;
        }
        
        .faq-item.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Pre-expand first FAQ item of each category
    faqCategoryGroups.forEach(group => {
        const firstFaqItem = group.querySelector('.faq-item');
        if (firstFaqItem) {
            firstFaqItem.classList.add('active');
        }
    });
});

// Add to existing script.js to handle FAQ page navigation
// This function should be added to your main script.js file
function initializeFAQPage() {
    // Check if we're on FAQ page
    if (!window.location.pathname.includes('faq.html')) return;
    
    // Add smooth scrolling offset for navbar
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const faqHero = document.querySelector('.faq-hero');
    
    if (faqHero) {
        faqHero.style.marginTop = `${navbarHeight}px`;
    }
}