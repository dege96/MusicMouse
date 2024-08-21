// /api/angel-wavs.js

export default async function handler(req, res) {
    // Example file list for angel-wavs
    const wavFiles = [
        'demonsound1.wav',
        'demonsound2.wav',
        'demonsound3.wav',
        'demonsound4.wav',
        'demonsound5.wav',
        'demonsound6.wav',
        'demonsound7.wav',
        'demonsound8.wav',
        'demonsound9.wav',
        'demonsound10.wav',
        'demonsound11.wav',
        'demonsound12.wav'
    ];
    
    res.status(200).json(wavFiles);
}
