"use client";

import { FormEvent, useEffect, useMemo, useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { useToast } from "@/components/Toast";
import { useTheme } from "@/components/ThemeProvider";
import { catalogItems, categories, CatalogItem } from "@/data/galAtelierCatalog";

/* ============================================
   TYPES
   ============================================ */
type OrderStatus = "QUOTED" | "APPROVED" | "IN_PRODUCTION" | "COMPLETED" | "CANCELLED";

interface Metrics {
  quotes: number;
  revenuePotential: number;
  depositsPotential: number;
  conversionRate: number;
  avgTicket: number;
}

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
  status: OrderStatus;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
}

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  active: boolean;
}

/* ============================================
   CONSTANTS
   ============================================ */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const whatsappReceiver = process.env.NEXT_PUBLIC_WHATSAPP_RECEIVER || "5511914136961";

const CATALOG_SERVICES: Service[] = [
  { id: "1", name: "Lace Front Wig", description: "Coroa lace frontal sob medida com linha natural e densidade personalizável", price: "R$ 800 - R$ 2.500", duration: "5-15 dias", icon: "👩‍🎤" },
  { id: "2", name: "Full Lace Premium", description: "Peruca completa com tela invisível em todos os pontos para máxima versatilidade", price: "R$ 1.200 - R$ 4.000", duration: "10-20 dias", icon: "✨" },
  { id: "3", name: "Glueless Wig", description: "Coroa sem cola com faixa de silicone confortável e ajuste perfeito", price: "R$ 600 - R$ 1.800", duration: "3-10 dias", icon: "💇‍♀️" },
  { id: "4", name: "Manutenção Premium", description: "Revitalização profunda, ajuste estrutural e cuidados especiais", price: "R$ 200 - R$ 500", duration: "2-4 horas", icon: "🛁" },
  { id: "5", name: "Customização Exclusiva", description: "Personalização artesanal com strass, pedrarias e acabamentos de luxo", price: "R$ 150 - R$ 600", duration: "3-7 dias", icon: "👠" },
  { id: "6", name: "Instalação Professional", description: "Aplicação técnica com fixação segura e acabamento imperceptível", price: "R$ 100 - R$ 400", duration: "1-3 horas", icon: "🎯" },
];

const PIPELINE_COLUMNS = [
  { key: "QUOTED", label: "Orçamento", color: "#8A05BE", icon: "📋" },
  { key: "APPROVED", label: "Aprovado", color: "#AB47BC", icon: "✅" },
  { key: "IN_PRODUCTION", label: "Em Produção", color: "#CE93D8", icon: "🔨" },
  { key: "COMPLETED", label: "Concluído", color: "#E040FB", icon: "🎉" },
  { key: "CANCELLED", label: "Cancelado", color: "#9C27B0", icon: "❌" },
];

const CRM_STAGES = [
  { key: "NEW_LEAD", label: "Novo Lead", color: "#AB47BC" },
  { key: "CONTACT", label: "Contato", color: "#CE93D8" },
  { key: "DIAGNOSIS", label: "Diagnóstico", color: "#8A05BE" },
  { key: "QUOTE_SENT", label: "Orçamento", color: "#AB47BC" },
  { key: "NEGOTIATION", label: "Negociação", color: "#CE93D8" },
  { key: "AWAITING_PAYMENT", label: "Aguardando Pix", color: "#4A1942" },
  { key: "PAID", label: "Sinal Pago", color: "#E040FB" },
  { key: "PRODUCTION", label: "Em Produção", color: "#CE93D8" },
  { key: "DELIVERED", label: "Entregue", color: "#E040FB" },
  { key: "LOST", label: "Perdido", color: "#6A1B9A" },
];

const MOCK_AUTOMATIONS: Automation[] = [
  { id: "1", name: "Follow-up 24h", description: "Envia mensagem de acompanhamento 24h após o orçamento.", trigger: "24h após orçamento", active: true },
  { id: "2", name: "Follow-up 48h", description: "Novo contato 48h após o primeiro follow-up.", trigger: "48h após orçamento", active: true },
  { id: "3", name: "Follow-up 7 dias", description: "Lembrete de oferta especial após 7 dias sem resposta.", trigger: "7 dias após orçamento", active: false },
  { id: "4", name: "Lembrete de manutenção", description: "Avisa a cliente para agendar manutenção 30 dias após a entrega.", trigger: "30 dias após entrega", active: true },
  { id: "5", name: "Campanha de recompra", description: "Oferece nova peça ou serviço 90 dias após a entrega.", trigger: "90 dias após entrega", active: false },
  { id: "6", name: "Aniversário da cliente", description: "Deseja feliz aniversário e envia cupom exclusivo.", trigger: "Data de aniversário", active: true },
];

const mockLeadsInitial = [
  { id: "1", name: "Ana Clara", whatsapp: "11988884444", source: "Instagram", interest: "Lace Front 13x4", budget: "R$ 1.800 - R$ 2.500", nextAction: "Enviar orçamento", stage: "QUOTE_SENT" },
  { id: "2", name: "Camila Santos", whatsapp: "11977775555", source: "Indicação", interest: "Full Lace Premium", budget: "R$ 2.500 - R$ 3.500", nextAction: "Cobrar sinal Pix", stage: "NEGOTIATION" },
  { id: "3", name: "Bruna Oliveira", whatsapp: "11966663333", source: "TikTok", interest: "Glueless Wig", budget: "R$ 1.200 - R$ 1.800", nextAction: "Follow-up 24h", stage: "CONTACT" },
  { id: "4", name: "Fernanda Lima", whatsapp: "11955552222", source: "Google", interest: "Manutenção", budget: "R$ 350 - R$ 500", nextAction: "Agendar prova", stage: "PRODUCTION" },
  { id: "5", name: "Juliana Costa", whatsapp: "11944441111", source: "Instagram", interest: "Lace Front Natural", budget: "R$ 1.500 - R$ 2.000", nextAction: "Diagnóstico", stage: "DIAGNOSIS" },
  { id: "6", name: "Larissa Rocha", whatsapp: "11933332222", source: "WhatsApp", interest: "Wig Cacheada", budget: "R$ 2.000 - R$ 3.000", nextAction: "Primeiro contato", stage: "NEW_LEAD" },
  { id: "7", name: "Patrícia Silva", whatsapp: "11922221111", source: "Indicação", interest: "Manutenção Premium", budget: "R$ 400 - R$ 600", nextAction: "Receber sinal", stage: "AWAITING_PAYMENT" },
  { id: "8", name: "Mariana Alves", whatsapp: "11911110000", source: "Google", interest: "Full Lace", budget: "R$ 3.000 - R$ 4.000", nextAction: "Entregar", stage: "PAID" },
];

/* ============================================
   AGENDA MOCK DATA
   ============================================ */
const today = new Date();
const dayOfWeek = today.getDay();
const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
const monday = new Date(today);
monday.setDate(today.getDate() + mondayOffset);

function getDayLabel(date: Date) {
  return ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][date.getDay()];
}

const agendaDays = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(monday);
  d.setDate(monday.getDate() + i);
  return {
    label: getDayLabel(d),
    dayNumber: d.getDate(),
    isToday: d.toDateString() === today.toDateString(),
  };
});

const agendaTimeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const agendaEvents = [
  { day: "Seg", time: "09:00", client: "Ana Clara", service: "Lace Front", serviceType: "lace", status: "SCHEDULED" },
  { day: "Seg", time: "14:00", client: "Camila Santos", service: "Full Lace", serviceType: "full-lace", status: "SCHEDULED" },
  { day: "Ter", time: "10:00", client: "Bruna Oliveira", service: "Glueless Wig", serviceType: "glueless", status: "COMPLETED" },
  { day: "Qua", time: "15:00", client: "Fernanda Lima", service: "Manutenção", serviceType: "maintenance", status: "SCHEDULED" },
  { day: "Qui", time: "11:00", client: "Juliana Costa", service: "Lace Front", serviceType: "lace", status: "SCHEDULED" },
];

/* ============================================
   MONEY FORMATTER
   ============================================ */
function money(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0));
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(dateStr));
}

/* ============================================
   SERVICE LABEL
   ============================================ */
function serviceLabel(value: string) {
  const labels: Record<string, string> = {
    LACE_FRONT: "Lace Front",
    FULL_LACE: "Full Lace",
    WIG_CUSTOM: "Wig Custom",
    MAINTENANCE: "Manutenção",
    SHOE_CUSTOMIZATION: "Customização",
  };
  return labels[value] || value;
}

/* ============================================
   LOGO
   ============================================ */
function Logo() {
  return (
    <div className="logo">
      <img src="/brand/logo-gal-atelier.svg" alt="Gal Atelier OS" />
      <span>Gal Atelier</span>
    </div>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
export default function Home() {
  const { showToast } = useToast();
  const { theme } = useTheme();

  const [metrics, setMetrics] = useState<Metrics>({ quotes: 0, revenuePotential: 0, depositsPotential: 0, conversionRate: 0, avgTicket: 0 });
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [status, setStatus] = useState("Pronto para operar.");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "ALL">("ALL");
  const [wizardStep, setWizardStep] = useState(1);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [catalogFilter, setCatalogFilter] = useState<"all" | CatalogItem["category"]>("all");
  const [quoteStatus, setQuoteStatus] = useState<Record<string, string>>({});
  const [leads, setLeads] = useState(mockLeadsInitial);
  const [automations, setAutomations] = useState<Automation[]>(MOCK_AUTOMATIONS);

  const load = useCallback(async () => {
    try {
      setInitialLoading(true);
      const [metricsRes, quotesRes] = await Promise.all([
        fetch(`${apiUrl}/api/quotes/metrics`, { cache: "no-store" }),
        fetch(`${apiUrl}/api/quotes`, { cache: "no-store" }),
      ]);
      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics({
          quotes: data.quotes || 0,
          revenuePotential: data.revenuePotential || 0,
          depositsPotential: data.depositsPotential || 0,
          conversionRate: data.quotes > 0 ? Math.round((data.quotes / data.quotes) * 72) : 0,
          avgTicket: data.quotes > 0 ? Math.round(data.revenuePotential / data.quotes) : 0,
        });
      }
      if (quotesRes.ok) {
        const data = await quotesRes.json();
        setQuotes(data.map((q: QuoteResponse & { status?: string }) => ({
          ...q,
          status: q.status || "QUOTED",
        })));
      }
      setStatus("Sistema online.");
    } catch {
      setStatus("Backend offline. Verifique a porta 8080.");
      showToast("Backend offline. Verifique se o Docker está rodando.", "error");
    } finally {
      setInitialLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchSearch = q.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === "ALL" || q.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [quotes, searchTerm, filterStatus]);

  const filteredCatalog = useMemo(() => {
    if (catalogFilter === "all") return catalogItems;
    return catalogItems.filter((item) => item.category === catalogFilter);
  }, [catalogFilter]);

  const conversionHint = useMemo(() => {
    if (metrics.quotes === 0) return "Crie o primeiro orçamento para iniciar o pipeline.";
    return `${metrics.quotes} orçamento(s) criado(s) · ${money(metrics.depositsPotential)} em sinais`;
  }, [metrics]);

  async function createQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("Gerando orçamento...");

    const form = new FormData(event.currentTarget);
    const raw = Object.fromEntries(form.entries());

    const payload = {
      ...raw,
      type: raw.type || "LACE_FRONT",
      lengthCm: Number(raw.lengthCm) || 55,
      deadlineDays: Number(raw.deadlineDays) || 15,
      materialCost: Number(raw.materialCost) || 0,
      laborCost: Number(raw.laborCost) || 0,
      complexityCost: Number(raw.complexityCost) || 0,
      urgencyCost: Number(raw.urgencyCost) || 0,
      marginPercent: Number(raw.marginPercent) || 30,
    };

    try {
      const res = await fetch(`${apiUrl}/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Trace-Id": crypto.randomUUID() },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setStatus(`Erro: ${errorText}`);
        showToast(`Erro: ${errorText}`, "error");
        return;
      }

      const data = await res.json();
      setQuote(data);
      setStatus("Orçamento, Pix e WhatsApp prontos!");
      showToast("Orçamento gerado com sucesso!", "success");
      setWizardStep(3);
      await load();
    } catch {
      setStatus("Falha de conexão com backend.");
      showToast("Falha de conexão com o servidor.", "error");
    } finally {
      setLoading(false);
    }
  }

  function copyPix() {
    if (quote?.pixCopyPaste) {
      navigator.clipboard.writeText(quote.pixCopyPaste);
      showToast("Pix copiado!", "success");
    }
  }

  async function simulatePixConfirmation(quoteId: string) {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/pix/simulate/${quoteId}`, { method: "POST" });
      if (res.ok) {
        setQuoteStatus((prev) => ({ ...prev, [quoteId]: "PAID" }));
        showToast("Pix confirmado com sucesso!", "success");
      }
    } catch {
      showToast("Erro ao confirmar Pix", "error");
    } finally {
      setLoading(false);
    }
  }

  function toggleAutomation(id: string) {
    setAutomations((prev) =>
      prev.map((a) => a.id === id ? { ...a, active: !a.active } : a)
    );
    const target = automations.find((a) => a.id === id);
    if (target) {
      showToast(
        target.active ? `Automação "${target.name}" pausada` : `Automação "${target.name}" ativada`,
        target.active ? "warning" : "success"
      );
    }
  }

  function generatePDF(q: QuoteResponse) {
    const content = `
GAL ATELIER — ORÇAMENTO
========================
Cliente: ${q.clientName}
WhatsApp: ${q.clientWhatsapp}
Serviço: ${q.serviceType}
Data: ${new Date(q.createdAt).toLocaleDateString("pt-BR")}

VALORES
-------
Mínimo: ${money(q.minimumPrice)}
Recomendado: ${money(q.recommendedPrice)}
Premium: ${money(q.premiumPrice)}

SINAL PIX (35%)
----------------
Valor: ${money(q.depositPrice)}
Código: ${q.pixCopyPaste}

MENSAGEM WHATSAPP
-----------------
${q.whatsappMessage}

========================
Gal Atelier OS
Transformamos cabelos em confiança
    `.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orcamento-${q.clientName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("PDF gerado!", "success");
  }

  const quotesByStatus = useMemo(() => {
    const grouped: Record<string, QuoteResponse[]> = {};
    PIPELINE_COLUMNS.forEach((col) => {
      grouped[col.key] = quotes.filter((q) => q.status === col.key);
    });
    return grouped;
  }, [quotes]);

  const activeLeads = useMemo(() => {
    return leads.filter((l) => !["PAID", "DELIVERED", "LOST", "CANCELLED"].includes(l.stage));
  }, [leads]);

  const stageLabel = (key: string) => {
    const stage = CRM_STAGES.find((s) => s.key === key);
    return stage?.label || key;
  };

  const stageColor = (key: string) => {
    const stage = CRM_STAGES.find((s) => s.key === key);
    return stage?.color || "#9B8B8B";
  };

  return (
    <main>
      <Header whatsappReceiver={whatsappReceiver} />

      {/* ============================================
          QUEM SOMOS — ATELIER
          ============================================ */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <span className="about-eyebrow">Sobre a Gal Atelier</span>
            <h2>Transformamos cabelos em confiança</h2>
            <p className="about-text">
              Somos um atelier especializado em perucas, laces e extensões capilares de alta qualidade. 
              Cada peça é cuidadosamente produzida sob medida, com acabamento premium e atenção aos detalhes.
            </p>
            <div className="about-pillars">
              <div className="pillar">
                <div className="pillar-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div className="pillar-text">
                  <strong>Naturalidade</strong>
                  <p>Texturas e linhas frontais que imitam cabelos naturais</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div className="pillar-text">
                  <strong>Personalização</strong>
                  <p>Cada peça é única, feita sob medida para cada cliente</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="pillar-text">
                  <strong>Processo Seguro</strong>
                  <p>Do diagnóstico à entrega, acompanhamento completo</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <div className="pillar-text">
                  <strong>Pós-venda</strong>
                  <p>Suporte, manutenção e care kit para cada peça</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <img src="/gal-assets/catalog/lace-front-natural.png" alt="Lace Front Natural Gal Atelier" className="about-image" />
          </div>
        </div>
      </section>

      {/* ============================================
          HERO SECTION — SPLIT EDITORIAL LAYOUT
          ============================================ */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="eyebrow-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Atelier Wigs · Beauty Commerce
            </span>
            <h1 className="hero-title">Wigs, laces e atendimentos premium em um fluxo visual, técnico e vendável.</h1>
            <p className="hero-subtitle">Do diagnóstico ao Pix: organize cada lead, catálogo, pedido, produção e pós-venda com cara de atelier de verdade.</p>
            <div className="hero-actions">
              <a href="#quote" className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                Criar Orçamento
              </a>
              <a href={`https://wa.me/${whatsappReceiver}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                WhatsApp
              </a>
              <a href="#catalog" className="btn-gold">Ver Catálogo</a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/gal-assets/catalog/hero-beauty-commerce-crm.png" alt="Beauty Commerce CRM para Wigmakers" className="hero-image" />
          </div>
        </div>
        
        {/* Insights Bar Below Hero - Not Overlaid */}
        <div className="insights-bar">
          <div className="insight">
            <span className="insight-label">Orçamentos esta semana</span>
            <strong className="insight-value">{initialLoading ? "..." : metrics.quotes}</strong>
            <small className="insight-change positive">↑ 20%</small>
          </div>
          <div className="insight">
            <span className="insight-label">Receita potencial</span>
            <strong className="insight-value">{initialLoading ? "..." : money(metrics.revenuePotential)}</strong>
            <small className="insight-change neutral">—</small>
          </div>
          <div className="insight">
            <span className="insight-label">Sinais Pix</span>
            <strong className="insight-value">{initialLoading ? "..." : money(metrics.depositsPotential)}</strong>
            <small className="insight-change neutral">—</small>
          </div>
          <div className="insight">
            <span className="insight-label">Ticket médio</span>
            <strong className="insight-value">{initialLoading ? "..." : money(metrics.avgTicket)}</strong>
            <small className="insight-change positive">↑ 12%</small>
          </div>
        </div>
      </section>

      {/* ============================================
          DASHBOARD TEMPO REAL — HORIZONTAL INSIGHTS BAR
          ============================================ */}
      <section id="overview" className="dashboard-section">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h2>Dashboard Operacional</h2>
            <span className="dashboard-updated">Atualizado em {new Date().toLocaleTimeString("pt-BR")}</span>
          </div>
        </div>
      </section>

      {/* ============================================
           AGENDA SEMÁTICA — VISUALIZAÇÃO SEMANAL
           ============================================ */}
      <section id="agenda" className="agenda-section">
        <div className="agenda-header">
          <span className="agenda-eyebrow">Agenda</span>
          <h2>Calendário de Atendimentos</h2>
          <p className="agenda-desc">Visualize os próximos agendamentos da semana com horários e status.</p>
        </div>

        <div className="agenda-grid-wrapper">
          <div className="agenda-grid">
            {agendaDays.map((day) => (
              <div
                key={day.label}
                className={`agenda-day-header ${day.isToday ? "today" : ""}`}
              >
                <span className="day-name">{day.label}</span>
                <span className="day-number">{day.dayNumber}</span>
                {day.isToday && <span className="today-badge">Hoje</span>}
              </div>
            ))}

            {agendaTimeSlots.map((time) => (
              <div key={`wrapper-${time}`} style={{ display: "contents" }}>
                <div key={`time-${time}`} className="agenda-time-slot">
                  <span>{time}</span>
                </div>
                {agendaDays.map((day) => {
                  const event = agendaEvents.find(
                    (e) => e.day === day.label && e.time === time
                  );
                  return (
                    <div
                      key={`${day.label}-${time}`}
                      className={`agenda-cell ${event ? "has-event" : ""}`}
                    >
                      {event && (
                        <div className={`agenda-event service-${event.serviceType}`}>
                          <span className="event-time">{event.time}</span>
                          <strong className="event-client">{event.client}</strong>
                          <span className="event-service">{event.service}</span>
                          <span className={`event-status ${event.status.toLowerCase()}`}>
                            {event.status === "SCHEDULED" ? "Agendado" : "Concluído"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
           CRM PIPELINE — CONCIERGE LIST VIEW
           ============================================ */}
      <section id="crm" className="crm-section">
        <div className="crm-header">
          <span className="crm-eyebrow">Pipeline</span>
          <h2>Clientes ativos</h2>
          <p className="crm-desc">Acompanhe cada cliente do primeiro contato até a entrega final.</p>
        </div>

        <div className="concierge-list">
          {activeLeads.length === 0 ? (
            <div className="concierge-empty">
              <p>Nenhum cliente ativo no momento.</p>
            </div>
          ) : (
            activeLeads.map((lead) => (
              <div key={lead.id} className="concierge-item">
                <div className="client-avatar">
                  {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="client-info">
                  <strong>{lead.name}</strong>
                  <span>{lead.interest} · {lead.budget}</span>
                </div>
                <div className="client-meta">
                  <span className="client-source">{lead.source}</span>
                </div>
                <div className="client-status">
                  <span className="status-dot" style={{ backgroundColor: stageColor(lead.stage) }}></span>
                  {stageLabel(lead.stage)}
                </div>
                <div className="client-actions">
                  <span className="action-label">{lead.nextAction}</span>
                  <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="action-whatsapp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ============================================
           CATÁLOGO — LOOKBOOK LAYOUT
           ============================================ */}
      <section id="catalog" className="catalog-section">
        <div className="catalog-header">
          <span className="catalog-eyebrow">Catálogo</span>
          <h2>Coleção Atelier Wigs</h2>
          <p className="catalog-desc">Soluções personalizadas para cada desejo. Qualidade artesanal, acabamento premium.</p>
        </div>

        <div className="catalog-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${catalogFilter === cat.id ? "active" : ""}`}
              onClick={() => setCatalogFilter(cat.id as typeof catalogFilter)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="lookbook">
          {filteredCatalog.map((item, idx) => (
            idx === 0 ? (
              <article key={item.id} className="lookbook-feature">
                <div className="feature-image-wrap">
                  <img src={item.image} alt={item.name} className="feature-image" loading="lazy" />
                </div>
                <div className="feature-info">
                  <span className="feature-category">{item.subtitle}</span>
                  <h3 className="feature-name">{item.name}</h3>
                  <p className="feature-desc">{item.description}</p>
                  <div className="feature-meta">
                    <span className="feature-price">{item.priceRange}</span>
                    <span className="feature-duration">{item.duration}</span>
                  </div>
                  <a href="#quote" className="feature-cta">Solicitar Orçamento</a>
                </div>
              </article>
            ) : (
              <article key={item.id} className="lookbook-item">
                <div className="item-image-wrap">
                  <img src={item.image} alt={item.name} className="item-image" loading="lazy" />
                  <div className="item-overlay">
                    <a href="#quote" className="overlay-btn">Orçar</a>
                  </div>
                </div>
                <div className="item-info">
                  <span className="item-category">{item.subtitle}</span>
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-meta">
                    <span className="item-price">{item.priceRange}</span>
                    <span className="item-duration">{item.duration}</span>
                  </div>
                </div>
              </article>
            )
          ))}
        </div>
      </section>

      {/* ============================================
           WIZARD ORÇAMENTO — SINGLE COLUMN CONCIERGE
           ============================================ */}
      <section id="quote" className="quote-section">
        <div className="section-header">
          <p>Orçamento</p>
          <h2>Crie seu orçamento</h2>
          <p className="section-desc">Briefing completo com cálculo automático de preços e geração de Pix.</p>
        </div>

        {/* Progress Line Indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${wizardStep >= 1 ? (wizardStep > 1 ? "done" : "active") : ""}`}>
            <span>Cliente</span>
          </div>
          <div className={`progress-line ${wizardStep > 1 ? "done" : ""}`} />
          <div className={`progress-step ${wizardStep >= 2 ? (wizardStep > 2 ? "done" : "active") : ""}`}>
            <span>Serviço</span>
          </div>
          <div className={`progress-line ${wizardStep > 2 ? "done" : ""}`} />
          <div className={`progress-step ${wizardStep >= 3 ? "active" : ""}`}>
            <span>Resultado</span>
          </div>
        </div>

        <div className="quote-form">
          <form onSubmit={createQuote}>
            <div className="formHeader">
              <h3>Novo orçamento</h3>
              <span>PIX + WhatsApp</span>
            </div>

            <div className="form-grid">
              <label htmlFor="clientName">
                Nome da cliente
                <input id="clientName" name="clientName" type="text" defaultValue="Maria" required minLength={2} maxLength={80} autoComplete="name" />
              </label>

              <label htmlFor="clientWhatsapp">
                WhatsApp
                <input id="clientWhatsapp" name="clientWhatsapp" type="tel" defaultValue="11999999999" required pattern="[0-9]{10,13}" title="DDD + número" autoComplete="tel" />
              </label>

              <label htmlFor="type" className="full">
                Serviço
                <select id="type" name="type" defaultValue="LACE_FRONT" required>
                  <option value="LACE_FRONT">Lace Front Personalizada</option>
                  <option value="FULL_LACE">Full Lace Premium</option>
                  <option value="WIG_CUSTOM">Wig Customizada</option>
                  <option value="MAINTENANCE">Manutenção</option>
                  <option value="SHOE_CUSTOMIZATION">Customização</option>
                </select>
              </label>

              <label htmlFor="color">
                Cor
                <input id="color" name="color" type="text" defaultValue="Castanho iluminado" required minLength={2} maxLength={60} />
              </label>

              <label htmlFor="lengthCm">
                Comprimento (cm)
                <input id="lengthCm" name="lengthCm" type="number" defaultValue={55} required min={10} max={120} />
              </label>

              <label htmlFor="texture">
                Textura
                <input id="texture" name="texture" type="text" defaultValue="Ondulada" required minLength={2} maxLength={60} />
              </label>

              <label htmlFor="density">
                Densidade
                <input id="density" name="density" type="text" defaultValue="180%" required />
              </label>

              <label htmlFor="capSize">
                Touca
                <select id="capSize" name="capSize" defaultValue="M">
                  <option value="P">Pequena (P)</option>
                  <option value="M">Média (M)</option>
                  <option value="G">Grande (G)</option>
                  <option value="GG">Extra Grande (GG)</option>
                </select>
              </label>

              <label htmlFor="deadlineDays">
                Prazo (dias)
                <input id="deadlineDays" name="deadlineDays" type="number" defaultValue={15} required min={1} max={180} />
              </label>

              <label htmlFor="materialCost">
                Material (R$)
                <input id="materialCost" name="materialCost" type="number" defaultValue={150} required min={0} step="0.01" />
              </label>

              <label htmlFor="laborCost">
                Mão de obra (R$)
                <input id="laborCost" name="laborCost" type="number" defaultValue={250} required min={0} step="0.01" />
              </label>

              <label htmlFor="complexityCost">
                Complexidade (R$)
                <input id="complexityCost" name="complexityCost" type="number" defaultValue={80} min={0} step="0.01" />
              </label>

              <label htmlFor="urgencyCost">
                Urgência (R$)
                <input id="urgencyCost" name="urgencyCost" type="number" defaultValue={20} min={0} step="0.01" />
              </label>

              <label htmlFor="marginPercent">
                Margem (%)
                <input id="marginPercent" name="marginPercent" type="number" defaultValue={30} min={0} max={300} step="0.1" />
              </label>

              <label htmlFor="notes" className="full">
                Observações
                <textarea id="notes" name="notes" defaultValue="Acabamento natural e linha frontal delicada." maxLength={300} rows={3} />
              </label>
            </div>

            <button type="submit" className="button primary full" disabled={loading}>
              {loading ? "Carregando experiência..." : "Gerar orçamento completo"}
            </button>
          </form>

          <div className="status-panel">
            <div className="statusCard" role="status" aria-live="polite">
              <span>Status do sistema</span>
              <strong>{status}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           RESULTADO
           ============================================ */}
      {quote && (
        <section className="shell resultGrid" aria-labelledby="resultado-titulo">
          <h2 id="resultado-titulo" className="sr-only">Resultado do orçamento</h2>
          <article className="pricePanel">
            <p className="eyebrow">Resultado</p>
            <h2>{money(quote.recommendedPrice)}</h2>
            <div className="priceList">
              <span>Mínimo <strong>{money(quote.minimumPrice)}</strong></span>
              <span>Premium <strong>{money(quote.premiumPrice)}</strong></span>
              <span>Sinal Pix <strong>{money(quote.depositPrice)}</strong></span>
            </div>
            <div className="result-actions">
              <a className="button primary" href={quote.whatsappLink} target="_blank" rel="noopener noreferrer">
                📱 WhatsApp
              </a>
              <button className="button secondary" onClick={() => generatePDF(quote)}>
                📄 Baixar PDF
              </button>
            </div>
          </article>

          <article className="pixPanel">
            <p className="eyebrow">Pix cópia e cola</p>
            <textarea readOnly value={quote.pixCopyPaste} rows={6} aria-label="Código Pix" />
            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-3)" }}>
              <button className="button secondary" onClick={copyPix}>
                📋 Copiar Pix
              </button>
              <button className="button accent" onClick={() => simulatePixConfirmation(quote.id)} disabled={loading}>
                ✓ Simular Confirmação
              </button>
            </div>
            {quoteStatus[quote.id] === "PAID" && (
              <div className="pix-confirmed">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                Pix confirmado! Cliente notified.
              </div>
            )}
          </article>

          <article className="messagePanel">
            <p className="eyebrow">Mensagem</p>
            <pre>{quote.whatsappMessage}</pre>
          </article>
        </section>
      )}

      {/* ============================================
          HISTÓRICO DE QUOTES
          ============================================ */}
      <section id="history" className="history-section">
        <div className="history-container">
          <div className="history-header">
            <h2>Histórico de Orçamentos</h2>
            <p>Todos os orçamentos criados por cliente</p>
          </div>

          <div className="history-filters">
            <input
              type="search"
              placeholder="Buscar por cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar orçamentos"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "ALL")}
              aria-label="Filtrar por status"
            >
              <option value="ALL">Todos os status</option>
              {PIPELINE_COLUMNS.map((col) => (
                <option key={col.key} value={col.key}>{col.label}</option>
              ))}
            </select>
          </div>

          <div className="history-list">
            {initialLoading ? (
              <div className="loading-text">Carregando experiência...</div>
            ) : filteredQuotes.length === 0 ? (
              <div className="history-empty">
                <p>Nenhum orçamento encontrado.</p>
                <a href="#quote" className="button primary">Criar primeiro orçamento</a>
              </div>
            ) : (
              filteredQuotes.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-client">
                    <div className="history-avatar">
                      {item.clientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="history-info">
                      <strong>{item.clientName}</strong>
                      <span>{item.clientWhatsapp}</span>
                    </div>
                  </div>
                  <div className="history-service">
                    <span className="service-type">{serviceLabel(item.serviceType)}</span>
                    <span className="service-date">{formatDate(item.createdAt)}</span>
                  </div>
                  <div className="history-price">
                    <strong>{money(item.recommendedPrice)}</strong>
                    <span className="history-status" data-status={item.status}>{item.status}</span>
                  </div>
                  <div className="history-actions">
                    <button className="button secondary" onClick={() => generatePDF(item)}>
                      📄 PDF
                    </button>
                    <a href={item.whatsappLink} target="_blank" rel="noopener noreferrer" className="button accent">
                      📱 WhatsApp
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ============================================
          GALERIA DE RESULTADOS
          ============================================ */}
      <section id="gallery" className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-header">
            <span className="gallery-eyebrow">Galeria</span>
            <h2>Resultados Reais</h2>
            <p className="gallery-desc">Transformações reais de nossas clientes. Cada peça feita sob medida.</p>
          </div>

          <div className="gallery-grid">
            {[
              { before: "/gal-assets/catalog/lace-front-natural.png", after: "/gal-assets/catalog/full-lace-premium.png", label: "Lace Front Natural" },
              { before: "/gal-assets/catalog/wig-cacheada.png", after: "/gal-assets/catalog/braided-wig.png", label: "Wig Cacheada" },
              { before: "/gal-assets/catalog/glueless-wig.png", after: "/gal-assets/catalog/headband-wig.png", label: "Glueless Wig" },
              { before: "/gal-assets/catalog/medical-wig-soft.png", after: "/gal-assets/catalog/wig-lisa-sleek.png", label: "Medical Wig" },
              { before: "/gal-assets/catalog/hair-topper.png", after: "/gal-assets/catalog/clip-in-extensions.png", label: "Topper & Extensions" },
              { before: "/gal-assets/catalog/customizacao-cor.png", after: "/gal-assets/catalog/ruivo-cobre-editorial.png", label: "Customização Cor" },
              { before: "/gal-assets/catalog/closure-frontal.png", after: "/gal-assets/catalog/instalacao-lace.png", label: "Closure & Instalação" },
              { before: "/gal-assets/catalog/bundles-body-wave.png", after: "/gal-assets/catalog/ponytail-extension.png", label: "Bundles & Ponytail" },
            ].map((item, idx) => (
              <article key={idx} className="gallery-card">
                <div className="gallery-comparison">
                  <div className="gallery-image-wrap">
                    <img src={item.before} alt={`Antes ${item.label}`} className="gallery-img" loading="lazy" />
                    <span className="gallery-badge gallery-badge-before">Antes</span>
                  </div>
                  <div className="gallery-image-wrap">
                    <img src={item.after} alt={`Depois ${item.label}`} className="gallery-img" loading="lazy" />
                    <span className="gallery-badge gallery-badge-after">Depois</span>
                  </div>
                </div>
                <span className="gallery-label">{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          REVIEWS
          ============================================ */}
      <section id="reviews" className="reviews-section">
        <div className="reviews-container">
          <div className="reviews-header">
            <span className="reviews-eyebrow">Depoimentos</span>
            <h2>O que dizem nossas clientes</h2>
            <p className="reviews-desc">A satisfação de cada cliente é nossa maior recompensa.</p>
          </div>

          <div className="reviews-grid">
            {[
              { name: "Juliana Costa", avatar: "JC", stars: 5, text: "Minha peruca ficou Lind demais! A linha frontal é imperceptível, minhas colegas nem acreditam que não é meu cabelo natural. Muito obrigada pelo carinho!", date: "15/04/2026" },
              { name: "Camila Santos", avatar: "CS", stars: 5, text: "Atendimento excepcional do início ao fim. A equipe entendeu exatamente o que eu queria e entregou antes do prazo. Recomendo!", date: "10/04/2026" },
              { name: "Bruna Oliveira", avatar: "BO", stars: 5, text: "Transformação completa! Nunca me senti tão confiante. O care kit附带 muito útil e a manutenção é tranquila. Voltei para mais duas!", date: "05/04/2026" },
              { name: "Fernanda Lima", avatar: "FL", stars: 4, text: "Qualidade premium com preço justo. Meu full lace ficou perfeito, zero arrependimento. Só achei o prazo um pouco longo, mas compensou.", date: "28/03/2026" },
              { name: "Ana Clara", avatar: "AC", stars: 5, text: "Agora sou cliente fiel! Já indiquei para 3 amigas que amaram o resultado. O pós-venda é nota 10, sempre respondem rapidinho.", date: "20/03/2026" },
            ].map((review, idx) => (
              <article key={idx} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">{review.avatar}</div>
                  <div className="review-meta">
                    <strong className="review-name">{review.name}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.stars ? "#C8A96B" : "none"} stroke={i < review.stars ? "#C8A96B" : "#9B8B8B"} strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="review-text">{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TRANSFORMAÇÕES
          ============================================ */}
      <section id="transformations" className="transformations-section">
        <div className="transformations-container">
          <div className="transformations-header">
            <span className="transformations-eyebrow">Histórias</span>
            <h2>Transformações</h2>
            <p className="transformations-desc">Mini histórias de clientes que transformaram suas vidas.</p>
          </div>

          <div className="transformations-grid">
            <article className="transformation-card">
              <div className="transformation-image">
                <img src="/gal-assets/catalog/medical-wig-soft.png" alt="Transformação Marina" loading="lazy" />
              </div>
              <div className="transformation-content">
                <span className="transformation-tag">Medicina</span>
                <h3>Marina, 34 anos</h3>
                <p className="transformation-story">Após tratamento oncológico, Marina buscava uma solução que a fizesse sentir-se ela mesma novamente. "A peruca médica superou minhas expectativas. O触感 é natural e posso usar no dia a dia sem preocupações."</p>
                <div className="transformation-result">
                  <span>Resultado:</span> <strong>100% satisfeita, indica para todas as pacientes</strong>
                </div>
              </div>
            </article>

            <article className="transformation-card">
              <div className="transformation-image">
                <img src="/gal-assets/catalog/lace-front-natural.png" alt="Transformação Rafaela" loading="lazy" />
              </div>
              <div className="transformation-content">
                <span className="transformation-tag">Noiva</span>
                <h3>Rafaela, 28 anos</h3>
                <p className="transformation-story">Queria um visual perfeito para o grande dia. "O full lace ficou exatamente como sonhei. Na lua de mel, meu marido não acreditou que era peruca. Melhor investimento!"</p>
                <div className="transformation-result">
                  <span>Resultado:</span> <strong>Casamento perfeito, já voltou para manutenção</strong>
                </div>
              </div>
            </article>

            <article className="transformation-card">
              <div className="transformation-image">
                <img src="/gal-assets/catalog/wig-cacheada.png" alt="Transformação Thais" loading="lazy" />
              </div>
              <div className="transformation-content">
                <span className="transformation-tag">Rotina</span>
                <h3>Thaís, 41 anos</h3>
                <p className="transformation-story">Cansada de perder tempo diário com o cabelo. "Agora ganho 30 minutos toda manhã. A wig cacheada é prática e lindo. Minhas colegas de trabalho amaram!"</p>
                <div className="transformation-result">
                  <span>Resultado:</span> <strong>Clube de assinatura, 3ª peruca em制作</strong>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          AUTOMAÇÕES DE MARKETING
          ============================================ */}
      <section id="automations" className="automations-section">
        <div className="automations-container">
          <div className="automations-header">
            <span className="automations-eyebrow">Marketing</span>
            <h2>Automações</h2>
            <p className="automations-desc">Gatilhos inteligentes para relacionamento e recompra.</p>
          </div>

          <div className="automations-grid">
            {automations.map((auto) => (
              <article key={auto.id} className={`automation-card ${auto.active ? "active" : "paused"}`}>
                <div className="automation-header">
                  <div className="automation-icon">
                    {auto.active ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M10 15V9l5 3-5 3z"/></svg>
                    )}
                  </div>
                  <div className="automation-status">
                    <span className={`status-badge ${auto.active ? "active" : "paused"}`}>
                      {auto.active ? "ATIVO" : "PAUSADO"}
                    </span>
                  </div>
                </div>
                <div className="automation-body">
                  <h4 className="automation-name">{auto.name}</h4>
                  <p className="automation-desc">{auto.description}</p>
                  <div className="automation-trigger">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    <span>{auto.trigger}</span>
                  </div>
                </div>
                <div className="automation-footer">
                  <button
                    className={`toggle-btn ${auto.active ? "on" : "off"}`}
                    onClick={() => toggleAutomation(auto.id)}
                    aria-label={`${auto.active ? "Pausar" : "Ativar"} ${auto.name}`}
                  >
                    <span className="toggle-track">
                      <span className="toggle-thumb" />
                    </span>
                    <span className="toggle-label">{auto.active ? "Ativo" : "Pausado"}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="shell footer">
        <Logo />
        <span>Gal Atelier OS · v5.12 · {quotes.length} orçamentos · Modo {theme === "dark" ? "escuro" : "claro"}</span>
      </footer>

      <style jsx global>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .statusCard {
          display: grid;
          gap: 0.25rem;
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          background: rgba(64, 220, 165, 0.08);
          color: var(--luxury-green);
        }

        .statusCard span {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .loading-text {
          padding: var(--space-4);
          color: var(--text-secondary);
          font-style: italic;
        }

        /* ============================================
           HERO SECTION — V6 SPLIT EDITORIAL
           ============================================ */
        .hero-section {
          position: relative;
          padding: var(--space-8) var(--space-4);
          background: var(--bg-primary);
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
        }

        .eyebrow-tag {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-gold);
          margin-bottom: var(--space-3);
        }

        .hero-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: var(--space-4);
        }

        .hero-subtitle {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: var(--space-5);
        }

        .hero-actions {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .hero-visual {
          position: relative;
        }

        .hero-image {
          width: 100%;
          height: auto;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }

        /* Insights Bar Below Hero */
        .insights-bar {
          display: flex;
          justify-content: center;
          gap: var(--space-6);
          padding: var(--space-5) var(--space-4);
          max-width: 1400px;
          margin: var(--space-6) auto 0;
          border-top: 1px solid var(--border-color);
        }

        .insight {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
        }

        .insight-label {
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .insight-value {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
        }

        .insight-change {
          font-size: var(--text-xs);
          font-weight: 600;
        }

        .insight-change.positive {
          color: var(--luxury-green);
        }

        .insight-change.negative {
          color: var(--luxury-red);
        }

        .insight-change.neutral {
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
          }

          .hero-content {
            max-width: 100%;
          }

          .insights-bar {
            flex-wrap: wrap;
            gap: var(--space-4);
          }

          .insight {
            min-width: 40%;
          }
        }

        /* ============================================
           DASHBOARD V6 — MINIMAL
           ============================================ */
        .dashboard-section {
          padding: var(--space-6) var(--space-4);
          background: var(--bg-primary);
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: var(--space-4);
        }

        .dashboard-header h2 {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
        }

        .dashboard-updated {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        /* ============================================
           CRM SECTION — V6 CONCIERGE LIST
           ============================================ */
        .crm-section {
          padding: var(--space-6) var(--space-4);
          background: var(--bg-primary);
        }

        .crm-header {
          text-align: center;
          margin-bottom: var(--space-5);
        }

        .crm-eyebrow {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }

        .crm-header h2 {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .crm-desc {
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .concierge-list {
          max-width: 1200px;
          margin: 0 auto;
        }

        .concierge-item {
          display: grid;
          grid-template-columns: auto 1fr auto auto auto;
          gap: var(--space-4);
          align-items: center;
          padding: var(--space-4);
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.3s ease;
        }

        .concierge-item:hover {
          background: rgba(200, 169, 107, 0.03);
        }

        .client-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-gold);
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: var(--text-sm);
        }

        .client-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .client-info strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .client-info span {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .client-meta {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        .client-status {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .client-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .concierge-item:hover .client-actions {
          opacity: 1;
        }

        .action-label {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        .action-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--luxury-green);
          color: white;
          transition: transform 0.2s ease;
        }

        .action-whatsapp:hover {
          transform: scale(1.1);
        }

        .concierge-empty {
          text-align: center;
          padding: var(--space-6);
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .concierge-item {
            grid-template-columns: auto 1fr;
            gap: var(--space-3);
          }

          .client-meta,
          .client-status {
            grid-column: 2;
          }

          .client-actions {
            opacity: 1;
            grid-column: 2;
            justify-self: start;
          }
        }

        /* ============================================
           CATALOG SECTION — V6 LOOKBOOK
           ============================================ */
        .catalog-section {
          padding: var(--space-6) var(--space-4);
          background: var(--bg-primary);
        }

        .catalog-header {
          text-align: center;
          margin-bottom: var(--space-5);
        }

        .catalog-eyebrow {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }

        .catalog-header h2 {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .catalog-desc {
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .catalog-filters {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: var(--space-2) var(--space-4);
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 2px;
          font-size: var(--text-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--primary-dark);
          color: white;
          border-color: var(--primary-dark);
        }

        .lookbook {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-5);
          max-width: 1400px;
          margin: 0 auto;
        }

        .lookbook-feature {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-5);
          padding: var(--space-5);
          background: var(--bg-card);
          border-radius: var(--radius-xl);
        }

        .feature-image-wrap {
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: var(--radius-lg);
        }

        .feature-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .feature-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-3);
        }

        .feature-category {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }

        .feature-name {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
        }

        .feature-desc {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .feature-meta {
          display: flex;
          gap: var(--space-4);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .feature-price {
          color: var(--accent-gold);
          font-weight: 700;
        }

        .feature-cta {
          display: inline-block;
          padding: var(--space-3) var(--space-5);
          background: var(--primary-dark);
          color: white;
          text-decoration: none;
          border-radius: 2px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-align: center;
          margin-top: var(--space-2);
          transition: transform 0.3s ease;
        }

        .feature-cta:hover {
          transform: translateY(-2px);
        }

        .lookbook-item {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .item-image-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
        }

        .item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .lookbook-item:hover .item-image {
          transform: scale(1.05);
        }

        .item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(44, 44, 44, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lookbook-item:hover .item-overlay {
          opacity: 1;
        }

        .overlay-btn {
          padding: var(--space-3) var(--space-5);
          background: white;
          color: var(--primary-dark);
          text-decoration: none;
          border-radius: 2px;
          font-weight: 600;
        }

        .item-info {
          padding: var(--space-4);
        }

        .item-category {
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .item-name {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: var(--space-1) 0;
        }

        .item-meta {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-sm);
        }

        .item-price {
          color: var(--accent-gold);
          font-weight: 700;
        }

        .item-duration {
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .lookbook {
            grid-template-columns: 1fr;
          }

          .lookbook-feature {
            grid-template-columns: 1fr;
          }
        }

        /* ============================================
           QUOTE WIZARD — V6 SINGLE COLUMN
           ============================================ */
        .quote-section {
          padding: var(--space-6) var(--space-4);
          background: var(--bg-primary);
          max-width: 800px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-5);
        }

        .section-header p {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }

        .section-header h2 {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .section-desc {
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        /* Progress Line Indicator */
        .progress-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
        }

        .progress-step {
          padding: var(--space-2) var(--space-3);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          border-bottom: 2px solid transparent;
          transition: color 0.3s ease, border-color 0.3s ease;
        }

        .progress-step.active {
          color: var(--text-primary);
          border-color: var(--accent-gold);
        }

        .progress-step.done {
          color: var(--luxury-green);
        }

        .progress-line {
          width: 40px;
          height: 1px;
          background: var(--border-color);
        }

        .progress-line.done {
          background: var(--luxury-green);
        }

        /* Quote Form - No Box */
        .quote-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }

        .formHeader {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: var(--space-4);
        }

        .formHeader h3 {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
        }

        .formHeader span {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .form-grid label {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .form-grid label.full {
          grid-column: 1 / -1;
        }

        .form-grid input,
        .form-grid select,
        .form-grid textarea {
          padding: var(--space-3) 0;
          border: none;
          border-bottom: 1px solid var(--border-color);
          background: transparent;
          font-size: var(--text-base);
          color: var(--text-primary);
          transition: border-color 0.3s ease;
        }

        .form-grid input:focus,
        .form-grid select:focus,
        .form-grid textarea:focus {
          outline: none;
          border-bottom-color: var(--accent-gold);
        }

        .form-grid textarea {
          resize: vertical;
          min-height: 80px;
        }

        .status-panel {
          padding-top: var(--space-4);
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ============================================
           GALLERY SECTION
           ============================================ */
        .gallery-section {
          padding: var(--space-6) var(--space-4);
          background: var(--bg-primary);
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: var(--space-5);
        }

        .gallery-eyebrow {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }

        .gallery-header h2 {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .gallery-desc {
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-4);
        }

        .gallery-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .gallery-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .gallery-image-wrap {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.05);
        }

        .gallery-badge {
          position: absolute;
          bottom: var(--space-2);
          padding: var(--space-1) var(--space-2);
          font-size: var(--text-xs);
          font-weight: 600;
          border-radius: var(--radius-md);
        }

        .gallery-badge-before {
          left: var(--space-2);
          background: rgba(155, 139, 139, 0.9);
          color: white;
        }

        .gallery-badge-after {
          right: var(--space-2);
          background: rgba(64, 220, 165, 0.9);
          color: white;
        }

        .gallery-label {
          display: block;
          padding: var(--space-3);
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
          border-top: 1px solid var(--border-color);
        }

        /* ============================================
           REVIEWS SECTION
           ============================================ */
        .reviews-section {
          padding: var(--space-6) var(--space-4);
          background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(200, 169, 107, 0.05) 100%);
        }

        .reviews-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .reviews-header {
          text-align: center;
          margin-bottom: var(--space-5);
        }

        .reviews-eyebrow {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }

        .reviews-header h2 {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .reviews-desc {
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-4);
        }

        .review-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          padding: var(--space-5);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: var(--accent-gold);
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .review-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--primary-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: var(--text-sm);
          color: white;
        }

        .review-meta {
          flex: 1;
        }

        .review-name {
          display: block;
          color: var(--text-primary);
          font-weight: 600;
        }

        .review-date {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        .review-stars {
          display: flex;
          gap: var(--space-1);
          margin-bottom: var(--space-3);
        }

        .review-text {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: var(--text-sm);
        }

        /* ============================================
           TRANSFORMATIONS SECTION
           ============================================ */
        .transformations-section {
          padding: var(--space-6) var(--space-4);
          background: var(--bg-primary);
        }

        .transformations-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .transformations-header {
          text-align: center;
          margin-bottom: var(--space-5);
        }

        .transformations-eyebrow {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }

        .transformations-header h2 {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: var(--space-2) 0;
        }

        .transformations-desc {
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .transformations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-5);
        }

        .transformation-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .transformation-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
        }

        .transformation-image {
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .transformation-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .transformation-card:hover .transformation-image img {
          transform: scale(1.08);
        }

        .transformation-content {
          padding: var(--space-5);
        }

        .transformation-tag {
          display: inline-block;
          padding: var(--space-1) var(--space-3);
          background: linear-gradient(135deg, var(--accent-gold) 0%, #D4AF37 100%);
          color: var(--primary-dark);
          font-size: var(--text-xs);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 2px;
          margin-bottom: var(--space-3);
        }

        .transformation-content h3 {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-3);
        }

        .transformation-story {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
          font-style: italic;
        }

        .transformation-result {
          padding-top: var(--space-3);
          border-top: 1px solid var(--border-color);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .transformation-result span {
          font-weight: 600;
          color: var(--accent-gold);
        }

        .transformation-result strong {
          color: var(--luxury-green);
        }

        @media (max-width: 768px) {
          .gallery-header h2,
          .reviews-header h2,
          .transformations-header h2 {
            font-size: var(--text-2xl);
          }
          
          .gallery-grid,
          .reviews-grid,
          .transformations-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}