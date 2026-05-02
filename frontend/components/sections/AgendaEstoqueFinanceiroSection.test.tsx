import { render, screen } from '@testing-library/react';
import { AgendaEstoqueFinanceiroSection } from './AgendaEstoqueFinanceiroSection';

describe('AgendaEstoqueFinanceiroSection', () => {
  it('renderiza heading principal', () => {
    render(<AgendaEstoqueFinanceiroSection agendaDays={[]} agendaTimeSlots={[]} agendaEvents={[]} />);
    expect(screen.getByRole('heading', { name: /agenda, estoque e financeiro/i })).toBeInTheDocument();
  });
});
