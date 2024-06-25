import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../LoginForm';
import axios from 'axios';




describe('LoginForm component', () => {
  it('should render login form', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText(/contraseña/i);
    expect(passwordInput).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(submitButton).toBeInTheDocument();
  });

    it('should show error alert when login fails', async () => {
        render(
        <Router>
            <LoginForm />
        </Router>
        );
    
        const emailInput = screen.getByLabelText(/correo electrónico/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    
        fireEvent.change(emailInput, { target: { value: ' [email protected]' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const alert = screen.getByRole('alert');
            expect(alert).toBeInTheDocument();
        });
    });

    it('should navigate to trips page when login is successful', async () => {
        render(
        <Router>
            <LoginForm />
        </Router>
        );
    
        const emailInput = screen.getByLabelText(/correo electrónico/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    
        fireEvent.change(emailInput, { target: { value: ' [email protected]' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });

    // test handle go back
    it('should navigate to home page when "Volver" button is clicked', () => {
        const { getByRole } = render(
        <Router>
            <LoginForm />
        </Router>
        );
        const goBackButton = getByRole('button', { name: /volver/i });
        goBackButton.click();
        expect(window.location.pathname).toBe('/');
    });

    // test logout previous session
    it('should logout previous session when form is submitted', async () => {
        render(
        <Router>
            <LoginForm />
        </Router>
        );
    
        const emailInput = screen.getByLabelText(/correo electrónico/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    
        fireEvent.change(emailInput, { target: { value: ' [email protected]' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });





});
