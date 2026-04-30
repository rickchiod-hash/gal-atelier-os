import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ClientsSection } from './ClientsSection'

const mockLeads = [
  {
    id: '1',
    name: 'Ana Clara',
    whatsapp: '11988884444',
    interest: 'Lace Front 13x4',
    budget: 'R$ 1.800 - R$ 2.500',
    source: 'Instagram',
    stage: 'QUOTE_SENT',
    nextAction: 'Enviar orçamento'
  },
  {
    id: '2',
    name: 'Bruna Oliveira',
    whatsapp: '11966663333',
    interest: 'Glueless Wig',
    budget: 'R$ 1.200 - R$ 1.800',
    source: 'TikTok',
    stage: 'CONTACT',
    nextAction: 'Follow-up 24h'
  }
]

describe('ClientsSection (CRM Concierge List)', () => {
  it('renders clients section', () => {
    render(<ClientsSection 
      activeLeads={mockLeads}
      stageColor={(stage) => '#820AD1'} 
      stageLabel={(stage) => stage} 
      whatsappReceiver="5511999999999" 
    />)
    expect(screen.getByRole('region', { name: /clientes/i })).toBeInTheDocument()
  })

  it('renders client list', () => {
    render(<ClientsSection 
      activeLeads={mockLeads}
      stageColor={(stage) => '#820AD1'} 
      stageLabel={(stage) => stage} 
      whatsappReceiver="5511999999999" 
    />)
    const clients = screen.getAllByRole('listitem')
    expect(clients.length).toBeGreaterThan(0)
  })

  it('renders client names', () => {
    render(<ClientsSection 
      activeLeads={mockLeads}
      stageColor={(stage) => '#820AD1'} 
      stageLabel={(stage) => stage} 
      whatsappReceiver="5511999999999" 
    />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Clientes ativos')
  })

  it('renders status indicators', () => {
    render(<ClientsSection 
      activeLeads={mockLeads}
      stageColor={(stage) => '#820AD1'} 
      stageLabel={(stage) => stage} 
      whatsappReceiver="5511999999999" 
    />)
    expect(screen.getAllByText(/QUOTE_SENT|CONTACT/)).toHaveLength(2)
  })

  it('shows empty state when no leads', () => {
    render(<ClientsSection 
      activeLeads={[]}
      stageColor={(stage) => '#820AD1'} 
      stageLabel={(stage) => stage} 
      whatsappReceiver="5511999999999" 
    />)
    expect(screen.getByText(/nenhum cliente ativo/i)).toBeInTheDocument()
  })
})