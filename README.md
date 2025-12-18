# 🌙 Clínica del Sueño y Neurología - Sitio Web

Sitio web profesional para la Clínica del Sueño y Neurología, especializado en polisomnografía y estudios del sueño.

## 📋 Contenido

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Páginas Disponibles](#páginas-disponibles)
- [Personalización](#personalización)
- [Estructura de Archivos](#estructura-de-archivos)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características

- 🎨 **Diseño Profesional**: Paleta de colores coherente con identidad visual corporativa
- 📱 **Responsive Design**: Adaptable a desktop, tablet y móviles
- 🧭 **Navegación Sticky**: Header fijo para fácil acceso al menú
- ⚡ **Rendimiento Optimizado**: CSS y JavaScript optimizados
- 🏥 **5 Páginas Completas**: Todo el proceso de polisomnografía cubierto
- 📞 **Información de Contacto**: Centrada y accesible en todas las páginas

## 📁 Estructura del Proyecto

```
mi_web/
├── index.html                 # Página principal (Landing)
├── css/
│   └── styles.css            # Estilos CSS completos
├── js/
│   └── script.js             # JavaScript interactivo
├── pages/
│   ├── sala-de-sueno.html
│   ├── psg-interpretacion.html
│   ├── entrega-de-resultados.html
│   └── comodidades-paciente.html
├── assets/
│   ├── images/               # Para imágenes futuras
│   └── icons/                # Para iconos futuros
└── README.md                 # Este archivo
```

## 🛠 Tecnologías Utilizadas

- **HTML5**: Semántico y accesible
- **CSS3**: Con variables CSS y diseño responsive
- **JavaScript Vanilla**: Interactividad sin dependencias
- **Roboto (Google Fonts)**: Tipografía moderna y legible

## 📋 Requisitos Previos

### Python 3

Asegúrate de tener Python 3 instalado en tu sistema:

#### Windows

1. Descarga Python desde [python.org](https://www.python.org/downloads/)
2. Instala marcando la opción "Add Python to PATH"
3. Verifica la instalación:

   ```cmd
   python --version
   ```

#### macOS

```bash
# Usando Homebrew (recomendado)
brew install python3

# O descarga desde python.org
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install python3
```

### Verificación

```bash
python3 --version
# Debe mostrar algo como: Python 3.x.x
```

## 🚀 Instalación y Ejecución

### 1. Clonar o Descargar el Proyecto

Si tienes el proyecto en un repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd mi_web
```

Si ya tienes los archivos, asegúrate de estar en la carpeta `mi_web`.

### 2. Iniciar el Servidor Local

#### Método 1: Python HTTP Server (Recomendado)

```bash
# Navega a la carpeta del proyecto
cd mi_web

# Inicia el servidor en el puerto 8000
python3 -m http.server 8000
```

#### Método 2: En Segundo Plano

```bash
# Inicia el servidor en background
nohup python3 -m http.server 8000 > server.log 2>&1 &

# Para detenerlo después:
pkill -f "python3 -m http.server"
```

### 3. Acceder al Sitio Web

Abre tu navegador web y visita:

```
http://localhost:8000
```

### 4. Navegación

Una vez en el sitio, puedes navegar entre las páginas usando el menú:

- **Polisomnografía** (página principal)
- **Sala de Sueño** → `http://localhost:8000/pages/sala-de-sueno.html`
- **PSG Interpretación** → `http://localhost:8000/pages/psg-interpretacion.html`
- **Entrega de Resultados** → `http://localhost:8000/pages/entrega-de-resultados.html`
- **COMODIDADES y SEGURIDAD** → `http://localhost:8000/pages/comodidades-paciente.html`

## 📄 Páginas Disponibles

### 1. **Polisomnografía** (`index.html`)

- Página principal de introducción
- Explica qué es la polisomnografía
- Información de contacto principal

### 2. **Sala de Sueño** (`pages/sala-de-sueno.html`)

- Describe las instalaciones
- Características del laboratorio
- Comodidades para pacientes

### 3. **PSG Interpretación** (`pages/psg-interpretacion.html`)

- Proceso de interpretación de resultados
- Fases de análisis (IA + especialista)
- Enfoque en calidad y precisión

### 4. **Entrega de Resultados** (`pages/entrega-de-resultados.html`)

- Opciones para recibir resultados
- Consultas presenciales y online
- Proceso de retiro de informes

### 5. **COMODIDADES y SEGURIDAD** (`pages/comodidades-paciente.html`)

- Comodidades del servicio
- Medidas de seguridad
- Protocolos de emergencia

## 🎨 Personalización

### Cambiar Información de Contacto

Edita los siguientes archivos para actualizar la información:

**En cada página HTML**, busca la sección:

```html
<div class="contact-info">
  <div class="clinic-name">Clínica del sueño y Neurología</div>
  <div class="address">Av. Providencia 2093 Santiago de Chile</div>
  <div class="phones">22 233 7146 - 22 232 3275</div>
  <div class="email">
    <a href="mailto:info@clinicadelsueño.cl">info@clinicadelsueño.cl</a>
  </div>
</div>
```

### Cambiar Colores

Edita `css/styles.css` y modifica las variables CSS:

```css
:root {
  --gris-oscuro: #3d3d3d;
  --amarillo-dorado: #daa520;
  --blanco: #ffffff;
  --azul-celeste: #4a90e2;
  --negro: #1a1a1a;
  --beige-tostado: #c4b596;
}
```

### Agregar Imágenes

1. Coloca las imágenes en `assets/images/`
2. Referencia en HTML:

   ```html
   <img src="assets/images/nombre-imagen.jpg" alt="Descripción" />
   ```

## 📂 Estructura de Archivos Detallada

### Archivos Principales

- **`index.html`**: Landing page principal
- **`css/styles.css`**: Todos los estilos del sitio
- **`js/script.js`**: Funcionalidad JavaScript

### Páginas Secundarias

- **`pages/sala-de-sueno.html`**: Información de instalaciones
- **`pages/psg-interpretacion.html`**: Proceso de interpretación
- **`pages/entrega-de-resultados.html`**: Entrega de informes
- **`pages/comodidades-paciente.html`**: Comodidades y seguridad

### Recursos

- **`assets/images/`**: Para imágenes del sitio
- **`assets/icons/`**: Para iconos personalizados

## 🔧 Comandos Útiles

### Iniciar Servidor

```bash
python3 -m http.server 8000
```

### Verificar Servidor Activo

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000
# Debe retornar 200
```

### Detener Servidor

```bash
pkill -f "python3 -m http.server"
```

### Ver Procesos Activos

```bash
ps aux | grep "python3 -m http.server"
```

## 🌐 Navegación y SEO

### Estructura de URLs

- **Principal**: `http://localhost:8000/`
- **Páginas**: `http://localhost:8000/pages/nombre-pagina.html`

### Meta Tags

Cada página incluye:

- Título descriptivo
- Meta viewport para responsive
- Charset UTF-8

## 📱 Compatibilidad

### Navegadores Soportados

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos

- ✅ Desktop (1920x1080+)
- ✅ Tablet (768px-1024px)
- ✅ Móvil (320px-768px)

## 🐛 Solución de Problemas

### Problema: "El servidor no inicia"

**Solución**: Verifica que Python 3 esté instalado y el puerto 8000 esté libre.

### Problema: "Las páginas no cargan CSS/JS"

**Solución**: Asegúrate de estar accediendo vía `http://localhost:8000` y no abriendo archivos directamente.

### Problema: "El navbar no se queda fijo"

**Solución**: Verifica que el CSS cargue correctamente y no haya errores en la consola del navegador.

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama de características: `git checkout -b nueva-caracteristica`
3. Commit de cambios: `git commit -am 'Agregada nueva característica'`
4. Push a la rama: `git push origin nueva-caracteristica`
5. Submit de Pull Request

## 📄 Licencia

Este proyecto es propiedad de la Clínica del Sueño y Neurología. Todos los derechos reservados.

## 📞 Soporte

Para consultas sobre el sitio web:

- **Email**: info@clinicadelsueño.cl
- **Teléfono**: 22 233 7146 - 22 232 3275
- **Dirección**: Av. Providencia 2093 Santiago de Chile

---

**Desarrollado con ❤️ para la Clínica del Sueño y Neurología**

