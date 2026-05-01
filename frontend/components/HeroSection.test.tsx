import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

const mockProps = {
  whatsappReceiver: '5511999999999',
  metrics: {
    quotes: 0,
    revenuePotential: 0,
    depositsPotential: 0,
    avgTicket: 0,
  },
  initialLoading: false,
  money: (value: number) => `R$ ${value.toFixed(2)}`,
}

describe('HeroSection', () => {
  it('renders hero section', () => {
    render(<HeroSection {...mockProps} />)
    expect(document.querySelector('.hero-section')).toBeInTheDocument()
  })

  it('renders main heading', () => {
    render(<HeroSection {...mockProps} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders call-to-action button', () => {
    render(<HeroSection {...mockProps} />)
    expect(screen.getByRole('link', { name: /criar orçamento/i })).toBeInTheDocument()
  })

  it('renders WhatsApp button', () => {
    render(<HeroSection {...mockProps} />)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
  })
})
