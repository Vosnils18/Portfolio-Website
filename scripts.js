// Enhanced particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }
}

// Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.getElementById('matrix');
    if (!matrixContainer) return;
    
    const chars = '01234567890101010101ABCDEF{}[]();.,<>/\\|~#$%&*+-=';
    
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 10 + 5) + 's';
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
    
    const codeChars = '{}[]();,.01abcdefABCDEF';
    
    for (let i = 0; i < 10; i++) {
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

// Smooth scrolling navigation
function initSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Terminal typing animation
function animateTerminal() {
    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) return;
    
    const lines = [
        '$ python predict_battery_health.py --model=lstm --data=telemetry',
        '> Processing rFMS data stream...',
        '> CRISP-DM methodology applied',
        '> Model accuracy: 94.7% | Status: OPTIMAL'
    ];
    
    // Clear terminal and add first line
    terminalContent.innerHTML = '<div>' + lines[0] + '</div>';
    
    // Add remaining lines with delay
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

// Typewriter effect for hero - fixed version
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    // Remove the CSS animation and handle it purely with JS
    typewriterElement.style.animation = 'blink-caret .75s step-end infinite';
    typewriterElement.style.overflow = 'visible';
    typewriterElement.style.width = 'auto';
}

// Add hover effects to project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                    tag.style.background = 'rgba(0, 255, 255, 0.4)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.background = 'rgba(0, 255, 255, 0.2)';
            });
        });
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
        initProjectCardEffects();
        
        // Delayed animations
        setTimeout(animateTerminal, 2000);
        setTimeout(animateNumbers, 1000);
        setTimeout(initTypewriter, 500);
        
        // Scroll listener
        window.addEventListener('scroll', handleScrollAnimations);
        
        console.log('Portfolio animations initialized successfully');
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', initializePortfolio);
