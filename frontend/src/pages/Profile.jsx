import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.getProfile();
            setUser(response.data.user);
        } catch (error) {
            setToast({ message: 'Failed to load profile', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await profileAPI.updateProfile({
                name: user.name,
                email: user.email
            });
            setUser(response.data.user);
            setToast({ message: 'Profile updated successfully!', type: 'success' });

            // Update localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            setToast({
                type: 'error',
                message: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="spinner" style={{ width: '48px', height: '48px' }} aria-label="Loading profile"></div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className="mb-8 animate-fade-in">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-ghost mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Manage your account information
                    </p>
                </header>

                {/* Profile Form Card */}
                <section className="max-w-lg animate-slide-up">
                    <div className="glass p-8 rounded-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </form>
                    </div>
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

            <Footer />
        </div>
    );
};

export default Profile;
