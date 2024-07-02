const express = require('express');
const {
    uploadPdf
} = require ('../controller/pdfToTextController');

const router = express.Router();

router.post('/upload', uploadPdf);

module.exports =  router