// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Apply Telegram theme colors
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#f8fafc');
document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#1e293b');
document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#64748b');
document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#0088cc');
document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#0088cc');
document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');

// Current page state
let currentPage = 'home';

// Navigation function - switch between pages
function switchPage(pageName) {
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
    }
    
    // Update navigation
    updateActiveNav(pageName);
}

// Update active navigation button
function updateActiveNav(pageName) {
    const navItems = document.querySelectorAll('.nav-item');
    const activeBg = document.querySelector('.nav-active-bg');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (!activeBg || !bottomNav) return;
    
    navItems.forEach((item, index) => {
        const section = item.getAttribute('data-section');
        
        if (section === pageName) {
            // Mark as active
            item.classList.add('active');
            
            // Calculate position for active background
            const containerRect = bottomNav.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const leftOffset = itemRect.left - containerRect.left;
            const padding = 4; // Reduced for tighter fit
            
            activeBg.style.left = `${leftOffset + padding}px`;
            activeBg.style.width = `${itemRect.width - (padding * 2)}px`;
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Add click handlers
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            switchPage(section);
        });
        
        // Touch support for Telegram
        item.addEventListener('touchstart', function(e) {
            this.style.opacity = '0.7';
        });
        
        item.addEventListener('touchend', function(e) {
            this.style.opacity = '1';
        });
    });
    
    // Initialize active background position
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        updateActiveNav('home');
    }
});

// Brief form state
const briefData = {
    service: '',
    description: '',
    budget: '',
    name: '',
    telegram: '',
    email: ''
};

let currentStep = 1;

function openBrief() {
    const modal = document.getElementById('briefModal');
    modal.style.display = 'flex';
    currentStep = 1;
    showBriefStep(1);
    
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
    
    // Try to prefill Telegram data
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        if (user.first_name || user.last_name) {
            document.getElementById('clientName').value = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        }
        if (user.username) {
            document.getElementById('clientTelegram').value = `@${user.username}`;
        }
    }
}

function closeBrief() {
    const modal = document.getElementById('briefModal');
    modal.style.display = 'none';
    currentStep = 1;
    
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

function showBriefStep(step) {
    const steps = document.querySelectorAll('.brief-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const targetStep = document.querySelector(`.brief-step[data-step="${step}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
        currentStep = step;
    }
}

function nextBriefStep() {
    // Validate current step
    if (currentStep === 1) {
        const selected = document.querySelector('.option-btn.selected');
        if (!selected) {
            alert('Пожалуйста, выберите услугу');
            return;
        }
        briefData.service = selected.dataset.value;
    } else if (currentStep === 2) {
        const description = document.getElementById('projectDesc').value.trim();
        if (!description) {
            alert('Пожалуйста, опишите проект');
            return;
        }
        briefData.description = description;
    } else if (currentStep === 3) {
        const selected = document.querySelector('.budget-option.selected');
        if (!selected) {
            alert('Пожалуйста, выберите бюджет');
            return;
        }
        briefData.budget = selected.dataset.value;
    }
    
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    if (currentStep < 4) {
        showBriefStep(currentStep + 1);
    }
}

function prevBriefStep() {
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    if (currentStep > 1) {
        showBriefStep(currentStep - 1);
    }
}

async function submitBrief() {
    // Validate final step
    const name = document.getElementById('clientName').value.trim();
    const telegram = document.getElementById('clientTelegram').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    
    if (!name) {
        alert('Пожалуйста, введите имя');
        return;
    }
    
    if (!telegram && !email) {
        alert('Пожалуйста, укажите Telegram или Email');
        return;
    }
    
    briefData.name = name;
    briefData.telegram = telegram;
    briefData.email = email;
    
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
    
    try {
        const response = await fetch('/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(briefData)
        });
        
        if (response.ok) {
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            closeBrief();
            
            // Reset form
            briefData.service = '';
            briefData.description = '';
            briefData.budget = '';
            briefData.name = '';
            briefData.telegram = '';
            briefData.email = '';
            document.querySelectorAll('.option-btn, .budget-option').forEach(btn => btn.classList.remove('selected'));
            document.getElementById('projectDesc').value = '';
            document.getElementById('clientName').value = '';
            document.getElementById('clientTelegram').value = '';
            document.getElementById('clientEmail').value = '';
        } else {
            alert('Произошла ошибка. Попробуйте позже.');
        }
    } catch (error) {
        console.error('Error submitting brief:', error);
        alert('Произошла ошибка. Попробуйте позже.');
    }
}

// Option button selection
document.addEventListener('DOMContentLoaded', function() {
    // Service selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // Haptic feedback
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    });
    
    // Budget selection
    document.querySelectorAll('.budget-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.budget-option').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // Haptic feedback
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    });
});

// Close modal on outside click
document.getElementById('briefModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBrief();
    }
});

// Legacy function for inline onclick handlers
function scrollToSection(section) {
    switchPage(section);
}

// Portfolio switcher
function switchPortfolio(category) {
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    // Update buttons
    document.querySelectorAll('.switcher-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Switch content
    document.querySelectorAll('.portfolio-category-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`portfolio-${category}`).classList.add('active');
}

// Initialize portfolio switcher on load
document.addEventListener('DOMContentLoaded', function() {
    const switcherButtons = document.querySelectorAll('.switcher-btn');
    switcherButtons.forEach(btn => {
        // Добавляем множественные обработчики для максимальной совместимости
        const handleSwitch = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const category = this.getAttribute('data-category');
            switchPortfolio(category);
        };
        
        btn.addEventListener('click', handleSwitch);
        btn.addEventListener('touchend', handleSwitch);
        btn.addEventListener('mouseup', handleSwitch);
    });
});

// News Slider - Auto-change every 15 seconds
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.news-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    // Wrap around
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
    
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlide) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function goToSlide(index) {
    showSlide(index);
    // Reset interval
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 15000);
}

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.news-slider-wrapper');
    
    if (sliderWrapper) {
        // Auto-advance every 15 seconds
        slideInterval = setInterval(nextSlide, 15000);
        
        // Touch events for swipe
        sliderWrapper.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderWrapper.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            showSlide(currentSlide - 1);
        }
        // Reset interval
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 15000);
    }
}
