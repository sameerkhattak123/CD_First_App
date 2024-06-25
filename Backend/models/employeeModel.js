    const mongoose = require('mongoose');

    const Schema = mongoose.Schema;

    const employeeSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
            trim: true
        },
        department: {
            type: String,
            required: true,
            trim: true
        },
        salary: {
            type: Number,
            required: true,
        },
        dateOfHire: {
            type: Date,
            default: Date.now
        },
        profilePicture:{
            type:String,
            required:true
        },
        coverPhotos:{
            type:[String],
            default:[]
        }
    });

    const Employee = mongoose.model('Employee', employeeSchema);

    module.exports = Employee;
