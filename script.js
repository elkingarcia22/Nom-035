// UBITS Playground - Dashboard JavaScript

// Función global para alternar modo oscuro
function toggleDarkMode() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', newTheme);
    
    // Cambiar icono del botón del sidebar
    const darkModeButton = document.querySelector('#darkmode-toggle i');
    if (darkModeButton) {
        if (newTheme === 'dark') {
            darkModeButton.className = 'fa fa-sun-bright';
        } else {
            darkModeButton.className = 'fa fa-moon';
        }
    }
    
    // Cambiar icono del tab-bar
    const tabBarIcon = document.querySelector('[data-tab="modo-oscuro"] .tab-bar-icon');
    if (tabBarIcon) {
        if (newTheme === 'dark') {
            tabBarIcon.className = 'fa fa-sun-bright tab-bar-icon';
        } else {
            tabBarIcon.className = 'far fa-moon tab-bar-icon';
        }
    }
    
    // Cambiar texto del tab-bar
    const tabBarText = document.querySelector('[data-tab="modo-oscuro"] .tab-bar-text');
    if (tabBarText) {
        if (newTheme === 'dark') {
            tabBarText.textContent = 'Modo claro';
        } else {
            tabBarText.textContent = 'Modo oscuro';
        }
    }
    
    // Cambiar tooltip del botón
    const darkModeButtonContainer = document.querySelector('#darkmode-toggle');
    if (darkModeButtonContainer) {
        if (newTheme === 'dark') {
            darkModeButtonContainer.setAttribute('data-tooltip', 'Modo claro');
            darkModeButtonContainer.setAttribute('data-theme', 'dark');
        } else {
            darkModeButtonContainer.setAttribute('data-tooltip', 'Modo oscuro');
            darkModeButtonContainer.setAttribute('data-theme', 'light');
        }
    }
    
    console.log(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
}

// Función global para inicializar dark mode toggle
function initDarkModeToggle() {
    const darkModeButton = document.querySelector('#darkmode-toggle');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDarkMode();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const topNav = document.getElementById('topNav');
    const navButtons = document.querySelectorAll('.nav-button');
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentArea = document.querySelector('.content-area');
    const tooltip = document.getElementById('tooltip');

    // Función para ajustar el sidebar según el alto de la pantalla
    function adjustSidebarHeight() {
        const windowHeight = window.innerHeight;
        const topMargin = 16; // Margen superior
        const bottomMargin = 16; // Margen inferior
        const availableHeight = windowHeight - topMargin - bottomMargin;
        
        // El sidebar debe tener al menos 578px de alto
        const sidebarHeight = Math.max(578, availableHeight);
        
        if (sidebar) {
            sidebar.style.height = `${sidebarHeight}px`;
            sidebar.style.minHeight = `578px`;
            
            // Ajustar posición para mantener margen de 16px arriba y abajo
            const topPosition = topMargin;
            sidebar.style.top = `${topPosition}px`;
            sidebar.style.bottom = 'auto';
        }
        

    }

    // Función para ajustar el alto del contenedor principal
    function adjustMainContentHeight() {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const isMobile = windowWidth <= 768;
        
        const topMargin = isMobile ? 12 : 16; // Margen superior
        const bottomMargin = isMobile ? 12 : 16; // Margen inferior
        const availableHeight = windowHeight - topMargin - bottomMargin;
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.height = `${availableHeight}px`;
            mainContent.style.maxHeight = `${availableHeight}px`;
        }
    }


    // Función para cargar tema guardado
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            
            // Actualizar icono y tooltip si es modo oscuro
            if (savedTheme === 'dark') {
                const darkModeButton = document.querySelector('#darkmode-toggle i');
                const darkModeButtonContainer = document.querySelector('#darkmode-toggle');
                
                if (darkModeButton) {
                    darkModeButton.className = 'fa fa-sun-bright';
                }
                
                if (darkModeButtonContainer) {
                    darkModeButtonContainer.setAttribute('data-tooltip', 'Modo claro');
                    darkModeButtonContainer.setAttribute('data-theme', 'dark');
                }
            }
        }
    }

    // Función para ajustar el nav superior según el ancho de la pantalla
    function adjustTopNavWidth() {
        // Ya no es necesaria - el CSS se encarga del ancho
        console.log('🎯 Top Nav: CSS se encarga del ancho automáticamente');
    }

    // Función para manejar la navegación del sidebar
    function handleSidebarNavigation(event) {
        const button = event.currentTarget;
        const section = button.dataset.section;
        
        // Remover clase active de todos los botones del sidebar
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al botón clickeado del sidebar
        button.classList.add('active');
        
        // Ocultar/mostrar top nav según la sección
        const topNav = document.querySelector('.top-nav');
        if (topNav) {
            if (section === 'ubits-ai') {
                topNav.style.display = 'none';
            } else {
                topNav.style.display = 'flex';
                
                // Activar siempre la Sección 1 del nav superior
                navTabs.forEach(tab => tab.classList.remove('active'));
                const section1Tab = document.querySelector('[data-tab="section1"]');
                if (section1Tab) {
                    section1Tab.classList.add('active');
                }
            }
        }
        
        // Actualizar el contenido con la sección del sidebar + sección 1
        updateContentArea(section);
    }

    // Función para manejar la navegación de tabs
    function handleTabNavigation(event) {
        const tab = event.currentTarget;
        const tabName = tab.dataset.tab;
        
        // Remover clase active de todos los tabs
        navTabs.forEach(t => t.classList.remove('active'));
        
        // Agregar clase active al tab clickeado
        tab.classList.add('active');
        
        // NO cambiar el contenido principal, solo actualizar el indicador de subsección
        console.log(`Cambiando a subsección: ${tabName}`);
        
        // Actualizar solo el indicador de subsección activa
        updateSubsectionIndicator(tabName);
    }
    
    // Función para actualizar solo el indicador de subsección
    function updateSubsectionIndicator(subsection) {
        const contentPlaceholder = contentArea.querySelector('.content-placeholder');
        
        if (contentPlaceholder) {
            // Mantener el contenido principal, solo actualizar el indicador
            const currentContent = contentPlaceholder.innerHTML;
            
            // Buscar y actualizar solo la línea de "Subsección activa"
            if (currentContent.includes('Subsección activa:')) {
                const updatedContent = currentContent.replace(
                    /Subsección activa: .*?<\/p>/,
                    `Subsección activa: ${subsection.charAt(0).toUpperCase() + subsection.slice(1)}</p>`
                );
                contentPlaceholder.innerHTML = updatedContent;
            }
        }
    }

    // Función para actualizar el área de contenido
    function updateContentArea(section) {
        // Ocultar todas las vistas
        const ubitsAiDashboard = document.getElementById('ubits-ai-dashboard');
        const aiChatInterface = document.getElementById('ai-chat-interface');
        const contentPlaceholder = document.getElementById('content-placeholder');
        const contentAreaElement = document.querySelector('.content-area');

        // Ocultar todas las vistas primero
        if (ubitsAiDashboard) ubitsAiDashboard.style.display = 'none';
        if (aiChatInterface) aiChatInterface.style.display = 'none';
        if (contentPlaceholder) contentPlaceholder.style.display = 'none';

        if (section === 'ubits-ai') {
            // Mostrar dashboard de UBITS AI
            if (ubitsAiDashboard) {
                ubitsAiDashboard.style.display = 'flex';
                if (contentAreaElement) contentAreaElement.classList.add('no-background');
            }
        } else {
            // Mostrar contenido por defecto
            if (contentPlaceholder) {
                contentPlaceholder.style.display = 'block';
                
                // Verificar si hay contenido personalizado
                const customContent = getCustomContent(section);
                
                if (customContent) {
                    contentPlaceholder.innerHTML = customContent;
                } else {
                    // Contenido por defecto del template
                    const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
                    contentPlaceholder.innerHTML = `
                        <h2>${sectionName}</h2>
                        <p>Contenido de la sección: ${sectionName}</p>
                        <p>Subsección activa: Sección 1</p>
                        <p>Personaliza este contenido según tus necesidades</p>
                    `;
                }
                
                // Remover estilos especiales
                contentAreaElement.classList.remove('no-background');
            }
        }
    }
    
    // Función para obtener contenido personalizado
    function getCustomContent(section) {
        // AQUÍ TU COMPAÑERO PERSONALIZA EL CONTENIDO
        // Retorna null para usar contenido por defecto
        // O retorna HTML personalizado para cada sección
        
        // PERSONALIZACIÓN PARA UBITS AI
        if (section === 'ubits-ai') {
            return `
                <div class="ubits-ai-dashboard">
                    <h2 class="ai-title">Hola, ¿en qué puedo ayudarte?</h2>
                    
                    <div class="ai-cards-container">
                        <div class="ai-card">
                            <div class="card-header">
                                <h3 class="card-title">AI Insights</h3>
                                <div class="card-icon">
                                    <i class="fa fa-lightbulb"></i>
                                </div>
                            </div>
                            <p class="card-description">Quiero sumar personas a la estructura de la compañía.</p>
                        </div>
                        
                        <div class="ai-card">
                            <div class="card-header">
                                <h3 class="card-title">Customer Support</h3>
                                <div class="card-icon">
                                    <i class="fa fa-headset"></i>
                                </div>
                            </div>
                            <p class="card-description">Haz una comparación de precios vs. el mercado laboral.</p>
                        </div>
                        
                        <div class="ai-card">
                            <div class="card-header">
                                <h3 class="card-title">Evaluación financiera</h3>
                                <div class="card-icon">
                                    <i class="fa fa-chart-line"></i>
                                </div>
                            </div>
                            <p class="card-description">Haz una comparación de precios vs. el mercado laboral.</p>
                        </div>
                        
                        <div class="ai-card">
                            <div class="card-header">
                                <h3 class="card-title">¿Qué quieres aprender?</h3>
                                <div class="card-icon">
                                    <i class="fa fa-graduation-cap"></i>
                                </div>
                            </div>
                            <p class="card-description">Haz una comparación de precios vs. el mercado laboral.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Ejemplo de personalización:
        /*
        if (section === 'aprendizaje') {
            return `
                <div class="custom-content">
                    <h2>Mi Dashboard de Aprendizaje</h2>
                    <div class="cards-grid">
                        <div class="card">Card 1</div>
                        <div class="card">Card 2</div>
                        <div class="card">Card 3</div>
                    </div>
                </div>
            `;
        }
        */
        
        return null; // null = usar contenido por defecto del template
    }

    // Función para manejar el responsive
    function handleResponsive() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Ajustar sidebar para pantallas pequeñas
        if (sidebar) {
            if (windowWidth <= 768) {
                sidebar.style.width = '80px';
                sidebar.style.minWidth = '80px';
                sidebar.style.left = '8px';
                
                // Ajustar contenedor principal para mobile
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.style.left = '108px';
                    mainContent.style.right = '12px';
                }
            } else {
                sidebar.style.width = '96px';
                sidebar.style.minWidth = '96px';
                sidebar.style.left = '11px';
                
                // Restaurar posición del contenedor principal
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.style.left = '131px';
                    mainContent.style.right = '12px';
                }
            }
            // Ajustar para pantallas con poco alto
            if (windowHeight <= 600) {
                sidebar.style.padding = '12px 22px';
            } else {
                sidebar.style.padding = '16px 28px';
            }
        }
        
        // Reajustar dimensiones
        adjustSidebarHeight();
        adjustMainContentHeight();
    }

    // Event listeners
    navButtons.forEach(button => {
        // Solo agregar navegación a botones que tengan data-section
        if (button.dataset.section) {
            button.addEventListener('click', handleSidebarNavigation);
        }
        
        // Tooltip hover para todos los botones (excepto el avatar del sidebar)
        if (!button.classList.contains('user-avatar') && tooltip) {
            button.addEventListener('mouseenter', function(e) {
                const tooltipText = this.getAttribute('data-tooltip');
                if (tooltip) {
                    tooltip.textContent = tooltipText;
                    tooltip.style.opacity = '1';

                    // Posicionar tooltip a la derecha del botón
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = (rect.right + 20) + 'px';
                    tooltip.style.top = (rect.top + rect.height/2 - tooltip.offsetHeight/2) + 'px';
                }
            });

            button.addEventListener('mouseleave', function() {
                if (tooltip) {
                    tooltip.style.opacity = '0';
                }
            });
        }
        
        // Manejo especial para el botón de modo oscuro
        if (button.id === 'darkmode-toggle') {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir navegación normal
                e.stopPropagation(); // Evitar que se propague el evento
                toggleDarkMode();
            });
        }
    });

    navTabs.forEach(tab => {
        tab.addEventListener('click', handleTabNavigation);
    });

    // Event listeners para responsive
    window.addEventListener('resize', () => {
        handleResponsive();
        adjustMainContentHeight();
    });
    window.addEventListener('orientationchange', () => {
        handleResponsive();
        adjustMainContentHeight();
    });

    // Inicialización
    function init() {
        console.log('🚀 Inicializando UBITS Playground...');
        
        adjustSidebarHeight();
        adjustMainContentHeight();
        handleResponsive();
        
        // Cargar tema guardado
        loadSavedTheme();
        
        // Establecer estado inicial - sin sección activa por defecto
        // El avatar ya tiene la clase 'active' en el HTML
        
        const defaultTab = document.querySelector('[data-tab="section1"]');
        if (defaultTab) {
            defaultTab.classList.add('active');
        }
        
        // Cargar contenido inicial - sin sección específica
        // El contenido se carga cuando el usuario interactúa con el sidebar
    }

    // Inicializar la aplicación
    init();
    
    // ===== SISTEMA DE WIDGETS INTELIGENTE =====
    
    // Sistema de widgets simple y funcional
    function initWidgetSystem() {
        const widgets = document.querySelectorAll('.widget-user-info, .widget-org, .widget-learn, .widget-objectives, .widget-surveys, .widget-assessments, .widget-evaluations');
        
        widgets.forEach(widget => {
            // Verificar si tiene contenido real (más que solo el placeholder)
            const hasRealContent = checkWidgetContent(widget);
            
            if (hasRealContent) {
                widget.classList.add('has-content');
            } else {
                widget.classList.remove('has-content');
            }
        });
    }

    function checkWidgetContent(widget) {
        const placeholderTexts = ['Información Personal', 'Organización', 'Aprendizaje', 'Objetivos', 'Encuestas', 'Assessments', 'Evaluaciones'];
        const widgetText = widget.textContent.trim();
        
        // Si solo tiene texto placeholder, no tiene contenido real
        if (placeholderTexts.includes(widgetText)) {
            return false;
        }
        
        // Si tiene elementos HTML complejos, tiene contenido
        if (widget.querySelector('h1, h2, h3, h4, img, button, .learn-header, .plan-activo, .recomendado, .learn-body, .plan-card, .recomendado-card')) {
            return true;
        }
        
        // Si tiene más de un elemento hijo (no solo el párrafo placeholder)
        if (widget.children.length > 1) {
            return true;
        }
        
        // Si el HTML contiene elementos complejos
        if (widget.innerHTML.includes('<div class="learn-') || widget.innerHTML.includes('<img') || widget.innerHTML.includes('<h2') || widget.innerHTML.includes('<div class="plan-') || widget.innerHTML.includes('<div class="recomendado')) {
            return true;
        }
        
        return false;
    }
    
    // Función global para forzar actualización
    window.forceUpdateAllWidgets = initWidgetSystem;
    
    // Inicializar si estamos en profile
    if (window.location.pathname.includes('profile')) {
        initWidgetSystem();
    }

    // ===== FUNCIONALIDAD DEL CHAT DE AI =====
    
    // Elementos del chat
    const simonAiCard = document.getElementById('simon-ai');
    const aiChatInterface = document.getElementById('ai-chat-interface');
    const backToAiButton = document.getElementById('back-to-ai');
    const chatInputField = document.getElementById('chat-input-field');
    const sendMessageButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    // Función para abrir el chat
    function openAiChat() {
        const ubitsAiDashboard = document.getElementById('ubits-ai-dashboard');
        if (ubitsAiDashboard) ubitsAiDashboard.style.display = 'none';
        if (aiChatInterface) aiChatInterface.style.display = 'flex';
    }
    
    // Función para volver al dashboard de AI
    function backToAiDashboard() {
        if (aiChatInterface) aiChatInterface.style.display = 'none';
        const ubitsAiDashboard = document.getElementById('ubits-ai-dashboard');
        if (ubitsAiDashboard) ubitsAiDashboard.style.display = 'flex';
    }
    
    // Función para enviar mensaje
    function sendMessage() {
        const message = chatInputField.value.trim();
        if (message) {
            // Crear mensaje del usuario
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
            
            // Agregar mensaje del usuario
            chatMessages.appendChild(userMessage);
            
            // Limpiar input
            chatInputField.value = '';
            
            // Simular respuesta de AI (aquí puedes integrar con tu API de AI)
            setTimeout(() => {
                const aiMessage = document.createElement('div');
                aiMessage.className = 'message ai-message';
                aiMessage.innerHTML = `
                    <div class="message-content">
                        <p>Entiendo que quieres "${message}". Déjame analizar esa información para ti...</p>
                    </div>
                    <div class="message-actions">
                        <div class="action-buttons">
                            <button class="action-btn like-btn" title="Me gusta">
                                <i class="far fa-thumbs-up"></i>
                            </button>
                            <button class="action-btn dislike-btn" title="No me gusta">
                                <i class="far fa-thumbs-down"></i>
                            </button>
                            <button class="action-btn copy-btn" title="Copiar mensaje">
                                <i class="far fa-copy"></i>
                            </button>
                        </div>
                        <div class="message-time">${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                `;
                
                chatMessages.appendChild(aiMessage);
                
                // Scroll al final del chat
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
            
            // Scroll al final del chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Event listeners para el chat
    if (simonAiCard) {
        simonAiCard.addEventListener('click', openAiChat);
        simonAiCard.classList.add('clickable');
    }
    
    if (backToAiButton) {
        backToAiButton.addEventListener('click', backToAiDashboard);
    }
    
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }
    
    if (chatInputField) {
        chatInputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // ===== FUNCIONALIDAD DE LOS BOTONES DE ACCIONES =====
    
    // Función para manejar like
    function handleLike(button) {
        const message = button.closest('.message');
        const likeBtn = message.querySelector('.like-btn');
        const dislikeBtn = message.querySelector('.dislike-btn');
        
        // Si ya está liked, quitar like
        if (likeBtn.classList.contains('liked')) {
            likeBtn.classList.remove('liked');
            likeBtn.title = 'Me gusta';
        } else {
            // Quitar dislike si existe
            dislikeBtn.classList.remove('disliked');
            dislikeBtn.title = 'No me gusta';
            
            // Agregar like
            likeBtn.classList.add('liked');
            likeBtn.title = 'Te gustó';
        }
    }
    
    // Función para manejar dislike
    function handleDislike(button) {
        const message = button.closest('.message');
        const likeBtn = message.querySelector('.like-btn');
        const dislikeBtn = message.querySelector('.dislike-btn');
        
        // Si ya está disliked, quitar dislike
        if (dislikeBtn.classList.contains('disliked')) {
            dislikeBtn.classList.remove('disliked');
            dislikeBtn.title = 'No me gusta';
        } else {
            // Quitar like si existe
            likeBtn.classList.remove('liked');
            likeBtn.title = 'Me gusta';
            
            // Agregar dislike
            dislikeBtn.classList.add('disliked');
            dislikeBtn.title = 'No te gustó';
        }
    }
    
    // Función para mostrar toast con tipos
    function showToast(type, message, duration = 3000) {
        const toast = document.getElementById(`toast-${type}`);
        const messageElement = document.getElementById(`toast-${type}-message`);
        
        if (toast && messageElement) {
            // Actualizar el mensaje
            messageElement.textContent = message;
            
            // Mostrar el toast
            toast.style.display = 'block';
            
            // Auto-ocultar después del tiempo especificado
            setTimeout(() => {
                hideToast(type);
            }, duration);
        }
    }
    
    // Función para ocultar toast
    function hideToast(type) {
        const toast = document.getElementById(`toast-${type}`);
        if (toast) {
            toast.classList.add('hiding');
            setTimeout(() => {
                toast.style.display = 'none';
                toast.classList.remove('hiding');
            }, 300);
        }
    }

    // Función para copiar mensaje (actualizada)
    function copyMessage(button) {
        const messageContent = button.closest('.message').querySelector('.message-content p').textContent;
        
        navigator.clipboard.writeText(messageContent).then(() => {
            showToast('success', 'Texto copiado con éxito');
        }).catch(err => {
            console.error('Error al copiar:', err);
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = messageContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('success', 'Texto copiado con éxito');
        });
    }
    
    // Event listeners para los botones de acciones (usando delegación de eventos)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.like-btn')) {
            handleLike(e.target.closest('.like-btn'));
        } else if (e.target.closest('.dislike-btn')) {
            handleDislike(e.target.closest('.dislike-btn'));
        } else if (e.target.closest('.copy-btn')) {
            copyMessage(e.target.closest('.copy-btn'));
        }
    });

    // Función para exportar configuración (útil para el equipo)
    window.exportConfig = function() {
        const config = {
            sidebar: {
                width: '96px',
                backgroundColor: 'var(--ubits-sidebar-bg)',
                borderRadius: '8px',
                shadow: '0px 1px 2px 0px rgba(0,0,0,0.14), 0px 0px 2px 0px rgba(0,0,0,0.12)'
            },
            topNav: {
                height: '40px',
                backgroundColor: 'var(--ubits-bg-1)',
                borderRadius: '8px'
            },
            colors: {
                primary: 'var(--ubits-accent-brand)',
                secondary: 'var(--ubits-fg-1-medium)',
                background: 'var(--ubits-bg-2)',
                white: 'var(--ubits-bg-1)',
                dark: 'var(--ubits-sidebar-bg)',
                lightGray: 'var(--ubits-fg-1-medium)',
                border: 'var(--ubits-fg-2-medium)'
            },
            fonts: {
                primary: 'Noto Sans',
                weights: [400, 600]
            },
            spacing: {
                sidebarPadding: '16px 8px',
                navGap: '8px',
                contentGap: '24px'
            }
        };
        
        console.log('Configuración del template:', config);
        return config;
    };

    // Función para personalizar colores (útil para el equipo)
    window.customizeColors = function(primaryColor, secondaryColor) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', primaryColor || 'var(--ubits-accent-brand)');
        root.style.setProperty('--secondary-color', secondaryColor || 'var(--ubits-fg-1-medium)');
        
        // Aplicar cambios dinámicamente
        document.querySelectorAll('.nav-button.active').forEach(btn => {
            btn.style.backgroundColor = primaryColor || 'var(--ubits-accent-brand)';
        });
        
        document.querySelectorAll('.nav-tab.active::after').forEach(tab => {
            tab.style.backgroundColor = primaryColor || 'var(--ubits-accent-brand)';
        });
    };
});

// Función para mostrar información del template
function showTemplateInfo() {
    console.log(`
    🚀 UBITS PLAYGROUND - DASHBOARD
    
    📁 Archivos incluidos:
    - index.html (estructura HTML)
    - styles.css (estilos CSS)
    - script.js (funcionalidad JavaScript)
    
    🎨 Características:
    - Sidebar responsive que se adapta al alto de pantalla
    - Nav superior que se adapta al ancho de pantalla
    - Estados de botones: Default, Hover, Active
    - Colores y espaciados exactos del diseño Figma
    - Fuente Noto Sans con pesos 400 y 600
    - Iconos Font Awesome 6 Pro
    
    🔧 Funciones disponibles:
    - exportConfig(): Exporta la configuración del template
    - customizeColors(primary, secondary): Personaliza colores
    
    📱 Responsive:
    - Mobile: sidebar 80px, ajustes de padding
    - Low height: reducción de espaciados
    
    💡 Para personalizar:
    1. Modifica los colores en CSS variables
    2. Cambia los iconos en el HTML
    3. Ajusta el contenido en updateContentArea()
    4. Personaliza los nombres de secciones
    `);
}

// Mostrar información al cargar
document.addEventListener('DOMContentLoaded', showTemplateInfo);

// ===== FUNCIONALIDAD DE TOOLTIPS PARA PROFILE =====

// Función para inicializar tooltips en la página de perfil
function initProfileTooltips() {
    const tooltip = document.getElementById('tooltip');
    const navButtons = document.querySelectorAll('.nav-button');
    const userAvatar = document.querySelector('.user-avatar');
    
    if (!tooltip) return;
    
    // Función para mostrar tooltip
    function showTooltip(element, text) {
        tooltip.textContent = text;
        tooltip.style.opacity = '1';
        
        // Posicionar tooltip a la derecha del elemento
        const rect = element.getBoundingClientRect();
        tooltip.style.left = (rect.right + 20) + 'px';
        tooltip.style.top = (rect.top + rect.height/2 - tooltip.offsetHeight/2) + 'px';
    }
    
    // Función para ocultar tooltip
    function hideTooltip() {
        tooltip.style.opacity = '0';
    }
    
    // Agregar tooltips a los botones de navegación
    navButtons.forEach(button => {
        const tooltipText = button.getAttribute('data-tooltip');
        if (tooltipText) {
            button.addEventListener('mouseenter', function(e) {
                showTooltip(this, tooltipText);
            });
            
            button.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        }
    });
    
    // Agregar tooltip al avatar del usuario (solo si no es el del sidebar)
    if (userAvatar && !userAvatar.closest('.sidebar')) {
        const avatarTooltip = userAvatar.getAttribute('data-tooltip');
        if (avatarTooltip) {
            userAvatar.addEventListener('mouseenter', function(e) {
                showTooltip(this, avatarTooltip);
            });
            
            userAvatar.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        }
    }
}

// Inicializar tooltips cuando se carga la página de perfil
if (window.location.pathname.includes('profile.html')) {
    document.addEventListener('DOMContentLoaded', initProfileTooltips);
}

// ===== FUNCIONES PARA EL PROFILE MENU DEL SIDEBAR =====

// Variables para el delay del profile menu del sidebar
let sidebarProfileMenuTimeout;

// Funciones para el profile menu del sidebar
function showSidebarProfileMenu() {
    // Cancelar timeout si existe
    if (sidebarProfileMenuTimeout) {
        clearTimeout(sidebarProfileMenuTimeout);
        sidebarProfileMenuTimeout = null;
    }
    
    const menu = document.getElementById('sidebar-profile-menu');
    if (menu) {
        menu.classList.add('show');
        console.log('Mostrando profile menu del sidebar');
    }
}

function hideSidebarProfileMenu() {
    // Agregar delay para evitar que se oculte inmediatamente
    sidebarProfileMenuTimeout = setTimeout(() => {
        const menu = document.getElementById('sidebar-profile-menu');
        if (menu) {
            menu.classList.remove('show');
            console.log('Ocultando profile menu del sidebar');
        }
    }, 100);
}

// Exportar funciones globalmente
window.showSidebarProfileMenu = showSidebarProfileMenu;
window.hideSidebarProfileMenu = hideSidebarProfileMenu;

// Funciones para el profile menu (reutilizadas del tab-bar)
function handlePasswordChange() {
    console.log('Cambio de contraseña');
    // Aquí iría la lógica para cambiar contraseña
}

function handleLogout() {
    console.log('Cerrar sesión');
    // Aquí iría la lógica para cerrar sesión
}

