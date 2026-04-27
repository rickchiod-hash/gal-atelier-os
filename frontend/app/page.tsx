"use client";

import { FormEvent, useEffect, useMemo, useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { useToast } from "@/components/Toast";
import { useTheme } from "@/components/ThemeProvider";

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
  { key: "QUOTE_SENT", label: "Orçamento Enviado", color: "#C8A96B" },
  { key: "NEGOTIATION", label: "Negociação", color: "#C79BA5" },
  { key: "AWAITING_PAYMENT", label: "Aguardando Pgto", color: "#5A163B" },
  { key: "PAID", label: "Sinal Pago", color: "#40DCA5" },
  { key: "PRODUCTION", label: "Em Produção", color: "#C79BA5" },
  { key: "DELIVERED", label: "Entregue", color: "#40DCA5" },
  { key: "LOST", label: "Perdido", color: "#9B8B8B" },
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

  const quotesByStatus = useMemo(() => {
    const grouped: Record<string, QuoteResponse[]> = {};
    PIPELINE_COLUMNS.forEach((col) => {
      grouped[col.key] = quotes.filter((q) => q.status === col.key);
    });
    return grouped;
  }, [quotes]);

  const mockLeads = useMemo(() => [
    { id: "1", name: "Juliana Costa", whatsapp: "11988884444", source: "Instagram", interest: "Lace Front 13x4", budget: "R$ 1.500 - R$ 2.000", nextAction: "Enviar orçamento", stage: "QUOTE_SENT" },
    { id: "2", name: "Patrícia Lima", whatsapp: "11977775555", source: "Indicação", interest: "Full Lace", budget: "R$ 2.500 - R$ 3.500", nextAction: "Diagnóstico", stage: "DIAGNOSIS" },
    { id: "3", name: "Amanda Souza", whatsapp: "11966663333", source: "TikTok", interest: "Glueless Wig", budget: "R$ 800 - R$ 1.200", nextAction: "Follow-up 24h", stage: "CONTACT" },
    { id: "4", name: "Fernanda Alves", whatsapp: "11955552222", source: "Google", interest: "Manutenção", budget: "R$ 300 - R$ 500", nextAction: "Confirmar agendamento", stage: "NEW_LEAD" },
  ], []);

  return (
    <main>
      <Header whatsappReceiver={whatsappReceiver} />

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="shell hero">
        <div className="heroCopy">
          <span className="eyebrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Beauty Commerce CRM
          </span>
          <h1>Beauty Commerce CRM para wigmakers.</h1>
          <p className="subtitle">
            Venda, personalize e acompanhe perucas, laces e manutenções em um fluxo premium do briefing ao pós-venda.
          </p>
          <div className="actions">
            <a href="#quote" className="button primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Criar Orçamento
            </a>
            <a href={`https://wa.me/${whatsappReceiver}`} target="_blank" rel="noopener noreferrer" className="button secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              WhatsApp
            </a>
            <a href="#crm" className="button accent">Ver Pipeline</a>
          </div>
        </div>

        <div className="heroPanel" aria-label="Resumo operacional">
          <div className="heroCard">
            <span>Receita potencial</span>
            <strong>{money(metrics.revenuePotential)}</strong>
            <small>{conversionHint}</small>
          </div>
          <img src="/brand/gal-wig-hero.svg" alt="Ilustração de peruca premium Gal Atelier" />
        </div>
      </section>

      {/* ============================================
          DASHBOARD METRICS
          ============================================ */}
      <section id="overview" className="shell metricGrid">
        <h2 className="sr-only">Dashboard de Métricas</h2>
        {initialLoading ? (
          <>
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
          </>
        ) : (
          <>
            <article className="metric animate-in">
              <span className="metric-label">Orçamentos</span>
              <span className="metric-value">{metrics.quotes}</span>
              <div className="metric-icon">📋</div>
            </article>
            <article className="metric animate-in">
              <span className="metric-label">Receita potencial</span>
              <span className="metric-value">{money(metrics.revenuePotential)}</span>
              <div className="metric-icon">💰</div>
            </article>
            <article className="metric animate-in">
              <span className="metric-label">Sinais Pix</span>
              <span className="metric-value">{money(metrics.depositsPotential)}</span>
              <div className="metric-icon">✨</div>
            </article>
            <article className="metric animate-in">
              <span className="metric-label">Ticket médio</span>
              <span className="metric-value">{money(metrics.avgTicket)}</span>
              <div className="metric-icon">📊</div>
            </article>
            <article className="metric animate-in">
              <span className="metric-label">Taxa conversão</span>
              <span className="metric-value">{metrics.conversionRate}%</span>
              <span className="metric-trend up">↑ +5% vs mês</span>
            </article>
            <article className="metric animate-in">
              <span className="metric-label">Status</span>
              <span className="metric-value" style={{ fontSize: "var(--text-lg)", color: "var(--luxury-green)" }}>🟢 Online</span>
            </article>
            <article className="metric animate-in">
              <span className="metric-label">Produtos</span>
              <span className="metric-value">12</span>
              <span className="metric-trend">Catálogo ativo</span>
            </article>
            <article className="metric animate-in">
              <span className="metric-label">Clientes</span>
              <span className="metric-value">{metrics.quotes}</span>
              <span className="metric-trend">No pipeline</span>
            </article>
          </>
        )}
      </section>

      {/* ============================================
          CRM PIPELINE
          ============================================ */}
      <section id="crm" className="shell section">
        <div className="section-header">
          <p>Pipeline</p>
          <h2>Funil de clientes</h2>
          <p className="section-desc">Acompanhe cada lead do primeiro contato até a entrega final.</p>
        </div>

        <div className="crmBoard" role="list">
          {PIPELINE_COLUMNS.map((col) => (
            <div key={col.key} className="crmColumn" role="listitem">
              <div className="crmColumnHeader" style={{ background: `${col.color}15`, color: col.color }}>
                <span>{col.icon} {col.label}</span>
                <span className="crmBadge" style={{ background: col.color }}>{quotesByStatus[col.key]?.length || 0}</span>
              </div>
              {quotesByStatus[col.key]?.map((q) => (
                <div key={q.id} className="crmCard" onClick={() => { setQuote(q); setWizardStep(3); }}>
                  <strong>{q.clientName}</strong>
                  <span>{serviceLabel(q.serviceType)}</span>
                  <div className="card-meta">
                    <span>{money(q.recommendedPrice)}</span>
                    <span>{formatDate(q.createdAt)}</span>
                  </div>
                </div>
              ))}
              {quotesByStatus[col.key]?.length === 0 && (
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-muted)", textAlign: "center", padding: "var(--space-4)" }}>Nenhum orçamento</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          CATÁLOGO PREMIUM
          ============================================ */}
      <section id="catalog" className="shell section">
        <div className="section-header">
          <p>Catálogo</p>
          <h2>Nossos serviços</h2>
          <p className="section-desc">Soluções personalizadas para cada desejo. Qualidade artesanal, acabamento premium.</p>
        </div>

        <div className="catalogGrid">
          {CATALOG_SERVICES.map((service) => (
            <div key={service.id} className="catalogCard animate-in">
              <div className="catalog-icon">{service.icon}</div>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
              <span className="catalogPrice">{service.price}</span>
              <span className="catalogDuration">⏱ {service.duration}</span>
            </div>
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

            <div className="section-header" style={{ marginBottom: "var(--space-3)" }}>
              <p>Diagnóstico</p>
              <h4>Solicitação para Sessão B</h4>
            </div>

            <div className="panel" style={{ padding: "var(--space-4)" }}>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)", marginBottom: "var(--space-3)" }}>
                Para implementar o diagnóstico consultivo completo da cliente, solicito à Sessão B:
              </p>
              <ul style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", paddingLeft: "var(--space-4)", lineHeight: 2 }}>
                <li>Endpoint POST /api/diagnosis</li>
                <li>Campos: objetivo, experiência, estilo, restrições, tom pele, cor, comprimento, textura, frequência, orçamento</li>
                <li>Lógica de recomendação em Policy</li>
              </ul>
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
            <a className="button primary" href={quote.whatsappLink} target="_blank" rel="noopener noreferrer" style={{ marginTop: "var(--space-4)" }}>
              📱 Abrir WhatsApp
            </a>
          </article>

          <article className="pixPanel">
            <p className="eyebrow">Pix cópia e cola</p>
            <textarea readOnly value={quote.pixCopyPaste} rows={6} aria-label="Código Pix" />
            <button className="button secondary" onClick={copyPix} style={{ marginTop: "var(--space-3)" }}>
              📋 Copiar Pix
            </button>
          </article>

          <article className="messagePanel">
            <p className="eyebrow">Mensagem</p>
            <pre>{quote.whatsappMessage}</pre>
          </article>
        </section>
      )}

      {/* ============================================
          PIPELINE
          ============================================ */}
      <section id="pipeline" className="shell section">
        <div className="section-header">
          <p>Pipeline</p>
          <h2>Orçamentos recentes</h2>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
          <input
            type="search"
            placeholder="🔍 Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "280px" }}
            aria-label="Buscar orçamentos"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "ALL")}
            aria-label="Filtrar por status"
          >
            <option value="ALL">Todos os status</option>
            {PIPELINE_COLUMNS.map((col) => (
              <option key={col.key} value={col.key}>{col.icon} {col.label}</option>
            ))}
          </select>
        </div>

        <div className="table">
          {initialLoading ? (
            <div className="row"><Skeleton style={{ height: "2em" }} /></div>
          ) : filteredQuotes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "var(--space-8)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "var(--space-3)" }}>📭</div>
              <p style={{ color: "var(--color-muted)" }}>Nenhum orçamento encontrado.</p>
              <a href="#quote" className="button primary" style={{ marginTop: "var(--space-4)", display: "inline-flex" }}>
                Criar primeiro orçamento
              </a>
            </div>
          ) : (
            filteredQuotes.map((item) => (
              <div className="row" key={item.id}>
                <strong>{item.clientName}</strong>
                <span>{serviceLabel(item.serviceType)}</span>
                <span>{money(item.recommendedPrice)}</span>
                <a href={item.whatsappLink} target="_blank" rel="noopener noreferrer" className="button secondary" style={{ minHeight: "36px", padding: "0.5rem 1rem", fontSize: "var(--text-xs)" }}>
                  📱 WhatsApp
                </a>
              </div>
            ))
          )}
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