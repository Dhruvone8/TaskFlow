import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { tasksAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

const TaskForm = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(isEditing);
    const [formError, setFormError] = useState('');
    const [toast, setToast] = useState(null);

    // Fetch task data if editing
    useEffect(() => {
        if (isEditing) {
            const fetchTask = async () => {
                try {
                    const response = await tasksAPI.getOne(id);
                    const task = response.data.task;
                    setFormData({
                        title: task.title || '',
                        description: task.description || '',
                        status: task.status || 'pending',
                        priority: task.priority || 'medium',
                        dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
                    });
                } catch (error) {
                    setToast({ message: 'Failed to load task', type: 'error' });
                    setTimeout(() => navigate('/'), 2000);
                } finally {
                    setFetchLoading(false);
                }
            };
            fetchTask();
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Validation
        if (!formData.title.trim()) {
            setFormError('Please provide a task title');
            return;
        }

        setLoading(true);

        try {
            const taskData = {
                ...formData,
                dueDate: formData.dueDate || undefined
            };

            if (isEditing) {
                await tasksAPI.update(id, taskData);
                setToast({ message: 'Task updated successfully', type: 'success' });
            } else {
                await tasksAPI.create(taskData);
                setToast({ message: 'Task created successfully', type: 'success' });
            }

            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            setFormError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="spinner" style={{ width: '48px', height: '48px' }} aria-label="Loading task"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>

                {/* Form Card */}
                <div className="glass p-8 rounded-2xl animate-slide-up">
                    <h1 className="text-2xl font-bold mb-6 gradient-text">
                        {isEditing ? 'Edit Task' : 'Create New Task'}
                    </h1>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Error Message */}
                        {formError && (
                            <div
                                className="mb-6 p-4 rounded-lg text-sm"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: 'var(--color-error)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}
                                role="alert"
                            >
                                {formError}
                            </div>
                        )}

                        {/* Title Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Task Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input"
                                placeholder="Enter task title"
                                required
                                maxLength={100}
                            />
                        </div>

                        {/* Description Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input"
                                placeholder="Enter task description (optional)"
                                rows={4}
                                maxLength={500}
                                style={{ resize: 'vertical', minHeight: '100px' }}
                            />
                        </div>

                        {/* Status and Priority Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="priority"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        {/* Due Date Field */}
                        <div className="mb-8">
                            <label
                                htmlFor="dueDate"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="btn btn-primary flex-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner" aria-hidden="true"></span>
                                        {isEditing ? 'Updating...' : 'Creating...'}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {isEditing ? 'Update Task' : 'Create Task'}
                                    </>
                                )}
                            </button>
                            <Link to="/" className="btn btn-secondary">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
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

export default TaskForm;
