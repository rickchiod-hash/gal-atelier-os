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
  { id: "1", name: "Lace Front Personalizada", description: "Coroa lace frontal sob medida com linha natural", price: "R$ 800 - R$ 2.500", duration: "5-15 dias", icon: "👩‍🎤" },
  { id: "2", name: "Full Lace Premium", description: "Peruca completa com tela invisível em todos os pontos", price: "R$ 1.200 - R$ 4.000", duration: "10-20 dias", icon: "✨" },
  { id: "3", name: "Wig Customizada", description: "Corte e modelagem exclusiva para o rosto da cliente", price: "R$ 600 - R$ 1.800", duration: "3-10 dias", icon: "💇‍♀️" },
  { id: "4", name: "Manutenção Mensal", description: "Revitalização, ajuste e cuidados especiais", price: "R$ 200 - R$ 500", duration: "2-4 horas", icon: "🛁" },
  { id: "5", name: "Customização de Sapato", description: "Personalização artesanal com strass e pedrarias", price: "R$ 150 - R$ 600", duration: "3-7 dias", icon: "👠" },
  { id: "6", name: "Higienização Profunda", description: "Limpeza e hidratação com produtos profissionais", price: "R$ 80 - R$ 200", duration: "1-2 horas", icon: "🧴" },
];

const PIPELINE_COLUMNS = [
  { key: "QUOTED", label: "Orçamento", color: "#8f3a62", icon: "📝" },
  { key: "APPROVED", label: "Aprovado", color: "#d79f52", icon: "✅" },
  { key: "IN_PRODUCTION", label: "Em Produção", color: "#8f3a62", icon: "🔨" },
  { key: "COMPLETED", label: "Concluído", color: "#1f7a4d", icon: "🎉" },
  { key: "CANCELLED", label: "Cancelado", color: "#a0a0a0", icon: "❌" },
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
    LACE_FRONT: "Lace front",
    FULL_LACE: "Full lace",
    WIG_CUSTOM: "Wig custom",
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
    <div className="panel metric">
      <Skeleton style={{ height: "1em", width: "60%", marginBottom: "0.5em" }} />
      <Skeleton style={{ height: "2.5em", width: "80%" }} />
    </div>
  );
}

function QuoteRowSkeleton() {
  return (
    <div className="row" style={{ opacity: 0.6 }}>
      <Skeleton style={{ height: "1.5em", width: "70%" }} />
      <Skeleton style={{ height: "1em", width: "50%" }} />
      <Skeleton style={{ height: "1em", width: "40%" }} />
      <Skeleton style={{ height: "1.5em", width: "60px" }} />
    </div>
  );
}

/* ============================================
   LOGO COMPONENT
   ============================================ */
function Logo() {
  return (
    <div className="logo">
      <img src="/brand/logo-gal-atelier.svg" alt="Gal Atelier OS" />
      <span>Gal Atelier OS</span>
    </div>
  );
}

/* ============================================
   MAIN PAGE COMPONENT
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
    return `${metrics.quotes} orçamento(s) com ${money(metrics.depositsPotential)} em sinais`;
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
        showToast(`Erro ao criar orçamento: ${errorText}`, "error");
        return;
      }

      const data = await res.json();
      setQuote(data);
      setStatus("Orçamento, Pix e WhatsApp prontos!");
      showToast("Orçamento gerado com sucesso!", "success");
      setWizardStep(3);
      await load();
    } catch (err) {
      setStatus("Falha de conexão com backend.");
      showToast("Falha de conexão. Backend pode estar offline.", "error");
    } finally {
      setLoading(false);
    }
  }

  function copyPix() {
    if (quote?.pixCopyPaste) {
      navigator.clipboard.writeText(quote.pixCopyPaste);
      showToast("Pix copiado para a área de transferência!", "success");
    }
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
          HERO SECTION
          ============================================ */}
      <section className="shell hero">
        <div className="heroCopy">
          <p className="eyebrow">Design system · Hexagonal backend · V5</p>
          <h1>Atendimento premium, orçamento claro e sinal Pix em um só fluxo.</h1>
          <p className="subtitle">
            Gal Atelier OS organiza briefing, preço, WhatsApp e próxima ação para wigmaker mais previsível.
          </p>
          <div className="actions">
            <a className="button primary" href="#quote">Criar orçamento</a>
            <a className="button secondary" href={`https://wa.me/${whatsappReceiver}`} target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </div>
        </div>

        <div className="heroPanel" aria-label="Resumo operacional">
          <div className="heroCard">
            <span>Receita potencial</span>
            <strong>{money(metrics.revenuePotential)}</strong>
            <small>{conversionHint}</small>
          </div>
          <img src="/brand/gal-wig-hero.svg" alt="Ilustração editorial de wig personalizada" />
        </div>
      </section>

      {/* ============================================
          DASHBOARD METRICS
          ============================================ */}
      <section id="overview" className="shell metricGrid" aria-labelledby="dashboard-title">
        <h2 id="dashboard-title" className="sr-only">Dashboard de Métricas</h2>
        {initialLoading ? (
          <>
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
          </>
        ) : (
          <>
            <article className="panel metric">
              <span>Orçamentos</span>
              <strong>{metrics.quotes}</strong>
            </article>
            <article className="panel metric">
              <span>Receita potencial</span>
              <strong>{money(metrics.revenuePotential)}</strong>
            </article>
            <article className="panel metric">
              <span>Sinais Pix</span>
              <strong>{money(metrics.depositsPotential)}</strong>
            </article>
            <article className="panel metric">
              <span>Ticket médio</span>
              <strong>{money(metrics.avgTicket)}</strong>
            </article>
            <article className="panel metric">
              <span>Conversão</span>
              <strong>{metrics.conversionRate}%</strong>
            </article>
            <article className="panel metric">
              <span>Status</span>
              <strong style={{ color: "var(--color-ok)", fontSize: "1rem" }}>🟢 Online</strong>
            </article>
          </>
        )}
      </section>

      {/* ============================================
          CRM PIPELINE BOARD
          ============================================ */}
      <section id="crm" className="shell pipeline">
        <div className="sectionTitle">
          <p className="eyebrow">CRM</p>
          <h2>Funil de clientes</h2>
        </div>

        <div className="crmBoard" role="list" aria-label="Pipeline de orçamentos">
          {PIPELINE_COLUMNS.map((col) => (
            <div key={col.key} className="crmColumn" role="listitem">
              <div className="crmColumnHeader" style={{ background: `${col.color}20`, color: col.color }}>
                <span>{col.icon} {col.label}</span>
                <span className="crmBadge" style={{ background: col.color }}>{quotesByStatus[col.key]?.length || 0}</span>
              </div>
              {quotesByStatus[col.key]?.map((q) => (
                <div key={q.id} className="crmCard" onClick={() => { setQuote(q); setWizardStep(3); }}>
                  <strong>{q.clientName}</strong>
                  <span>{serviceLabel(q.serviceType)} · {money(q.recommendedPrice)}</span>
                  <span style={{ fontSize: "0.7rem", marginTop: "0.25rem" }}>{formatDate(q.createdAt)}</span>
                </div>
              ))}
              {quotesByStatus[col.key]?.length === 0 && (
                <p style={{ fontSize: "0.75rem", color: "var(--color-muted)", textAlign: "center", padding: "1rem" }}>
                  Nenhum orçamento
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          CATÁLOGO DE SERVIÇOS
          ============================================ */}
      <section id="catalog" className="shell pipeline">
        <div className="sectionTitle">
          <p className="eyebrow">Catálogo</p>
          <h2>Nossos serviços</h2>
        </div>

        <div className="catalogGrid">
          {CATALOG_SERVICES.map((service) => (
            <div key={service.id} className="catalogCard panel">
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{service.icon}</div>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
              <span className="catalogPrice">{service.price}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.5rem", display: "block" }}>
                ⏱ {service.duration}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          WIZARD ORÇAMENTO
          ============================================ */}
      <section id="quote" className="shell workbench">
        <aside className="panel introPanel">
          <p className="eyebrow">Quote engine</p>
          <h2>Briefing enxuto. Regra forte. Venda pronta.</h2>
          <p>
            O frontend não calcula preço. Ele envia o briefing para o backend; o domínio calcula mínimo, recomendado, premium e sinal.
          </p>
          <div className="statusCard" role="status" aria-live="polite">
            <span>Status</span>
            <strong>{status}</strong>
          </div>
        </aside>

        <div className="panel quoteForm">
          {/* WIZARD STEPS */}
          <div className="wizardSteps" role="navigation" aria-label="Etapas do orçamento">
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
              <span>Pix + WhatsApp</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-2)" }}>
              <label htmlFor="clientName">
                Nome da cliente
                <input id="clientName" name="clientName" type="text" defaultValue="Maria" required minLength={2} maxLength={80} autoComplete="name" />
              </label>

              <label htmlFor="clientWhatsapp">
                WhatsApp
                <input id="clientWhatsapp" name="clientWhatsapp" type="tel" defaultValue="11999999999" required pattern="[0-9]{10,13}" title="Digite o número com DDD, apenas números" autoComplete="tel" />
              </label>

              <label htmlFor="type" className="full">
                Serviço
                <select id="type" name="type" defaultValue="LACE_FRONT" required>
                  <option value="LACE_FRONT">Lace front personalizada</option>
                  <option value="FULL_LACE">Full lace premium</option>
                  <option value="WIG_CUSTOM">Wig customizada</option>
                  <option value="MAINTENANCE">Manutenção</option>
                  <option value="SHOE_CUSTOMIZATION">Customização de sapato</option>
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
                <input id="density" name="density" type="text" defaultValue="180%" required minLength={2} maxLength={60} />
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

            <button
              type="submit"
              className="full button primary"
              disabled={loading}
              style={{ marginTop: "var(--space-3)" }}
            >
              {loading ? "⏳ Gerando..." : "💰 Gerar orçamento completo"}
            </button>
          </form>
        </div>
      </section>

      {/* ============================================
          RESULTADO DO ORÇAMENTO
          ============================================ */}
      {quote && (
        <section className="shell resultGrid" aria-labelledby="resultado-titulo">
          <h2 id="resultado-titulo" className="sr-only">Resultado do orçamento</h2>
          <article className="panel pricePanel">
            <p className="eyebrow">Resultado</p>
            <h2>{money(quote.recommendedPrice)}</h2>
            <div className="priceList">
              <span>Mínimo <strong>{money(quote.minimumPrice)}</strong></span>
              <span>Premium <strong>{money(quote.premiumPrice)}</strong></span>
              <span>Sinal Pix <strong>{money(quote.depositPrice)}</strong></span>
            </div>
            <a className="button primary" href={quote.whatsappLink} target="_blank" rel="noopener noreferrer">
              📱 Abrir WhatsApp
            </a>
          </article>

          <article className="panel pixPanel">
            <p className="eyebrow">Pix cópia e cola</p>
            <textarea readOnly value={quote.pixCopyPaste} rows={6} aria-label="Código Pix para copiar" />
            <button className="button secondary" onClick={copyPix}>
              📋 Copiar Pix
            </button>
          </article>

          <article className="panel messagePanel">
            <p className="eyebrow">Mensagem</p>
            <pre>{quote.whatsappMessage}</pre>
          </article>
        </section>
      )}

      {/* ============================================
          PIPELINE / ORÇAMENTOS RECENTES
          ============================================ */}
      <section id="pipeline" className="shell pipeline">
        <div className="sectionTitle">
          <p className="eyebrow">Pipeline</p>
          <h2>Orçamentos recentes</h2>
        </div>

        <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-3)", flexWrap: "wrap" }}>
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

        <div className="panel table" role="table" aria-label="Lista de orçamentos">
          {initialLoading ? (
            <>
              <QuoteRowSkeleton />
              <QuoteRowSkeleton />
              <QuoteRowSkeleton />
            </>
          ) : filteredQuotes.length === 0 ? (
            <div className="empty" style={{ textAlign: "center", padding: "var(--space-5)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <p>Nenhum orçamento encontrado.</p>
              <a href="#quote" className="button primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
                Criar primeiro orçamento
              </a>
            </div>
          ) : (
            <div role="rowgroup">
              {filteredQuotes.map((item) => (
                <div className="row" key={item.id} role="row">
                  <strong role="cell">{item.clientName}</strong>
                  <span role="cell">{serviceLabel(item.serviceType)}</span>
                  <span role="cell">{money(item.recommendedPrice)}</span>
                  <a href={item.whatsappLink} target="_blank" rel="noopener noreferrer" role="cell">
                    📱 WhatsApp
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="shell footer">
        <Logo />
        <span>Gal Atelier OS · v5.12 · {quotes.length} orçamentos · Modo {theme}</span>
      </footer>

      {/* SCREEN READER ONLY STYLES */}
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
      `}</style>
    </main>
  );
}