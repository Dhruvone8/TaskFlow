import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { tasksAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        sort: 'createdAt'
    });

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const params = {};
            if (filters.status) params.status = filters.status;
            if (filters.priority) params.priority = filters.priority;
            if (filters.sort) params.sort = filters.sort;

            const response = await tasksAPI.getAll(params);
            setTasks(response.data.tasks);
        } catch (error) {
            setToast({ message: 'Failed to load tasks', type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleDelete = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await tasksAPI.delete(taskId);
            setTasks(prev => prev.filter(task => task._id !== taskId));
            setToast({ message: 'Task deleted successfully', type: 'success' });
        } catch (error) {
            setToast({ message: 'Failed to delete task', type: 'error' });
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await tasksAPI.update(taskId, { status: newStatus });
            setTasks(prev => prev.map(task =>
                task._id === taskId ? { ...task, status: newStatus } : task
            ));
            setToast({
                message: newStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened',
                type: 'success'
            });
        } catch (error) {
            setToast({ message: 'Failed to update task', type: 'error' });
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Stats
    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        pending: tasks.filter(t => t.status === 'pending').length
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className="mb-8 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold gradient-text">My Tasks</h1>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                Manage and track your tasks efficiently
                            </p>
                        </div>
                        <Link to="/tasks/new" className="btn btn-primary">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Task
                        </Link>
                    </div>
                </header>

                {/* Stats Cards */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up" aria-label="Task statistics">
                    <div className="glass p-4 rounded-xl">
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stats.total}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Total Tasks</p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>{stats.completed}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Completed</p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-info)' }}>{stats.inProgress}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>In Progress</p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>{stats.pending}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Pending</p>
                    </div>
                </section>

                {/* Filters */}
                <section className="glass p-4 rounded-xl mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="statusFilter" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                Status:
                            </label>
                            <select
                                id="statusFilter"
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="input py-2 px-3 w-auto"
                                style={{ minWidth: '140px' }}
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="priorityFilter" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                Priority:
                            </label>
                            <select
                                id="priorityFilter"
                                value={filters.priority}
                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                                className="input py-2 px-3 w-auto"
                                style={{ minWidth: '120px' }}
                            >
                                <option value="">All</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="sortFilter" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                Sort by:
                            </label>
                            <select
                                id="sortFilter"
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="input py-2 px-3 w-auto"
                                style={{ minWidth: '130px' }}
                            >
                                <option value="createdAt">Newest</option>
                                <option value="dueDate">Due Date</option>
                                <option value="priority">Priority</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Tasks Grid */}
                <section aria-label="Tasks list">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="spinner" style={{ width: '48px', height: '48px' }} aria-label="Loading tasks"></div>
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-16 animate-fade-in">
                            <svg
                                className="w-24 h-24 mx-auto mb-4 opacity-20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                No tasks found
                            </h2>
                            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                {filters.status || filters.priority
                                    ? 'Try adjusting your filters'
                                    : 'Create your first task to get started'}
                            </p>
                            {!filters.status && !filters.priority && (
                                <Link to="/tasks/new" className="btn btn-primary">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Task
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {tasks.map((task, index) => (
                                <div key={task._id} style={{ animationDelay: `${index * 50}ms` }}>
                                    <TaskCard
                                        task={task}
                                        onDelete={handleDelete}
                                        onStatusChange={handleStatusChange}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;
