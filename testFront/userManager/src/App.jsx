import './App.css';
import { Routes, Route, useNavigate, NavLink as Link } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import AdminPage from './components/Admin.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import { Profile } from './components/Profile.jsx';
import { useState, useEffect } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const role = localStorage.getItem("role");
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole('');
    navigate("/logged-out");
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <div className='App'>
      <header>
        <nav>
          <ul>
            <li><Link to="/" activeStyle="active">Home</Link></li>
            <li><Link to="/create-user" activeStyle="active">Signup</Link></li>
            {userRole === "admin" ? (<li><Link to="/admin-area" activeStyle="active">Admin Page</Link></li>) : null}
            {isLoggedIn ? (<li><Link to="/logged-out" activeStyle="active" onClick={handleLogout}>Logout</Link></li>) : null}
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={isLoggedIn ? <Profile /> : <Login navigate={navigate} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path="/create-user" element={<Signup navigate={navigate} />}></Route>
        <Route path="/admin-area" element={<AdminPage />}></Route>
        <Route path="/logged-out" element={<Logout />}></Route>
      </Routes>

    </div>
  )

}

export default App;
