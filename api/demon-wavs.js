// /api/angel-wavs.js

export default async function handler(req, res) {
    // Example file list for angel-wavs
    const wavFiles = [
        'sound1.wav',
        'sound2.wav',
        // Add all your WAV filenames here
    ];
    res.status(200).json(wavFiles);
}
