// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Carousel Navigation for Mobile
function initializeCarouselNav() {
    const sliders = document.querySelectorAll('.products-slider');
    
    sliders.forEach(slider => {
        const prevBtn = slider.querySelector('.carousel-nav.prev');
        const nextBtn = slider.querySelector('.carousel-nav.next');
        const productsRow = slider.querySelector('.products-row');
        
        if (!prevBtn || !nextBtn || !productsRow) return;
        
        // Scroll amount (one card width plus gap)
        const scrollAmount = 300;
        
        prevBtn.addEventListener('click', () => {
            productsRow.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            productsRow.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update button visibility based on scroll position
        const updateButtonStates = () => {
            const isAtStart = productsRow.scrollLeft === 0;
            const isAtEnd = productsRow.scrollLeft >= productsRow.scrollWidth - productsRow.clientWidth - 10;
            
            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        };
        
        productsRow.addEventListener('scroll', updateButtonStates);
        updateButtonStates(); // Initial state
    });
}

// Initialize carousel when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initializeCarouselNav();
});

// Add this after your existing DOM content loaded event listener

// Banner Slider functionality
function initializeBannerSlider() {
    const slider = document.querySelector('.banner-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const indicators = slider.querySelector('.slider-indicators');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `indicator${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });

    // Initialize first slide
    slides[0].classList.add('active');

    function updateSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        const dots = indicators.querySelectorAll('.indicator');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        resetInterval();
    }

    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Start auto-advance
    startInterval();

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
}

// Initialize slider when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBannerSlider();
    // ...existing DOM content loaded code...
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.product-card, .testimonial-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Product cards animation on scroll
const productCards = document.querySelectorAll('.product-card');
const testimonialCards = document.querySelectorAll('.testimonial-card');

const animateOnScroll = () => {
    productCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        }
    });

    testimonialCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 150);
        }
    });
};

// Throttled scroll event for performance
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `Hi! I'm interested in your hygiene products.

Name: ${name}
Email: ${email}
Message: ${message}

Please contact me for more details.`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '923184636870'; // Your WhatsApp number without +
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Show success notification
        showNotification('Opening WhatsApp to send your message...', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        newsletterForm.reset();
    });
}

// Add to cart functionality
document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Add to cart animation
        button.style.transform = 'scale(0.95)';
        button.textContent = 'Added!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.textContent = 'Add to Cart';
            button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        }, 1000);
        
        showNotification(`${productName} (${productPrice}) added to cart!`, 'success');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.style.opacity = '1', 500);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.opacity = '1', 700);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.style.opacity = '1', 900);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2196F3;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate animations on resize
        animateOnScroll();
    }, 250);
});

// Add smooth reveal animation to sections
const sections = document.querySelectorAll('section:not(.products)');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// WhatsApp number display function
function showWhatsAppNumber(phoneNumber) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.whatsapp-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="whatsapp-modal-content">
            <div class="whatsapp-modal-header">
                <h3>Contact Us on WhatsApp</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="whatsapp-modal-body">
                <div class="whatsapp-icon">📱</div>
                <p>For more information about our products, contact us on WhatsApp:</p>
                <div class="whatsapp-number">${phoneNumber}</div>
                <a href="https://wa.me/${phoneNumber.replace('+', '')}" target="_blank" class="whatsapp-button">
                    <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.whatsapp-modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const modalHeader = modal.querySelector('.whatsapp-modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
    `;
    
    const closeButton = modal.querySelector('.close-modal');
    closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    `;
    
    const whatsappIcon = modal.querySelector('.whatsapp-icon');
    whatsappIcon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 1rem;
    `;
    
    const whatsappNumber = modal.querySelector('.whatsapp-number');
    whatsappNumber.style.cssText = `
        font-size: 1.5rem;
        font-weight: bold;
        color: #25D366;
        margin: 1rem 0;
        padding: 1rem;
        background: #f0f0f0;
        border-radius: 10px;
    `;
    
    const whatsappButton = modal.querySelector('.whatsapp-button');
    whatsappButton.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #25D366;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        margin-top: 1rem;
        transition: all 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Prevent default link behavior
    return false;
}

// Slider functionality
function slideCategory(categoryId, direction) {
    const slider = document.getElementById(`${categoryId}-slider`);
    const container = slider.querySelector('.slider-container');
    const scrollAmount = 300;
    
    if (direction === 'next') {
        container.scrollLeft += scrollAmount;
    } else {
        container.scrollLeft -= scrollAmount;
    }
}

// Category modal functionality
function showCategoryModal(categoryId) {
    const categoryData = {
        cleaning: {
            title: '🧽 Cleaning Products',
            products: [
                { name: 'Detergents', description: 'High-quality detergents for laundry and cleaning needs.', image: 'products images/detergents.jpeg' },
                { name: 'Floor Cleaner', description: 'Powerful floor cleaner for all types of flooring.', image: 'products images/floor cleaner.jpeg' },
                { name: 'Advanced Floor Cleaner', description: 'Premium floor cleaner with enhanced cleaning power and fresh scent.', image: 'products images/floor cleaner2.png' },
                { name: 'Professional Floor Cleaner', description: 'Commercial-grade floor cleaner for heavy-duty cleaning applications.', image: 'products images/floor cleaner3.avif' },
                { name: 'Insect Killer', description: 'Effective insect killer for pest control and elimination.', image: 'products images/insect killer.jpeg' }
            ]
        },
        hygiene: {
            title: '🧴 Hygiene Products',
            products: [
                { name: 'Hand Sanitizer', description: 'Alcohol-based sanitizer for instant hand hygiene protection.', image: 'products images/hand senitizer.jpeg' },
                { name: 'Anti Bacterial Spray', description: 'Advanced antibacterial spray for enhanced protection.', image: 'products images/anti becterial spray.jpeg' },
                { name: 'Hand Dryer', description: 'Electric hand dryer for hygienic hand drying.', image: 'products images/hand dryier.jpeg' },
                { name: 'Hand Wash', description: 'Gentle and effective hand wash for daily hygiene.', image: 'products images/hand wash.jpeg' }
            ]
        },
        wipes: {
            title: '🧻 Wipes & Tissues',
            products: [
                { name: 'Hygiene Tissue', description: 'Specialized hygiene tissues for personal care.', image: 'products images/hygiene tissue.jpeg' },
                { name: 'Printed Tissue', description: 'Custom printed tissues for branding and promotion.', image: 'products images/printed tissue.jpeg' },
                { name: 'Table Tissue', description: 'Table tissues for dining and hospitality use.', image: 'products images/table tissu.jpeg' },
                { name: 'Bulk Tissues', description: 'Economy pack tissues for office and home use.', image: 'products images/bulk tissues.jpeg' },
                { name: 'Tissue Box', description: 'Soft and absorbent tissues for everyday use.', image: 'products images/tissue box.jpeg' },
                { name: 'Tissue Roll', description: 'Convenient tissue rolls for continuous use.', image: 'products images/tissue roll.jpeg' },
                { name: 'Toilet Tissue Roll', description: 'Premium quality toilet tissue rolls for comfort and hygiene.', image: 'products images/tolilet tissue roll.jpeg' },
                { name: 'Disposable Coffee Cups', description: 'Eco-friendly disposable coffee cups for beverages.', image: 'products images/dispoible coffe cups.jpeg' }
            ]
        },
        aircare: {
            title: '🌸 Air Care',
            products: [
                { name: 'Air Freshener Machine', description: 'Automatic air freshener machine for continuous fragrance.', image: 'products images/air freshner machine.jpeg' },
                { name: 'Premium Air Freshener 1', description: 'Premium quality air freshener with long-lasting scent.', image: 'products images/air freshner1.jpeg' },
                { name: 'Premium Air Freshener 2', description: 'Deluxe air freshener with natural ingredients.', image: 'products images/air freshner2.jpeg' },
                { name: 'Premium Air Freshener 3', description: 'Advanced air freshener with odor elimination.', image: 'products images/air freshner3.jpeg' },
                { name: 'Premium Air Freshener 4', description: 'Professional air freshener for commercial use.', image: 'products images/air freshner4.jpeg' },
                { name: 'Premium Air Freshener 5', description: 'Luxury air freshener with premium fragrances.', image: 'products images/air freshner5.jpeg' },
                { name: 'Premium Air Freshener 6', description: 'Ultimate air freshener with maximum coverage.', image: 'products images/air freshner6.jpeg' }
            ]
        }
    };

    const category = categoryData[categoryId];
    if (!category) return;

    // Remove existing modal
    const existingModal = document.querySelector('.category-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'category-modal';
    
    let productsHTML = category.products.map(product => `
        <div class="modal-product-card">
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-content">
                <h4 class="modal-product-name">${product.name}</h4>
                <p class="modal-product-description">${product.description}</p>
                <button class="btn btn-product" onclick="showWhatsAppNumber('+923184636870')">Contact for Price</button>
            </div>
        </div>
    `).join('');

    modal.innerHTML = `
        <div class="category-modal-content">
            <div class="category-modal-header">
                <h3>${category.title}</h3>
                <button class="close-category-modal">&times;</button>
            </div>
            <div class="category-modal-body">
                <div class="modal-products-grid">
                    ${productsHTML}
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = modal.querySelector('.category-modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 1200px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    // Add to DOM
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.close-category-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('The Hygiene Care website loaded successfully!');
    
    // Add loading class to body for CSS animations
    document.body.classList.add('page-loaded');
    
    // Initialize all animations
    animateOnScroll();
    
    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Toggle extra products function
function toggleExtra(elementId) {
    const element = document.getElementById(elementId);
    const button = event.target;

    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);

        button.textContent = 'Show Less';
    } else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            element.style.display = 'none';
            button.textContent = 'Show More';
        }, 300);
    }
}

// Toggle extra products group function
function toggleExtraGroup(groupClass) {
    const elements = document.querySelectorAll(`.${groupClass}`);
    const button = event.target;
    const isHidden = elements[0].style.display === 'none' || elements[0].style.display === '';

    elements.forEach((element, index) => {
        if (isHidden) {
            setTimeout(() => {
                element.style.display = 'block';
                element.style.opacity = '0';
                element.style.transform = 'translateY(-20px)';
                element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 10);
            }, index * 100); // Stagger animation
        } else {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(-20px)';

                setTimeout(() => {
                    element.style.display = 'none';
                }, 300);
            }, index * 50);
        }
    });

    setTimeout(() => {
        button.textContent = isHidden ? 'Show Less' : 'Show More';
    }, elements.length * 100);
}
