    // userRoleController.js
    const UserPermission= require('../models/userPermissionModel');
    const RolePermission = require('../models/rolePermissionModel')
    const Permission = require('../models/permissionModel')

    // Assign roles to a users
    const assignRolesToUser = async (req, res) => {
        try {
            const { userId, roleIds } = req.body;

            // Create an array of userRole documents to insert
            const userRoles = roleIds.map(roleId => ({
                userId,
                roleId
            }));

            // Insert user-role associations into the database
          const result =  await UserPermission.insertMany(userRoles);
    
            res.status(201).json(result);
        } catch (error) {
            // Check if the error is due to duplicate key violation
            if (error.code === 11000) {
                return res.status(400).json({ error: 'Role(s) already assigned to this user' });
            }
            console.error('Error assigning roles to user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    // Get role permissions for a logged-in user
    const getLoggedInUserRolePermissions = async (req, res) => {
        try {
            const loggedInUserId = req.user.id; // Assuming the user ID is available in the request object
            
            // Find all user-role associations for the logged-in user
            const userPermissions = await UserPermission.find({ userId: loggedInUserId });

            // Extract role IDs from userPermissions
            const roleIds = userPermissions.map(userPermission => userPermission.roleId);

            // Find the role-permission associations for the retrieved role IDs
            const rolePermissions = await RolePermission.find({ roleId: { $in: roleIds } });

            // Extract permission IDs from rolePermissions
            const permissionIds = rolePermissions.map(rolePermission => rolePermission.permissionId);

            // Find the permissions associated with the permission IDs
            const permissions = await Permission.find({ _id: { $in: permissionIds } });

            // Extract permission names from permissions
            const permissionNames = permissions.map(permission => permission.permissionName);

            res.status(200).json(permissionNames );
        } catch (error) {
            console.error('Error getting role permissions for logged-in user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };



    // Fetch username and role name
    const getUserRoles = async (req, res) => {
        try {
            const userPermissions = await UserPermission.find().populate('userId roleId');

            const userRoles = userPermissions.map(userPermission => ({
                userPermissionId: userPermission._id,
                username: userPermission.userId.userName,
                roleName: userPermission.roleId.roleName
            }));

            res.status(200).json(userRoles);
        } catch (error) {
            console.error('Error fetching user roles:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // Delete user-permission association by ID
    const deleteUserPermissionById = async (req, res) => {
        try {
            const { id } = req.params;

            const permission = await UserPermission.findOneAndDelete({_id:id });

            if (!permission) {
                return res.status(404).json({ error: 'User-permission association not found' });
            }
            res.status(200).json(permission );
        } catch (error) {
            console.error('Error deleting user-permission association:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };


    module.exports = { assignRolesToUser,getLoggedInUserRolePermissions,getUserRoles,deleteUserPermissionById };
