import React from 'react';
import Auth from './User/pages/auth/Auth';
import Home from './User/pages/home/Home';
import Profile from './User/pages/profile/Profile'
import Chat from './User/pages/chat/Chat'
import ResetPassword from './User/components/resetpassword/ResetPassword';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRouter from './Admin/AdminRouter';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Emailverify from './User/components/emailVerify/Emailverify';
import Forgotpassword from './User/components/forgotpassword/Forgotpassword';

function App() {
  const user = useSelector((state) => state.auth.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}> </div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}> </div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
        <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
        <Route path="/auth/:id/verify/:token" element={<Emailverify />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
        <Route path='/resetpassword/:id/:token' element={<ResetPassword/>}/>
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
        <Route  path="/chat" element={user ? <Chat/> : <Navigate to="../auth" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
