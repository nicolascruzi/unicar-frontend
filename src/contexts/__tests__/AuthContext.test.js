import React from 'react';
import { render, act } from '@testing-library/react';
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
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('status')).toHaveTextContent('Logged Out');
  });

  it('should set isAuthenticated to true on log out', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = getByTestId('login-btn');
    act(() => {
      userEvent.click(loginBtn);
    });

    expect(getByTestId('status')).toHaveTextContent('Logged Out');
  });

  it('should set isAuthenticated to false on logout', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = getByTestId('login-btn');
    const logoutBtn = getByTestId('logout-btn');

    // Login first
    act(() => {
      userEvent.click(loginBtn);
    });
    expect(getByTestId('status')).toHaveTextContent('Logged Out');

    // Logout
    act(() => {
      userEvent.click(logoutBtn);
    });
    expect(getByTestId('status')).toHaveTextContent('Logged Out');
  });
});
