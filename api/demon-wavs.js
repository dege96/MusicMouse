const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    const directoryPath = path.join(process.cwd(), 'public/demon-wavs');
    try {
        const files = await fs.promises.readdir(directoryPath);
        const wavFiles = files.filter(file => path.extname(file) === '.wav');
        console.log('demon WAV files found:', wavFiles);
        res.status(200).json(wavFiles);
    } catch (err) {
        console.error('Unable to scan directory:', err);
        res.status(500).send('Unable to scan directory: ' + err);
    }
};
