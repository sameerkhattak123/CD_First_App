// roleController.js
const Role = require('../models/roleModel');

// Create a new role
const createRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        // Check if role already exists
        const existingRole = await Role.findOne({ roleName });
        if (existingRole) {
            return res.status(400).json({ error: 'Role already exists' });
        }
        // Create new role
        const role = new Role({ roleName });
        await role.save();
        res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllRoles = async (req, res) => {
    try {
        // Find all roles
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error getting all roles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createRole,getAllRoles };