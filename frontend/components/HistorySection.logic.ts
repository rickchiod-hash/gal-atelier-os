export type OrderStatus = "QUOTED" | "APPROVED" | "IN_PRODUCTION" | "COMPLETED" | "CANCELLED";

export interface QuoteResponse {
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
  status: OrderStatus;
}

export function serviceLabel(value: string): string {
  const labels: Record<string, string> = {
    LACE_FRONT: "Lace Front",
    FULL_LACE: "Full Lace",
    WIG_CUSTOM: "Wig Custom",
    MAINTENANCE: "Manutenção",
    SHOE_CUSTOMIZATION: "Customização",
  };
  return labels[value] || value;
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(dateStr));
}
