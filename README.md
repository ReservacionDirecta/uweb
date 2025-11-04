# UWEB - Desarrollo Web Profesional

Sitio web profesional para servicios de desarrollo web con sistema de precios dinámicos en múltiples monedas.

## 🌐 Características

- **Diseño Moderno y Responsivo**: Adaptado para todos los dispositivos (móvil, tablet, desktop)
- **Sistema de Precios Dinámico**: Conversión automática entre USD y PEN (Soles Peruanos) con tasa de cambio en tiempo real
- **Animaciones Fluidas**: Transiciones y efectos visuales modernos
- **Página de Servicios**: Sección completa mostrando los servicios ofrecidos
- **Página de Precios**: Tres planes (Económico, Básico, Corporativo) con precios dinámicos
- **Formulario de Contacto**: Sistema de contacto integrado

## 📁 Estructura del Proyecto

```
UWEB/
├── index.html          # Página principal
├── precios.html        # Página de precios
├── styles.css          # Estilos globales
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
└── .gitignore         # Archivos ignorados por git
```

## 🚀 Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Animaciones)
- JavaScript (Vanilla JS, Fetch API, Intersection Observer)
- API Externa: exchangerate-api.com (para tasas de cambio)

## 💻 Instalación y Uso

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/uweb.git
cd uweb
```

2. Abrir en el navegador:
   - Simplemente abre `index.html` en tu navegador
   - O usa un servidor local como Live Server en VS Code

## 📄 Páginas

### Página Principal (`index.html`)
- Hero section con call-to-action
- Sección de servicios
- Sobre nosotros con estadísticas
- Formulario de contacto
- Footer con enlaces

### Página de Precios (`precios.html`)
- Selector de moneda (USD/PEN)
- Tres planes de precios
- Tasa de cambio en tiempo real
- Sección de preguntas frecuentes (FAQ)
- CTA para contacto

## 🎨 Personalización

Los colores y estilos principales se pueden modificar en `styles.css` usando las variables CSS:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... más variables */
}
```

## 📱 Responsive Design

El sitio está completamente optimizado para:
- 📱 Móviles (< 480px)
- 📱 Tablets (< 768px)
- 💻 Desktop (> 768px)

## 🔄 Sistema de Precios Dinámico

- Actualización automática de tasa de cambio cada 30 minutos
- Conversión en tiempo real entre USD y PEN
- Animaciones fluidas al cambiar precios
- Formato de números con separadores de miles

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

UWEB - Desarrollo Web Profesional

## 📧 Contacto

- Email: info@uweb.com
- Teléfono: +34 123 456 789

---

⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!

