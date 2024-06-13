const express  = require ('express')
const router = express.Router();

const { loginUser,signupUser,refreshToken}  = require ('../controller/userController')



router.post('/login', loginUser)

router.post('/signup',signupUser)

router.post('/refreshToken',refreshToken)

module.exports = router;