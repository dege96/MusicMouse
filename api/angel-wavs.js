export default async function handler(req, res) {
    const wavFiles = [
        'angelsound1.wav',
        'angelsound2.wav',
        'angelsound3.wav',
        'angelsound4.wav',
        'angelsound5.wav',
        'angelsound6.wav',
        'angelsound7.wav',
        'angelsound8.wav',
        'angelsound9.wav',
        'angelsound10.wav',
        'angelsound11.wav',
        'angelsound12.wav',
        'angelsound13.wav',
        'angelsound14.wav'
    ];
    res.status(200).json(wavFiles);
}
