import './App.css';
import { Routes, Route, useNavigate, NavLink as Link } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import AdminPage from './components/Admin.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Profile from './components/Profile.jsx';
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
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
      <div className='App' style={{ width: '400px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
        <header style={{ padding: '10px 0' }}>
          <nav style={{ textAlign: 'center' }}>
            <Link to="/" style={{ color: 'black', marginRight: '20px', textDecoration: 'none' }}>Home</Link>
            <Link to="/create-user" style={{ color: 'black', marginRight: '20px', textDecoration: 'none' }}>Signup</Link>
            {userRole === "admin" && <Link to="/admin-area" style={{ color: 'black', marginRight: '20px', textDecoration: 'none' }}>Admin Page</Link>}
            {isLoggedIn && <Link to="/logged-out" style={{ color: 'black', marginRight: '20px', textDecoration: 'none' }} onClick={handleLogout}>Logout</Link>}
          </nav>
        </header>

        <div>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Profile /> : <Login navigate={navigate} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRole={userRole} setUserRole={setUserRole} />}></Route>
            <Route path="/create-user" element={<Signup navigate={navigate} />}></Route>
            <Route path="/admin-area" element={<AdminPage />}></Route>
            <Route path="/logged-out" element={<Logout />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )


}

export default App;
