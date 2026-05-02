import { render, screen } from '@testing-library/react';
import { PedidosProducaoSection } from './PedidosProducaoSection';

describe('PedidosProducaoSection', () => {
  it('renderiza heading da seção', () => {
    render(
      <PedidosProducaoSection
        quotes={[]}
        serviceLabel={(v) => v}
        money={(v) => String(v)}
        formatDate={(v) => v}
        showToast={() => undefined}
      />
    );
    expect(screen.getByRole('heading', { name: /pedidos e produção/i })).toBeInTheDocument();
  });
});
