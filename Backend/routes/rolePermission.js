const express = require('express');

const { 
    assignPermissionsToRole,
    getAllRolePermissions,
    getRolePermissions
} = 
require('../controller/rolePermissionController');
const requireAuth  = require('../middleware/requireAuth');
const router = express.Router();

// Create new permission
 router.post('/', assignPermissionsToRole);

 router.get('/', getAllRolePermissions);

 router.get('/:roleId', getRolePermissions);



module.exports =  router