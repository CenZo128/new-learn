const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/User')

router.get('/', UserController.list)
router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router;