<<<<<<< HEAD
const Task = require('../models/Task');
const getTasks = async (
req,
res) => {
=======
// backend/controllers/taskcontroller.js
const Task = require("../models/Task");
const getTasks = async (req, res) => {
>>>>>>> 22b85f02a330a36e5a51ac6927e0219c611c9405
try {
const tasks = await Task.find({ userId: req.user.id });
res.json(tasks);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const addTask = async (
req,
res) => {
const { title, description, deadline } = req.body;
try {
const task = await Task.create({ userId: req.user.id, title, description, deadline });
res.status(201).json(task);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const updateTask = async (
req,
res) => {
const { title, description, completed, deadline } = req.body;
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
task.title = title || task.title;
task.description = description || task.description;
task.completed = completed ?? task.completed;
task.deadline = deadline || task.deadline;
const updatedTask = await task.save();
res.json(updatedTask);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


const deleteTask = async (
req,
res) => {
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
await task.remove();
res.json({ message: 'Task deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};


module.exports = {
getTasks,
addTask,
updateTask,
deleteTask
};