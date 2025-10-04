import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';

function Home(){
  return(
    <>
      <h1 className='text-2xl font-semibold text-green-400'>Welcome to AI-Powered Plaement Helper </h1>
    </>
  )
}


function App() {

  return (
    <>
      <Router>
        <nav className='p-4 bg-gray-800 text-white flex gap-4'>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
        </nav>
        <div className='p-6'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />}  /> 
            <Route path="/dashboard"
                   element={<PrivateRoute>
                             <Dashboard />
                            </PrivateRoute> } />
 
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
