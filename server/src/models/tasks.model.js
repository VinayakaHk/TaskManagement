const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;

const schema = new Schema({
    userId: { type: ObjectId },
    title: { type: String },
    description: { type: String },
    status: { type: String, default: "ToDo" },
    createdAt: { type: Date, default: new Date().toISOString() },
    dueDates: { type: Date },
    reminders: { type: Date },
});

const tasks = mongoose.model('tasks', schema);

module.exports = tasks;
