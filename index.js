const fs = require('fs').promises;
const path = require('path');
const convert = require('heic-convert');

async function convertHeicToPng(directory) {
    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            if (path.extname(file).toLowerCase() === '.heic') {
                const inputPath = path.join(directory, file);
                const outputPath = path.join(directory, `${path.basename(file, '.heic')}.png`);

                const inputBuffer = await fs.readFile(inputPath);
                const outputBuffer = await convert({
                    buffer: inputBuffer,
                    format: 'PNG'
                });

                await fs.writeFile(outputPath, outputBuffer);
                console.log(`Converted ${file} to ${path.basename(outputPath)}`);
            }
        }
    } catch (error) {
        console.error('Error converting files:', error);
    }
}

// Example usage
const directory = './images';
convertHeicToPng(directory);
