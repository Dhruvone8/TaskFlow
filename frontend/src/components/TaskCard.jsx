import { Link } from 'react-router-dom';

const TaskCard = ({ task, onDelete, onStatusChange }) => {
    const formatDate = (date) => {
        if (!date) return null;
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

    return (
        <article
            className="card animate-slide-up"
            style={{
                animationDelay: '0ms',
                ...(isOverdue && { borderColor: 'var(--color-error)' })
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {/* Title and Status */}
                    <div className="flex items-center gap-3 mb-2">
                        <h3
                            className="text-lg font-semibold truncate"
                            style={{
                                color: task.status === 'completed'
                                    ? 'var(--color-text-muted)'
                                    : 'var(--color-text-primary)',
                                textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                            }}
                        >
                            {task.title}
                        </h3>
                    </div>

                    {/* Description */}
                    {task.description && (
                        <p
                            className="text-sm mb-3 line-clamp-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {task.description}
                        </p>
                    )}

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`badge badge-${task.status}`}>
                            {task.status.replace('-', ' ')}
                        </span>
                        <span className={`badge badge-${task.priority}`}>
                            {task.priority}
                        </span>
                        {task.dueDate && (
                            <span
                                className="badge"
                                style={{
                                    background: isOverdue
                                        ? 'rgba(239, 68, 68, 0.2)'
                                        : 'rgba(100, 116, 139, 0.2)',
                                    color: isOverdue
                                        ? 'var(--color-error)'
                                        : 'var(--color-text-secondary)'
                                }}
                            >
                                {isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Quick Status Toggle */}
                <button
                    onClick={() => onStatusChange(task._id, task.status === 'completed' ? 'pending' : 'completed')}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'completed'
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-500 hover:border-green-500'
                        }`}
                    aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                >
                    {task.status === 'completed' && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Actions */}
            <div
                className="flex items-center gap-2 pt-3 mt-3"
                style={{ borderTop: '1px solid var(--color-border)' }}
            >
                <Link
                    to={`/tasks/${task._id}/edit`}
                    className="btn btn-ghost text-sm flex-1"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(task._id)}
                    className="btn btn-ghost text-sm flex-1"
                    style={{ color: 'var(--color-error)' }}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
        </article>
    );
};

export default TaskCard;
