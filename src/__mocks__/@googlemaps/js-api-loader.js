// __mocks__/@googlemaps/js-api-loader.js

const Loader = jest.fn().mockImplementation(() => ({
    load: jest.fn().mockResolvedValue(true), // Mockear la función load para que siempre resuelva correctamente
  }));
  
  export { Loader };
  