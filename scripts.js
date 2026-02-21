// Enhanced particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particlesContainer.appendChild(particle);
    }
}

// Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.getElementById('matrix');
    if (!matrixContainer) return;
    
    const chars = '01';
    
    for (let i = 0; i < 15; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 10 + 8) + 's';
        column.style.animationDelay = Math.random() * 5 + 's';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }
}

// Code rain in terminal
function createCodeRain() {
    const codeRainContainer = document.getElementById('codeRain');
    if (!codeRainContainer) return;
    
    const codeChars = '{}[]();,.01';
    
    for (let i = 0; i < 8; i++) {
        const drop = document.createElement('div');
        drop.className = 'code-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
        codeRainContainer.appendChild(drop);
    }
}

// Enhanced scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });
}

// Nav scroll effect
function handleNavScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Smooth scrolling navigation
function initSmoothScrolling() {
    document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu after clicking
                    const navMenu = document.getElementById('nav-menu');
                    const hamburger = document.getElementById('hamburger');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Hamburger menu toggle
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Terminal typing animation
function animateTerminal() {
    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) return;
    
    const lines = [
        '$ python building_optimization.py --system=foxbms --data=sensors',
        '> Processing sensor data stream...',
        '> Optimizing HVAC performance',
        '> System efficiency: 94.7% | Status: OPTIMAL'
    ];
    
    terminalContent.innerHTML = '<div>' + lines[0] + '</div>';
    
    lines.slice(1).forEach((line, index) => {
        setTimeout(() => {
            const lineDiv = document.createElement('div');
            lineDiv.textContent = line;
            lineDiv.style.opacity = '0';
            lineDiv.style.transition = 'opacity 0.5s ease';
            terminalContent.appendChild(lineDiv);
            
            setTimeout(() => {
                lineDiv.style.opacity = '1';
            }, 100);
        }, (index + 1) * 1000);
    });
}

// Number counter animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        const target = number.textContent;
        const isPercent = target.includes('%');
        const isEuro = target.includes('€');
        const isK = target.includes('k');
        const hasPlus = target.includes('+');
        let finalNumber = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (isNaN(finalNumber)) return;
        
        let current = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isEuro) displayValue = '€' + displayValue;
            if (isK) displayValue = displayValue + 'k';
            if (isPercent) displayValue = displayValue + '%';
            if (hasPlus) displayValue = displayValue + '+';
            
            number.textContent = displayValue;
        }, 50);
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitButton = form.querySelector('.submit-button');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span>';
        
        // Get form data
        const formData = new FormData(form);
        
        try {
            // Replace with your Formspree endpoint
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again or email me directly.';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>';
        }
    });
}

// Initialize all animations and effects
function initializePortfolio() {
    try {
        createParticles();
        createMatrixRain();
        createCodeRain();
        handleScrollAnimations();
        initSmoothScrolling();
        initHamburgerMenu();
        initContactForm();
        
        // Delayed animations
        setTimeout(animateTerminal, 2000);
        setTimeout(animateNumbers, 1000);
        
        // Scroll listeners
        window.addEventListener('scroll', handleScrollAnimations);
        window.addEventListener('scroll', handleNavScroll);
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', initializePortfolio);
