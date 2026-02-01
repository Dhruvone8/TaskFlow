const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const { status, priority, sort } = req.query;

        // Build query
        const query = { user: req.user.id };

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        // Build sort options
        let sortOptions = { createdAt: -1 }; // Default: newest first
        if (sort === 'dueDate') {
            sortOptions = { dueDate: 1 };
        } else if (sort === 'priority') {
            sortOptions = { priority: -1 };
        } else if (sort === 'status') {
            sortOptions = { status: 1 };
        }

        const tasks = await Task.find(query).sort(sortOptions);

        res.json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        console.error('GetTasks error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this task'
            });
        }

        res.json({
            success: true,
            task
        });
    } catch (error) {
        console.error('GetTask error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a task title'
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        console.error('CreateTask error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        const { title, description, status, priority, dueDate } = req.body;

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, priority, dueDate },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        console.error('UpdateTask error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('DeleteTask error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
