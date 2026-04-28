"use client";

import { catalogItems, categories, CatalogItem } from "@/data/galAtelierCatalog";

interface CatalogoLookbookSectionProps {
  catalogFilter: "all" | CatalogItem["category"];
  setCatalogFilter: (filter: "all" | CatalogItem["category"]) => void;
  categories: readonly { readonly id: "all" | "wigs" | "extensoes" | "servicos" | "acessorios"; readonly label: string }[];
}

export function CatalogoLookbookSection({ 
  catalogFilter, 
  setCatalogFilter, 
  categories 
}: CatalogoLookbookSectionProps) {
  const filteredCatalog = catalogFilter === "all" ? catalogItems : 
    catalogItems.filter((item) => item.category === catalogFilter);

  // If there are no items, show a message
  if (filteredCatalog.length === 0) {
    return (
      <section id="catalogo" className="section">
        <div className="shell">
          <div className="section-header">
            <p className="eyebrow">Catálogo</p>
            <h2>Nenhum produto encontrado para esta categoria</h2>
          </div>
        </div>
      </section>
    );
  }

  // We'll use the first item as the featured lookbook item
  const featuredItem = filteredCatalog[0];
  const gridItems = filteredCatalog.slice(1);

  return (
    <section id="catalogo" className="section">
      <div className="shell">
        <div className="section-header">
          <p className="eyebrow">Catálogo técnico</p>
          <h2>Conheça nossas perucas, extensões, serviços e acessórios</h2>
          <p className="section-desc">
            Cada item é desenvolvido com materiais premium e técnicas especializadas para 
            garantir resultados excepcionais e duradouros.
          </p>
        </div>

        {/* Category filters */}
        <div className="catalogo-filters">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              className={`catalogo-filter-btn ${catalogFilter === cat.id ? "active" : ""}`}
              onClick={() => setCatalogFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lookbook layout: featured item + grid */}
        <div className="lookbook-container">
          {/* Featured item (full width) */}
          <div className="lookbook-featured">
            <div className="lookbook-featured-content">
              <div className="lookbook-featured-badge">
                {featuredItem.category === "wigs" && "WIG"}
                {featuredItem.category === "extensoes" && "EXT"}
                {featuredItem.category === "servicos" && "SERV"}
                {featuredItem.category === "acessorios" && "ACC"}
              </div>
              <h3>{featuredItem.name}</h3>
              <p className="lookbook-featured-subtitle">{featuredItem.subtitle}</p>
              <p className="lookbook-featured-description">
                {featuredItem.description}
              </p>
              <div className="lookbook-featured-meta">
                <span className="lookbook-featured-price">{featuredItem.priceRange}</span>
                <span className="lookbook-featured-duration">{featuredItem.duration}</span>
              </div>
              <div className="lookbook-featured-tags">
                {featuredItem.technicalTags.map((tag) => (
                  <span key={tag} className="lookbook-featured-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="lookbook-featured-actions">
                <a href="#quote" className="button primary">
                  Orçar este item
                </a>
                <a href="#" className="button secondary">
                  Ver briefing técnico
                </a>
              </div>
            </div>
            <div className="lookbook-featured-image">
              <img 
                src={featuredItem.image} 
                alt={featuredItem.name} 
                onError={(e) => {
                  e.target.src = "/gal-assets/catalog/placeholder.png";
                }}
              />
            </div>
          </div>

          {/* Grid for the rest */}
          <div className="lookbook-grid">
            {gridItems.map((item) => (
              <div key={item.id} className="lookbook-card">
                <div className="lookbook-card-image">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.src = "/gal-assets/catalog/placeholder.png";
                    }}
                  />
                </div>
                <div className="lookbook-card-content">
                  <div className="lookbook-card-badge">
                    {item.category === "wigs" && "WIG"}
                    {item.category === "extensoes" && "EXT"}
                    {item.category === "servicos" && "SERV"}
                    {item.category === "acessorios" && "ACC"}
                  </div>
                  <h4>{item.name}</h4>
                  <p className="lookbook-card-description">{item.description}</p>
                  <div className="lookbook-card-meta">
                    <span className="lookbook-card-price">{item.priceRange}</span>
                    <span className="lookbook-card-duration">{item.duration}</span>
                  </div>
                  <div className="lookbook-card-actions">
                    <a href="#quote" className="button primary small">
                      Orçar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}