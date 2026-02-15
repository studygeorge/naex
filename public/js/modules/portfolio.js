import { tg } from './telegram.js';

// Project data
const projects = {
    'cosmetics-shop': {
        category: 'Mini App',
        title: 'Онлайн-магазин косметики',
        subtitle: 'Telegram Mini App с каталогом товаров и интеграцией платежей',
        coverImage: '/images/portfolio/cosmetics-shop/cover.jpg',
        emoji: '🛍️',
        stats: [
            { value: '127%', label: 'Рост продаж' },
            { value: '8.4%', label: 'Конверсия' },
            { value: '3.2K', label: 'Заказов/мес' },
            { value: '4.9★', label: 'Рейтинг' }
        ],
        challenge: 'Бренд косметики терял клиентов из-за сложного процесса заказа на сайте. Необходимо было создать удобный канал продаж с минимальным количеством шагов до покупки.',
        solution: 'Разработали Telegram Mini App с интуитивным каталогом, быстрой корзиной и интеграцией Telegram Payments. Добавили систему уведомлений о статусе заказа и персональные рекомендации на основе истории покупок.',
        features: [
            'Каталог с фильтрами и поиском',
            'Интеграция Telegram Payments',
            'Система уведомлений о заказах',
            'Персональные рекомендации',
            'История покупок и избранное',
            'Программа лояльности'
        ],
        results: 'За первые 3 месяца продажи выросли на 127%, конверсия достигла 8.4% (против 3.1% на сайте). Средний чек увеличился на 23% благодаря рекомендациям.',
        tech: ['React', 'Telegram Mini Apps SDK', 'Node.js', 'PostgreSQL', 'Redis'],
        gallery: [
            '/images/portfolio/cosmetics-shop/screen-1.jpg',
            '/images/portfolio/cosmetics-shop/screen-2.jpg',
            '/images/portfolio/cosmetics-shop/screen-3.jpg'
        ]
    },
    'dental-crm': {
        category: 'Telegram Bot',
        title: 'CRM для стоматологии',
        subtitle: 'Автоматизация записи пациентов и управление клиентской базой',
        coverImage: '/images/portfolio/dental-crm/cover.jpg',
        emoji: '🦷',
        stats: [
            { value: '-40%', label: 'Время записи' },
            { value: '350+', label: 'Записей/мес' },
            { value: '92%', label: 'Явка пациентов' },
            { value: '15 мин', label: 'Экономия времени' }
        ],
        challenge: 'Сеть стоматологий тратила до 3 часов в день на обработку звонков для записи. Администраторы не успевали отвечать, клиенты уходили к конкурентам. Требовалась автоматизация записи с сохранением персонального подхода.',
        solution: 'Создали Telegram-бот с интеграцией в 1С и календарь клиники. Бот автоматически показывает свободные слоты, принимает запись, отправляет напоминания и принимает онлайн-оплату.',
        features: [
            'Онлайн-запись с выбором врача и услуги',
            'Автоматические напоминания о приеме',
            'Интеграция с 1С и календарем клиники',
            'Онлайн-оплата услуг',
            'История посещений и рекомендации',
            'Обратная связь после приема'
        ],
        results: 'Время на обработку записи сократилось на 40%, явка пациентов выросла до 92% (было 78%). Клиника принимает на 30% больше пациентов при той же нагрузке на администраторов.',
        tech: ['Python', 'aiogram 3.0', 'PostgreSQL', '1С API', 'Telegram Bot API'],
        gallery: [
            '/images/portfolio/dental-crm/screen-1.jpg',
            '/images/portfolio/dental-crm/screen-2.jpg',
            '/images/portfolio/dental-crm/screen-3.jpg'
        ]
    },
    'event-system': {
        category: 'Mini App + Bot',
        title: 'Система для мероприятий',
        subtitle: 'Комплексное решение для организации и проведения ивентов',
        coverImage: '/images/portfolio/event-system/cover.jpg',
        emoji: '🎪',
        stats: [
            { value: '2500+', label: 'Участников' },
            { value: '98%', label: 'Довольны' },
            { value: '-60%', label: 'Время регистрации' },
            { value: '4.9★', label: 'Рейтинг' }
        ],
        challenge: 'Организаторам крупных мероприятий требовалось решение для управления участниками, упрощения регистрации и повышения вовлеченности гостей.',
        solution: 'Создали комплексную систему с Telegram Mini App и ботом для регистрации, нетворкинга, расписания мероприятий и геймификации.',
        features: [
            'Быстрая регистрация участников',
            'Система нетворкинга с QR-кодами',
            'Интерактивное расписание',
            'Навигация по площадке',
            'Геймификация и конкурсы',
            'Обратная связь в реальном времени'
        ],
        results: 'Более 2500 участников зарегистрировались и активно использовали систему. 98% гостей оценили опыт как положительный.',
        tech: ['Vue.js', 'Telegram Bot API', 'WebSocket', 'MongoDB', 'Redis'],
        gallery: []
    }
};

// Open project modal
export function openProject(projectId) {
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
    
    const project = projects[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalBody = document.getElementById('projectModalBody');
    
    // Set title
    modalTitle.textContent = project.title;
    
    // Generate gallery HTML
    const galleryHTML = project.gallery && project.gallery.length > 0 
        ? `<div class="project-gallery">
            ${project.gallery.map(img => 
                `<div class="project-gallery-item">
                    <img src="${img}" alt="${project.title}" onerror="this.parentElement.style.display='none'">
                </div>`
            ).join('')}
           </div>`
        : '';
    
    // Generate stats HTML
    const statsHTML = project.stats.map(stat => 
        `<div class="project-stat">
            <div class="project-stat-value">${stat.value}</div>
            <div class="project-stat-label">${stat.label}</div>
        </div>`
    ).join('');
    
    // Generate features HTML
    const featuresHTML = project.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    // Check if image exists, otherwise use emoji
    const heroImageHTML = project.coverImage 
        ? `<img src="${project.coverImage}" alt="${project.title}" onerror="this.parentElement.innerHTML='${project.emoji}'">`
        : project.emoji;
    
    modalBody.innerHTML = `
        <div class="project-hero-image">
            ${heroImageHTML}
        </div>
        
        <div class="project-detail-header">
            <div class="project-category-badge">${project.category}</div>
            <h1>${project.title}</h1>
            <p>${project.subtitle}</p>
        </div>
        
        <div class="project-stats">
            ${statsHTML}
        </div>
        
        <div class="project-section">
            <h3>Задача</h3>
            <p>${project.challenge}</p>
        </div>
        
        <div class="project-section">
            <h3>Решение</h3>
            <p>${project.solution}</p>
        </div>
        
        <div class="project-section">
            <h3>Функционал</h3>
            <ul>
                ${featuresHTML}
            </ul>
        </div>
        
        <div class="project-section">
            <h3>Результаты</h3>
            <p>${project.results}</p>
        </div>
        
        ${galleryHTML}
        
        <div class="project-cta">
            <h3>Хотите такой же проект?</h3>
            <button class="project-cta-button" onclick="closeProject(); openBrief();">
                <span class="material-icons-round">send</span>
                Обсудить проект
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Scroll to top
    modal.scrollTop = 0;
}

// Close project modal
export function closeProject() {
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Portfolio category switcher
export function initPortfolioSwitcher() {
    const buttons = document.querySelectorAll('.switcher-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
            
            const category = this.getAttribute('data-category');
            
            // Update buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update sections
            document.querySelectorAll('.portfolio-category-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`portfolio-${category}`).classList.add('active');
        });
    });
}

// Make functions globally available - КРИТИЧНО!
window.openProject = openProject;
window.closeProject = closeProject;
