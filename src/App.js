import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminLanding from './pages/AdminLanding';
import BeverageLanding from './pages/BeverageLanding';
import NotificationPage from './pages/NotifyBeverage';
import AdminNotificationPage from './pages/NotifyAdmin';
import BannedUsersPage from './pages/BannedUsers';


const App = () => {
  return (
    <Router>
      <div style={{paddingLeft:20,backgroundColor:'#8ABFDD'}}>
        <h1 style={{paddingLeft:20,backgroundColor:'#8ABFDD'}}>ALCOGUARD</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Adminlanding" element={<AdminLanding />} />
          <Route path="/Beveragelanding" element={<BeverageLanding />} />
          <Route path="/NotifyBeverage" element={<NotificationPage />} />
          <Route path="/NotifyAdmin" element={<AdminNotificationPage />} />
          <Route path="/BannedUsers" element={<BannedUsersPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
