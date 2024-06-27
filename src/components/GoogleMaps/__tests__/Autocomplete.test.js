import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Autocomplete from '../Autocomplete';
import { loader } from '../MapComponent'; // Importa el loader que ya tienes configurado

// Mock the loader
jest.mock('../MapComponent', () => ({
  loader: {
    load: jest.fn()
  }
}));

describe('Autocomplete Component', () => {
  const mockOnPlaceSelected = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockOnPlaceSelected.mockClear();
    mockOnChange.mockClear();
    loader.load.mockClear();
  });

  test('renders input with placeholder and styles', () => {
    loader.load.mockResolvedValue();
    render(
      <Autocomplete 
        onPlaceSelected={mockOnPlaceSelected}
        placeholder="Enter a place"
        name="location"
        value=""
        onChange={mockOnChange}
        sx={{}}
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter a place');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveStyle('width: 100%');
    expect(inputElement).toHaveStyle('padding: 10px');
  });

  test('calls loader.load on mount', async () => {
    loader.load.mockResolvedValue();
    render(
      <Autocomplete 
        onPlaceSelected={mockOnPlaceSelected}
        placeholder="Enter a place"
        name="location"
        value=""
        onChange={mockOnChange}
        sx={{}}
      />
    );
    expect(loader.load).toHaveBeenCalled();
  });

  test('logs error if Google Maps API not loaded', async () => {
    loader.load.mockRejectedValue(new Error('Error loading Google Maps'));
    console.error = jest.fn();

    
    render(
      <Autocomplete 
        onPlaceSelected={mockOnPlaceSelected}
        placeholder="Enter a place"
        name="location"
        value=""
        onChange={mockOnChange}
        sx={{}}
      />
    );
    await waitFor(() => expect(console.error).toHaveBeenCalled());
    expect(console.error).toHaveBeenCalledWith('Error loading Google Maps', expect.any(Error));
  });

  test('initializes autocomplete and sets up place_changed listener', async () => {
    loader.load.mockResolvedValueOnce();
    render(
      <Autocomplete 
        onPlaceSelected={mockOnPlaceSelected}
        placeholder="Enter a place"
        name="location"
        value=""
        onChange={mockOnChange}
        sx={{}}
      />
    );

    // Mock Google Maps Autocomplete
    const mockAutocomplete = {
      addListener: jest.fn((event, callback) => {
        if (event === 'place_changed') {
          callback();
        }
      }),
      getPlace: jest.fn(() => ({ name: 'Test Place' }))
    };

    window.google = {
      maps: {
        places: {
          Autocomplete: jest.fn(() => mockAutocomplete)
        }
      }
    };

    await loader.load();

    expect(window.google.maps.places.Autocomplete).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(mockAutocomplete.addListener).toHaveBeenCalledWith('place_changed', expect.any(Function));

    // Simulate place selection
    fireEvent.change(screen.getByPlaceholderText('Enter a place'), { target: { value: 'Test Place' } });
    expect(mockOnPlaceSelected).toHaveBeenCalledWith({ name: 'Test Place' });
  });

});
