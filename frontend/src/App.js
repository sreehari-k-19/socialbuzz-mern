import React from 'react';
import Auth from './User/pages/auth/Auth';
import Home from './User/pages/home/Home';
import Profile from './User/pages/profile/Profile'
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRouter from './Admin/AdminRouter';
import { useSelector } from 'react-redux';
import './App.scss';

function App() {
  const user = useSelector((state)=>state.auth.authData
  );
  console.log("userr.....",user)
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}> </div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}> </div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
        <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
        
      </Routes>
    </div>
  );
}

export default App;
