const fs = require('fs');
const path = require('path');

// Define as pastas de origem e destino
const sourceDir = path.join(__dirname, 'src/data');
const destDir = path.join(__dirname, 'dist/data');

// Crie a pasta de destino se não existir
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copie cada arquivo JSON da pasta de origem para a pasta de destino
fs.readdirSync(sourceDir).forEach(file => {
    if (path.extname(file) === '.json') {
        fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
        console.log(`Copied ${file} to ${destDir}`);
    }
});
