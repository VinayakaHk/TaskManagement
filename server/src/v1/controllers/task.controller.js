const { Task, User } = require('../../models')

const createTask = async (req, res) => {
    try {
        const { name, description, dueDates, reminders, status } = req.body;
        const email = req.decoded.details.email;
        const user = await User.findOne({ email }).select('_id');
        if (!name) {
            return res.status(500).json({ error: true, message: "Name not provided" });
        }
        const newTask = new Task({
            userId: user._id,
            name,
            description,
            status,
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
        const email = req.decoded.details.email;
        const user = await User.findOne({ email }).select('_id');
        const tasks = await Task.find({ userId: user._id });
        return res.status(200).json({ error: false, tasks });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true, debug: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { _id, name, description, status, dueDates, reminders } = req.body;
        const email = req.decoded.details.email;
        const user = await User.findOne({ email }).select('_id');

        if (!name) {
            return res.status(500).json({ error: true, message: 'title not provided' });
        }
        const updatedTask = await Task.findByIdAndUpdate(
            { _id, userId: user._id },
            { name, description, status, dueDates, reminders },
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
        const { _id } = req.body;

        const deletedTask = await Task.findByIdAndDelete(_id);
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
    updateTask,
    deleteTask
};
