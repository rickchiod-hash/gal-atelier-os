"use client";

interface MockLead {
  id: string;
  name: string;
  whatsapp: string;
  source: string;
  interest: string;
  budget: string;
  nextAction: string;
  stage: string;
}

interface PipelineCRMSectionProps {
  mockLeadsInitial: MockLead[];
  whatsappReceiver: string;
}

export function PipelineCRMSection({ mockLeadsInitial, whatsappReceiver }: PipelineCRMSectionProps) {
  return <section id="crm"><h2>CRM Pipeline</h2></section>;
}
