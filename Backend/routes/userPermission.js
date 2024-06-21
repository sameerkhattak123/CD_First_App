const express = require('express');

const { 
    assignRolesToUser,
    getLoggedInUserRolePermissions,
    getUserRoles,
    deleteUserPermissionById
} = 
require('../controller/userPermissionController');
const requireAuth  = require('../middleware/requireAuth');
const router = express.Router();

// Create new permission
 router.post('/', assignRolesToUser);

 router.get('/', requireAuth,getLoggedInUserRolePermissions);
 
 router.get('/userpermissiondetails', getUserRoles);
 
 router.delete('/:id', deleteUserPermissionById);




module.exports =  router