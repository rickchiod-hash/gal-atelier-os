import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CatalogSection } from './CatalogSection'

const mockProps = {
  catalogFilter: 'all' as const,
  setCatalogFilter: jest.fn(),
  categories: [
    { id: 'all' as const, label: 'Todos' },
    { id: 'lace-front' as const, label: 'Lace Front' },
  ],
  filteredCatalog: [
    {
      id: '1',
      name: 'Lace Front Premium',
      category: 'lace-front' as const,
      price: 1800,
      image: '/test.jpg',
      description: 'Test description',
    },
  ],
}

describe('CatalogSection', () => {
  it('renders catalog section', () => {
    render(<CatalogSection {...mockProps} />)
    expect(screen.getByRole('heading', { name: /coleção atelier wigs/i })).toBeInTheDocument()
  })

  it('renders filter buttons', () => {
    render(<CatalogSection {...mockProps} />)
    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByText('Lace Front')).toBeInTheDocument()
  })

  it('renders item titles', () => {
    render(<CatalogSection {...mockProps} />)
    expect(screen.getByText('Lace Front Premium')).toBeInTheDocument()
  })

  it('renders price element', () => {
    render(<CatalogSection {...mockProps} />)
    expect(document.querySelector('.lookbook-featured-price')).toBeInTheDocument()
  })
})
