const fs = require('fs');

const files = [
  './Nom-035/resultados-nom035-entorno.html',
  './Nom-035/template-ubits/resultados-nom035-entorno.html',
  './Nom-035/resultados-nom035.html',
  './Nom-035/template-ubits/resultados-nom035.html',
  './Nom-035/resultados-nom035-entorno-simple.html',
  './Nom-035/template-ubits/resultados-nom035-entorno-simple.html'
];

const cssToAdd = `
        /* Leyenda General de Rangos */
        .general-range-legend {
            margin-top: 24px;
            padding: 24px;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .legend-bar {
            display: flex;
            width: 100%;
            max-width: 600px;
            height: 24px;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
        }
        .legend-segment {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: 600;
        }
        .legend-labels {
            display: flex;
            width: 100%;
            max-width: 600px;
            justify-content: space-between;
        }
        .legend-label {
            flex: 1;
            text-align: center;
            font-size: 13px;
            color: #4b5563;
        }
        .legend-title {
            margin-top: 12px;
            font-size: 16px;
            font-weight: 700;
            color: #1f2937;
            text-align: center;
        }
`;

const htmlToAdd = `
                                <!-- Leyenda General de Rangos -->
                                <div class="general-range-legend">
                                    <div class="legend-bar">
                                        <div class="legend-segment nulo" style="background-color: #60a5fa;"></div>
                                        <div class="legend-segment bajo" style="background-color: #86efac;"></div>
                                        <div class="legend-segment medio" style="background-color: #fde047;"></div>
                                        <div class="legend-segment alto" style="background-color: #fbbf24;"></div>
                                        <div class="legend-segment muy-alto" style="background-color: #ef4444;"></div>
                                    </div>
                                    <div class="legend-labels">
                                        <div class="legend-label">Nulo</div>
                                        <div class="legend-label">Bajo</div>
                                        <div class="legend-label">Medio</div>
                                        <div class="legend-label">Alto</div>
                                        <div class="legend-label">Muy Alto</div>
                                    </div>
                                    <div class="legend-title">Nivel de Riesgo</div>
                                </div>
`;

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Add CSS if not present
    if (!content.includes('.general-range-legend')) {
        content = content.replace('</style>', `${cssToAdd}\n</style>`);
    }

    // Insert the legend at the bottom of the Vista General panel
    // We need to find the end of the sub-panels-container. 
    // Actually, maybe better to put it right under the view-by-select or at the end of the container.
    // Let's insert it inside the <div class="sub-panels-container"> at the very top, so it is always visible above the tables
    if (!content.includes('Leyenda General de Rangos')) {
        content = content.replace('<div class="sub-panels-container">', '<div class="sub-panels-container">\n' + htmlToAdd);
    }
    
    fs.writeFileSync(file, content);
    console.log("Updated", file);
});
