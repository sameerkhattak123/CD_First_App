const express = require('express');
const {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee

} = require ('../controller/employeeController');
const upload = require('../config/multer');


const requireAuth    = require('../middleware/requireAuth');

const router = express.Router()

const uploadFields = upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPhotos', maxCount: 10 }
])


//require auth for all 
router.use(requireAuth)

router.get('/', getEmployees)

router.get('/:id', getEmployee)

router.post('/',uploadFields, createEmployee)

router.delete('/:id',deleteEmployee)

router.patch('/:id',uploadFields,updateEmployee)

module.exports =  router