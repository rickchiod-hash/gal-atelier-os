import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { DashboardSection } from './DashboardSection'

describe('DashboardSection', () => {
  it('renders dashboard section', () => {
    render(<DashboardSection />)
    expect(screen.getByRole('region', { name: /dashboard/i })).toBeInTheDocument()
  })

  it('renders metrics', () => {
    render(<DashboardSection />)
    expect(screen.getByText(/métricas/i)).toBeInTheDocument()
  })

  it('renders agenda', () => {
    render(<DashboardSection />)
    expect(screen.getByText(/agenda/i)).toBeInTheDocument()
  })

  it('renders pipeline', () => {
    render(<DashboardSection />)
    expect(screen.getByText(/pipeline/i)).toBeInTheDocument()
  })
})
