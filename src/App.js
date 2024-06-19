import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/NavBar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import SignUpForm from './components/SignUp/SignUpForm';
import LoginForm from './components/Login/LoginForm';
import TripsPage from './components/Trips/TripsPage';
import Requests from './components/Requests/Requests';
import MyTrips from './components/Trips/MyTrips';
import Profile from './components/Profile/Profile';
import SearchTrips from './components/Trips/SearchTrips';
import Reviews from './components/Reviews/Reviews';

import Cookies from 'js-cookie';
import PrivateRoute from './utils/PrivateRoute';

import Cars from './components/Cars/Cars';
import MapComponent from './components/GoogleMaps/MapComponent';


function App() {

  const loginToApp = (loginData) => {
    localStorage.setItem("user", JSON.stringify(loginData));
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="login" element={<LoginForm loginToApp={loginToApp} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<HomeLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

function HomeLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="trips" element={<TripsPage />} />
        <Route path="requests" element={<Requests />} />
        <Route path="history" element={<MyTrips />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/tripmap" element={<MapComponent center={{ lat: -34.397, lng: 150.644 }} zoom={20} />} />
        <Route path="/pointmap" element={<MapComponent center={{ lat: -34.397, lng: 150.644 }} zoom={20} />} />
      </Routes>
    </>
  );
}


export default App;
