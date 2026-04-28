import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ClientsSection } from './ClientsSection'

describe('ClientsSection (CRM Concierge List)', () => {
  it('renders clients section', () => {
    render(<ClientsSection />)
    expect(screen.getByRole('region', { name: /clientes/i })).toBeInTheDocument()
  })

  it('renders client list', () => {
    render(<ClientsSection />)
    const clients = screen.getAllByRole('listitem')
    expect(clients.length).toBeGreaterThan(0)
  })

  it('renders client names', () => {
    render(<ClientsSection />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders status indicators', () => {
    render(<ClientsSection />)
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
  })
})
