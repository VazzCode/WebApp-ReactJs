import './App.css';
import React, { useState, useEffect } from "react";
import Login from './screens/Login';
import {Routes, Route, Redi }from "react-router-dom";
import Register from './screens/Register';
import Home from './screens/Home';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './screens/ForgotPassword';


function App() {
  return (
    <AuthProvider>
    <div className="App">
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='home' element={<Home/>}/>
          <Route path='forgot' element={<ForgotPassword/>}/>
        </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
