"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Metrics = {
  quotes: number;
  revenuePotential: number;
  depositsPotential: number;
};

type QuoteResponse = {
  id: string;
  clientName: string;
  clientWhatsapp: string;
  serviceType: string;
  status: string;
  minimumPrice: number;
  recommendedPrice: number;
  premiumPrice: number;
  depositPrice: number;
  whatsappMessage: string;
  whatsappLink: string;
  pixCopyPaste: string;
  createdAt: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const whatsappReceiver = process.env.NEXT_PUBLIC_WHATSAPP_RECEIVER || "5511914136961";

const initial = {
  clientName: "Maria",
  clientWhatsapp: "11999999999",
  type: "LACE_FRONT",
  color: "Castanho iluminado",
  lengthCm: 55,
  texture: "Ondulada",
  density: "180%",
  capSize: "M",
  deadlineDays: 15,
  materialCost: 150,
  laborCost: 250,
  complexityCost: 80,
  urgencyCost: 20,
  marginPercent: 30,
  notes: "Acabamento natural e linha frontal delicada."
};

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics>({ quotes: 0, revenuePotential: 0, depositsPotential: 0 });
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [status, setStatus] = useState("Pronto para operar.");
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const [metricsRes, quotesRes] = await Promise.all([
        fetch(`${apiUrl}/api/quotes/metrics`, { cache: "no-store" }),
        fetch(`${apiUrl}/api/quotes`, { cache: "no-store" })
      ]);
      if (metricsRes.ok) setMetrics(await metricsRes.json());
      if (quotesRes.ok) setQuotes(await quotesRes.json());
      setStatus("Sistema online.");
    } catch {
      setStatus("Backend offline. Rode o batch principal ou verifique a porta 8080.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const conversionHint = useMemo(() => {
    if (metrics.quotes === 0) return "Crie o primeiro orçamento para iniciar o pipeline.";
    return `${metrics.quotes} orçamento(s) com ${money(metrics.depositsPotential)} em sinais potenciais.`;
  }, [metrics]);

  async function createQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("Gerando orçamento...");

    const form = new FormData(event.currentTarget);
    const raw = Object.fromEntries(form.entries());

    const payload = {
      ...raw,
      lengthCm: Number(raw.lengthCm),
      deadlineDays: Number(raw.deadlineDays),
      materialCost: Number(raw.materialCost),
      laborCost: Number(raw.laborCost),
      complexityCost: Number(raw.complexityCost),
      urgencyCost: Number(raw.urgencyCost),
      marginPercent: Number(raw.marginPercent)
    };

    try {
      const res = await fetch(`${apiUrl}/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Trace-Id": crypto.randomUUID() },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        setStatus(`Erro: ${await res.text()}`);
        return;
      }

      const data = await res.json();
      setQuote(data);
      setStatus("Orçamento, Pix e WhatsApp prontos.");
      await load();
    } catch {
      setStatus("Falha de conexão com backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="shell nav">
        <Logo />
        <nav className="navLinks" aria-label="Navegação principal">
          <a href="#overview">Resumo</a>
          <a href="#quote">Orçamento</a>
          <a href="#pipeline">Pipeline</a>
        </nav>
      </header>

      <section className="shell hero">
        <div className="heroCopy">
          <p className="eyebrow">Design system · Hexagonal backend</p>
          <h1>Atendimento premium, orçamento claro e sinal Pix em um só fluxo.</h1>
          <p className="subtitle">
            Gal Atelier OS organiza briefing, preço, WhatsApp e próxima ação para uma operação de wigmaker mais previsível.
          </p>
          <div className="actions">
            <a className="button primary" href="#quote">Criar orçamento</a>
            <a className="button secondary" href={`https://wa.me/${whatsappReceiver}`} target="_blank">Abrir WhatsApp</a>
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

      <section id="overview" className="shell metricGrid">
        <Metric label="Orçamentos" value={metrics.quotes} />
        <Metric label="Receita potencial" value={money(metrics.revenuePotential)} />
        <Metric label="Sinais Pix" value={money(metrics.depositsPotential)} />
      </section>

      <section id="quote" className="shell workbench">
        <aside className="panel introPanel">
          <p className="eyebrow">Quote engine</p>
          <h2>Briefing enxuto. Regra forte. Venda pronta.</h2>
          <p>
            O frontend não calcula preço. Ele envia o briefing para o backend; o domínio calcula mínimo, recomendado, premium e sinal.
          </p>
          <div className="statusCard" role="status">
            <span>Status</span>
            <strong>{status}</strong>
          </div>
        </aside>

        <form className="panel quoteForm" onSubmit={createQuote}>
          <div className="formHeader">
            <h3>Novo orçamento</h3>
            <span>Pix + WhatsApp</span>
          </div>

          <label htmlFor="clientName">Cliente<input id="clientName" name="clientName" defaultValue={initial.clientName} /></label>
          <label htmlFor="clientWhatsapp">WhatsApp<input id="clientWhatsapp" name="clientWhatsapp" defaultValue={initial.clientWhatsapp} /></label>
          <label htmlFor="type">Serviço
            <select id="type" name="type" defaultValue={initial.type}>
              <option value="LACE_FRONT">Lace front</option>
              <option value="FULL_LACE">Full lace</option>
              <option value="WIG_CUSTOM">Wig customizada</option>
              <option value="MAINTENANCE">Manutenção</option>
              <option value="SHOE_CUSTOMIZATION">Customização de sapato</option>
            </select>
          </label>
          <label htmlFor="color">Cor<input id="color" name="color" defaultValue={initial.color} /></label>
          <label htmlFor="lengthCm">Comprimento cm<input id="lengthCm" type="number" name="lengthCm" defaultValue={initial.lengthCm} /></label>
          <label htmlFor="texture">Textura<input id="texture" name="texture" defaultValue={initial.texture} /></label>
          <label htmlFor="density">Densidade<input id="density" name="density" defaultValue={initial.density} /></label>
          <label htmlFor="capSize">Touca<input id="capSize" name="capSize" defaultValue={initial.capSize} /></label>
          <label htmlFor="deadlineDays">Prazo dias<input id="deadlineDays" type="number" name="deadlineDays" defaultValue={initial.deadlineDays} /></label>
          <label htmlFor="materialCost">Material<input id="materialCost" type="number" name="materialCost" defaultValue={initial.materialCost} /></label>
          <label htmlFor="laborCost">Mão de obra<input id="laborCost" type="number" name="laborCost" defaultValue={initial.laborCost} /></label>
          <label htmlFor="complexityCost">Complexidade<input id="complexityCost" type="number" name="complexityCost" defaultValue={initial.complexityCost} /></label>
          <label htmlFor="urgencyCost">Urgência<input id="urgencyCost" type="number" name="urgencyCost" defaultValue={initial.urgencyCost} /></label>
          <label htmlFor="marginPercent">Margem %<input id="marginPercent" type="number" name="marginPercent" defaultValue={initial.marginPercent} /></label>
          <label className="full" htmlFor="notes">Notas<textarea id="notes" name="notes" defaultValue={initial.notes} /></label>
          <button className="full button primary" disabled={loading}>
            {loading ? "Gerando..." : "Gerar orçamento completo"}
          </button>
        </form>
      </section>

      {quote && (
        <section className="shell resultGrid">
          <article className="panel pricePanel">
            <p className="eyebrow">Resultado</p>
            <h2>{money(quote.recommendedPrice)}</h2>
            <div className="priceList">
              <span>Mínimo <strong>{money(quote.minimumPrice)}</strong></span>
              <span>Premium <strong>{money(quote.premiumPrice)}</strong></span>
              <span>Sinal Pix <strong>{money(quote.depositPrice)}</strong></span>
            </div>
            <a className="button primary" href={quote.whatsappLink} target="_blank">Abrir WhatsApp</a>
          </article>

          <article className="panel pixPanel">
            <p className="eyebrow">Pix copia e cola</p>
            <textarea readOnly value={quote.pixCopyPaste} />
            <button className="button secondary" onClick={() => navigator.clipboard.writeText(quote.pixCopyPaste)}>Copiar Pix</button>
          </article>

          <article className="panel messagePanel">
            <p className="eyebrow">Mensagem</p>
            <pre>{quote.whatsappMessage}</pre>
          </article>
        </section>
      )}

      <section id="pipeline" className="shell pipeline">
        <div className="sectionTitle">
          <p className="eyebrow">Pipeline</p>
          <h2>Orçamentos recentes</h2>
        </div>

        <div className="panel table">
          {quotes.length === 0 ? (
            <p className="empty">Nenhum orçamento ainda.</p>
          ) : quotes.map((item) => (
            <div className="row" key={item.id}>
              <strong>{item.clientName}</strong>
              <span>{serviceLabel(item.serviceType)}</span>
              <span className={`status ${item.status.toLowerCase()}`}>{statusLabel(item.status)}</span>
              <span>{money(item.recommendedPrice)}</span>
              <a href={item.whatsappLink} target="_blank">WhatsApp</a>
            </div>
          ))}
        </div>
      </section>

      <footer className="shell footer">
        <Logo />
        <span>Gal Atelier OS · clean, robusto, responsivo.</span>
      </footer>
    </main>
  );
}

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0));
}

function serviceLabel(value: string) {
  const labels: Record<string, string> = {
    LACE_FRONT: "Lace front",
    FULL_LACE: "Full lace",
    WIG_CUSTOM: "Wig custom",
    MAINTENANCE: "Manutenção",
    SHOE_CUSTOMIZATION: "Customização"
  };
  return labels[value] || value;
}

function statusLabel(value: string) {
  const labels: Record<string, string> = {
    LEAD: "Lead",
    BRIEFING: "Briefing",
    QUOTED: "Orçado",
    WAITING_PIX: "Aguardando Pix",
    PAID: "Pago",
    PRODUCTION: "Produção",
    READY: "Pronto",
    DELIVERED: "Entregue",
    LOST: "Perdido"
  };
  return labels[value] || value;
}

function Logo() {
  return (
    <div className="logo">
      <img src="/brand/logo-gal-atelier.svg" alt="Gal Atelier OS" />
      <span>Gal Atelier OS</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="panel metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
