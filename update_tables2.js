const fs = require('fs');

const files = [
  './Nom-035/resultados-nom035.html',
  './Nom-035/template-ubits/resultados-nom035.html',
  './Nom-035/resultados-nom035-entorno-simple.html',
  './Nom-035/template-ubits/resultados-nom035-entorno-simple.html'
];

const cssToAdd = `
        /* Indicador de Rangos NOM-035 */
        .range-indicator-container {
            width: 100%;
            min-width: 200px;
            padding: 8px 0;
        }
        .range-track {
            position: relative;
            height: 16px;
            background-color: #f3f4f6;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
        }
        .range-fill {
            height: 100%;
            transition: width 0.3s ease;
        }
        .range-fill.nulo { background-color: #60a5fa; }
        .range-fill.bajo { background-color: #86efac; }
        .range-fill.medio { background-color: #fde047; }
        .range-fill.alto { background-color: #fbbf24; }
        .range-fill.muy-alto { background-color: #ef4444; }
        
        .range-thresholds {
            position: relative;
            height: 14px;
            margin-top: 4px;
            width: 100%;
        }
        .range-threshold {
            position: absolute;
            font-size: 11px;
            color: #6b7280;
            transform: translateX(-50%);
            white-space: nowrap;
        }
        .score-value {
            font-weight: 600;
            color: #1f2937;
            font-size: 14px;
        }
`;

function generateIndicator(score, thresholds, maxScore, colorClass) {
    const fillPercent = Math.min((score / maxScore) * 100, 100);
    
    let thresholdsHtml = '';
    for (let t of thresholds) {
        const tPercent = (t / maxScore) * 100;
        thresholdsHtml += `<span class="range-threshold" style="left: ${tPercent}%;">${t}</span>`;
    }

    return `
    <div class="range-indicator-container">
        <div class="range-track">
            <div class="range-fill ${colorClass}" style="width: ${fillPercent}%;"></div>
        </div>
        <div class="range-thresholds">
            ${thresholdsHtml}
        </div>
    </div>`;
}

const catData = {
    'Ambiente de trabajo': { score: 6.9, t: [5, 9, 11, 14], max: 20, color: 'bajo' },
    'Factores propios de la actividad': { score: 38.6, t: [15, 30, 45, 60], max: 75, color: 'medio' },
    'Violencia laboral': { score: 16.5, t: [10, 14, 18, 23], max: 30, color: 'alto' },
    'Organización del tiempo de trabajo': { score: 7.0, t: [5, 7, 10, 13], max: 20, color: 'medio' },
    'Liderazgo y relaciones en el trabajo': { score: 18.9, t: [14, 29, 42, 58], max: 75, color: 'bajo' }
};

const domData = {
    'Condiciones en el ambiente de trabajo': { score: 6.9, t: [5, 9, 11, 14], max: 20, color: 'bajo' },
    'Carga de trabajo': { score: 25.0, t: [15, 21, 27, 37], max: 50, color: 'alto' },
    'Violencia laboral': { score: 16.5, t: [10, 14, 18, 23], max: 30, color: 'alto' },
    'Jornada de trabajo': { score: 8.5, t: [1, 2, 4, 6], max: 10, color: 'muy-alto' },
    'Liderazgo': { score: 12.0, t: [9, 12, 16, 20], max: 25, color: 'alto' },
    'Relaciones en el trabajo': { score: 15.0, t: [10, 13, 17, 21], max: 25, color: 'medio' },
    'Interferencia en la relación trabajo-familia': { score: 6.5, t: [4, 6, 8, 10], max: 15, color: 'medio' },
    'Definición de funciones': { score: 8.0, t: [5, 7, 9, 11], max: 15, color: 'medio' },
    'Capacitación insuficiente': { score: 4.0, t: [3, 5, 7, 9], max: 12, color: 'medio' },
    'Falta de control sobre el trabajo': { score: 11.5, t: [11, 16, 21, 25], max: 30, color: 'bajo' }
};

function getRandomDim() {
    const score = (Math.random() * 15 + 5).toFixed(1);
    return {
        score: parseFloat(score),
        t: [5, 10, 15, 20],
        max: 25,
        color: ['nulo', 'bajo', 'medio', 'alto', 'muy-alto'][Math.floor(Math.random() * 5)]
    };
}


files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Add CSS
    if (!content.includes('.range-indicator-container')) {
        content = content.replace('</style>', `${cssToAdd}\n</style>`);
    }

    content = content.replace(/(<th[^>]*>% Colaboradores Afectados<\/th>\s*)(<th[^>]*>Nivel de Riesgo<\/th>)/g, 
        '$1<th>Puntaje</th><th>Calificación</th>$2');
        
    content = content.replace(/<tr>\s*<td>(.*?)<\/td>\s*<td class="risk-count">(\d+)<\/td>\s*<td class="percentage">([^<]+)<\/td>\s*<td><span class="risk-badge ([^"]+)">([^<]+)<\/span><\/td>\s*<\/tr>/g, (match, name, count, pct, badgeClass, badgeText) => {
        let nameTrimmed = name.trim();
        let data = catData[nameTrimmed] || getRandomDim();
        let newBadgeClass = data.color;
        let newBadgeText = newBadgeClass.charAt(0).toUpperCase() + newBadgeClass.slice(1).replace('-', ' ');
        let indicator = generateIndicator(data.score, data.t, data.max, newBadgeClass);
        return `<tr>
                                            <td>${name}</td>
                                            <td class="risk-count">${count}</td>
                                            <td class="percentage">${pct}</td>
                                            <td><span class="score-value">${data.score}</span></td>
                                            <td>${indicator}</td>
                                            <td><span class="risk-badge ${newBadgeClass}">${newBadgeText}</span></td>
                                        </tr>`;
    });
    
    content = content.replace(/<tr>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td class="risk-count">(\d+)<\/td>\s*<td class="percentage">([^<]+)<\/td>\s*<td>\s*<span class="risk-badge ([^"]+)">([^<]+)<\/span>\s*<\/td>\s*<\/tr>/g, (match, domName, catName, count, pct, badgeClass, badgeText) => {
        let nameTrimmed = domName.trim();
        let data = domData[nameTrimmed] || getRandomDim();
        let newBadgeClass = data.color;
        let newBadgeText = newBadgeClass.charAt(0).toUpperCase() + newBadgeClass.slice(1).replace('-', ' ');
        let indicator = generateIndicator(data.score, data.t, data.max, newBadgeClass);
        return `<tr>
                                            <td>${domName}</td>
                                            <td>${catName}</td>
                                            <td class="risk-count">${count}</td>
                                            <td class="percentage">${pct}</td>
                                            <td><span class="score-value">${data.score}</span></td>
                                            <td>${indicator}</td>
                                            <td><span class="risk-badge ${newBadgeClass}">${newBadgeText}</span></td>
                                        </tr>`;
    });
    
    content = content.replace(/<td class="dimension-cell">([\s\S]*?)<\/td>\s*<td class="dimension-domain-info">([^<]+)<\/td>\s*<td class="risk-count">(\d+)<\/td>\s*<td class="percentage">([^<]+)<\/td>\s*<td>\s*<span class="risk-badge ([^"]+)">([^<]+)<\/span>\s*<\/td>/g, (match, cellContent, domInfo, count, pct, badgeClass, badgeText) => {
        let data = getRandomDim();
        let newBadgeClass = data.color;
        let newBadgeText = newBadgeClass.charAt(0).toUpperCase() + newBadgeClass.slice(1).replace('-', ' ');
        let indicator = generateIndicator(data.score, data.t, data.max, newBadgeClass);
        return `<td class="dimension-cell">${cellContent}</td>
                                            <td class="dimension-domain-info">${domInfo}</td>
                                            <td class="risk-count">${count}</td>
                                            <td class="percentage">${pct}</td>
                                            <td><span class="score-value">${data.score}</span></td>
                                            <td>${indicator}</td>
                                            <td><span class="risk-badge ${newBadgeClass}">${newBadgeText}</span></td>`;
    });
    
    fs.writeFileSync(file, content);
    console.log("Updated", file);
});
