const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

const upload = require('../config/multer');



const convertPdfToText = (filePath) => {
    return new Promise((resolve, reject) => {
        const dataBuffer = fs.readFileSync(filePath);
        pdfParse(dataBuffer)
            .then(data => {
                resolve(data.text);
            })
            .catch(err => {
                reject(err);
            });
    });
};

// Upload and convert PDF controller
const uploadPdf = (req, res) => {
    upload.single('pdf')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = path.join(__dirname, '../public/uploads', req.file.filename);
        console.log('filepath',filePath);

        // Check if file exists before processing
        fs.access(filePath, fs.constants.F_OK, (accessErr) => {
            if (accessErr) {
                return res.status(500).json({ message: 'File not found', error: accessErr.message });
            }

            convertPdfToText(filePath)
                .then(text => {
                    // Clean up uploaded file after processing
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
                    });
                    res.status(200).json({ text });
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error converting PDF to text', error: err.message });
                });
        });
    });
};


module.exports = { uploadPdf };
