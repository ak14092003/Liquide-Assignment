const userCtrl = require('../controllers/userControl');
const router = require('express').Router()


router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.post('/refresh', userCtrl.refresh);

module.exports = router;