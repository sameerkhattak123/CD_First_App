// rolePermissionController.js
const RolePermission = require('../models/rolePermissionModel');

// Assign permissions to a role
const assignPermissionsToRole = async (req, res) => {
    try {
        const { roleId, permissionIds } = req.body;
        // Create an array of rolePermission documents to insert
        const rolePermissions = permissionIds.map(permissionId => ({
            roleId,
            permissionId
        }));
        // Insert role-permission associations into the database
        await RolePermission.insertMany(rolePermissions);
        res.status(201).json({ message: 'Permissions assigned to role successfully' });
    } catch (error) {
        // Check if the error is due to duplicate key violation
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Permission(s) already assigned to this role' });
        }
        console.error('Error assigning permissions to role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllRolePermissions = async (req, res) => {
    try {
        // Find all role-permission associations
        const allRolePermissions = await RolePermission.find().populate('roleId permissionId');
        res.status(200).json(allRolePermissions );
    } catch (error) {
        console.error('Error getting all role permissions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get permissions associated with a role
const getRolePermissions = async (req, res) => {
    try {
        const { roleId } = req.params;
        // Find role-permission associations for the given roleId
        const rolePermissions = await RolePermission.find({ roleId }).populate('permissionId');
        res.status(200).json(rolePermissions );
    } catch (error) {
        console.error('Error getting role permissions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { assignPermissionsToRole,getAllRolePermissions,getRolePermissions}