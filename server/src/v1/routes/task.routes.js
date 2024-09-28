const router = require('express').Router();

const { getTasks, getTaskById, updateTask, createTask, deleteTask } = require('../controllers/task.controller');


router.post('/create', createTask); // Create a task
router.get('/tasks/:userId', getTasks); // Get all tasks for a user
router.get('/tasks/byId/:id', getTaskById); // Get a specific task by ID
router.put('/update/:id', updateTask); // Update a task by ID
router.delete('/delete/:id', deleteTask); // Delete a task by ID

module.exports = router;

module.exports = router;
