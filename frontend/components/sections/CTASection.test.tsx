import { render, screen } from '@testing-library/react';
import { CTASection } from './CTASection';

describe('CTASection', () => {
  it('renderiza título principal', () => {
    render(<CTASection />);
    expect(screen.getByRole('heading', { name: /cta final/i })).toBeInTheDocument();
  });
});
