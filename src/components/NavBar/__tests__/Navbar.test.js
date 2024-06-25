// test Navbar
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';

jest.mock('axios');

describe('Navbar component', () => {
    it('should render navbar with links', () => {
        render(
          <Router>
            <Navbar />
          </Router>
        );
    
        // Verifica que los enlaces en el Navbar estén presentes y sean accesibles
        const tripsLink = screen.getByRole('link', { name: /viajes disponibles/i });
        expect(tripsLink).toBeInTheDocument();
    
        const requestsLink = screen.getByRole('link', { name: /solicitudes/i });
        expect(requestsLink).toBeInTheDocument();
    
        const carsLink = screen.getByRole('link', { name: /autos/i });
        expect(carsLink).toBeInTheDocument();
    
        const historyLink = screen.getByRole('link', { name: /mis viajes/i });
        expect(historyLink).toBeInTheDocument();
    
        const reviewsLink = screen.getByRole('link', { name: /reseñas/i });
        expect(reviewsLink).toBeInTheDocument();
    
        const profileLink = screen.getByRole('link', { name: /perfil/i });
        expect(profileLink).toBeInTheDocument();
      });

    it('should render logout button correctly', () => {
        render(
          <Router>
            <Navbar />
          </Router>
        );
    
        const logoutButton = screen.getByText('Cerrar Sesión');
        expect(logoutButton).toBeInTheDocument();
      });
    
    it('should redirect to home page when logout button is clicked', async () => {
        // Mock para simular la petición de logout
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ message: 'Logout exitoso' }),
        });

        render(
            <Router>
            <Navbar />
            </Router>
        );

        const logoutButton = screen.getByText('Cerrar Sesión');
        fireEvent.click(logoutButton);

        // Esperar a que la función handleLogout se llame y termine la redirección
        await screen.findByText('Unicar'); // Espera a que se renderice el componente de inicio de nuevo

        expect(window.location.pathname).toBe('/'); // Verificar la redirección a la página de inicio
    });

    it('should handle successful logout and redirect', async () => {
        // Mockear la respuesta exitosa de logout
        axios.post.mockResolvedValueOnce({ status: 200 });

        render(
            <Router>
            <Navbar />
            </Router>
        );

        // Simular click en el botón de Cerrar Sesión
        fireEvent.click(screen.getByText(/cerrar sesión/i));

        // Esperar a que se complete la redirección (puedes ajustar este tiempo según sea necesario)
        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });

    
});
