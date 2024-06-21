const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPermissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
});

// Ensure each user can have a role only once
userPermissionSchema.index({ userId: 1, roleId: 1 }, { unique: true });

const UserPermission = mongoose.model('UserPermission', userPermissionSchema);

module.exports = UserPermission;
