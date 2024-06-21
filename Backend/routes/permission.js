const express = require('express');

const { 
    createPermission,
    getAllPermissions,
} = require('../controller/permissionController');
const requireAuth  = require('../middleware/requireAuth');
const router = express.Router();

// Create new permission
 router.post('/', createPermission);

 router.get('/', getAllPermissions);



module.exports =  router