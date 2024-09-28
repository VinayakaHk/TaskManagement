const { Task } = require('../../models')

const createTask = async (req, res) => {
    try {
        const { userId, title, description, dueDates, reminders } = req.body;

        const newTask = new Task({
            userId,
            title,
            description,
            status: 'ToDo',
            createdAt: new Date(),
            dueDates,
            reminders
        });

        const savedTask = await newTask.save();
        return res.status(201).json({ error: false, savedTask });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true, debug: error.message });
    }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
    try {
        const { userId } = req.params;

        const tasks = await Task.find({ userId });
        return res.status(200).json({ error: false, tasks });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true, debug: error.message });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: true, message: 'Task not found' });
        }
        return res.status(200).json({ error: false, task });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true, debug: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDates, reminders } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status, dueDates, reminders },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: true, message: 'Task not found' });
        }

        return res.status(200).json({ error: false, updatedTask });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true, debug: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: true, message: 'Task not found' });
        }

        return res.status(200).json({ error: false, message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true, debug: error.message });
    }
};

// Export the controller functions
module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
