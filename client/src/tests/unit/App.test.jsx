import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App Integration Test', () => {
  it('renders without crashing and shows header text', () => {
    render(<App />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
