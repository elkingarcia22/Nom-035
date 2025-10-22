/**
 * Google Apps Script para recibir feedback del prototipo NOM-035
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Ve a https://script.google.com/
 * 2. Crea un nuevo proyecto
 * 3. Copia y pega este código
 * 4. Crea una nueva Google Sheet llamada "NOM-035 Feedback"
 * 5. Obtén el ID de la hoja de cálculo de la URL
 * 6. Reemplaza 'YOUR_SHEET_ID' con el ID real
 * 7. Despliega como aplicación web con permisos de "Cualquiera"
 * 8. Copia la URL del webhook y reemplázala en el HTML
 */

// ID de la hoja de cálculo de Google Sheets
const SHEET_ID = '1a6gkZNbuXDT1aFaKDFgctWDPcZ6KU7dYW-udjlaTGiI';

// Función principal que se ejecuta cuando se recibe una petición POST
function doPost(e) {
  try {
    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);
    
    // Validar que los datos requeridos estén presentes
    if (!data.user || !data.section || !data.comment) {
      return ContentService
        .createTextOutput(JSON.stringify({error: 'Datos incompletos'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Abrir la hoja de cálculo
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Si es la primera fila, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([
        ['Usuario', 'Sección', 'Comentario', 'Timestamp', 'URL']
      ]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }
    
    // Agregar nueva fila con los datos
    const newRow = [
      data.user,
      data.section,
      data.comment,
      data.timestamp,
      data.url || ''
    ];
    
    sheet.appendRow(newRow);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Feedback guardado correctamente',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Manejo de errores
    console.error('Error al procesar feedback:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        error: 'Error interno del servidor',
        details: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para manejar peticiones GET (opcional, para testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Servicio de feedback NOM-035 activo',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Función para obtener estadísticas del feedback (opcional)
function getFeedbackStats() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return {
        totalFeedback: 0,
        uniqueUsers: 0,
        sections: {}
      };
    }
    
    // Contar feedback por sección
    const sections = {};
    const users = new Set();
    
    for (let i = 1; i < data.length; i++) {
      const user = data[i][0];
      const section = data[i][1];
      
      users.add(user);
      sections[section] = (sections[section] || 0) + 1;
    }
    
    return {
      totalFeedback: data.length - 1,
      uniqueUsers: users.size,
      sections: sections
    };
    
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { error: error.toString() };
  }
}
