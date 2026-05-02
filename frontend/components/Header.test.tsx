import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

jest.mock('./ThemeProvider', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme: jest.fn() }),
}))

describe('Header', () => {
  it('renders logo and primary quote link', () => {
    render(<Header whatsappReceiver="5511999999999" />)
    expect(screen.getByLabelText(/gal atelier os - início/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /orçamento/i })).toBeInTheDocument()
  })

  it('renders menu button', () => {
    render(<Header whatsappReceiver="5511999999999" />)
    expect(screen.getByRole('button', { name: /abrir menu/i })).toBeInTheDocument()
  })
})
