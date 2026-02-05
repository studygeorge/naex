// Telegram WebApp Initialization
if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
    const tg = Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    // Apply Telegram theme colors
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#f8fafc');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#1e293b');
}

// Brief Form State
let briefData = {
    service: '',
    description: '',
    budget: '',
    name: '',
    telegram: '',
    email: ''
};

let currentStep = 1;

// Navigation & Scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 60;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Update active nav item
        updateActiveNav(sectionId);
    }
}

function updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
}

// Scroll spy for navigation
window.addEventListener('scroll', () => {
    const sections = ['home', 'process', 'services', 'portfolio', 'reviews', 'contact'];
    let currentSection = 'home';
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = sectionId;
            }
        }
    });
    
    updateActiveNav(currentSection);
});

// Scroll animations
function checkScrollAnimations() {
    const elements = document.querySelectorAll('.section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', checkScrollAnimations);
window.addEventListener('load', checkScrollAnimations);

// Brief Modal Functions
function openBrief() {
    const modal = document.getElementById('briefModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Auto-fill from Telegram if available
    if (typeof Telegram !== 'undefined' && Telegram.WebApp && Telegram.WebApp.initDataUnsafe.user) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        document.getElementById('clientName').value = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        document.getElementById('clientTelegram').value = user.username ? `@${user.username}` : '';
    }
    
    // Haptic feedback
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
}

function closeBrief() {
    const modal = document.getElementById('briefModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form
    resetBrief();
}

function resetBrief() {
    currentStep = 1;
    briefData = {
        service: '',
        description: '',
        budget: '',
        name: '',
        telegram: '',
        email: ''
    };
    
    // Reset all steps
    document.querySelectorAll('.brief-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector('[data-step="1"]').classList.add('active');
    
    // Reset selections
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Clear inputs
    document.getElementById('projectDesc').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('clientTelegram').value = '';
    document.getElementById('clientEmail').value = '';
}

function nextBriefStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    
    // Validate current step
    if (!validateStep(currentStep)) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Save data
    saveStepData(currentStep);
    
    // Move to next step
    if (currentStep < 4) {
        currentStepElement.classList.remove('active');
        currentStep++;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        
        // Haptic feedback
        if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
            Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
    }
}

function prevBriefStep() {
    if (currentStep > 1) {
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        currentStepElement.classList.remove('active');
        currentStep--;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        
        // Haptic feedback
        if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
            Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
    }
}

function validateStep(step) {
    switch(step) {
        case 1:
            return briefData.service !== '';
        case 2:
            return document.getElementById('projectDesc').value.trim() !== '';
        case 3:
            return briefData.budget !== '';
        case 4:
            const name = document.getElementById('clientName').value.trim();
            const telegram = document.getElementById('clientTelegram').value.trim();
            return name !== '' && telegram !== '';
        default:
            return true;
    }
}

function saveStepData(step) {
    switch(step) {
        case 1:
            // Service already saved via option click
            break;
        case 2:
            briefData.description = document.getElementById('projectDesc').value.trim();
            break;
        case 3:
            // Budget already saved via option click
            break;
        case 4:
            briefData.name = document.getElementById('clientName').value.trim();
            briefData.telegram = document.getElementById('clientTelegram').value.trim();
            briefData.email = document.getElementById('clientEmail').value.trim();
            break;
    }
}

async function submitBrief() {
    if (!validateStep(4)) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    saveStepData(4);
    
    // Prepare data for API
    const requestData = {
        name: briefData.name,
        contact: briefData.telegram,
        service: briefData.service,
        description: briefData.description,
        budget: briefData.budget,
        email: briefData.email || 'Не указан'
    };
    
    try {
        const response = await fetch('/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        if (response.ok) {
            // Success haptic
            if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
                Telegram.WebApp.HapticFeedback.notificationOccurred('success');
            }
            
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            closeBrief();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error submitting brief:', error);
        
        // Error haptic
        if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
            Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
        
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
    }
}

// Option button selection
document.addEventListener('DOMContentLoaded', () => {
    // Service selection (Step 1)
    const serviceButtons = document.querySelectorAll('[data-step="1"] .option-btn');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            serviceButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            briefData.service = btn.dataset.value;
            
            // Haptic feedback
            if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
                Telegram.WebApp.HapticFeedback.impactOccurred('light');
            }
        });
    });
    
    // Budget selection (Step 3)
    const budgetButtons = document.querySelectorAll('[data-step="3"] .option-btn');
    budgetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            budgetButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            briefData.budget = btn.dataset.value;
            
            // Haptic feedback
            if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
                Telegram.WebApp.HapticFeedback.impactOccurred('light');
            }
        });
    });
    
    // Close modal on background click
    const modal = document.getElementById('briefModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBrief();
        }
    });
    
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Animate elements on load
    setTimeout(() => {
        checkScrollAnimations();
    }, 100);
});

// Prevent body scroll when modal is open
document.addEventListener('touchmove', (e) => {
    if (document.getElementById('briefModal').classList.contains('active')) {
        const modal = e.target.closest('.brief-content');
        if (!modal) {
            e.preventDefault();
        }
    }
}, { passive: false });
