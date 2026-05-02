import { render, screen } from '@testing-library/react';
import { PipelineCRMSection } from './PipelineCRMSection';

describe('PipelineCRMSection', () => {
  it('renderiza heading da seção de CRM', () => {
    render(<PipelineCRMSection mockLeadsInitial={[]} whatsappReceiver="5511999999999" />);
    expect(screen.getByRole('heading', { name: /crm pipeline/i })).toBeInTheDocument();
  });
});
