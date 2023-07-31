import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/BeverageLanding.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import apiConfig from './apiConfig';

const BeverageLanding = () => {
  const navigate = useNavigate();
  const [stockData, setStockData] = useState([]);

  const location = useLocation();
  const { email } = location.state;
  // eslint-disable-next-line
  const data = { email: email };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.post(apiConfig.apiUrlForStockData, data);
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [data]); 
  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleSidebarItemClick = (operation) => {
    alert(`${operation} Will Be Added`);
  };

  const handleNotificationClick = () => {
    navigate('/NotifyBeverage', { state: { email: email } });
  };

  return (
    <div className="beverage-landing-container">
      <div className="beverage-sidebar">
        <div className="beverage-sidebar-header">
          <h3>Operations</h3>
        </div>
        <ul className="beverage-sidebar-menu">
          <li onClick={() => handleSidebarItemClick('Order Beverage')}>Order Beverage</li>
          <li onClick={() => handleSidebarItemClick('View Orders')}>View Orders</li>
          <li onClick={() => handleSidebarItemClick('Favorites')}>Favorites</li></ul>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        
      </div>
      <div className="beverage-content">
        <div className="beverage-header">
          <h2>Welcome {email}</h2>
          
            <FaBell className="notification-icon" onClick={handleNotificationClick} />
         
        </div>
        <div className="beverage-dashboard">
          <h3>Beverage Stock</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Availability</th>
                  <th>Qty_In_ML</th>
                  <th>Price_Per_Item</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Product_Name}</td>
                    <td>{item.Availability}</td>
                    <td>{item.Qty_In_ML}</td>
                    <td>{item.Price_Per_Item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeverageLanding;
