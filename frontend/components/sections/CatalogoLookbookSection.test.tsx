import { fireEvent, render, screen } from '@testing-library/react';
import { CatalogoLookbookSection } from './CatalogoLookbookSection';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'wigs', label: 'Wigs' },
  { id: 'extensoes', label: 'Extensões' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'acessorios', label: 'Acessórios' },
] as const;

describe('CatalogoLookbookSection', () => {
  it('renderiza filtro e dispara callback ao trocar categoria', () => {
    const onFilterChange = jest.fn();
    render(
      <CatalogoLookbookSection
        catalogFilter="all"
        setCatalogFilter={onFilterChange}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /wigs/i }));
    expect(onFilterChange).toHaveBeenCalledWith('wigs');
  });
});
