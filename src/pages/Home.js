// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className= "bg-red-700">
<h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>

      <h2>Home Page</h2>
      <h3>Welcome to Webster Event! <br/></h3>
      <h2>
      <Link to="/patelstudent">GoTo Patel student Portal( for TESTING !!! ) Username :sourapatel &  pass: 7811069775</Link>
      </h2>

      <h2>
      <Link to="/tilakstudent">GoTo Tilak student Portal( for TESTING !!! ) Username :souratilak  &  pass: 7811069775</Link>
      </h2>

      <h2>
      <Link to="/cheifwarden">GoTo Cheifwarden Portal( for TESTING !!! ) Username :cheifwarden  &  pass: 7811069775</Link>
      </h2>

      <h2>
      <Link to="/accountant">GoTo Accountant Portal( for TESTING !!! ) Username :accountant  &  pass: 7811069775</Link>
      </h2>

      <h1>
      <Link to="/login">Login</Link>
      </h1>
    </div>
  );
}

export default Home;
