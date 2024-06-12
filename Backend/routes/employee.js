const express = require('express');
const {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee

} = require ('../controller/employeeController');

const requireAuth    = require('../middleware/requireAuth');

const router = express.Router()

//require auth for all 
router.use(requireAuth)

router.get('/', getEmployees)

router.get('/:id', getEmployee)

router.post('/', createEmployee)

router.delete('/:id',deleteEmployee)

router.patch('/:id',updateEmployee)

module.exports =  router