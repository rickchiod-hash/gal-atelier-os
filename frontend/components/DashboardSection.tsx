"use client";

interface DashboardSectionProps {
  metrics: {
    quotes: number;
    revenuePotential: number;
    depositsPotential: number;
    conversionRate: number;
    avgTicket: number;
  };
}

export function DashboardSection({ metrics }: DashboardSectionProps) {
  return (
    <section id="overview" className="dashboard-section">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Visão Geral</h2>
          <span className="dashboard-updated">Atualizado em {new Date().toLocaleTimeString("pt-BR")}</span>
        </div>

        <div className="insights-bar">
          <div className="insight-item">
            <span className="insight-label">Orçamentos</span>
            <strong className="insight-value">{metrics.quotes}</strong>
          </div>
          <div className="insight-item">
            <span className="insight-label">Receita Potencial</span>
            <strong className="insight-value">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(metrics.revenuePotential)}
            </strong>
          </div>
          <div className="insight-item">
            <span className="insight-label">Sinais Pix</span>
            <strong className="insight-value">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(metrics.depositsPotential)}
            </strong>
          </div>
          <div className="insight-item">
            <span className="insight-label">Taxa Conversão</span>
            <strong className="insight-value">{(metrics.conversionRate * 100).toFixed(1)}%</strong>
          </div>
          <div className="insight-item">
            <span className="insight-label">Ticket Médio</span>
            <strong className="insight-value">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(metrics.avgTicket)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
