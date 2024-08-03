import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../global.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setError('All fields are required');
            return;
        }

        try {
            const response = await fetch('https://todo-backend-rvtc.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }



            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };


    const token = Cookies.get('jwt_token');

    if (token) {
        navigate('/');
    }

    return (
        <div className="login-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="login-title">Register</h2>
                <div className="input-field-container">
                    <label className="input-label" htmlFor="username">USERNAME</label>
                    <input
                        type="text"
                        id="username"
                        className="input-field"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field-container">
                    <label className="input-label" htmlFor="password">PASSWORD</label>
                    <input
                        type="password"
                        id="password"
                        className="input-field"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Register</button>
                {error && <p className="error-message">*{error}</p>}
                <p className="register-text">Already have an account? <a href="/login" className="register-link">Login</a></p>
            </form>
        </div>
    );
}

export default Register;
