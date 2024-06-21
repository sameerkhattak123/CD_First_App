const express  = require ('express')
const router = express.Router();

const { loginUser,signupUser,refreshToken,getAllUsersWithRoleUser}  = require ('../controller/userController')



router.post('/login', loginUser)

router.post('/signup',signupUser)

router.post('/refreshToken',refreshToken)
router.get('/', getAllUsersWithRoleUser)

module.exports = router;