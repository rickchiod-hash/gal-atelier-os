import { render, screen } from '@testing-library/react';
import { QuoteWizardSection } from './QuoteWizardSection';

describe('QuoteWizardSection', () => {
  it('renderiza heading de orçamento', () => {
    render(
      <QuoteWizardSection
        apiUrl="http://localhost:8080"
        loading={false}
        setLoading={() => undefined}
        status="ok"
        setStatus={() => undefined}
        quote={null}
        setQuote={() => undefined}
        wizardStep={1}
        setWizardStep={() => undefined}
        quoteStatus={{}}
        showToast={() => undefined}
        load={() => undefined}
        money={(v) => String(v)}
        generatePDF={() => undefined}
      />
    );
    expect(screen.getByRole('heading', { name: /orçamento/i })).toBeInTheDocument();
  });
});
