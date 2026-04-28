"use client";

import { FormEvent, useEffect, useMemo, useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { useToast } from "@/components/Toast";
import { useTheme } from "@/components/ThemeProvider";
import { HeroSection } from "@/components/HeroSection";
import { DashboardSection } from "@/components/DashboardSection";
import { AppointmentsSection } from "@/components/AppointmentsSection";
import { ClientsSection } from "@/components/ClientsSection";
import { CatalogSection } from "@/components/CatalogSection";
import { QuoteSection } from "@/components/QuoteSection";
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
  { id: "1", name: "Lace Front Wig", description: "Coroa lace frontal sob medida", price: "R$ 800 - R$ 2.500", duration: "5-15 dias", icon: "👩‍🎤" },
  { id: "2", name: "Full Lace Premium", description: "Peruca completa com tela invisível", price: "R$ 1.200 - R$ 4.000", duration: "10-20 dias", icon: "✨" },
  { id: "3", name: "Glueless Wig", description: "Coroa sem cola com ajuste perfeito", price: "R$ 600 - R$ 1.800", duration: "3-10 dias", icon: "💇‍♀️" },
  { id: "4", name: "Manutenção Premium", description: "Revitalização profunda e cuidados", price: "R$ 200 - R$ 500", duration: "2-4 horas", icon: "🛁" },
  { id: "5", name: "Customização Exclusiva", description: "Personalização artesanal com acabamentos", price: "R$ 150 - R$ 600", duration: "3-7 dias", icon: "👠" },
  { id: "6", name: "Instalação Professional", description: "Aplicação técnica com acabamento", price: "R$ 100 - R$ 400", duration: "1-3 horas", icon: "🎯" },
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
  { id: "1", name: "Follow-up 24h", description: "Envia mensagem 24h após orçamento.", trigger: "24h após orçamento", active: true },
  { id: "2", name: "Follow-up 48h", description: "Novo contato 48h após primeiro follow-up.", trigger: "48h após orçamento", active: true },
  { id: "3", name: "Follow-up 7 dias", description: "Lembrete de oferta especial após 7 dias.", trigger: "7 dias após orçamento", active: false },
  { id: "4", name: "Lembrete de manutenção", description: "Avisa para agendar manutenção 30 dias após entrega.", trigger: "30 dias após entrega", active: true },
  { id: "5", name: "Campanha de recompra", description: "Oferece nova peça 90 dias após entrega.", trigger: "90 dias após entrega", active: false },
  { id: "6", name: "Aniversário da cliente", description: "Deseja feliz aniversário e envia cupom.", trigger: "Data de aniversário", active: true },
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
   HELPER FUNCTIONS
   ============================================ */
function money(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0));
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(dateStr));
}

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
  const [catalogFilter, setCatalogFilter] = useState<"all" | CatalogItem["category"]>("all");
  const [quoteStatus, setQuoteStatus] = useState<Record<string, string>>({});

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

  function generatePDF(q: QuoteResponse) {
    const content = `
GAL ATELIER — ORÇAMENTO
=======================
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

=======================
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

  return (
    <main>
      <Header whatsappReceiver={whatsappReceiver} />

      {/* SOBRE */}
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

      <HeroSection
        whatsappReceiver={whatsappReceiver}
        metrics={metrics}
        initialLoading={initialLoading}
        money={money}
      />

      <DashboardSection metrics={metrics} />

      <AppointmentsSection
        agendaDays={agendaDays}
        agendaTimeSlots={agendaTimeSlots}
        agendaEvents={agendaEvents}
      />

      <ClientsSection
        activeLeads={mockLeadsInitial.filter((l) => !["PAID", "DELIVERED", "LOST", "CANCELLED"].includes(l.stage))}
        stageColor={(key: string) => CRM_STAGES.find((s) => s.key === key)?.color || "#9B8B8B"}
        stageLabel={(key: string) => CRM_STAGES.find((s) => s.key === key)?.label || key}
        whatsappReceiver={whatsappReceiver}
      />

      <CatalogSection
        catalogFilter={catalogFilter}
        setCatalogFilter={setCatalogFilter}
        categories={categories}
        filteredCatalog={filteredCatalog}
      />

      <QuoteSection
        apiUrl={apiUrl}
        loading={loading}
        setLoading={setLoading}
        status={status}
        setStatus={setStatus}
        quote={quote}
        setQuote={setQuote}
        wizardStep={wizardStep}
        setWizardStep={setWizardStep}
        quoteStatus={quoteStatus}
        showToast={showToast}
        load={load}
        money={money}
        generatePDF={generatePDF}
      />

      {/* HISTÓRICO */}
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
              <option value="ALL">Todos</option>
              <option value="QUOTED">Orçados</option>
              <option value="APPROVED">Aprovados</option>
              <option value="IN_PRODUCTION">Em Produção</option>
              <option value="COMPLETED">Concluídos</option>
              <option value="CANCELLED">Cancelados</option>
            </select>
          </div>

          <div className="history-list">
            {filteredQuotes.length === 0 ? (
              <div className="history-empty">
                <p>Nenhum orçamento encontrado.</p>
              </div>
            ) : (
              filteredQuotes.map((q) => (
                <div key={q.id} className="history-item">
                  <div className="quote-info">
                    <strong>{q.clientName}</strong>
                    <span>{serviceLabel(q.serviceType)} · {money(q.recommendedPrice)}</span>
                  </div>
                  <div className="quote-meta">
                    <span className="quote-date">{formatDate(q.createdAt)}</span>
                    <span className={`quote-status status-${q.status.toLowerCase()}`}>
                      {q.status === "QUOTED" ? "Orçado" :
                       q.status === "APPROVED" ? "Aprovado" :
                       q.status === "IN_PRODUCTION" ? "Em Produção" :
                       q.status === "COMPLETED" ? "Concluído" : "Cancelado"}
                    </span>
                  </div>
                  <div className="quote-actions">
                    <a href={q.whatsappLink} target="_blank" rel="noopener noreferrer" className="action-link">
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <footer className="shell footer">
        <Logo />
        <span>Gal Atelier OS · v5.12 · {quotes.length} orçamentos · Modo {theme === "dark" ? "escuro" : "claro"}</span>
      </footer>
    </main>
  );
}
