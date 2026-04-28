"use client";

interface QuoteResponse {
  id: string;
  clientName: string;
  clientWhatsapp: string;
  serviceType: string;
  minimumPrice: number;
  recommendedPrice: number;
  premiumPrice: number;
  depositPrice: number;
  whatsappMessage: string;
  whatsappLink: string;
  pixCopyPaste: string;
  createdAt: string;
  status: string;
}

interface PedidosProducaoSectionProps {
  quotes: QuoteResponse[];
  serviceLabel: (value: string) => string;
  money: (value: number) => string;
  formatDate: (dateStr: string) => string;
  showToast: (message: string, type?: "success" | "error") => void;
}

export function PedidosProducaoSection({
  quotes,
  serviceLabel,
  money,
  formatDate,
  showToast,
}: PedidosProducaoSectionProps) {
  return <section id="pedidos-producao"><h2>Pedidos e Produção</h2></section>;
}
