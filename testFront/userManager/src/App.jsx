import './App.css';
import { Routes, Route, NavLink as Link } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import AdminPage from './components/Admin.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import { Profile } from './components/Profile.jsx';
import { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    <div className='App'>
      <header>
        <nav>
          <ul>
            <li><Link to="/" activeStyle="active">Home</Link></li>
            <li><Link to="/create-user" activeStyle="active">Signup</Link></li>
            <li><Link to="/admin-area" activeStyle="active">Admin Page</Link></li>
            <li><Link to="/logged-out" activeStyle="active">Logout</Link></li>

          </ul>
        </nav>
      </header>
      <Profile/>

      <Routes>
        <Route path="/" element={isLoggedIn ? <Profile /> : <Login />}></Route>
        <Route path="/create-user" element={<Signup />}></Route>
        <Route path="/admin-area" element={<AdminPage />}></Route>
        <Route path="/logged-out" element={<Logout />}></Route>
        {/* if possible make a redirect to Homepage after 5 sec.  */}
      </Routes>

    </div>
  )
};

export default App
