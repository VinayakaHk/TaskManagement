const router = require('express').Router();

const { login, register, google } = require('../controllers/login.controller');


router.post('/', login);
router.post('/register', register);
router.post('/google', google)


module.exports = router;
