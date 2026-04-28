import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders hero section', () => {
    render(<HeroSection />)
    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument()
  })

  it('renders main heading', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: /criar orçamento/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver catálogo/i })).toBeInTheDocument()
  })

  it('renders WhatsApp button', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
  })
})
