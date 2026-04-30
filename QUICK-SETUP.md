# 🚀 Configuración Rápida - Prototipo NOM-035

## ⚡ Pasos Esenciales (15 minutos)

### 1. 📊 Configurar Google Sheets (5 min)
```bash
# 1. Crear nueva hoja en Google Sheets
# 2. Copiar ID de la URL (entre /d/ y /edit)
# 3. Ir a script.google.com
# 4. Crear nuevo proyecto
# 5. Copiar código de google-apps-script.js
# 6. Reemplazar YOUR_SHEET_ID con tu ID real
# 7. Desplegar como "Aplicación web" - "Cualquiera"
# 8. Copiar URL del webhook
```

### 2. 🔧 Actualizar HTML (2 min)
```javascript
// En resultados-nom035.html, línea ~3561:
const webhookUrl = 'TU_URL_DEL_WEBHOOK_AQUI';
```

### 3. 🚀 Desplegar en Render (5 min)
```bash
# 1. Subir a GitHub
git add .
git commit -m "feat: Sistema de feedback y enmascaramiento NOM-035"
git push origin main

# 2. En Render Dashboard:
# - Crear "Static Site"
# - Conectar repositorio
# - Usar render.yaml automáticamente
# - Desplegar
```

### 4. ✅ Verificar (3 min)
- [ ] Overlay de bienvenida se muestra
- [ ] Botón de feedback aparece
- [ ] Modal de feedback funciona
- [ ] Datos se guardan en Google Sheets
- [ ] URL pública funciona

---

## 🎯 Resultado Final

**URL Pública**: `https://tu-app.onrender.com`
**Google Sheets**: Feedback automático por usuario y sección
**Sistema**: Completamente funcional y enmascarado

---

## 🆘 Si Algo Sale Mal

### Overlay no aparece:
- Verificar que el HTML se cargue correctamente
- Revisar consola del navegador

### Feedback no se guarda:
- Verificar URL del webhook en el código
- Comprobar permisos de Google Apps Script
- Revisar que la hoja tenga permisos de escritura

### Error de CORS:
- Asegurar que Google Apps Script esté desplegado como "Cualquiera"
- Verificar que la URL del webhook sea correcta

---

## 📞 Soporte Rápido

1. **Consola del navegador** (F12) para errores JavaScript
2. **Google Apps Script** logs para problemas de envío
3. **Render Dashboard** para problemas de despliegue

**¡En 15 minutos tendrás el prototipo funcionando con feedback automático!** 🎉
