import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CatalogSection } from './CatalogSection'
import { catalogItems, categories } from '@/data/galAtelierCatalog'

describe('CatalogSection', () => {
  const props = {
    catalogFilter: 'all' as const,
    setCatalogFilter: jest.fn(),
    categories,
    filteredCatalog: catalogItems,
  }

  it('renders catalog title and filters', () => {
    render(<CatalogSection {...props} />)
    expect(screen.getByRole('heading', { name: /coleção atelier wigs/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: categories[0].label })).toBeInTheDocument()
  })

  it('renders featured catalog item', () => {
    render(<CatalogSection {...props} />)
    expect(screen.getByRole('heading', { level: 3, name: catalogItems[0].name })).toBeInTheDocument()
  })
})
