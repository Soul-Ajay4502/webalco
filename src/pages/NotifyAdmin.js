import React, { useState, useEffect } from 'react';
import './css/NotifyAdmin.css';
import axios from 'axios';

const AdminNotificationPage =  () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Function to fetch notifications from the API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Admin/notifyAdmin');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleApprove = async (notificationId,s) => {

    const data = { ReportId: notificationId ,status:s}
    try {
      const response = await axios.post('http://localhost:5000/Admin/BanUsers', data);

      if (response.status === 200)
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.Report_ID === notificationId
              ? { ...notification, approved: true }
              : notification
          )
        );
    } catch (error) { alert('Error approving notification:', error); }



  };

  const handleReject = async (notificationId,s) => {


    const data = { ReportId: notificationId ,status:s}
    try {
      const response = await axios.post('http://localhost:5000/Admin/BanUsers', data);

      if (response.status === 200)
      setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.Report_ID !== notificationId)
    );
    } catch (error) { alert('Error approving notification:', error); }





    
  };

  return (
    <div className="notification-container">
      {notifications.length === 0 ? (
        // eslint-disable-next-line
        <marquee style={{ backgroundColor: 'green' }} direction="right" scrollamount="10"><p>Currently There is No Ban Requests to display!!!.</p></marquee>

      ) : (
        notifications.map((notification) => (
          <div
            key={notification.Report_ID}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px',
              width: 600,
              paddingLeft: 50,
            }}
          >
            <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
              Requested User: {notification.repoter_name}
            </h3>
            <p style={{ marginBottom: '10px' }}>User to Be Banned: {notification.banned_name}</p>
            <p style={{ marginBottom: '10px' }}>Reason for Ban: {notification.reason}</p>
            {!notification.approved && (
              <div style={{ paddingLeft: 400 }}>
                <button
                  style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                  onClick={() => handleApprove(notification.Report_ID,1)}
                >
                  Approve
                </button>
                <button
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleReject(notification.Report_ID,2)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )))}
    </div>
  );
};

export default AdminNotificationPage;
