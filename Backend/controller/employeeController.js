const Employee = require('../models/employeeModel');
const mongoose = require('mongoose');



const createEmployee = async(req,res)=> {

    const {name,position,department,salary,dateOfHire} = req.body
    try {
        const employee =  await Employee.create({name,position,department,salary,dateOfHire})
        res.status(200).json(employee)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

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

const updateEmployee = async (req,res ) => {
    const {id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such ID'})
    }

    const employee = await Employee.findByIdAndUpdate({_id:id },{
        ...req.body 
    },
    { new: true }
);
    if(!employee){
        return res.status(400).json({error: 'No Such Employee'})
    }
    res.status(200).json(employee);
}

module.exports ={
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee
}