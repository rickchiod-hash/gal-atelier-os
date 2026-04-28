"use client";

export function QuemSomosSection() {
  return (
    <section id="quem-somos" className="section">
      <div className="shell">
        <div className="section-header">
          <p className="eyebrow">Sobre nós</p>
          <h2>Gal Atelier: beleza técnica com alma artesanal</h2>
          <p className="section-desc">
            Somos um espaço de beleza especializada em perucas, laces, customizações e manutenção. 
            Unimos técnica artesanal, escuta cuidadosa e organização digital para transformar desejo 
            em um visual seguro, bonito e previsível.
          </p>
        </div>

        <div className="quem-somos-grid">
          <div className="quem-somos-item">
            <div className="quem-somos-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h3>Naturalidade</h3>
            <p>Texturas e linhas frontais que imitam cabelos naturais, com movimento e volume realista.</p>
          </div>
          <div className="quem-somos-item">
            <div className="quem-somos-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3>Personalização</h3>
            <p>Cada peça é única, feita sob medida para cada cliente, considerando seu estilo de vida e desejos.</p>
          </div>
          <div className="quem-somos-item">
            <div className="quem-somos-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Processo Seguro</h3>
            <p>Do diagnóstico à entrega, acompanhamento completo com transparência em cada etapa.</p>
          </div>
          <div className="quem-somos-item">
            <div className="quem-somos-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3>Pós-venda</h3>
            <p>Suporte, manutenção e care kit para cada peça, garantindo longevidade e satisfação.</p>
          </div>
        </div>

        <div className="quem-somos-visual">
          <img src="/gal-assets/catalog/quem-somos.jpg" alt="Gal Atelier - Atelier de perucas personalizadas" />
        </div>
      </div>
    </section>
  );
}