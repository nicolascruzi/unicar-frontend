// __mocks__/react-router-dom.js

import React from 'react';

const mockReactRouterDom = jest.createMockFromModule('react-router-dom');

// Mock BrowserRouter
mockReactRouterDom.BrowserRouter = ({ children }) => <div>{children}</div>;

// Mock Route
mockReactRouterDom.Route = ({ children, path }) => {
  const pathname = window.location.pathname;
  const match = pathname === path;
  return match ? children : null;
};

// Mock Link
mockReactRouterDom.Link = ({ to, children }) => <a href={to}>{children}</a>;

// Mock useParams
mockReactRouterDom.useParams = () => ({
  // Provide mocked params here if needed
});

module.exports = mockReactRouterDom;
