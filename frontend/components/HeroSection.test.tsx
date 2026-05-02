import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

const props = {
  whatsappReceiver: '5511999999999',
  metrics: { quotes: 10, revenuePotential: 10000, depositsPotential: 2500, avgTicket: 1000 },
  initialLoading: false,
  money: (value: number) => `R$ ${value}`,
}

describe('HeroSection', () => {
  it('renders main heading and CTAs', () => {
    render(<HeroSection {...props} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /criar orçamento/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver catálogo/i })).toBeInTheDocument()
  })

  it('renders insight metrics', () => {
    render(<HeroSection {...props} />)
    expect(screen.getByText(/orçamentos esta semana/i)).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })
})
