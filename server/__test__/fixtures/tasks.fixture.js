const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { Task } = require('../../src/models');


const toDoTask = {
    _id: mongoose.Types.ObjectId(),
    userId: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    description: faker.name.findName(),
    status: "toDo",
    createdAt: new Date(),
    dueDates: new Date(),
    reminders: new Date(),
};

const inProgressTask = {
    _id: mongoose.Types.ObjectId(),
    userId: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    description: faker.name.findName(),
    status: "inProgress",
    createdAt: new Date(),
    dueDates: new Date(),
    reminders: new Date(),
};
const completedTask = {
    _id: mongoose.Types.ObjectId(),
    userId: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    description: faker.name.findName(),
    status: "completed",
    createdAt: new Date(),
    dueDates: new Date(),
    reminders: new Date(),
};


const insertTasks = async (tasks) => {
    await Task.insertMany(tasks);
};

module.exports = {
    toDoTask,
    inProgressTask,
    completedTask,
    insertTasks,
};