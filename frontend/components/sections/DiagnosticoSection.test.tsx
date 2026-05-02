import { render, screen } from '@testing-library/react';
import { DiagnosticoSection } from './DiagnosticoSection';

describe('DiagnosticoSection', () => {
  it('renderiza heading da seção', () => {
    render(<DiagnosticoSection />);
    expect(screen.getByRole('heading', { name: /diagnóstico/i })).toBeInTheDocument();
  });
});
