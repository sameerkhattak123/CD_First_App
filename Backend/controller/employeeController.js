const Employee = require('../models/employeeModel');
const mongoose = require('mongoose');
const upload = require('../config/multer');


const uploadSingle = upload.single('profilePicture');
const uploadMultiple = upload.array('coverPhotos',10);

const createEmployee = async (req, res) => {
    const { name, position, department, salary, dateOfHire } = req.body;
    // Check if 'profilePicture' property exists in req.files
    const profilePicture = req.files && req.files['profilePicture'] ? req.files['profilePicture'][0].path : null;
    const coverPhotos = req.files && req.files['coverPhotos'] ? req.files['coverPhotos'].map(file => file.path) : [];
    console.log('pp',profilePicture);
    console.log('cp',coverPhotos[0]);
    console.log('name',name);

    try {
        const employee = await Employee.create({
            name,
            position,
            department,
            salary,
            dateOfHire,
            profilePicture,
            coverPhotos
        });
        
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getEmployee = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such ID'})
    }
    
    const employee = await  Employee.findById(id)
    
    if(!employee){
        return res.status(400).json({error: 'No Such Employee'})
    }
    res.status(200).json(employee);
}

const getEmployees = async (req,res) => {
    
    
    try {
        const employees = await Employee.find({}).sort({createdAt:-1});
        res.status(200).json(employees)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const deleteEmployee = async (req,res ) => {
    const {id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such ID'})
    }

    const employee = await Employee.findOneAndDelete({_id:id });
    if(!employee){
        return res.status(400).json({error: 'No Such Employee'})
    }
    res.status(200).json(employee);
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such ID' });
    }
    
    const profilePicture = req.files && req.files['profilePicture'] ? req.files['profilePicture'][0].path : null;

    let coverPhotos = [];

    // Handle URLs for cover photos
    if (req.body.coverPhotos) {
        // Check if coverPhotos is an array or a single URL
        if (Array.isArray(req.body.coverPhotos)) {
            // If it's an array, assume URLs
            coverPhotos = req.body.coverPhotos;
        } else {
            // If it's a single URL, push it to the array
            coverPhotos.push(req.body.coverPhotos);
        }
    }

    // Handle uploaded files for cover photos
    if (req.files && req.files['coverPhotos']) {
        // If coverPhotos were uploaded, add their paths to the array
        const uploadedCoverPhotos = req.files['coverPhotos'].map(file => file.path);
        coverPhotos = [...coverPhotos, ...uploadedCoverPhotos];
    }
    
    console.log('pp', profilePicture);
    console.log('cp', coverPhotos);
        
    const updateData = {
        ...req.body,
        ...(profilePicture && { profilePicture }),
        ...(coverPhotos.length && { coverPhotos }) // Only include coverPhotos if the array is not empty
    };

    try {
        const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        if (!employee) {
            return res.status(400).json({ error: 'No Such Employee' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports ={
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee
}