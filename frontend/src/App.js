import React from 'react';
import Auth from './User/pages/auth/Auth';
import Home from './User/pages/home/Home';
import Profile from './User/pages/profile/Profile'
import Chat from './User/pages/chat/Chat'
import ResetPassword from './User/components/resetpassword/ResetPassword';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Emailverify from './User/components/emailVerify/Emailverify';
import Forgotpassword from './User/components/forgotpassword/Forgotpassword';
import AdminLayout from './Admin/components/layout/AdminLayout';
import Users from './Admin/pages/Users';
import BlockedUsers from './Admin/pages/BlockedUsers';
import Dashboard from './Admin/pages/Dashboard/Dashboard';
import ErrorBoundary from './User/components/error/ErrorBoundary';
import Reports from './Admin/pages/reports/Reports';
import Userdetails from './Admin/components/userdetails/Userdetails';



function App() {
  const user = useSelector((state) => state.auth.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}> </div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}> </div>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
          <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
          <Route path="/auth/:id/verify/:token" element={<Emailverify />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
          <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="../auth" />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/blockedusers' element={<BlockedUsers />} />
            <Route path='/admin/allreports' element={<Reports />} />
            <Route path='/admin/users/:id' element={<Userdetails/>}/>
          </Route>
        </Routes>
      </ErrorBoundary>
      <ToastContainer />

    </div>
  );
}

export default App;
