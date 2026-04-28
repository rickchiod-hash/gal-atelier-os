"use client";

import { CatalogItem } from "@/data/galAtelierCatalog";

interface CatalogSectionProps {
  catalogFilter: string;
  setCatalogFilter: (filter: string) => void;
  categories: { id: string; label: string }[];
  filteredCatalog: CatalogItem[];
}

export function CatalogSection({ catalogFilter, setCatalogFilter, categories, filteredCatalog }: CatalogSectionProps) {
  return (
    <section id="catalog" className="catalog-section">
      <div className="catalog-header">
        <span className="catalog-eyebrow">Catálogo</span>
        <h2>Coleção Atelier Wigs</h2>
        <p className="catalog-desc">Soluções personalizadas para cada desejo. Qualidade artesanal, acabamento premium.</p>
      </div>

      <div className="catalog-filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${catalogFilter === cat.id ? "active" : ""}`}
            onClick={() => setCatalogFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="lookbook">
        {filteredCatalog.map((item, idx) => (
          idx === 0 ? (
            <article key={item.id} className="lookbook-feature">
              <div className="feature-image-wrap">
                <img src={item.image} alt={item.name} className="feature-image" loading="lazy" />
              </div>
              <div className="feature-info">
                <span className="feature-category">{item.subtitle}</span>
                <h3 className="feature-name">{item.name}</h3>
                <p className="feature-desc">{item.description}</p>
                <div className="feature-meta">
                  <span className="feature-price">{item.priceRange}</span>
                  <span className="feature-duration">{item.duration}</span>
                </div>
                <a href="#quote" className="feature-cta">Solicitar Orçamento</a>
              </div>
            </article>
          ) : (
            <article key={item.id} className="lookbook-item">
              <div className="item-image-wrap">
                <img src={item.image} alt={item.name} className="item-image" loading="lazy" />
                <div className="item-overlay">
                  <a href="#quote" className="overlay-btn">Orçar</a>
                </div>
              </div>
              <div className="item-info">
                <span className="item-category">{item.subtitle}</span>
                <h3 className="item-name">{item.name}</h3>
                <div className="item-meta">
                  <span className="item-price">{item.priceRange}</span>
                  <span className="item-duration">{item.duration}</span>
                </div>
              </div>
            </article>
          )
        ))}
      </div>
    </section>
  );
}
