import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test.skip('renders header', () => {
  render(<App />);
  const headerElement = screen.getByTitle('Design Your Character');
  expect(headerElement).toBeInTheDocument();
});
