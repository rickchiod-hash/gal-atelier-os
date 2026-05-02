import { render, screen } from '@testing-library/react';
import { ComoFuncionaSection } from './ComoFuncionaSection';

describe('ComoFuncionaSection', () => {
  it('renderiza heading da seção', () => {
    render(<ComoFuncionaSection />);
    expect(screen.getByRole('heading', { name: /como funciona/i })).toBeInTheDocument();
  });
});
