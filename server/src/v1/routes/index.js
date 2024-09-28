const router = require('express').Router();

router.use('/login', require('./login.routes'));

router.use('/tasks', require('./task.routes'));
module.exports = router;
