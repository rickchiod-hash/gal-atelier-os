import { render, screen } from '@testing-library/react';
import { QuemSomosSection } from './QuemSomosSection';

describe('QuemSomosSection', () => {
  it('renderiza proposta da seção e pilares', () => {
    render(<QuemSomosSection />);
    expect(screen.getByRole('heading', { name: /gal atelier: beleza técnica/i })).toBeInTheDocument();
    expect(screen.getByText(/naturalidade/i)).toBeInTheDocument();
    expect(screen.getByText(/personalização/i)).toBeInTheDocument();
  });
});
