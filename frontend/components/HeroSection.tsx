"use client";

interface Metrics {
  quotes: number;
  revenuePotential: number;
  depositsPotential: number;
  avgTicket: number;
}

interface HeroSectionProps {
  whatsappReceiver: string;
  metrics: Metrics;
  initialLoading: boolean;
  money: (value: number) => string;
}

export function HeroSection({ whatsappReceiver, metrics, initialLoading, money }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <span className="eyebrow-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Atelier Wigs · Beauty Commerce
          </span>
          <h1 className="hero-title">Wigs, laces e atendimentos premium em um fluxo visual, técnico e vendável.</h1>
          <p className="hero-subtitle">Do diagnóstico ao Pix: organize cada lead, catálogo, pedido, produção e pós-venda com cara de atelier de verdade.</p>
          <div className="hero-actions">
            <a href="#quote" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Criar Orçamento
            </a>
            <a href={`https://wa.me/${whatsappReceiver}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
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
  );
}
