// ===== SEGURIDAD: PROTECCIÓN DE DATOS =====

// Datos de contacto protegidos contra spam bots
const contactData = {
    email: (() => {
        const encoded = 'bmV1cm9jbGluaWFjaGlsZUBnbWFpbC5jb20=';
        return atob(encoded);
    })(),
    phone: '22 233 7146 - 22 232 3275',
    emailSubject: 'Consulta desde sitio web - Clínica del Sueño'
};

// Función de sanitización básica para prevenir XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Función para validar y limpiar inputs de formulario
function validateAndSanitizeInput(input, type = 'text') {
    if (!input || typeof input !== 'string') return '';
    
    let sanitized = sanitizeInput(input.trim());
    
    // Validaciones específicas por tipo
    switch(type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(sanitized) ? sanitized : '';
            
        case 'phone':
            // Permitir solo números, espacios, + y -
            return sanitized.replace(/[^0-9\s+\-]/g, '');
            
        case 'name':
            // Permitir solo letras, espacios y caracteres comunes en nombres
            return sanitized.replace(/[^a-zA-Z\sáéíóúñÁÉÍÓÚÑ-']/g, '');
            
        default:
            return sanitized.replace(/[<>]/g, ''); // Remover tags HTML
    }
}

// Función para prevenir inyección de scripts
function preventScriptInjection(input) {
    if (typeof input !== 'string') return input;
    
    // Remover patrones de script
    const scriptPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi
    ];
    
    let cleaned = input;
    scriptPatterns.forEach(pattern => {
        cleaned = cleaned.replace(pattern, '');
    });
    
    return cleaned;
}

// Función para proteger contra ataques CSRF (si hubiera formularios)
function generateCSRFToken() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Función para generar enlaces de email seguros
function createEmailLink(subject = '') {
    const email = contactData.email;
    const subjectLine = subject || contactData.emailSubject;
    return `mailto:${email}?subject=${encodeURIComponent(subjectLine)}`;
}

// Función para revelar email solo con acción del usuario
function revealEmail(elementId) {
    const element = document.getElementById(elementId);
    if (element && !element.dataset.revealed) {
        element.href = createEmailLink();
        element.dataset.revealed = 'true';
    }
}

// ===== FUNCIONALIDAD BÁSICA =====

document.addEventListener('DOMContentLoaded', function() {
    
    // Proteger emails al cargar
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        const currentEmail = link.getAttribute('href').replace('mailto:', '');
        if (currentEmail.includes('neuroclinicachile')) {
            link.href = createEmailLink();
            // Prevenir que bots lean el email directamente
            link.dataset.email = contactData.email;
        }
    });
    
    // ===== DETECTAR PÁGINA ACTIVA (OPTIMIZADO) =====
    function setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeItem = document.querySelector(`[href="${currentPage}"]`)?.closest('.nav-item');
        
        // Remover clase active de todos
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            const indicator = item.querySelector('.active-indicator');
            if (indicator) indicator.style.display = 'none';
        });
        
        // Agregar clase active al item correspondiente
        if (activeItem) {
            activeItem.classList.add('active');
            const activeIndicator = activeItem.querySelector('.active-indicator');
            if (activeIndicator) activeIndicator.style.display = 'block';
        }
    }
    
    // Ejecutar al cargar la página
    setActiveNavigation();
    
    // ===== NAVEGACIÓN ACTIVA =====
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const link = this.querySelector('.nav-link');
            const href = link.getAttribute('href');
            
            // Si es un enlace interno (#), prevenir y manejar con JS
            if (href === '#' || href.startsWith('#')) {
                e.preventDefault();
                
                // Remover clase active de todos los items
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    const indicator = navItem.querySelector('.active-indicator');
                    if (indicator) {
                        indicator.style.display = 'none';
                    }
                });
                
                // Agregar clase active al item clickeado
                this.classList.add('active');
                const indicator = this.querySelector('.active-indicator');
                if (indicator) {
                    indicator.style.display = 'block';
                }
                
                // Si es un ancla, hacer scroll suave
                if (href.startsWith('#') && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
            // Si es un enlace a otra página, dejar que navegue normalmente
        });
    });
    
    // ===== BÚSQUEDA FUNCIONAL =====
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchIcon) {
        // Crear dropdown de búsqueda
        const searchDropdown = createSearchDropdown();
        document.body.appendChild(searchDropdown);
        
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = document.getElementById('searchDropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
                
                if (dropdown.classList.contains('active')) {
                    const searchInput = dropdown.querySelector('#searchInput');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            }
        });
        
        // Clic fuera para cerrar
        document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('searchDropdown');
            if (dropdown && !dropdown.contains(e.target) && e.target !== searchIcon) {
                dropdown.classList.remove('active');
            }
        });
    }
    
    function createSearchDropdown() {
        console.log('🔍 Búsqueda: Creando dropdown');
        const dropdown = document.createElement('div');
        dropdown.id = 'searchDropdown';
        dropdown.className = 'search-dropdown';
        dropdown.innerHTML = `
            <div class="search-container">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" id="searchInput" placeholder="Buscar..." autocomplete="off">
            </div>
            <div class="search-results" id="searchResults"></div>
        `;

        


        
        // Event listeners para búsqueda
        const searchInput = dropdown.querySelector('#searchInput');
        const searchResults = dropdown.querySelector('#searchResults');
        
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            performSearch(query, searchResults);
        });
        

        return dropdown;
    }
    
    function performSearch(query, resultsContainer) {

        
        // Base de datos de búsqueda del sitio
        const pagesData = [
            {
                title: 'Polisomnografía',
                description: 'Estudio completo para diagnosticar trastornos del sueño',
                url: '../index.html',
                keywords: ['polisomnografía', 'examen', 'estudio', 'sueño', 'diagnóstico']
            },
            {
                title: 'Quienes Somos',
                description: 'Conoce nuestra clínica especializada en sueño',
                url: 'quienes-somos.html',
                keywords: ['clínica', 'quienes somos', 'sobre nosotros', 'historia']
            },
            {
                title: 'Sala de Sueño',
                description: 'Instalaciones equipadas para estudios de sueño',
                url: 'sala-de-sueno.html',
                keywords: ['sala', 'instalaciones', 'laboratorio', 'equipamiento']
            },
            {
                title: 'Nuestros Equipos',
                description: 'Tecnología de última generación para diagnósticos',
                url: 'nuestros-equipos.html',
                keywords: ['equipos', 'tecnología', 'aparatos', 'dispositivos']
            },
            {
                title: 'PSG Interpretación',
                description: 'Proceso de interpretación de estudios de sueño',
                url: 'psg-interpretacion.html',
                keywords: ['psg', 'interpretación', 'resultados', 'análisis']
            },
            {
                title: 'Entrega de Resultados',
                description: 'Opciones para recibir tus resultados del estudio',
                url: 'entrega-de-resultados.html',
                keywords: ['resultados', 'entrega', 'informe', 'consulta']
            },
            {
                title: 'Trastornos del Sueño',
                description: 'Información sobre apnea, insomnio y otros trastornos',
                url: 'trastornos-del-sueno.html',
                keywords: ['trastornos', 'apnea', 'insomnio', 'ronquido', 'narcolepsia']
            },
            {
                title: 'Blog del Sueño',
                description: 'Artículos médicos especializados en sueño',
                url: 'blog.html',
                keywords: ['blog', 'artículos', 'noticias', 'información', 'consejos']
            },
            {
                title: 'Información y Noticias',
                description: 'Noticias y actualidad sobre el sueño',
                url: 'informacion-noticias.html',
                keywords: ['información', 'noticias', 'actualidad', 'artículos', 'salud']
            },
            {
                title: 'Preguntas Frecuentes',
                description: 'Preguntas frecuentes sobre estudios de sueño',
                url: 'preguntas-frecuentes.html',
                keywords: ['faq', 'preguntas', 'dudas', 'ayuda', 'guía']
            },
            {
                title: 'Comodidades Paciente',
                description: 'Comodidades y seguridad durante tu estudio',
                url: 'comodidades-paciente.html',
                keywords: ['comodidades', 'seguridad', 'confort', 'servicios']
            }
        ];
        
        // Realizar búsqueda
        const results = pagesData.filter(page => {
            const searchText = (page.title + ' ' + page.description + ' ' + page.keywords.join(' ')).toLowerCase();
            return searchText.includes(query);
        });
        

        
        // Mostrar resultados
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No se encontraron resultados</div>';
        } else {
            resultsContainer.innerHTML = results.map(page => `
                <div class="search-result-item" onclick="window.location.href='${page.url}'">
                    <div class="search-result-title">${highlightMatch(page.title, query)}</div>
                    <div class="search-result-description">${highlightMatch(page.description, query)}</div>
                </div>
            `).join('');

        }
    }
    
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // ===== ANIMACIONES DE FORMAS GEOMÉTRICAS =====
    const geoShapes = document.querySelectorAll('.geo-shape');
    
    // Animación sutil al hacer scroll
    function animateShapes() {
        const scrollY = window.scrollY;
        
        geoShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.1}deg)`;
        });
    }
    
    window.addEventListener('scroll', animateShapes);
    
    // ===== EFECTO PARALLAX EN HERO =====
    const heroShapes = document.querySelectorAll('.hero-shape-1, .hero-shape-2, .hero-shape-3');
    
    function parallaxHero() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            heroShapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = scrollY * speed;
                shape.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
    
    window.addEventListener('scroll', parallaxHero);
    
    // ===== SMOOTH SCROLL PARA ANCLAS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // ===== DETECCIÓN DE DISPOSITIVO =====
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // ===== AJUSTES PARA MÓVIL =====
    function adjustForMobile() {
        if (isMobile()) {
            // Reducir complejidad de animaciones en móviles
            geoShapes.forEach(shape => {
                shape.style.display = 'none';
            });
        } else {
            // Mostrar formas geométricas en desktop
            geoShapes.forEach(shape => {
                shape.style.display = 'block';
            });
        }
    }
    
    window.addEventListener('resize', adjustForMobile);
    adjustForMobile();
    
    console.log('🚀 Sitio de Polisomnografía PSG cargado exitosamente');
});