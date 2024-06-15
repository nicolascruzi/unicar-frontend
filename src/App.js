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

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthContent />
      </Router>
    </AuthProvider>
  );
}

function AuthContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/history" element={<MyTrips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews/>} />
        
      </Routes>
    </>
  );
}

export default App;
