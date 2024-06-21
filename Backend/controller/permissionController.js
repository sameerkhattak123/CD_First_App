const Permission = require('../models/permissionModel');

// Create a new permission
const createPermission = async (req, res) => {
    try {
        const { permissionName } = req.body;

        // Validate permission name
        if (!permissionName || permissionName.trim() === '') {
            return res.status(400).json({ error: 'Permission name is required' });
        }

        // Check if permission already exists
        const existingPermission = await Permission.findOne({ permissionName });
        if (existingPermission) {
            return res.status(400).json({ error: 'Permission already exists' });
            console.log('permission')
        }
        
        // Create new permission
        const permission = new Permission({ permissionName });
        
        await permission.save();

        res.status(201).json({ message: 'Permission created successfully', permission });
    } catch (error) {
        console.error('Error creating permission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all permissions
const getAllPermissions = async (req, res) => {
    try {
        // Find all permissions
        const permissions = await Permission.find();
        res.status(200).json( permissions );
    } catch (error) {
        console.error('Error getting all permissions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createPermission,getAllPermissions };