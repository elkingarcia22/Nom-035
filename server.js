const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la raíz
app.use(express.static('.'));

// Ruta por defecto - servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir cualquier archivo HTML directamente
app.get('*.html', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Serving static files from: ${__dirname}`);
});
