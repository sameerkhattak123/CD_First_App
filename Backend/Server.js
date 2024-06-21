require('dotenv').config();
const express  = require ('express');
const mongoose = require('mongoose')
const cors = require('cors'); 
const employeeRoutes = require('./routes/employee');
const userRoutes = require('./routes/user');
const permissionRoute = require('./routes/permission');
const roleRoute = require('./routes/role');
const rolePermission = require('./routes/rolePermission');
const userPermission = require('./routes/userPermission');


const app  = express()


app.use(express.json())
app.use(cors()); 

app.use((req,res, next) => {
    
    console.log(req.path,req.method)
    next()
})

app.use('/api/user-permission',userPermission)
app.use('/api/role-permission',rolePermission)
app.use('/api/role',roleRoute)
app.use('/api/permission',permissionRoute)
app.use('/api/employee', employeeRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{

        console.log('Connect to port & listeneing on port',process.env.PORT)
    })
    
    
})
.catch(()=>{
    console.log(error) 
})

