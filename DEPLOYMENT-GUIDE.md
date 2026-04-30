# 🚀 Guía de Despliegue - Prototipo NOM-035

## 📋 Resumen del Sistema

Este prototipo incluye un sistema completo de enmascaramiento y feedback que permite a los usuarios de prueba interactuar con la funcionalidad NOM-035 mientras recopila comentarios estructurados.

### ✨ Características Implementadas:

1. **🖼️ Overlay de Bienvenida** - Enmascara la interfaz y explica el prototipo
2. **📖 Guía Paso a Paso** - Tutorial interactivo de las funcionalidades
3. **💬 Sistema de Feedback** - Modal flotante para comentarios por sección
4. **📊 Integración Google Sheets** - Almacenamiento automático de feedback
5. **🎯 Indicador de Sección** - Muestra la sección actual al usuario

---

## 🔧 Configuración de Google Sheets

### Paso 1: Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com/)
2. Crea una nueva hoja llamada **"NOM-035 Feedback"**
3. Copia el ID de la hoja de la URL (entre `/d/` y `/edit`)

### Paso 2: Configurar Google Apps Script
1. Ve a [Google Apps Script](https://script.google.com/)
2. Crea un nuevo proyecto
3. Copia el código de `google-apps-script.js`
4. Reemplaza `YOUR_SHEET_ID` con el ID real de tu hoja
5. Guarda el proyecto

### Paso 3: Desplegar como Web App
1. En Apps Script, haz clic en **"Desplegar" > "Nueva implementación"**
2. Tipo: **"Aplicación web"**
3. Ejecutar como: **"Yo"**
4. Quién tiene acceso: **"Cualquiera"**
5. Copia la **URL del webhook**

### Paso 4: Actualizar el HTML
1. Abre `resultados-nom035.html`
2. Busca la línea: `const webhookUrl = 'https://script.google.com/macros/s/AKfycbzYOUR_SCRIPT_ID/exec';`
3. Reemplaza con tu URL del webhook real

---

## 🚀 Despliegue en Render

### Opción 1: Despliegue Automático (Recomendado)
1. Conecta tu repositorio de GitHub a Render
2. Render detectará automáticamente el archivo `render.yaml`
3. El despliegue se realizará automáticamente

### Opción 2: Despliegue Manual
1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Crea un nuevo **"Static Site"**
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Build Command**: `echo "No build needed"`
   - **Publish Directory**: `.`
   - **Environment**: `Static`

---

## 📊 Estructura de Datos en Google Sheets

El sistema guardará automáticamente:

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| Usuario | ID único del usuario | Usuario_1703123456789 |
| Sección | Sección donde dejó feedback | Vista General |
| Comentario | Texto del feedback | "La interfaz es intuitiva" |
| Timestamp | Fecha y hora | 2023-12-21T10:30:00.000Z |
| URL | URL de la página | https://nom-035.onrender.com/resultados |

---

## 🎯 Flujo de Usuario

### 1. **Pantalla de Bienvenida**
- Overlay que cubre toda la interfaz
- Explica que es un prototipo funcional
- Lista las funcionalidades a probar
- Botón "Comenzar Prueba"

### 2. **Navegación Guiada**
- Indicador de sección actual en la parte superior
- Botón flotante de feedback (💬) en esquina inferior derecha
- Notificaciones de confirmación

### 3. **Sistema de Feedback**
- Modal flotante con campos:
  - Sección actual (automática)
  - Campo de comentario
  - Botones Enviar/Cancelar
- Envío automático a Google Sheets
- Confirmación visual

---

## 🔍 Testing del Sistema

### Verificar Funcionalidades:
1. **Overlay de Bienvenida**: Se muestra al cargar la página
2. **Navegación**: El indicador de sección se actualiza al cambiar de pestaña
3. **Modal de Feedback**: Se abre al hacer clic en el botón 💬
4. **Envío de Datos**: Los comentarios aparecen en Google Sheets
5. **Notificaciones**: Se muestran confirmaciones de éxito/error

### Datos de Prueba:
- Usuario: Se genera automáticamente
- Secciones: Vista General, Encuestas, etc.
- Comentarios: Texto libre del usuario
- Timestamp: Automático

---

## 🛠️ Personalización

### Cambiar Textos del Overlay:
Edita las variables en el HTML:
```html
<h1 class="welcome-title">¡Bienvenido al Prototipo NOM-035!</h1>
<p class="welcome-subtitle">Estás a punto de probar...</p>
```

### Modificar Estilos:
Los estilos están en la sección `<style>` del HTML:
```css
.welcome-overlay { /* Estilos del overlay */ }
.feedback-modal { /* Estilos del modal */ }
```

### Agregar Nuevas Secciones:
Actualiza la función `updateCurrentSection()` en el JavaScript.

---

## 📈 Análisis de Feedback

### En Google Sheets:
1. **Filtros**: Por usuario, sección, fecha
2. **Gráficos**: Feedback por sección, tendencias temporales
3. **Exportación**: CSV para análisis externo

### Métricas Clave:
- Total de feedback recibido
- Usuarios únicos que participaron
- Distribución por sección
- Tiempo promedio de interacción

---

## 🚨 Solución de Problemas

### El overlay no se muestra:
- Verifica que el JavaScript esté cargado
- Revisa la consola del navegador

### El feedback no se guarda:
- Verifica la URL del webhook en el código
- Comprueba que Google Apps Script esté desplegado
- Revisa los permisos de la hoja de cálculo

### Error de CORS:
- Asegúrate de que Google Apps Script esté desplegado como "Cualquiera"
- Verifica que la URL del webhook sea correcta

---

## 📞 Soporte

Para problemas técnicos:
1. Revisa la consola del navegador (F12)
2. Verifica la configuración de Google Apps Script
3. Comprueba los permisos de la hoja de cálculo
4. Confirma que el despliegue en Render sea exitoso

---

## 🎉 ¡Listo para Usar!

Una vez configurado, tendrás:
- ✅ Prototipo enmascarado y profesional
- ✅ Sistema de feedback integrado
- ✅ Recopilación automática de datos
- ✅ Análisis estructurado en Google Sheets
- ✅ Despliegue público en Render

**¡Los usuarios de prueba podrán interactuar con el prototipo y dejar feedback estructurado que se guardará automáticamente en Google Sheets!**
