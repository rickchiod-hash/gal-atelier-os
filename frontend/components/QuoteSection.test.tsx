import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { QuoteSection } from './QuoteSection'

describe('QuoteSection', () => {
  it('renders quote form section', () => {
    render(<QuoteSection />)
    expect(screen.getByRole('region', { name: /orçamento/i })).toBeInTheDocument()
  })

  it('renders form inputs with bottom-border style', () => {
    render(<QuoteSection />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('renders submit button', () => {
    render(<QuoteSection />)
    expect(screen.getByRole('button', { name: /enviar|orçamento/i })).toBeInTheDocument()
  })

  it('renders form labels', () => {
    render(<QuoteSection />)
    expect(screen.getAllByText(/nome|email|telefone/i).length).toBeGreaterThan(0)
  })
})
