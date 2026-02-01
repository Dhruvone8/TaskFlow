import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const { register, error, clearError } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormError('');
        clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setFormError('Please fill in all fields');
            return;
        }

        if (formData.password.length < 6) {
            setFormError('Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        const result = await register(formData.name, formData.email, formData.password);
        setIsLoading(false);

        if (result.success) {
            navigate('/', { replace: true });
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-slide-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-3xl font-bold gradient-text mb-2">
                        <svg
                            className="w-10 h-10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        TaskFlow
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Create your account and start managing tasks
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass p-8 rounded-2xl">
                    <form onSubmit={handleSubmit} noValidate>
                        <h1 className="sr-only">Create a TaskFlow Account</h1>

                        {/* Error Message */}
                        {(formError || error) && (
                            <div
                                className="mb-6 p-4 rounded-lg text-sm"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: 'var(--color-error)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}
                                role="alert"
                            >
                                {formError || error}
                            </div>
                        )}

                        {/* Name Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input"
                                placeholder="John Doe"
                                autoComplete="name"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input"
                                placeholder="Minimum 6 characters"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-base py-3"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" aria-hidden="true"></span>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6" style={{ color: 'var(--color-text-secondary)' }}>
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-semibold hover:underline"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Register;
