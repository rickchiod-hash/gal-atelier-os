import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { DashboardSection } from './DashboardSection'

const mockProps = {
  metrics: {
    quotes: 12,
    revenuePotential: 25000,
    depositsPotential: 8750,
    conversionRate: 35,
    avgTicket: 2083,
  },
}

describe('DashboardSection', () => {
  it('renders dashboard section', () => {
    render(<DashboardSection {...mockProps} />)
    expect(screen.getByRole('heading', { name: /visão geral/i })).toBeInTheDocument()
  })

  it('renders insight labels', () => {
    render(<DashboardSection {...mockProps} />)
    expect(screen.getByText(/orçamentos/i)).toBeInTheDocument()
    expect(screen.getByText(/receita potencial/i)).toBeInTheDocument()
    expect(screen.getByText(/sinais pix/i)).toBeInTheDocument()
    expect(screen.getByText(/taxa conversão/i)).toBeInTheDocument()
    expect(screen.getByText(/ticket médio/i)).toBeInTheDocument()
  })

  it('renders insight values', () => {
    render(<DashboardSection {...mockProps} />)
    const insightValues = document.querySelectorAll('.insight-value')
    expect(insightValues).toHaveLength(5)
  })
})
