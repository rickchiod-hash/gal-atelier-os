"use client";

import { QuoteResponse, OrderStatus, serviceLabel, formatDate } from "./HistorySection.logic";

interface HistorySectionProps {
  filteredQuotes: QuoteResponse[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: OrderStatus | "ALL";
  setFilterStatus: (value: OrderStatus | "ALL") => void;
}

export function HistorySection({
  filteredQuotes,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}: HistorySectionProps) {
  return (
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
                  <span>{serviceLabel(q.serviceType)} · {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(q.recommendedPrice)}</span>
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
  );
}
