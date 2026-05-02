import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { QuoteSection } from './QuoteSection'

const baseProps = {
  apiUrl: 'http://localhost:8080',
  loading: false,
  setLoading: jest.fn(),
  status: 'ok',
  setStatus: jest.fn(),
  quote: null,
  setQuote: jest.fn(),
  wizardStep: 1,
  setWizardStep: jest.fn(),
  quoteStatus: {},
  showToast: jest.fn(),
  load: jest.fn(async () => undefined),
  money: (v: number) => `R$ ${v}`,
  generatePDF: jest.fn(),
}

describe('QuoteSection', () => {
  it('renders quote section heading and submit action', () => {
    render(<QuoteSection {...baseProps} />)
    expect(screen.getByRole('heading', { name: /crie seu orçamento/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /gerar orçamento completo/i })).toBeInTheDocument()
  })

  it('renders core form fields', () => {
    render(<QuoteSection {...baseProps} />)
    expect(screen.getByLabelText(/nome da cliente/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/serviço/i)).toBeInTheDocument()
  })
})
