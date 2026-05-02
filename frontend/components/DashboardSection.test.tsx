import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { DashboardSection } from './DashboardSection'

const metrics = {
  quotes: 5,
  revenuePotential: 15000,
  depositsPotential: 3000,
  conversionRate: 0.72,
  avgTicket: 1200,
}

describe('DashboardSection', () => {
  it('renders dashboard title and metrics cards', () => {
    render(<DashboardSection metrics={metrics} />)
    expect(screen.getByRole('heading', { name: /dashboard operacional/i })).toBeInTheDocument()
    expect(screen.getByText(/orçamentos/i)).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
