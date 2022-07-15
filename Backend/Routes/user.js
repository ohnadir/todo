const router = require('express').Router();

const { 
    userSingIn, 
    userSingUp,
    getPagonationUsers,
    getSearchUser 
} = require('../Controllers/user');
const { singUpUserValidator, singInUserValidator } = require('../Validation/user');
const validationResult = require('../Validation');

router.post('/signin',singInUserValidator , validationResult, userSingIn );
router.post('/signup', singUpUserValidator, validationResult, userSingUp);
router.get('/', getPagonationUsers)
router.get('/', getSearchUser)


module.exports = router;