const express = require('express');
const path = require('path');
const app = express();

// Configura la aplicación para usar la carpeta dist/helpdesk como un directorio estático
app.use(express.static('./dist/helpdesk'));

// Configura la aplicación para enviar el archivo index.html cuando se solicita cualquier ruta
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/helpdesk/'});
});

// Configura la aplicación para escuchar en el puerto 8080 o en el puerto que se especifica en la variable de entorno PORT
app.listen(process.env.PORT || 8080);