// rolePermissionModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolePermissionSchema = new Schema({
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    permissionId: {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        required: true
    }
});

// Create a compound unique index on roleId and permissionId
rolePermissionSchema.index({ roleId: 1, permissionId: 1 }, { unique: true });

const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);

module.exports = RolePermission;
