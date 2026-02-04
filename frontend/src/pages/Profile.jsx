import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI } from '../services/api';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.getProfile();
            setUser(response.data.user);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await profileAPI.updateProfile({
                name: user.name,
                email: user.email
            });
            setUser(response.data.user);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            // Update localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="loading">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <button className="back-btn" onClick={() => navigate('/dashboard')}>
                        ← Back to Dashboard
                    </button>
                    <h1>My Profile</h1>
                </div>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="save-btn" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>

            <style>{`
                .profile-container {
                    min-height: 100vh;
                    padding: 2rem;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding-top: 4rem;
                }

                .profile-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 2.5rem;
                    width: 100%;
                    max-width: 500px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }

                .profile-header {
                    margin-bottom: 2rem;
                }

                .back-btn {
                    background: none;
                    border: none;
                    color: #8b8b8b;
                    cursor: pointer;
                    font-size: 0.9rem;
                    padding: 0;
                    margin-bottom: 1rem;
                    display: block;
                    transition: color 0.2s;
                }

                .back-btn:hover {
                    color: #fff;
                }

                .profile-header h1 {
                    color: #fff;
                    font-size: 1.8rem;
                    margin: 0;
                }

                .message {
                    padding: 1rem;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .message.success {
                    background: rgba(16, 185, 129, 0.2);
                    color: #10b981;
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }

                .message.error {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }

                .profile-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-group label {
                    color: #a0a0a0;
                    font-size: 0.9rem;
                }

                .form-group input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    padding: 1rem;
                    color: #fff;
                    font-size: 1rem;
                    transition: border-color 0.2s, background 0.2s;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #6366f1;
                    background: rgba(255, 255, 255, 0.08);
                }

                .save-btn {
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                    margin-top: 0.5rem;
                }

                .save-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
                }

                .save-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .loading {
                    color: #fff;
                    font-size: 1.2rem;
                }
            `}</style>
        </div>
    );
};

export default Profile;
