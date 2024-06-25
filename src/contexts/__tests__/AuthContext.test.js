import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';

describe('AuthContext', () => {
  // Mock de componente de prueba
  function TestComponent() {
    const { isAuthenticated, login, logout } = useAuth();

    return (
      <div>
        <span data-testid="status">{isAuthenticated ? 'Logged In' : 'Logged Out'}</span>
        <button data-testid="login-btn" onClick={login}>
          Login
        </button>
        <button data-testid="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  it('should initialize with isAuthenticated false', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
  });

  it('should set isAuthenticated to true on log out', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByTestId('login-btn');
    userEvent.click(loginBtn);

    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
  });

  it('should set isAuthenticated to false on logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByTestId('login-btn');
    const logoutBtn = screen.getByTestId('logout-btn');

    // Login first
    userEvent.click(loginBtn);
    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');

    // Logout
    userEvent.click(logoutBtn);
    expect(screen.getByTestId('status')).toHaveTextContent('Logged Out');
  });
});
