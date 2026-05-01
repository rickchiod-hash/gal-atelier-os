import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { QuoteSection } from './QuoteSection'

const mockProps = {
  apiUrl: 'http://localhost:8080',
  loading: false,
  setLoading: jest.fn(),
  status: '',
  setStatus: jest.fn(),
  quote: null,
  setQuote: jest.fn(),
  wizardStep: 1,
  setWizardStep: jest.fn(),
  quoteStatus: {},
  showToast: jest.fn(),
  load: jest.fn(),
  money: (value: number) => `R$ ${value.toFixed(2)}`,
  generatePDF: jest.fn(),
}

describe('QuoteSection', () => {
  it('renders quote form heading', () => {
    render(<QuoteSection {...mockProps} />)
    expect(screen.getByRole('heading', { name: /crie seu orçamento/i })).toBeInTheDocument()
  })

  it('renders form inputs', () => {
    render(<QuoteSection {...mockProps} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('renders submit button', () => {
    render(<QuoteSection {...mockProps} />)
    expect(screen.getByRole('button', { name: /gerar orçamento completo/i })).toBeInTheDocument()
  })

  it('renders form labels', () => {
    render(<QuoteSection {...mockProps} />)
    expect(screen.getByText(/nome da cliente/i)).toBeInTheDocument()
  })
})
