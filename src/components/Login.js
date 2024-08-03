import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import '../global.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmitSuccess = (jwtToken) => {
        Cookies.set('jwt_token', jwtToken, { expires: 30 });
        navigate('/');
    };

    const onSubmitFailure = (errorMsg) => {
        setShowSubmitError(true);
        setErrorMsg(errorMsg);
    };

    const submitForm = async (event) => {
        event.preventDefault();

        if (username === '' || password === '') {
            onSubmitFailure('All fields are required');
            return;
        }

        const userDetails = { username: username, password: password };
        const url = 'https://todo-app-backend-2tow.onrender.com/api/login';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Add this line
            },
            body: JSON.stringify(userDetails),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                onSubmitSuccess(data.token); // Adjusted based on your provided response
            } else {
                onSubmitFailure('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            onSubmitFailure('Something went wrong. Please try again.');
        }
    };

    const token = Cookies.get('jwt_token');

    if (token) {
        navigate('/');
    }


    const renderPasswordField = () => {
        return (
            <div className="input-field-container">
                <label className="input-label" htmlFor="password">
                    PASSWORD
                </label>
                <input
                    type="password"
                    id="password"
                    className="input-field"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
        );
    };

    const renderUsernameField = () => {
        return (
            <div className="input-field-container">
                <label className="input-label" htmlFor="username">
                    USERNAME
                </label>
                <input
                    type="text"
                    id="username"
                    className="input-field"
                    value={username}
                    onChange={onChangeUsername}
                    required
                />
            </div>
        );
    };

    const jwtToken = Cookies.get('jwt_token');
    // if (jwtToken !== undefined) {
    //     return <Navigate to="/" />;
    // }

    return (
        <div className="login-container">
            <form className="form" onSubmit={submitForm}>
                <h2 className="login-title">Login</h2>
                {renderUsernameField()}
                {renderPasswordField()}
                <button type="submit" className="login-button">
                    Login
                </button>
                {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                <p className="register-text">Don't have an account? <Link to="/register" className="register-link">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
