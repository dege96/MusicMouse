const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/pics/Comp1/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, 'pics', 'Comp1', imageName);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Image not found');
        }

        // Compress the image without resizing
        sharp(imagePath)
            .png({ quality: 70 })  // Adjust the quality (0-100) for PNG
            .toBuffer()
            .then(data => {
                res.type('png').send(data);
            })
            .catch(err => {
                res.status(500).send('Error processing image');
            });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
