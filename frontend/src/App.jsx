import React from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Register';
import Login from './pages/Login';
import Dashbord from './pages/Dashbord';
import Otp from './pages/Otp';


function App() {


  return (
    <>
    <Router>
            <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/dashbord" element={<Dashbord />} />
              
            </Routes>
        </Router>
    

    </>
  )
}

export default App
