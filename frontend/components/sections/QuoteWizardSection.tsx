"use client";

interface QuoteWizardSectionProps {
  apiUrl: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  status: string;
  setStatus: (status: string) => void;
  quote: any;
  setQuote: (quote: any) => void;
  wizardStep: number;
  setWizardStep: (step: number) => void;
  quoteStatus: Record<string, string>;
  showToast: (message: string, type: "success" | "error") => void;
  load: () => void;
  money: (value: number) => string;
  generatePDF: (q: any) => void;
}

export function QuoteWizardSection({
  apiUrl,
  loading,
  setLoading,
  status,
  setStatus,
  quote,
  setQuote,
  wizardStep,
  setWizardStep,
  quoteStatus,
  showToast,
  load,
  money,
  generatePDF,
}: QuoteWizardSectionProps) {
  return <section id="quote"><h2>Orçamento</h2></section>;
}
