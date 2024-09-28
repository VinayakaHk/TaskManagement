const router = require('express').Router();

const { getTasks, getTaskById, updateTask, createTask, deleteTask } = require('../controllers/task.controller');


router.post('/auth/create', createTask);
router.get('/auth/list', getTasks);
router.post('/auth/update', updateTask);
router.post('/auth/delete', deleteTask);

module.exports = router;

module.exports = router;
