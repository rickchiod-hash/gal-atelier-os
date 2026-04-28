"use client";

import { FormEvent, useState, Dispatch, SetStateAction } from "react";

type OrderStatus = "QUOTED" | "APPROVED" | "IN_PRODUCTION" | "COMPLETED" | "CANCELLED";

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

type ToastType = "success" | "error" | "info" | "warning";

interface QuoteSectionProps {
  apiUrl: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  status: string;
  setStatus: (status: string) => void;
  quote: QuoteResponse | null;
  setQuote: Dispatch<SetStateAction<QuoteResponse | null>>;
  wizardStep: number;
  setWizardStep: (step: number) => void;
  quoteStatus: Record<string, string>;
  showToast: (message: string, type?: ToastType) => void;
  load: () => Promise<void>;
  money: (value: number) => string;
  generatePDF: (quote: QuoteResponse) => void;
}

export function QuoteSection({
  apiUrl,
  loading,
  setLoading,
  status,
  setStatus,
  quote,
  setQuote,
  wizardStep,
  setWizardStep,
  quoteStatus,
  showToast,
  load,
  money,
}: QuoteSectionProps) {
  const [catalogFilter, setCatalogFilter] = useState<"all" | string>("all");

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
        showToast("Pix confirmado com sucesso!", "success");
      }
    } catch {
      showToast("Erro ao confirmar Pix", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="quote" className="quote-section">
      <div className="section-header">
        <p>Orçamento</p>
        <h2>Crie seu orçamento</h2>
        <p className="section-desc">Briefing completo com cálculo automático de preços e geração de Pix.</p>
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
    </section>
  );
}
