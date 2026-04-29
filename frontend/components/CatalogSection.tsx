"use client";

import { CatalogItem } from "@/data/galAtelierCatalog";

type CatalogFilter = "all" | CatalogItem["category"];

interface CatalogSectionProps {
  catalogFilter: string;
  setCatalogFilter: (filter: string) => void;
  categories: { id: string; label: string }[];
  filteredCatalog: CatalogItem[];
}

export function CatalogSection({ catalogFilter, setCatalogFilter, categories, filteredCatalog }: CatalogSectionProps) {
  return (
    <section id="catalog" className="section">
      <div className="shell">
        <div className="section-header">
          <p className="eyebrow">Catálogo</p>
          <h2>Coleção Atelier Wigs</h2>
          <p className="section-desc">Soluções personalizadas para cada desejo. Qualidade artesanal, acabamento premium.</p>
        </div>

        <div className="catalogo-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`catalogo-filter-btn ${catalogFilter === cat.id ? "active" : ""}`}
              onClick={() => setCatalogFilter(cat.id as CatalogFilter)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="lookbook-container">
          {filteredCatalog.length > 0 && (
            <>
              <div className="lookbook-featured">
                <div className="lookbook-featured-content">
                  <div className="lookbook-featured-badge">WIG</div>
                  <h3>{filteredCatalog[0].name}</h3>
                  <p className="lookbook-featured-subtitle">{filteredCatalog[0].subtitle}</p>
                  <p className="lookbook-featured-description">{filteredCatalog[0].description}</p>
                  <div className="lookbook-featured-meta">
                    <span className="lookbook-featured-price">{filteredCatalog[0].priceRange}</span>
                    <span className="lookbook-featured-duration">{filteredCatalog[0].duration}</span>
                  </div>
                  <div className="lookbook-featured-tags">
                    {filteredCatalog[0].technicalTags?.map((tag) => (
                      <span key={tag} className="lookbook-featured-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="lookbook-featured-actions">
                    <a href="#quote" className="button primary">Orçar este item</a>
                  </div>
                </div>
                <div className="lookbook-featured-image">
                  <img src={filteredCatalog[0].image} alt={filteredCatalog[0].name} />
                </div>
              </div>

              <div className="lookbook-grid">
                {filteredCatalog.slice(1).map((item) => (
                  <div key={item.id} className="lookbook-card">
                    <div className="lookbook-card-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="lookbook-card-content">
                      <div className="lookbook-card-badge">WIG</div>
                      <h4>{item.name}</h4>
                      <p className="lookbook-card-description">{item.description}</p>
                      <div className="lookbook-card-meta">
                        <span className="lookbook-card-price">{item.priceRange}</span>
                        <span className="lookbook-card-duration">{item.duration}</span>
                      </div>
                      <div className="lookbook-card-actions">
                        <a href="#quote" className="button primary small">Orçar</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
