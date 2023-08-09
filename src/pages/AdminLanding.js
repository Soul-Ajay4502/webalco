import React from 'react';
import './css/AdminLanding.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import image1 from './img/nv.jpg'
//import image2 from './img/aa.webp'
import image3 from './img/n1.jpg'
//import image4 from './img/h.jpg'

const AdminLanding = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;
    const handleLogout = () => {

        window.location.href = '/';
    };

    const handleSidebarItemClick = (operation) => {

        if (`${operation}` === 'View Banned Users') {
            navigate('/BannedUsers');
        }
        else {
            alert(`${operation} `);
        }

    };

    const handleNotificationClick = () => {
        navigate('/NotifyAdmin')
    };

    return (
        <div className="admin-landing-container">
            <div className="admin-sidebar" style={{

                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '300px',
                height: '100%',
            }}>
                <div className="admin-sidebar-header">
                    <h3 style={{ color: 'black' }}><u>OPERATIONS</u></h3>
                </div>
                <ul className="admin-sidebar-menu">
                    <li onClick={() => handleSidebarItemClick('HELLO ADMIN')}><img src={image1} alt="image1" style={{ height: 155, width: 240 }} /> </li>
                    <li onClick={() => handleSidebarItemClick('HELLO ADMIN ')}><img src={image3} alt="image2" style={{ height: 155, width: 240 }} /> </li>
                    {/* <li onClick={() => handleSidebarItemClick('Manage beverage')}>Manage Beverage</li>
                    <li onClick={() => handleSidebarItemClick('Delete User')}>Add Product</li>
                    <li onClick={() => handleSidebarItemClick('Update products')}>Update Products</li>
                    <li onClick={() => handleSidebarItemClick('View the products')}>View the products</li>*/}
                    <li onClick={() => handleSidebarItemClick('View Banned Users')}>View banned users</li>
                </ul>

                <button className="logout-button" onClick={handleLogout}>Logout</button>

            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <h2>Welcome, {email}!</h2>
                    <div className="notification" >
                        <FaBell style={{ marginLeft: 950 }} className="notification-icon" onClick={handleNotificationClick} />

                    </div>
                </div>
                <div style={{ height: 350 }} className="admin-dashboard">
                    <h3>Admin Dashboard</h3>
                    <p>Welcome to the AlcoGuard Admin Page! This page provides you with comprehensive control and monitoring capabilities for the AlcoGuard application. As an admin, you play a crucial role in ensuring the smooth operation of the system and maintaining a responsible alcohol consumption environment.</p>

                </div>
            </div>

        </div>
    );
};

export default AdminLanding;
