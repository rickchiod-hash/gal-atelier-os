import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CatalogSection } from './CatalogSection'

describe('CatalogSection', () => {
  it('renders catalog section', () => {
    render(<CatalogSection />)
    expect(screen.getByRole('region', { name: /catálogo/i })).toBeInTheDocument()
  })

  it('renders catalog items', () => {
    render(<CatalogSection />)
    const items = screen.getAllByRole('article')
    expect(items.length).toBeGreaterThan(0)
  })

  it('renders item titles', () => {
    render(<CatalogSection />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders item prices', () => {
    render(<CatalogSection />)
    expect(screen.getByText(/\$|R\$/)).toBeInTheDocument()
  })
})
