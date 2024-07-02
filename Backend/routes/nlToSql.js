const express = require('express');
const {
    translateToSql
} = require ('../controller/nlToSqlController');

const router = express.Router();

router.post('/',translateToSql);

module.exports =  router