import { render, screen } from '@testing-library/react';
import { DashboardOperacionalSection } from './DashboardOperacionalSection';

describe('DashboardOperacionalSection', () => {
  it('renderiza seção de dashboard', () => {
    render(<DashboardOperacionalSection metrics={{ quotes: 1, revenuePotential: 1000, depositsPotential: 300, conversionRate: 70, avgTicket: 500 }} />);
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });
});
