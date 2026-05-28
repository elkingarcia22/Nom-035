const fs = require('fs');
const files = [
  './Nom-035/resultados-nom035-entorno.html',
  './Nom-035/resultados-nom035-entorno-simple.html',
  './Nom-035/resultados-nom035.html'
];

const categoryData = {
    'Ambiente de trabajo': { type: 'categoría', questions: 5 },
    'Factores propios de la actividad': { type: 'categoría', questions: 15 },
    'Organización del tiempo de trabajo': { type: 'categoría', questions: 6 },
    'Liderazgo y relaciones en el trabajo': { type: 'categoría', questions: 19 },
    'Entorno organizacional': { type: 'categoría', questions: 27 },
};

const domainData = {
    'Condiciones en el ambiente de trabajo': { type: 'dominio', questions: 5 },
    'Carga de trabajo': { type: 'dominio', questions: 15 },
    'Falta de control sobre el trabajo': { type: 'dominio', questions: 10 },
    'Jornada de trabajo': { type: 'dominio', questions: 2 },
    'Interferencia en la relación trabajo-familia': { type: 'dominio', questions: 4 },
    'Liderazgo': { type: 'dominio', questions: 9 },
    'Relaciones en el trabajo': { type: 'dominio', questions: 10 },
    'Violencia laboral': { type: 'dominio', questions: 8 },
    'Violencia': { type: 'dominio', questions: 8 },
    'Reconocimiento del desempeño': { type: 'dominio', questions: 6 },
    'Insuficiente sentido de pertenencia e inestabilidad': { type: 'dominio', questions: 4 },
    'Liderazgo y Relaciones interpersonales': { type: 'dominio', questions: 19 },
};

files.forEach(function(file) {
    if (!fs.existsSync(file)) return;
    var content = fs.readFileSync(file, 'utf8');

    content = content.replace(/<tr[^>]*>[\s\S]*?<\/tr>/g, function(rowMatch) {
        if (rowMatch.indexOf('range-track') === -1) return rowMatch;

        var isOverviewRow = rowMatch.indexOf('dimension-row') !== -1;

        var scoreMatch = rowMatch.match(/<span class="score-value">([\d.]+)<\/span>/);
        if (!scoreMatch) return rowMatch;
        var score = parseFloat(parseFloat(scoreMatch[1]).toFixed(1));

        var riskMatch = rowMatch.match(/<span class="risk-badge[^"]*">([^<]+)<\/span>/);
        if (!riskMatch) return rowMatch;
        var risk = riskMatch[1].trim();

        var name, data;

        if (isOverviewRow) {
            var domainMatch = rowMatch.match(/<td class="dimension-domain-info">([^<]+)<\/td>/);
            if (!domainMatch) return rowMatch;
            name = domainMatch[1].trim();
            data = domainData[name] || categoryData[name];
            if (!data) return rowMatch;
        } else {
            var nameMatch = rowMatch.match(/<tr[^>]*>\s*<td>([^<]+)<\/td>/);
            if (!nameMatch) return rowMatch;
            name = nameMatch[1].trim();
            data = categoryData[name] || domainData[name];
            if (!data) return rowMatch;
        }

        var newHtml = '<strong>Detalle de la calificación</strong><br>Puntaje Relativo: ' + score + '<br><br>¿Por qué el riesgo es ' + risk + '?<br>Para la ' + data.type + ' \\"' + name + '\\", de acuerdo con la escala normativa de la NOM-035, el puntaje obtenido se clasifica como riesgo ' + risk + '.<br>Dimensión evaluada mediante ' + data.questions + ' preguntas.';

        return rowMatch.replace(/onmouseenter="const t=document\.getElementById\('tooltip'\); if\(t\)\{ t\.innerHTML='(.*?)'; t\.style\.opacity='1';(.*?) \}"/g, function(match, innerHTML, afterStyles) {
            return 'onmouseenter="const t=document.getElementById(\'tooltip\'); if(t){ t.innerHTML=\'' + newHtml + '\'; t.style.opacity=\'1\';' + afterStyles + ' }"';
        });
    });

    fs.writeFileSync(file, content);
    console.log('Updated', file);
});
