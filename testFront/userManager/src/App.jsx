import './App.css';
import { Routes, Route, NavLink as Link } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import AdminPage from './components/Admin.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';


function App() {


  return (
    <div className='App'>
      <nav><ul>
        <li><Link to="/" activeClassName="active">Home</Link></li>
        <li><Link to="/create-user" activeClassName="active">Signup</Link></li>
        {/* <li><Link to="/admin-area" activeClassName="active">Admin Page</Link></li> */}
        {/* make visibly only if admin is logged  */}
        <li><Link to="/logged-out" activeClassName="active">Logout</Link></li>
        {/* only vis. after logged in */}
      </ul>
      </nav>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/create-user" element={<Signup />}></Route>
          <Route path="/admin-area" element={<AdminPage />}></Route>
          <Route path="/logged-out" element={<Logout />}></Route>
          {/* if possible make a redirect to Homepage after 5 sec.  */}
        </Routes>
      </div>
    </div>
  )
};

export default App
