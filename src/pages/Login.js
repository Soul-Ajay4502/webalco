import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import apiConfig from './apiConfig';
import './css/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password || !userType) {
            alert('ALL FIELDS REQUIRED');
            return;
        }

        try {
            const formData = {
                Email_Id: username,
                usertype: userType, // 1 for admin, 2 for beverages
                login_Password: password,
            };

            const response = await axios.post(apiConfig.apiUrl, formData);


            console.log(response.status);
            if (response.status === 200 && userType === '1') {
                //navigate('/Adminlanding');
                navigate('/Adminlanding', { state: { email: username } });
            } else if (response.status === 200 && userType === '2') {
                navigate('/Beveragelanding', { state: { email: username } });
            }
        } catch (error) {

            //console.error('Login failed:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="form-selectuser">
                    <select
                        id="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="">Select User Type</option>
                        <option value="1">Admin</option>
                        <option value="2">Beverage</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="email"
                        placeholder='example@gmail.com'
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                        <input
                            placeholder='Password'
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </div>
                    </div>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
