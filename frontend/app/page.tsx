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
  { key: "QUOTED", label: "Orçamento", color: "#5A163B", icon: "📋" },
  { key: "APPROVED", label: "Aprovado", color: "#C8A96B", icon: "✅" },
  { key: "IN_PRODUCTION", label: "Em Produção", color: "#C79BA5", icon: "🔨" },
  { key: "COMPLETED", label: "Concluído", color: "#40DCA5", icon: "🎉" },
  { key: "CANCELLED", label: "Cancelado", color: "#9B8B8B", icon: "❌" },
];

const CRM_STAGES = [
  { key: "NEW_LEAD", label: "Novo Lead", color: "#C79BA5" },
  { key: "CONTACT", label: "Contato", color: "#D8C5B0" },
  { key: "DIAGNOSIS", label: "Diagnóstico", color: "#C8A96B" },
  { key: "QUOTE_SENT", label: "Orçamento", color: "#C8A96B" },
  { key: "NEGOTIATION", label: "Negociação", color: "#C79BA5" },
  { key: "AWAITING_PAYMENT", label: "Aguardando Pix", color: "#5A163B" },
  { key: "PAID", label: "Sinal Pago", color: "#40DCA5" },
  { key: "PRODUCTION", label: "Em Produção", color: "#C79BA5" },
  { key: "DELIVERED", label: "Entregue", color: "#40DCA5" },
  { key: "LOST", label: "Perdido", color: "#9B8B8B" },
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
   SKELETON COMPONENT
   ============================================ */
function Skeleton({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

function MetricSkeleton() {
  return (
    <div className="metric" style={{ minHeight: "120px" }}>
      <Skeleton style={{ height: "1em", width: "60%", marginBottom: "0.5em" }} />
      <Skeleton style={{ height: "2.5em", width: "70%" }} />
    </div>
  );
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
  const [draggedLead, setDraggedLead] = useState<string | null>(null);

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

  function handleDragStart(e: React.DragEvent, leadId: string) {
    setDraggedLead(leadId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e: React.DragEvent, targetStage: string) {
    e.preventDefault();
    if (!draggedLead) return;
    setLeads((prev) => prev.map((lead) => lead.id === draggedLead ? { ...lead, stage: targetStage } : lead));
    showToast(`Cliente movido para ${targetStage}`, "success");
    setDraggedLead(null);
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
          HERO SECTION — PREMIUM WIGMAKER
          ============================================ */}
      <section className="hero-section">
        <div className="hero-bg-pattern"></div>
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
            <div className="hero-metrics">
              <div className="mini-metric">
                <span className="mini-value">{money(metrics.revenuePotential)}</span>
                <span className="mini-label">Receita potencial</span>
              </div>
              <div className="mini-metric">
                <span className="mini-value">{metrics.quotes}</span>
                <span className="mini-label">Orçamentos</span>
              </div>
              <div className="mini-metric">
                <span className="mini-value">{money(metrics.depositsPotential)}</span>
                <span className="mini-label">Sinais Pix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          DASHBOARD TEMPO REAL
          ============================================ */}
      <section id="overview" className="dashboard-section">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h2>Dashboard Operacional</h2>
            <span className="dashboard-updated">Atualizado em {new Date().toLocaleTimeString("pt-BR")}</span>
          </div>

          <div className="metrics-row">
            {initialLoading ? (
              <>
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
              </>
            ) : (
              <>
                <article className="metric-card">
                  <span className="metric-label">Orçamentos</span>
                  <span className="metric-value">{metrics.quotes}</span>
                  {metrics.quotes === 0 && <span className="metric-hint">Crie o primeiro orçamento</span>}
                </article>
                <article className="metric-card">
                  <span className="metric-label">Receita potencial</span>
                  <span className="metric-value">{money(metrics.revenuePotential)}</span>
                  {metrics.revenuePotential === 0 && <span className="metric-hint">Inicie seu pipeline</span>}
                </article>
                <article className="metric-card">
                  <span className="metric-label">Sinais Pix</span>
                  <span className="metric-value">{money(metrics.depositsPotential)}</span>
                  {metrics.depositsPotential === 0 && <span className="metric-hint">Configure Pix para receber</span>}
                </article>
                <article className="metric-card">
                  <span className="metric-label">Ticket médio</span>
                  <span className="metric-value">{money(metrics.avgTicket)}</span>
                  {metrics.avgTicket === 0 && <span className="metric-hint">Baseado em orçamentos</span>}
                </article>
              </>
            )}
          </div>

          <div className="chart-section">
            <div className="chart-card">
              <h4>Tendência de Orçamento</h4>
              <div className="simple-chart">
                <svg viewBox="0 0 400 120" className="chart-svg">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#C8A96B", stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: "#C8A96B", stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  <path d="M0,100 L40,85 L80,70 L120,75 L160,55 L200,45 L240,35 L280,25 L320,15 L360,10 L400,5" fill="none" stroke="#C8A96B" strokeWidth="2" />
                  <path d="M0,100 L40,85 L80,70 L120,75 L160,55 L200,45 L240,35 L280,25 L320,15 L360,10 L400,5 L400,120 L0,120 Z" fill="url(#chartGradient)" />
                </svg>
                <div className="chart-labels">
                  <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                </div>
              </div>
            </div>
            <div className="chart-card">
              <h4>Fontes de Lead</h4>
              <div className="source-bars">
                <div className="source-bar">
                  <span>Instagram</span>
                  <div className="bar"><div className="bar-fill" style={{ width: "45%" }}></div></div>
                  <span className="bar-percent">45%</span>
                </div>
                <div className="source-bar">
                  <span>WhatsApp</span>
                  <div className="bar"><div className="bar-fill" style={{ width: "25%" }}></div></div>
                  <span className="bar-percent">25%</span>
                </div>
                <div className="source-bar">
                  <span>Google</span>
                  <div className="bar"><div className="bar-fill" style={{ width: "20%" }}></div></div>
                  <span className="bar-percent">20%</span>
                </div>
                <div className="source-bar">
                  <span>Indicação</span>
                  <div className="bar"><div className="bar-fill" style={{ width: "10%" }}></div></div>
                  <span className="bar-percent">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CRM PIPELINE COM MOCK DIDÁTICO
          ============================================ */}
      <section id="crm" className="crm-section">
        <div className="crm-header">
          <span className="crm-eyebrow">Pipeline</span>
          <h2>Funil de clientes</h2>
          <p className="crm-desc">Acompanhe cada cliente do primeiro contato até a entrega final.</p>
        </div>

        <div className="crm-board">
          {CRM_STAGES.map((stage) => {
            const stageLeads = leads.filter((lead) => lead.stage === stage.key);
            return (
              <div
                key={stage.key}
                className="crm-stage"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.key)}
              >
                <div className="stage-header" style={{ borderLeftColor: stage.color }}>
                  <span className="stage-name">{stage.label}</span>
                  <span className="stage-count">{stageLeads.length}</span>
                </div>
                <div className="stage-leads">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`lead-card ${draggedLead === lead.id ? "dragging" : ""}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                    >
                      <div className="lead-avatar">
                        {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="lead-info">
                        <strong>{lead.name}</strong>
                        <span>{lead.interest}</span>
                        <span className="lead-meta">{lead.source} · {lead.budget}</span>
                      </div>
                      <div className="lead-actions">
                        <span className="lead-next">{lead.nextAction}</span>
                        <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="lead-whatsapp">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="stage-empty">Arraste um lead aqui</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================
          CATÁLOGO PREMIUM COM IMAGENS
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

        <div className="catalog-grid">
          {filteredCatalog.map((item) => (
            <article key={item.id} className="catalog-product">
              <div className="product-image-wrap">
                <img src={item.image} alt={item.name} className="product-image" loading="lazy" />
                <div className="product-overlay">
                  <a href="#quote" className="overlay-btn">Orçar</a>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{item.subtitle}</span>
                <h3 className="product-name">{item.name}</h3>
                <p className="product-desc">{item.description}</p>
                <div className="product-meta">
                  <span className="product-price">{item.priceRange}</span>
                  <span className="product-duration">{item.duration}</span>
                </div>
                <div className="product-tags">
                  {item.technicalTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="product-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================
          WIZARD ORÇAMENTO
          ============================================ */}
      <section id="quote" className="shell section">
        <div className="section-header">
          <p>Orçamento</p>
          <h2>Crie seu orçamento</h2>
          <p className="section-desc">Briefing completo com cálculo automático de preços e geração de Pix.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)", alignItems: "start" }}>
          <div className="quoteForm">
            {/* WIZARD STEPS */}
            <div className="wizardSteps">
              <div className={`wizardStep ${wizardStep >= 1 ? (wizardStep > 1 ? "done" : "active") : ""}`}>
                <div className="wizardStepNumber">{wizardStep > 1 ? "✓" : "1"}</div>
                <span>Cliente</span>
              </div>
              <div className={`wizardConnector ${wizardStep > 1 ? "done" : ""}`} />
              <div className={`wizardStep ${wizardStep >= 2 ? (wizardStep > 2 ? "done" : "active") : ""}`}>
                <div className="wizardStepNumber">{wizardStep > 2 ? "✓" : "2"}</div>
                <span>Serviço</span>
              </div>
              <div className={`wizardConnector ${wizardStep > 2 ? "done" : ""}`} />
              <div className={`wizardStep ${wizardStep >= 3 ? "active" : ""}`}>
                <div className="wizardStepNumber">3</div>
                <span>Resultado</span>
              </div>
            </div>

            <form onSubmit={createQuote}>
              <div className="formHeader">
                <h3>Novo orçamento</h3>
                <span>PIX + WhatsApp</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
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

              <button type="submit" className="button primary full" disabled={loading} style={{ marginTop: "var(--space-4)" }}>
                {loading ? "⏳ Gerando..." : "💰 Gerar orçamento completo"}
              </button>
            </form>
          </div>

          <div>
            <div className="panel" style={{ padding: "var(--space-4)", marginBottom: "var(--space-4)" }}>
              <div className="statusCard" role="status" aria-live="polite">
                <span>Status do sistema</span>
                <strong>{status}</strong>
              </div>
            </div>

            <div className="process-flow">
              <h4 className="process-title">Como funciona</h4>
              <div className="process-steps">
                <div className="process-step">
                  <span className="step-number">1</span>
                  <div className="step-content">
                    <strong>WhatsApp</strong>
                    <p>Conversa inicial pela cliente</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">2</span>
                  <div className="step-content">
                    <strong>Diagnóstico</strong>
                    <p>Entendemos objetivo e perfil</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">3</span>
                  <div className="step-content">
                    <strong>Orçamento</strong>
                    <p>Criamos orçamento detalhado</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">4</span>
                  <div className="step-content">
                    <strong>Sinal Pix</strong>
                    <p>Cliente confirma com sinal</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">5</span>
                  <div className="step-content">
                    <strong>Produção</strong>
                    <p>Confecção sob medida</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">6</span>
                  <div className="step-content">
                    <strong>Prova</strong>
                    <p>Ajuste final</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">7</span>
                  <div className="step-content">
                    <strong>Entrega</strong>
                    <p>Cliente recebe a peruca</p>
                  </div>
                </div>
                <div className="process-step">
                  <span className="step-number">8</span>
                  <div className="step-content">
                    <strong>Pós-venda</strong>
                    <p>Suporte e manutenção</p>
                  </div>
                </div>
              </div>
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
              <Skeleton style={{ height: "4em" }} />
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
      `}</style>
    </main>
  );
}