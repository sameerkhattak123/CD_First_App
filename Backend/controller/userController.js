
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
}
const createRefreshToken = (_id) =>{
    return jwt.sign({_id},process.env.REFREST_SECRET,{expiresIn: '2d'});
}


const loginUser = async (req,res)=>{

    const {email,password} = req.body  

    try {
        
        const user = await User.login(email,password)

        const token = createToken(user._id)
        
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const signupUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const user = await User.signup(userName, email, password);
        
        const token = createToken(user._id);
        console.log(token);
          res.status(200).json({ userName, email, token });
      
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = { loginUser,signupUser}