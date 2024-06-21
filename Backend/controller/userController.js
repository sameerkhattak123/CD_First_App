
const RefreshToken = require('../models/refreshTokenModel');

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
}
const createRefreshToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
    return new RefreshToken({ token, userId, expiryDate }).save(); 
  };
  

const loginUser = async (req,res)=>{

    const {email,password} = req.body  

    try {
        
        const user = await User.login(email,password)

        const token = createToken(user._id)
        const refreshToken = await createRefreshToken(user._id);
        res.status(200).json({email,role :user.role,token,refreshToken: refreshToken.token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get all users with the role 'user'
const getAllUsersWithRoleUser = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users with role user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const signupUser = async (req, res) => {
    const { userName, email, password } = req.body;
  
    try {
      const user = await User.signup(userName, email, password);
      
      const token = createToken(user._id);
      const refreshToken = await createRefreshToken(user._id);
  
      res.status(200).json({ userName, email, token, refreshToken: refreshToken.token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const refreshToken = async (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(401).json({ error: 'Refresh token required' });
    }
  
    try {
      const { userId } = jwt.verify(token, process.env.REFRESH_SECRET);
      const storedToken = await RefreshToken.findOne({ token });
      

      if (!storedToken || storedToken.userId.toString() !== userId) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }
  
      const newToken = createToken(userId);
      
      const newRefreshToken = await createRefreshToken(userId);
      console.log('token',newRefreshToken.token)
    
      debugger
      await storedToken.delete();
      
  
      res.status(200).json({ token: newToken, refreshToken: newRefreshToken.token });
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  };



module.exports = { loginUser,signupUser,refreshToken,getAllUsersWithRoleUser}