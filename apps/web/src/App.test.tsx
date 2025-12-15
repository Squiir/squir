import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App accessibility', () => {
  it('renders accessible form elements', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /interface accessible/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByRole('button', { name: /s’inscrire/i })).toBeEnabled();
  });
});
