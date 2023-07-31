import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import apiConfig from './apiConfig';
import './css/NotifyBeverage.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const { email } = location.state;
  const data = { email: email };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.post(apiConfig.apiForNotifyBev, data);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
    // eslint-disable-next-line
  }, []);

  const handleApprove = async (My_Purchase_Id, a) => {
    const data = { Purchase_Id: My_Purchase_Id, Approve_reject_status: a };
    try {
      await axios.post(apiConfig.apiForApproveNotification, data);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.My_Purchase_Id === My_Purchase_Id
            ? { ...notification, Purchase_Status: 1 } // Set purchase_status to 1 for approval
            : notification
        )
      );
    } catch (error) {
      console.error('Error approving notification ', error);
      alert('CANNOT APPROVE PURCHASE BECAUSE THE LIMIT MAY BE EXCEEDED!!! PLEASE REJECT IT');
    }
  };

  const handleReject = async (My_Purchase_Id, a) => {
    const data = { Purchase_Id: My_Purchase_Id, Approve_reject_status: a };
    try {
      await axios.post(apiConfig.apiForApproveNotification, data);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.My_Purchase_Id !== My_Purchase_Id)
      );
    } catch (error) {
      console.error('Error approving notification:', error);
    }
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div className="notification" key={notification.My_Purchase_Id}>
          <p>{notification.Notification} By</p>
          <p style={{ marginLeft: 5 }}>
            {notification.User_Name} {notification.phone}
          </p>
          <p style={{ marginLeft: 10 }}>{notification.Product_Name}</p>
          <p style={{ marginLeft: 10 }}>{notification.Qty} Bottle</p>
          <small style={{ marginLeft: 10 }}>{notification.Date_Of_Notification}</small>
          {notification.Purchase_Status === 0 && (
            <div>
              <button style={{ width: 100 }} onClick={() => handleApprove(notification.My_Purchase_Id, 1)}>
                Approve
              </button>
              <button style={{ width: 100 }} onClick={() => handleReject(notification.My_Purchase_Id, 2)}>
                Reject
              </button>
            </div>
          )}

          {notification.Purchase_Status === 1 && <p style={{ color: 'green' }}>Approved</p>}
          {notification.Purchase_Status === 2 && <p style={{ color: 'red' }}>Rejected</p>}
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
