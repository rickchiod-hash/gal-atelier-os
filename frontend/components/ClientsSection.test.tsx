import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ClientsSection } from './ClientsSection'

const leads = [
  {
    id: '1',
    name: 'Ana Silva',
    whatsapp: '5511999999999',
    interest: 'Lace Front',
    budget: 'R$ 1500',
    source: 'Instagram',
    stage: 'CONTACT',
    nextAction: 'Follow-up',
  },
]

describe('ClientsSection (CRM Concierge List)', () => {
  it('renders active clients list', () => {
    render(
      <ClientsSection
        activeLeads={leads}
        stageColor={() => '#000'}
        stageLabel={(stage) => stage}
        whatsappReceiver="5511999999999"
      />
    )

    expect(screen.getByRole('heading', { name: /clientes ativos/i })).toBeInTheDocument()
    expect(screen.getByText(/ana silva/i)).toBeInTheDocument()
    expect(screen.getByText(/follow-up/i)).toBeInTheDocument()
  })
})
