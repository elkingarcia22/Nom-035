const fs = require('fs');

const files = [
  './Nom-035/resultados-nom035-entorno.html',
  './Nom-035/resultados-nom035-entorno-simple.html',
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Find the domain table (has "Dominio" followed by "Categoría" in thead)
  // Match the entire table, restructure it, and replace it
  content = content.replace(
    /<table class="results-table">\s*<thead>\s*<tr>\s*<th>Dominio<\/th>\s*<th>Categoría<\/th>([\s\S]*?)<\/tr>\s*<\/thead>\s*<tbody>([\s\S]*?)<\/tbody>\s*<\/table>/g,
    function(match, headRest, tbodyInner) {
      // Parse rows from tbody
      const rows = [];
      const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
      let rm;
      while ((rm = rowRegex.exec(tbodyInner)) !== null) {
        // Extract cells: match from <td to </td> handling nested content
        const cells = [];
        let rest = rm[1];
        const cellRegex = /<td[\s\S]*?<\/td>/;
        let cm;
        while ((cm = cellRegex.exec(rest)) !== null) {
          cells.push(cm[0]);
          rest = rest.slice(cm.index + cm[0].length);
        }
        if (cells.length < 6) continue;

        // Extract category from cell[1]
        const catMatch = cells[1].match(/<td[^>]*>([\s\S]*)<\/td>/);
        const category = catMatch ? catMatch[1].trim() : '';
        if (!category) continue;

        rows.push({ category, cells });
      }

      if (rows.length === 0) return match;

      // Group by category preserving order
      const catOrder = [];
      const catMap = {};
      rows.forEach(r => {
        if (!catMap[r.category]) {
          catMap[r.category] = [];
          catOrder.push(r.category);
        }
        catMap[r.category].push(r);
      });

      // Rebuild: new header without Categoría, then tbody with section headers
      let newHeader = '<table class="results-table">\n';
      newHeader += '<thead>\n';
      newHeader += '<tr>\n';
      newHeader += '<th>Dominio</th>';
      newHeader += headRest;
      newHeader += '</tr>\n';
      newHeader += '</thead>\n';

      let newBody = '<tbody>\n';
      catOrder.forEach(catName => {
        const indent = '                                        ';
        newBody += indent + '<tr class="category-section">\n';
          newBody += indent + '  <td colspan="6"><strong>' + catName + '</strong></td>\n';
        newBody += indent + '</tr>\n';
        catMap[catName].forEach(r => {
          // cells: [0]=domain, [1]=category(skip), [2]=risk, [3]=pct, [4]=score, [5]=badge
          newBody += indent + '<tr>\n';
          newBody += indent + '  ' + r.cells[0] + '\n';
          newBody += indent + '  ' + r.cells[2] + '\n';
          newBody += indent + '  ' + r.cells[3] + '\n';
          newBody += indent + '  ' + r.cells[4] + '\n';
          newBody += indent + '  ' + r.cells[5] + '\n';
          newBody += indent + '</tr>\n';
        });
      });
      newBody += '</tbody>\n';
      newBody += '</table>';

      return newHeader + newBody;
    }
  );

  // Handle the other header format found in simple file
  content = content.replace(
    /(<th>Dominio<\/th>)\s*<th>Categoría<\/th>/g,
    '$1'
  );

  // Add CSS for category-section if not present
  if (content.indexOf('.category-section') === -1) {
    content = content.replace(
      '/* Indicador de Rangos NOM-035 */',
      '.category-section td {\n' +
      '    background: #f3f4f6;\n' +
      '    font-weight: 700;\n' +
      '    font-size: 14px;\n' +
      '    color: #374151;\n' +
      '    padding: 10px 16px;\n' +
      '    border-bottom: 1px solid #e5e7eb;\n' +
      '    text-transform: uppercase;\n' +
      '    letter-spacing: 0.3px;\n' +
      '}\n' +
      '\n' +
      '/* Indicador de Rangos NOM-035 */'
    );
  }

  fs.writeFileSync(file, content);
  console.log('Updated', file);
});
