"use client";

export function AboutSection() {
  return (
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
  );
}
