import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blank from './pages/Blank';
import Layout from './components/layout/Layout';
import "./Admin.scss";
import Example from './pages/Blank';
import User from './pages/User';
import Report from './pages/reports/Report';

const AdminRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Blank />} />
            <Route path='/users' element={<User />} />
            <Route path='/blockedUsers' element={<Example/>} />
            <Route path='/reports' element={<Report/>} />
            <Route path='/lorem' element={<Blank />} />
        </Route>
    </Routes>
</BrowserRouter>
  )
}

export default AdminRouter