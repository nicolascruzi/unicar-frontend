import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from '../LandingPage';

describe('LandingPage component', () => {
  it('should render welcome message', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const welcomeMessage = screen.getByText(/¡Bienvenido a Unicar!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('should render description message', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const descriptionMessage = screen.getByText(/La plataforma para ofrecer y pedir viajes en auto./i);
    expect(descriptionMessage).toBeInTheDocument();
  });

  // test handle Login
    it('should navigate to login page when "Iniciar Sesión" button is clicked', () => {
        const { getByText } = render(
        <Router>
            <LandingPage />
        </Router>
        );
        const loginButton = getByText(/Iniciar Sesión/i);
        loginButton.click();
        expect(window.location.pathname).toBe('/login');
    });

    // test handle SignUp
    it('should navigate to signup page when "Registrarse" button is clicked', () => {
        const { getByText } = render(
        <Router>
            <LandingPage />
        </Router>
        );
        const signUpButton = getByText(/Registrarse/i);
        signUpButton.click();
        expect(window.location.pathname).toBe('/signup');
    });
    
});
