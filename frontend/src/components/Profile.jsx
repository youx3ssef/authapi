import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error(error);
                setMessage('Failed to fetch user data');
            }
        };
        fetchUser();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:8000/api/user',
                { name, email, password },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage('Profile updated successfully!');
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
            setMessage('Failed to update profile');
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">Profile</h1>
                {message && <p className="profile-message">{message}</p>}
                <form onSubmit={handleUpdateProfile} className="profile-form">
                    <div className="form-group">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">New Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Leave blank to keep current password"
                        />
                    </div>
                    <button type="submit" className="profile-button">
                        Update Profile
                    </button>
                </form>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;