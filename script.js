// Navegación móvil
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header con scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animación al hacer scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
const animateElements = document.querySelectorAll('.service__card, .stat, .about__content');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ejemplo, usando fetch para enviar a un servidor
    console.log('Datos del formulario:', formData);
    
    // Mensaje de éxito (puedes personalizar esto)
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    
    // Limpiar formulario
    contactForm.reset();
    
    // Aquí puedes agregar código para enviar los datos a tu servidor
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    //     alert('¡Mensaje enviado con éxito!');
    //     contactForm.reset();
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    // });
});

// Smooth scroll para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de escritura en el título (opcional)
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Iniciar efecto después de un pequeño delay
    setTimeout(typeWriter, 500);
}

// Contador animado para estadísticas
const stats = document.querySelectorAll('.stat__number');
const animateCounter = (element) => {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Observar estadísticas para animar el contador
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat__number');
            if (statNumber && !statNumber.dataset.animated) {
                statNumber.dataset.animated = 'true';
                animateCounter(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Currency Converter para página de precios
if (document.getElementById('currency-select')) {
    const currencySelect = document.getElementById('currency-select');
    const exchangeRateDisplay = document.getElementById('exchange-rate');
    const priceElements = document.querySelectorAll('.pricing-card__amount');
    const currencySymbols = document.querySelectorAll('.pricing-card__currency');
    
    let currentCurrency = 'USD';
    let exchangeRate = null;
    
    // Obtener tasa de cambio USD a PEN
    async function fetchExchangeRate(showAnimation = false) {
        try {
            // Usando API gratuita de exchangerate-api.com
            // Alternativa: usar una API específica para PEN si es necesario
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            
            if (data.rates && data.rates.PEN) {
                const oldRate = exchangeRate;
                exchangeRate = data.rates.PEN;
                
                // Si ya había una tasa y cambió, actualizar precios
                if (oldRate && oldRate !== exchangeRate && currentCurrency === 'PEN') {
                    updateExchangeRateDisplay(true);
                    updatePrices();
                } else {
                    updateExchangeRateDisplay(showAnimation);
                }
                return exchangeRate;
            } else {
                // Fallback: usar tasa aproximada si la API falla
                exchangeRate = 3.75; // Tasa aproximada USD/PEN
                updateExchangeRateDisplay(showAnimation);
                return exchangeRate;
            }
        } catch (error) {
            console.error('Error obteniendo tasa de cambio:', error);
            // Usar tasa de fallback
            exchangeRate = 3.75;
            updateExchangeRateDisplay(showAnimation);
            return exchangeRate;
        }
    }
    
    function updateExchangeRateDisplay(showAnimation = false) {
        if (exchangeRate) {
            if (showAnimation) {
                exchangeRateDisplay.classList.add('updating');
                setTimeout(() => {
                    exchangeRateDisplay.classList.remove('updating');
                }, 1000);
            }
            
            exchangeRateDisplay.innerHTML = `
                <span class="rate-value">💰 Tasa: 1 USD = <strong>${exchangeRate.toFixed(2)}</strong> PEN</span>
                <span style="margin-left: 0.5rem; font-size: 0.75rem; opacity: 0.8;">
                    (Actualizado ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })})
                </span>
            `;
        } else {
            exchangeRateDisplay.innerHTML = '<span class="rate-loading">⏳ Cargando tasa de cambio...</span>';
        }
    }
    
    function formatPrice(amount) {
        if (currentCurrency === 'PEN') {
            // Formatear con separadores de miles para soles
            return amount.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        } else {
            // Formatear con separadores de miles para dólares
            return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        }
    }
    
    function animateNumber(element, start, end, duration = 800) {
        const startTime = performance.now();
        const startValue = start;
        const endValue = end;
        const isIncreasing = endValue > startValue;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function para animación suave
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = startValue + (endValue - startValue) * easeOutQuart;
            
            // Actualizar símbolo de moneda
            const currencyElement = element.closest('.pricing-card__price').querySelector('.pricing-card__currency');
            if (currentCurrency === 'PEN') {
                currencyElement.textContent = 'S/';
            } else {
                currencyElement.textContent = '$';
            }
            
            element.textContent = formatPrice(Math.round(currentValue));
            
            // Agregar efecto de pulso durante la animación
            if (progress < 1) {
                element.style.transform = 'scale(1.05)';
                element.style.color = 'var(--primary-color)';
                requestAnimationFrame(update);
            } else {
                element.style.transform = 'scale(1)';
                element.style.color = '';
                // Efecto final
                element.classList.add('price-updated');
                setTimeout(() => {
                    element.classList.remove('price-updated');
                }, 600);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    function updatePrices() {
        if (!exchangeRate) return;
        
        priceElements.forEach((element, index) => {
            const priceUSD = parseFloat(element.getAttribute('data-price-usd').replace(',', ''));
            let newPrice;
            let currentPrice = parseFloat(element.textContent.replace(/[^\d.]/g, '')) || priceUSD;
            
            if (currentCurrency === 'PEN') {
                newPrice = priceUSD * exchangeRate;
            } else {
                newPrice = priceUSD;
            }
            
            // Animar el cambio de precio con delay escalonado
            setTimeout(() => {
                animateNumber(element, currentPrice, newPrice, 800);
            }, index * 100);
        });
    }
    
    // Event listener para cambio de moneda
    currencySelect.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        // Agregar efecto visual al selector
        currencySelect.style.transform = 'scale(0.95)';
        setTimeout(() => {
            currencySelect.style.transform = 'scale(1)';
        }, 150);
        updatePrices();
    });
    
    // Inicializar: obtener tasa de cambio y mostrar precios
    fetchExchangeRate(true).then(() => {
        updatePrices();
    });
    
    // Actualizar tasa cada 30 minutos y actualizar precios si están en PEN
    setInterval(() => {
        fetchExchangeRate(true);
        if (currentCurrency === 'PEN') {
            setTimeout(() => {
                updatePrices();
            }, 500);
        }
    }, 1800000); // 30 minutos
    
    // Mostrar indicador de actualización automática
    setInterval(() => {
        if (currentCurrency === 'PEN') {
            exchangeRateDisplay.style.opacity = '0.7';
            setTimeout(() => {
                exchangeRateDisplay.style.opacity = '1';
            }, 300);
        }
    }, 300000); // Cada 5 minutos mostrar indicador
}

