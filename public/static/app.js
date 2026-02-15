// Импорты модулей
import { initNavigation, switchPage } from './modules/navigation.js';
import { tg, initTelegram } from './modules/telegram.js';
import { initPortfolioSwitcher } from './modules/portfolio.js';

// === Данные проектов ===
const projects = {
    'cosmetics-shop': {
        category: 'tg',
        title: 'Telegram‑магазин корейской косметики',
        subtitle: 'Интернет‑магазин с каталогом товаров, корзиной и формой заказа',
        coverImage: '/public/images/portfolio/cosmetics-shop/cover.jpg',
        emoji: '🛍️',
        stats: [
            { icon: 'shopping_cart', label: 'Продажи', value: '+150% за 2 месяца' },
            { icon: 'people', label: 'Пользователи', value: '2000+ активных' },
            { icon: 'star', label: 'Оценка', value: '4.8/5.0' }
        ],
        challenge: 'Владелец магазина вел продажи через личные сообщения и Google-таблицы. Требовалось автоматизировать процесс и повысить конверсию.',
        solution: 'Разработан полноценный Telegram WebApp с каталогом, поиском по категориям, корзиной, оформлением заказа и оплатой через Telegram Stars.',
        features: [
            'Каталог товаров с фильтрацией по категориям',
            'Корзина с сохранением состояния',
            'Интеграция с Telegram Stars для приема платежей',
            'Админ‑панель для управления товарами',
            'Уведомления о статусе заказа'
        ],
        results: 'Конверсия в покупку выросла в 2.5 раза. Среднее время оформления заказа сократилось с 10 минут до 3 минут. Количество повторных покупок увеличилось на 45%.',
        tech: 'JavaScript, Telegram Bot API, Telegram Stars API, SQLite',
        gallery: [
            '/public/images/portfolio/cosmetics-shop/screen-1.jpg',
            '/public/images/portfolio/cosmetics-shop/screen-2.jpg',
            '/public/images/portfolio/cosmetics-shop/screen-3.jpg'
        ]
    },
    'dental-crm': {
        category: 'web',
        title: 'CRM‑система для стоматологической клиники',
        subtitle: 'Веб‑приложение для управления записями пациентов и учета услуг',
        coverImage: '/public/images/portfolio/dental-crm/cover.jpg',
        emoji: '🦷',
        stats: [
            { icon: 'schedule', label: 'Время записи', value: '−70% времени' },
            { icon: 'event', label: 'Записей/месяц', value: '800+' },
            { icon: 'trending_up', label: 'Выручка', value: '+35%' }
        ],
        challenge: 'Клиника вела записи пациентов в бумажном журнале и Excel. Постоянные ошибки с двойными записями, сложность контроля оплат и аналитики.',
        solution: 'Создана веб‑CRM с онлайн‑календарем записей, карточками пациентов, напоминаниями, аналитикой по доходам и интеграцией SMS‑уведомлений.',
        features: [
            'Календарь записей с drag‑and‑drop переносом',
            'База пациентов с историей посещений',
            'Автоматические SMS‑напоминания за день до приема',
            'Аналитика доходов по врачам и услугам',
            'Модуль складского учета материалов'
        ],
        results: 'Количество пропущенных записей снизилось на 60%. Время на администрирование сократилось в 3 раза. Клиника получила детальную аналитику и увеличила выручку на 35% благодаря оптимизации загрузки врачей.',
        tech: 'React, Node.js, PostgreSQL, Socket.IO, Twilio API',
        gallery: [
            '/public/images/portfolio/dental-crm/screen-1.jpg',
            '/public/images/portfolio/dental-crm/screen-2.jpg',
            '/public/images/portfolio/dental-crm/screen-3.jpg'
        ]
    },
    'event-system': {
        category: 'tg',
        title: 'Система управления событиями',
        subtitle: 'Мини‑приложение для организации мероприятий с регистрацией участников',
        coverImage: '/public/images/portfolio/event-system/cover.jpg',
        emoji: '🎉',
        stats: [
            { icon: 'event', label: 'Мероприятий', value: '50+ проведено' },
            { icon: 'people', label: 'Участников', value: '5000+' },
            { icon: 'timer', label: 'Регистрация', value: '< 1 минуты' }
        ],
        challenge: 'Организаторы мероприятий тратили часы на ручную обработку заявок через Google Forms и рассылку уведомлений.',
        solution: 'Разработан Telegram Mini App с регистрацией участников, генерацией QR‑билетов, автоматическими напоминаниями и системой check‑in на входе.',
        features: [
            'Быстрая регистрация через Telegram (авто‑заполнение профиля)',
            'Генерация QR‑билетов для прохода',
            'Push‑уведомления о событии за 1 день и 1 час',
            'Панель организатора с аналитикой посещаемости',
            'Экспорт списка участников в Excel'
        ],
        results: 'Время регистрации одного участника сократилось с 5 минут до 30 секунд. Явка участников выросла на 40% благодаря автоматическим напоминаниям. Организаторы экономят 10+ часов на каждое мероприятие.',
        tech: 'Vue.js, Telegram Mini Apps, Node.js, MongoDB, QR‑код генератор',
        gallery: [
            '/public/images/portfolio/event-system/screen-1.jpg',
            '/public/images/portfolio/event-system/screen-2.jpg',
            '/public/images/portfolio/event-system/screen-3.jpg'
        ]
    }
};

// === Функции открытия/закрытия проекта ===
function openProject(projectId) {
    const project = projects[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalBody = document.getElementById('projectModalBody');

    modalTitle.textContent = project.title;

    const hasImage = project.coverImage && !project.coverImage.includes('placeholder');

    modalBody.innerHTML = `
        <div class="project-hero">
            ${hasImage 
                ? `<img src="${project.coverImage}" alt="${project.title}" class="project-hero-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <div class="project-hero-emoji" style="display:none;">${project.emoji}</div>`
                : `<div class="project-hero-emoji">${project.emoji}</div>`
            }
        </div>
        
        <div class="project-stats">
            ${project.stats.map(stat => `
                <div class="project-stat-item">
                    <span class="material-icons-round">${stat.icon}</span>
                    <div>
                        <div class="project-stat-label">${stat.label}</div>
                        <div class="project-stat-value">${stat.value}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="project-section">
            <h3 class="project-section-title"><span class="material-icons-round">assignment</span> Задача</h3>
            <p>${project.challenge}</p>
        </div>
        
        <div class="project-section">
            <h3 class="project-section-title"><span class="material-icons-round">lightbulb</span> Решение</h3>
            <p>${project.solution}</p>
        </div>
        
        <div class="project-section">
            <h3 class="project-section-title"><span class="material-icons-round">star</span> Ключевые возможности</h3>
            <ul class="project-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="project-section">
            <h3 class="project-section-title"><span class="material-icons-round">trending_up</span> Результат</h3>
            <p>${project.results}</p>
        </div>
        
        <div class="project-section">
            <h3 class="project-section-title"><span class="material-icons-round">code</span> Технологии</h3>
            <p>${project.tech}</p>
        </div>
        
        ${project.gallery && project.gallery.length > 0 ? `
            <div class="project-section">
                <h3 class="project-section-title"><span class="material-icons-round">photo_library</span> Галерея</h3>
                <div class="project-gallery">
                    ${project.gallery.map(img => `
                        <img src="${img}" alt="Скриншот проекта" 
                             onerror="this.style.display='none';">
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="project-cta">
            <button class="cta-button" onclick="openBrief()">
                Заказать похожий проект
                <span class="material-icons-round">arrow_forward</span>
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
}

function closeProject() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
}

// Экспортируем глобально
window.openProject = openProject;
window.closeProject = closeProject;
window.switchPage = switchPage;

// === Инициализация при загрузке ===
document.addEventListener('DOMContentLoaded', () => {
    initTelegram();
    initNavigation();
    initPortfolioSwitcher();
    initBrief();
    initNewsSlider();

    // Повторно экспортируем после инициализации модулей
    window.openProject = openProject;
    window.closeProject = closeProject;
    window.switchPage = switchPage;
});

// === БРИФИНГ ФОРМА ===
let currentBriefStep = 1;
const totalBriefSteps = 4;

function openBrief() {
    const modal = document.getElementById('briefModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentBriefStep = 1;
    showBriefStep(currentBriefStep);

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
}

function closeBrief() {
    const modal = document.getElementById('briefModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentBriefStep = 1;

    // Сброс формы
    document.getElementById('briefForm').reset();
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));

    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
}

function showBriefStep(step) {
    // Скрываем все шаги
    document.querySelectorAll('.brief-step').forEach(s => s.classList.remove('active'));
    // Показываем текущий шаг
    const targetStep = document.getElementById(`briefStep${step}`);
    if (targetStep) {
        targetStep.classList.add('active');
    }

    // Обновляем прогресс-бар
    const progress = (step / totalBriefSteps) * 100;
    const progressFill = document.querySelector('.brief-progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }

    const progressText = document.querySelector('.brief-progress-text');
    if (progressText) {
        progressText.textContent = `Шаг ${step} из ${totalBriefSteps}`;
    }

    // Управление кнопками
    const prevBtn = document.getElementById('briefPrevBtn');
    const nextBtn = document.getElementById('briefNextBtn');
    const submitBtn = document.getElementById('briefSubmitBtn');

    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = step === totalBriefSteps ? 'none' : 'block';
    if (submitBtn) submitBtn.style.display = step === totalBriefSteps ? 'block' : 'none';
}

function nextBriefStep() {
    // Валидация текущего шага
    const currentStepEl = document.getElementById(`briefStep${currentBriefStep}`);
    const requiredInputs = currentStepEl ? currentStepEl.querySelectorAll('input[required], textarea[required]') : [];
    let isValid = true;

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    // Проверка выбранной опции (если есть)
    const selectedOption = currentStepEl ? currentStepEl.querySelector('.option-btn.selected') : null;
    if (currentStepEl && currentStepEl.querySelector('.option-btn') && !selectedOption) {
        isValid = false;
    }

    if (!isValid) {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
        return;
    }

    if (currentBriefStep < totalBriefSteps) {
        currentBriefStep++;
        showBriefStep(currentBriefStep);

        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
    }
}

function prevBriefStep() {
    if (currentBriefStep > 1) {
        currentBriefStep--;
        showBriefStep(currentBriefStep);

        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
    }
}

async function submitBrief() {
    const form = document.getElementById('briefForm');
    if (!form) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Получаем выбранные опции
    const selectedService = document.querySelector('#briefStep2 .option-btn.selected');
    const selectedBudget = document.querySelector('#briefStep3 .option-btn.selected');

    if (selectedService) data.service = selectedService.dataset.value;
    if (selectedBudget) data.budget = selectedBudget.dataset.value;

    try {
        const response = await fetch('/api/brief', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            if (window.Telegram?.WebApp?.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
            }
            closeBrief();
            alert('Спасибо! Мы получили ваш бриф и скоро свяжемся с вами.');
        } else {
            throw new Error('Ошибка отправки');
        }
    } catch (error) {
        console.error('Ошибка отправки брифа:', error);
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
        alert('Произошла ошибка. Попробуйте еще раз.');
    }
}

function initBrief() {
    // Обработчики для кнопок выбора опций
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Снимаем выделение с других кнопок в этой группе
            const parent = this.closest('.brief-step');
            if (parent) {
                parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            }
            this.classList.add('selected');

            if (window.Telegram?.WebApp?.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.selectionChanged();
            }
        });
    });

    // Закрытие модалки при клике вне её
    const briefModal = document.getElementById('briefModal');
    if (briefModal) {
        briefModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBrief();
            }
        });
    }

    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeProject();
            }
        });
    }
}

// Экспортируем функции брифа глобально
window.openBrief = openBrief;
window.closeBrief = closeBrief;
window.nextBriefStep = nextBriefStep;
window.prevBriefStep = prevBriefStep;
window.submitBrief = submitBrief;

// === НОВОСТИ: СЛАЙДЕР ===
function initNewsSlider() {
    const track = document.querySelector('.news-track');
    const slides = document.querySelectorAll('.news-slide');
    const dotsContainer = document.querySelector('.news-dots');

    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval = null;

    // Создаем точки навигации
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('news-dot');
            dot.setAttribute('aria-label', `Перейти к новости ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateSlider() {
        const offset = -currentSlide * 100;
        track.style.transform = `translateX(${offset}%)`;

        // Обновляем активную точку
        const dots = document.querySelectorAll('.news-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 15000); // 15 секунд
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Поддержка свайпов
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoSlide();
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Свайп влево -> следующий слайд
                currentSlide = (currentSlide + 1) % slides.length;
            } else {
                // Свайп вправо -> предыдущий слайд
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            }
            updateSlider();
        }

        resetAutoSlide();
    });

    startAutoSlide();
}

// === ПЕРЕХОД К СЕКЦИИ (вспомогательная функция) ===
function scrollToSection(sectionId) {
    switchPage(sectionId);
}

window.scrollToSection = scrollToSection;
