const express = require('express');

const { 
    createRole,getAllRoles
} = 
require('../controller/roleController');
const requireAuth  = require('../middleware/requireAuth');
const router = express.Router();

// Create new permission
 router.post('/', createRole);

 router.get('/', getAllRoles);




module.exports =  router