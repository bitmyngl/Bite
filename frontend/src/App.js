import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from './Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
// import Navbar from './components/Navbar.jsx'
import Patelstudent from './pages/Patelstudent';
import Tilakstudent from './pages/Tilakstudent';
import Patelgallery from "./pages/patelstudent/Patelgallery"
import Patelcomment from './pages/patelstudent/Patelcomment';
import Patelfullmenu from './pages/patelstudent/Patelfullmenu';
import Cheifwarden from './pages/Cheifwarden';
import Accountant from "./pages/Accountant";
import Patelallcomplaint from "./pages/patelstudent/Patelallcomplaint";
import Signup from './pages/Signup';
import Otpverification from "./pages/Otpverification";
import Passwordcreate from './pages/Passwordcreate';
import Patelmenudetails from './components/Patelmenudetails';
import Cheifwardenallcomplaint from "./pages/cheifwarden/Cheifwardenallcomplaint"
import UserContext from "./components/Usercontext";

function App() {
  const [username, setUsername] = useState('JohnDoe');
    return (
      <Router>
        {/* <Navigation /> */}
        {/* <Navbar /> */}
        <UserContext.Provider value={{ username, setUsername }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path="/passwordcreate" element={<Passwordcreate />} />
          <Route path="/patelstudent" element={<Patelstudent />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/patelgallery" element={<Patelgallery />} />
          <Route path="/patelcomment" element={<Patelcomment />} />
          <Route path="/patelfullmenu" element={<Patelfullmenu />} />
          <Route path="/patelmenudetails" element={<Patelmenudetails />} />
          <Route path="/patelallcomplaint" element={<Patelallcomplaint />} />

          <Route path="/tilakstudent" element={<Tilakstudent />} />

          <Route path="/cheifwarden" element={<Cheifwarden />} />
          <Route path="/cheifwardenallcomplaint" element={<Cheifwardenallcomplaint />} />

          <Route path="/accountant" element={<Accountant />} />
        </Routes>
        </UserContext.Provider>
    
      </Router>
    );
  }

export default App;
