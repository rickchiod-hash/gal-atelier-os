import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders header element', () => {
    render(<Header whatsappReceiver="5511999999999" />)
    expect(document.querySelector('header')).toBeInTheDocument()
  })

  it('renders logo text', () => {
    render(<Header whatsappReceiver="5511999999999" />)
    expect(screen.getByText(/Gal Atelier/i)).toBeInTheDocument()
  })

  it('renders quote button', () => {
    render(<Header whatsappReceiver="5511999999999" />)
    expect(screen.getByRole('link', { name: /orçamento/i })).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<Header whatsappReceiver="5511999999999" />)
    expect(screen.getByRole('button', { name: /modo escuro/i })).toBeInTheDocument()
  })
})
