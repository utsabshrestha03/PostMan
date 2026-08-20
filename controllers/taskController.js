const Task = require("../models/Task");

// CREATE
const createTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title,
            description,
            completed
        });

        res.status(201).json(task);

    } catch (error) {
        next(error);
    }
};


// READ ALL
const getTasks = async (req, res, next) => {
    try {
        const { completed } = req.query;

        let filter = {};

        if (completed !== undefined) {
            filter.completed = completed === "true";
        }

        const tasks = await Task.find(filter);

        res.status(200).json(tasks);

    } catch (error) {
        next(error);
    }
};


// READ ONE
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        next(error);
    }
};


// UPDATE
const updateTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;

        if (title !== undefined && title.trim() === "") {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                completed
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        next(error);
    }
};


// DELETE
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};