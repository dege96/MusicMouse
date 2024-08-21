const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
 
// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1y', // 1 year in milliseconds
    etag: false,
    lastModified: false
}));


// Endpoint to get all .wav files in angel-wavs directory
app.get('/api/angel-wavs', (req, res) => {
    const directoryPath = path.join(__dirname, 'angel-wavs');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err);
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const wavFiles = files.filter(file => path.extname(file) === '.wav');
        console.log('angel WAV files found:', wavFiles);
        res.json(wavFiles);
    });
});

// Endpoint to get all .wav files in demon-wavs directory
app.get('/api/demon-wavs', (req, res) => {
    const directoryPath = path.join(__dirname, 'demon-wavs');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err);
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const wavFiles = files.filter(file => path.extname(file) === '.wav');
        console.log('demon WAV files found:', wavFiles);
        res.json(wavFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
