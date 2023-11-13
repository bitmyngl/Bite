import React from 'react';
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

function App() {
    return (
      <Router>
        {/* <Navigation /> */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patelstudent" element={<Patelstudent />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/patelgallery" element={<Patelgallery />} />
          <Route path="/patelcomment" element={<Patelcomment />} />
          <Route path="/patelfullmenu" element={<Patelfullmenu />} />
          <Route path="/patelallcomplaint" element={<Patelallcomplaint />} />

          <Route path="/tilakstudent" element={<Tilakstudent />} />

          <Route path="/cheifwarden" element={<Cheifwarden />} />

          <Route path="/accountant" element={<Accountant />} />
        </Routes>
      </Router>
    );
  }

export default App;
