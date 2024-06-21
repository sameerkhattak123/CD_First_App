const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    permissionName: {
        type: String,
        required: true,
        unique: true
    }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
