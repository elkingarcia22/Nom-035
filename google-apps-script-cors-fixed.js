/**
 * Google Apps Script para recibir feedback del prototipo NOM-035
 * VERSIÓN CON HEADERS CORS CORREGIDOS
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Ve a https://script.google.com/
 * 2. Abre tu proyecto "Encuesta nom 035"
 * 3. Reemplaza TODO el código con este
 * 4. Guarda y despliega una nueva versión
 * 5. Prueba el feedback
 */

// ID de la hoja de cálculo de Google Sheets
const SHEET_ID = '1a6gkZNbuXDT1aFaKDFgctWDPcZ6KU7dYW-udjlaTGiI';

// Función para crear respuesta con headers CORS
function createCORSResponse(data, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    });
}

// Función principal que se ejecuta cuando se recibe una petición POST
function doPost(e) {
  try {
    console.log('📥 POST recibido:', e);
    
    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);
    console.log('📋 Datos parseados:', data);
    
    // Validar que los datos requeridos estén presentes
    if (!data.section || !data.comment) {
      console.log('❌ Datos incompletos');
      return createCORSResponse({
        error: 'Datos incompletos',
        required: ['section', 'comment']
      }, 400);
    }
    
    // Abrir la hoja de cálculo
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    console.log('📊 Hoja abierta:', sheet.getName());
    
    // Si es la primera fila, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([
        ['Usuario', 'Sección', 'Comentario', 'Timestamp', 'URL']
      ]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      console.log('📋 Encabezados agregados');
    }
    
    // Agregar nueva fila con los datos
    const newRow = [
      data.user || 'Anónimo',
      data.section,
      data.comment,
      data.timestamp || new Date().toISOString(),
      data.url || ''
    ];
    
    sheet.appendRow(newRow);
    console.log('✅ Fila agregada:', newRow);
    
    // Respuesta exitosa
    return createCORSResponse({
      success: true,
      message: 'Feedback guardado correctamente',
      row: sheet.getLastRow()
    });
      
  } catch (error) {
    // Manejo de errores
    console.error('❌ Error al procesar feedback:', error);
    
    return createCORSResponse({
      error: 'Error interno del servidor',
      details: error.toString()
    }, 500);
  }
}

// Función para manejar peticiones GET (opcional, para testing)
function doGet(e) {
  console.log('📥 GET recibido:', e);
  
  return createCORSResponse({
    message: 'Servicio de feedback NOM-035 activo',
    timestamp: new Date().toISOString(),
    cors: 'Configurado correctamente'
  });
}

// Función para manejar peticiones OPTIONS (CORS preflight)
function doOptions(e) {
  console.log('📥 OPTIONS recibido (CORS preflight)');
  
  return createCORSResponse({
    message: 'CORS preflight OK'
  });
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
