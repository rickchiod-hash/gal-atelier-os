export interface TechnicalSpecs {
  tags: string[];
  difficultyLevel: "iniciante" | "intermediário" | "profissional";
  maintenanceLevel: "baixo" | "médio" | "alto";
  stockType: "Sob medida" | "Pronta entrega" | "Pronta entrega/Sob medida" | "Serviço";
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  category: "wigs" | "extensoes" | "servicos" | "acessorios" | "bases" | "kits";
  collection: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  emotionalBenefit: string;
  technicalSpecs: TechnicalSpecs;
  priceRange: string;
  duration: string;
  bestFor: string;
  notRecommendedFor: string;
  image: string;
  galleryImages: string[];
  tags: string[];
  crossSell: string[];
  faq: FAQItem[];
  popularityScore: number;
  featured: boolean;
  photoChecklist: string[];
}

export const catalogItems: CatalogItem[] = [
  // WIGS (w01-w12)
  {
    id: "w01",
    slug: "lace-front-natural-13x4",
    name: "Lace Front Natural 13x4",
    category: "wigs",
    collection: "Primeira Wig",
    subtitle: "Linha frontal realista",
    description: "Corte reto com linha frontal delicada. Acabamento invisível na testa, movimento natural.",
    shortDescription: "Linha frontal realista. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["lace-front", "13x4", "natural", "dia-a-dia"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Sob medida"
    },
    priceRange: "R$ 1.800 - R$ 3.500",
    duration: "15-20 dias",
    bestFor: "Cliente compatível com a coleção Primeira Wig",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/lace-front-natural-13x4/hero.png",
    galleryImages: [
      "/gal-assets/catalog/lace-front-natural-13x4/ace-close.png",
      "/gal-assets/catalog/lace-front-natural-13x4/inside-cap.png",
      "/gal-assets/catalog/lace-front-natural-13x4/texture.png"
    ],
    tags: ["lace-front", "13x4", "natural", "dia-a-dia"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: true,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w02",
    slug: "lace-front-hd-13x6",
    name: "Lace Front HD 13x6",
    category: "wigs",
    collection: "HD Lace Premium",
    subtitle: "Mais repartição e acabamento invisível",
    description: "Mais repartição e acabamento invisível. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Mais repartição e acabamento invisível. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["hd-lace", "13x6", "premium", "hairline"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.600 - R$ 4.800",
    duration: "20-25 dias",
    bestFor: "Cliente compatível com a coleção HD Lace Premium",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/lace-front-hd-13x6/ero.png",
    galleryImages: [
      "/gal-assets/catalog/lace-front-hd-13x6/lace-close.png",
      "/gal-assets/catalog/lace-front-hd-13x6/inside-cap.png",
      "/gal-assets/catalog/lace-front-hd-13x6/texture.png"
    ],
    tags: ["hd-lace", "13x6", "premium", "hairline"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: true,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w03",
    slug: "full-lace-premium",
    name: "Full Lace Premium",
    category: "wigs",
    collection: "HD Lace Premium",
    subtitle: "Versatilidade total de penteados",
    description: "Versatilidade total de penteados. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Versatilidade total de penteados. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["full-lace", "premium", "rabo", "versatilidade"],
      difficultyLevel: "profissional",
      maintenanceLevel: "alto",
      stockType: "Sob medida"
    },
    priceRange: "R$ 3.000 - R$ 5.800",
    duration: "25-35 dias",
    bestFor: "Cliente compatível com a coleção HD Lace Premium",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/full-lace-premium/hero.png",
    galleryImages: [
      "/gal-assets/catalog/full-lace-premium/hero.png",
      "/gal-assets/catalog/full-lace-premium/lace-close.png",
      "/gal-assets/catalog/full-lace-premium/inside-cap.png",
      "/gal-assets/catalog/full-lace-premium/texture.png"
    ],
    tags: ["full-lace", "premium", "rabo", "versatilidade"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w04",
    slug: "lace-360-ponytail",
    name: "360 Lace Ponytail",
    category: "wigs",
    collection: "Evento Express",
    subtitle: "Permite rabo alto e acabamento ao redor",
    description: "Permite rabo alto e acabamento ao redor. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Permite rabo alto e acabamento ao redor. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["360-lace", "ponytail", "eventos"],
      difficultyLevel: "profissional",
      maintenanceLevel: "alto",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.400 - R$ 4.500",
    duration: "20-28 dias",
    bestFor: "Cliente compatível com a coleção Evento Express",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/lace-360-ponytail/hero.png",
    galleryImages: [
      "/gal-assets/catalog/lace-360-ponytail/hero.png",
      "/gal-assets/catalog/lace-360-ponytail/lace-close.png",
      "/gal-assets/catalog/lace-360-ponytail/inside-cap.png",
      "/gal-assets/catalog/lace-360-ponytail/texture.png"
    ],
    tags: ["360-lace", "ponytail", "eventos"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w05",
    slug: "glueless-wig-daily",
    name: "Glueless Wig Daily",
    category: "wigs",
    collection: "Glueless Daily",
    subtitle: "Sem cola, uso rápido e confortável",
    description: "Sem cola, uso rápido e confortável. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Sem cola, uso rápido e confortável. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["glueless", "sem-cola", "iniciante", "rotina"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Sob medida"
    },
    priceRange: "R$ 1.300 - R$ 2.600",
    duration: "10-18 dias",
    bestFor: "Cliente compatível com a coleção Glueless Daily",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/glueless-wig-daily/hero.png",
    galleryImages: [
      "/gal-assets/catalog/glueless-wig-daily/hero.png",
      "/gal-assets/catalog/glueless-wig-daily/lace-close.png",
      "/gal-assets/catalog/glueless-wig-daily/inside-cap.png",
      "/gal-assets/catalog/glueless-wig-daily/texture.png"
    ],
    tags: ["glueless", "sem-cola", "iniciante", "rotina"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: true,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w06",
    slug: "bob-wig-sleek",
    name: "Bob Wig Sleek",
    category: "wigs",
    collection: "Editorial Colors",
    subtitle: "Bob polido, curto e sofisticado",
    description: "Bob polido, curto e sofisticado. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Bob polido, curto e sofisticado. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["bob", "sleek", "curto", "elegante"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Sob medida"
    },
    priceRange: "R$ 1.500 - R$ 3.000",
    duration: "12-20 dias",
    bestFor: "Cliente compatível com a coleção Editorial Colors",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/bob-wig-sleek/hero.png",
    galleryImages: [
      "/gal-assets/catalog/bob-wig-sleek/hero.png",
      "/gal-assets/catalog/bob-wig-sleek/lace-close.png",
      "/gal-assets/catalog/bob-wig-sleek/inside-cap.png",
      "/gal-assets/catalog/bob-wig-sleek/texture.png"
    ],
    tags: ["bob", "sleek", "curto", "elegante"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w07",
    slug: "wig-cacheada-3b-3c",
    name: "Wig Cacheada 3B/3C",
    category: "wigs",
    collection: "Curls & Volume",
    subtitle: "Cachos definidos com volume natural",
    description: "Cachos definidos com volume natural. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Cachos definidos com volume natural. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["cacheada", "3b", "3c", "volume"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.000 - R$ 3.900",
    duration: "18-25 dias",
    bestFor: "Cliente compatível com a coleção Curls & Volume",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/wig-cacheada-3b-3c/hero.png",
    galleryImages: [
      "/gal-assets/catalog/wig-cacheada-3b-3c/hero.png",
      "/gal-assets/catalog/wig-cacheada-3b-3c/lace-close.png",
      "/gal-assets/catalog/wig-cacheada-3b-3c/inside-cap.png",
      "/gal-assets/catalog/wig-cacheada-3b-3c/texture.png"
    ],
    tags: ["cacheada", "3b", "3c", "volume"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w08",
    slug: "wig-crespa-4a-4b",
    name: "Wig Crespa 4A/4B",
    category: "wigs",
    collection: "Curls & Volume",
    subtitle: "Textura crespa com presença e identidade",
    description: "Textura crespa com presença e identidade. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Textura crespa com presença e identidade. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["crespa", "4a", "4b", "natural"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.100 - R$ 4.200",
    duration: "20-28 dias",
    bestFor: "Cliente compatível com a coleção Curls & Volume",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/wig-crespa-4a-4b/hero.png",
    galleryImages: [
      "/gal-assets/catalog/wig-crespa-4a-4b/hero.png",
      "/gal-assets/catalog/wig-crespa-4a-4b/lace-close.png",
      "/gal-assets/catalog/wig-crespa-4a-4b/inside-cap.png",
      "/gal-assets/catalog/wig-crespa-4a-4b/texture.png"
    ],
    tags: ["crespa", "4a", "4b", "natural"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w09",
    slug: "body-wave-glam",
    name: "Body Wave Glam",
    category: "wigs",
    collection: "Evento Express",
    subtitle: "Ondas glamourosas para eventos e fotos",
    description: "Ondas glamourosas para eventos e fotos. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Ondas glamourosas para eventos e fotos. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["body-wave", "glam", "eventos"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.200 - R$ 4.200",
    duration: "18-25 dias",
    bestFor: "Cliente compatível com a coleção Evento Express",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/body-wave-glam/hero.png",
    galleryImages: [
      "/gal-assets/catalog/body-wave-glam/hero.png",
      "/gal-assets/catalog/body-wave-glam/lace-close.png",
      "/gal-assets/catalog/body-wave-glam/inside-cap.png",
      "/gal-assets/catalog/body-wave-glam/texture.png"
    ],
    tags: ["body-wave", "glam", "eventos"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: true,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w10",
    slug: "ruivo-cobre-editorial",
    name: "Ruivo Cobre Editorial",
    category: "wigs",
    collection: "Editorial Colors",
    subtitle: "Transformação cobre-avermelhada editorial",
    description: "Transformação cobre-avermelhada editorial. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Transformação cobre-avermelhada editorial. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["ruivo", "cobre", "colorida", "editorial"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "alto",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.500 - R$ 4.600",
    duration: "22-30 dias",
    bestFor: "Cliente compatível com a coleção Editorial Colors",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/ruivo-cobre-editorial/hero.png",
    galleryImages: [
      "/gal-assets/catalog/ruivo-cobre-editorial/hero.png",
      "/gal-assets/catalog/ruivo-cobre-editorial/lace-close.png",
      "/gal-assets/catalog/ruivo-cobre-editorial/inside-cap.png",
      "/gal-assets/catalog/ruivo-cobre-editorial/texture.png"
    ],
    tags: ["ruivo", "cobre", "colorida", "editorial"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w11",
    slug: "blonde-balayage-hd",
    name: "Blonde Balayage HD",
    category: "wigs",
    collection: "Editorial Colors",
    subtitle: "Loiro iluminado com raiz esfumada",
    description: "Loiro iluminado com raiz esfumada. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Loiro iluminado com raiz esfumada. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["loiro", "balayage", "hd", "cor"],
      difficultyLevel: "profissional",
      maintenanceLevel: "alto",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.800 - R$ 5.200",
    duration: "25-35 dias",
    bestFor: "Cliente compatível com a coleção Editorial Colors",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/blonde-balayage-hd/hero.png",
    galleryImages: [
      "/gal-assets/catalog/blonde-balayage-hd/hero.png",
      "/gal-assets/catalog/blonde-balayage-hd/lace-close.png",
      "/gal-assets/catalog/blonde-balayage-hd/inside-cap.png",
      "/gal-assets/catalog/blonde-balayage-hd/texture.png"
    ],
    tags: ["loiro", "balayage", "hd", "cor"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "w12",
    slug: "medical-wig-comfort",
    name: "Medical Wig Comfort",
    category: "wigs",
    collection: "Medical Comfort",
    subtitle: "Base confortável e discreta para uso sensível",
    description: "Base confortável e discreta para uso sensível. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Base confortável e discreta para uso sensível. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["medical", "alopecia", "oncológica", "conforto"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.800 - R$ 5.500",
    duration: "20-35 dias",
    bestFor: "Cliente compatível com a coleção Medical Comfort",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/medical-wig-comfort/hero.png",
    galleryImages: [
      "/gal-assets/catalog/medical-wig-comfort/hero.png",
      "/gal-assets/catalog/medical-wig-comfort/lace-close.png",
      "/gal-assets/catalog/medical-wig-comfort/inside-cap.png",
      "/gal-assets/catalog/medical-wig-comfort/texture.png"
    ],
    tags: ["medical", "alopecia", "oncológica", "conforto"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: true,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },

  // EXTENSÕES (e01-e06)
  {
    id: "e01",
    slug: "bundles-body-wave-100g",
    name: "Bundles Body Wave 100g",
    category: "extensoes",
    collection: "Extensões Premium",
    subtitle: "Feixes com onda natural e volume progressivo",
    description: "Feixes com onda natural e volume progressivo. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Feixes com onda natural e volume progressivo. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["bundles", "body-wave", "100g"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Pronta entrega/Sob medida"
    },
    priceRange: "R$ 400 - R$ 900",
    duration: "5-10 dias",
    bestFor: "Cliente compatível com a coleção Extensões Premium",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/bundles-body-wave-100g/hero.png",
    galleryImages: [
      "/gal-assets/catalog/bundles-body-wave-100g/hero.png",
      "/gal-assets/catalog/bundles-body-wave-100g/lace-close.png",
      "/gal-assets/catalog/bundles-body-wave-100g/inside-cap.png",
      "/gal-assets/catalog/bundles-body-wave-100g/texture.png"
    ],
    tags: ["bundles", "body-wave", "100g"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "e02",
    slug: "bundles-straight-100g",
    name: "Bundles Straight 100g",
    category: "extensoes",
    collection: "Extensões Premium",
    subtitle: "Feixes lisos para alongamento polido",
    description: "Feixes lisos para alongamento polido. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Feixes lisos para alongamento polido. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["bundles", "liso", "100g"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega/Sob medida"
    },
    priceRange: "R$ 380 - R$ 850",
    duration: "5-10 dias",
    bestFor: "Cliente compatível com a coleção Extensões Premium",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/bundles-straight-100g/hero.png",
    galleryImages: [
      "/gal-assets/catalog/bundles-straight-100g/hero.png",
      "/gal-assets/catalog/bundles-straight-100g/lace-close.png",
      "/gal-assets/catalog/bundles-straight-100g/inside-cap.png",
      "/gal-assets/catalog/bundles-straight-100g/texture.png"
    ],
    tags: ["bundles", "liso", "100g"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "e03",
    slug: "clip-ins-premium",
    name: "Clip-ins Premium",
    category: "extensoes",
    collection: "Glueless Daily",
    subtitle: "Volume removível em minutos",
    description: "Volume removível em minutos. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Volume removível em minutos. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["clip-in", "removível", "volume"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 300 - R$ 750",
    duration: "3-7 dias",
    bestFor: "Cliente compatível com a coleção Glueless Daily",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/clip-ins-premium/hero.png",
    galleryImages: [
      "/gal-assets/catalog/clip-ins-premium/hero.png",
      "/gal-assets/catalog/clip-ins-premium/lace-close.png",
      "/gal-assets/catalog/clip-ins-premium/inside-cap.png",
      "/gal-assets/catalog/clip-ins-premium/texture.png"
    ],
    tags: ["clip-in", "removível", "volume"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "e04",
    slug: "ponytail-extension",
    name: "Ponytail Extension",
    category: "extensoes",
    collection: "Evento Express",
    subtitle: "Rabo de cavalo volumoso e rápido",
    description: "Rabo de cavalo volumoso e rápido. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Rabo de cavalo volumoso e rápido. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["ponytail", "rabo", "eventos"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 250 - R$ 600",
    duration: "3-7 dias",
    bestFor: "Cliente compatível com a coleção Evento Express",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/ponytail-extension/hero.png",
    galleryImages: [
      "/gal-assets/catalog/ponytail-extension/hero.png",
      "/gal-assets/catalog/ponytail-extension/lace-close.png",
      "/gal-assets/catalog/ponytail-extension/inside-cap.png",
      "/gal-assets/catalog/ponytail-extension/texture.png"
    ],
    tags: ["ponytail", "rabo", "eventos"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "e05",
    slug: "hair-topper-natural",
    name: "Hair Topper Natural",
    category: "extensoes",
    collection: "Medical Comfort",
    subtitle: "Cobertura parcial discreta",
    description: "Cobertura parcial discreta. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Cobertura parcial discreta. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["topper", "cobertura", "rarefação"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Sob medida"
    },
    priceRange: "R$ 850 - R$ 1.800",
    duration: "10-18 dias",
    bestFor: "Cliente compatível com a coleção Medical Comfort",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/hair-topper-natural/hero.png",
    galleryImages: [
      "/gal-assets/catalog/hair-topper-natural/hero.png",
      "/gal-assets/catalog/hair-topper-natural/lace-close.png",
      "/gal-assets/catalog/hair-topper-natural/inside-cap.png",
      "/gal-assets/catalog/hair-topper-natural/texture.png"
    ],
    tags: ["topper", "cobertura", "rarefação"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "e06",
    slug: "invisible-wire-extension",
    name: "Invisible Wire Extension",
    category: "extensoes",
    collection: "Glueless Daily",
    subtitle: "Alongamento sem cola, sem costura e sem compromisso",
    description: "Alongamento sem cola, sem costura e sem compromisso. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Alongamento sem cola, sem costura e sem compromisso. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["invisible-wire", "sem-cola"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 350 - R$ 900",
    duration: "3-7 dias",
    bestFor: "Cliente compatível com a coleção Glueless Daily",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/invisible-wire-extension/hero.png",
    galleryImages: [
      "/gal-assets/catalog/invisible-wire-extension/hero.png",
      "/gal-assets/catalog/invisible-wire-extension/lace-close.png",
      "/gal-assets/catalog/invisible-wire-extension/inside-cap.png",
      "/gal-assets/catalog/invisible-wire-extension/texture.png"
    ],
    tags: ["invisible-wire", "sem-cola"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },

  // BASES (b01-b05)
  {
    id: "b01",
    slug: "closure-4x4-hd",
    name: "Closure 4x4 HD",
    category: "bases",
    collection: "Wigmaker Tools",
    subtitle: "Fechamento HD para repartição natural",
    description: "Fechamento HD para repartição natural. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Fechamento HD para repartição natural. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["closure", "4x4", "hd"],
      difficultyLevel: "profissional",
      maintenanceLevel: "médio",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 350 - R$ 850",
    duration: "3-7 dias",
    bestFor: "Cliente compatível com a coleção Wigmaker Tools",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/closure-4x4-hd/hero.png",
    galleryImages: [
      "/gal-assets/catalog/closure-4x4-hd/hero.png",
      "/gal-assets/catalog/closure-4x4-hd/lace-close.png",
      "/gal-assets/catalog/closure-4x4-hd/inside-cap.png",
      "/gal-assets/catalog/closure-4x4-hd/texture.png"
    ],
    tags: ["closure", "4x4", "hd"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "b02",
    slug: "closure-5x5-transparent",
    name: "Closure 5x5 Transparent",
    category: "bases",
    collection: "Wigmaker Tools",
    subtitle: "Área maior de repartição com lace transparente",
    description: "Área maior de repartição com lace transparente. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Área maior de repartição com lace transparente. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["closure", "5x5", "transparent"],
      difficultyLevel: "profissional",
      maintenanceLevel: "médio",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 450 - R$ 950",
    duration: "3-7 dias",
    bestFor: "Cliente compatível com a coleção Wigmaker Tools",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/closure-5x5-transparent/hero.png",
    galleryImages: [
      "/gal-assets/catalog/closure-5x5-transparent/hero.png",
      "/gal-assets/catalog/closure-5x5-transparent/lace-close.png",
      "/gal-assets/catalog/closure-5x5-transparent/inside-cap.png",
      "/gal-assets/catalog/closure-5x5-transparent/texture.png"
    ],
    tags: ["closure", "5x5", "transparent"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "b03",
    slug: "frontal-13x4-hd",
    name: "Frontal 13x4 HD",
    category: "bases",
    collection: "Wigmaker Tools",
    subtitle: "Frontal com hairline realista",
    description: "Frontal com hairline realista. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Frontal com hairline realista. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["frontal", "13x4", "hd"],
      difficultyLevel: "profissional",
      maintenanceLevel: "alto",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 650 - R$ 1.400",
    duration: "5-10 dias",
    bestFor: "Cliente compatível com a coleção Wigmaker Tools",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/frontal-13x4-hd/hero.png",
    galleryImages: [
      "/gal-assets/catalog/frontal-13x4-hd/hero.png",
      "/gal-assets/catalog/frontal-13x4-hd/lace-close.png",
      "/gal-assets/catalog/frontal-13x4-hd/inside-cap.png",
      "/gal-assets/catalog/frontal-13x4-hd/texture.png"
    ],
    tags: ["frontal", "13x4", "hd"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "b04",
    slug: "frontal-13x6-hd",
    name: "Frontal 13x6 HD",
    category: "bases",
    collection: "Wigmaker Tools",
    subtitle: "Frontal premium com maior profundidade",
    description: "Frontal premium com maior profundidade. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Frontal premium com maior profundidade. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["frontal", "13x6", "hd"],
      difficultyLevel: "profissional",
      maintenanceLevel: "alto",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 800 - R$ 1.800",
    duration: "5-10 dias",
    bestFor: "Cliente compatível com a coleção Wigmaker Tools",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/frontal-13x6-hd/hero.png",
    galleryImages: [
      "/gal-assets/catalog/frontal-13x6-hd/hero.png",
      "/gal-assets/catalog/frontal-13x6-hd/lace-close.png",
      "/gal-assets/catalog/frontal-13x6-hd/inside-cap.png",
      "/gal-assets/catalog/frontal-13x6-hd/texture.png"
    ],
    tags: ["frontal", "13x6", "hd"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "b05",
    slug: "wig-cap-customizada",
    name: "Wig Cap Customizada",
    category: "bases",
    collection: "Wigmaker Tools",
    subtitle: "Touca base sob medida para construção de wig",
    description: "Touca base sob medida para construção de wig. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Touca base sob medida para construção de wig. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["cap", "touca", "base"],
      difficultyLevel: "profissional",
      maintenanceLevel: "baixo",
      stockType: "Sob medida"
    },
    priceRange: "R$ 120 - R$ 350",
    duration: "3-7 dias",
    bestFor: "Cliente compatível com a coleção Wigmaker Tools",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/wig-cap-customizada/hero.png",
    galleryImages: [
      "/gal-assets/catalog/wig-cap-customizada/hero.png",
      "/gal-assets/catalog/wig-cap-customizada/lace-close.png",
      "/gal-assets/catalog/wig-cap-customizada/inside-cap.png",
      "/gal-assets/catalog/wig-cap-customizada/texture.png"
    ],
    tags: ["cap", "touca", "base"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },

  // SERVIÇOS (s01-s06)
  {
    id: "s01",
    slug: "instalacao-lace",
    name: "Instalação Lace",
    category: "servicos",
    collection: "Evento Express",
    subtitle: "Aplicação com acabamento natural",
    description: "Aplicação com acabamento natural. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Aplicação com acabamento natural. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["instalação", "lace", "serviço"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Serviço"
    },
    priceRange: "R$ 250 - R$ 600",
    duration: "2-4 horas",
    bestFor: "Cliente compatível com a coleção Evento Express",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/instalacao-lace/hero.png",
    galleryImages: [
      "/gal-assets/catalog/instalacao-lace/hero.png",
      "/gal-assets/catalog/instalacao-lace/lace-close.png",
      "/gal-assets/catalog/instalacao-lace/inside-cap.png",
      "/gal-assets/catalog/instalacao-lace/texture.png"
    ],
    tags: ["instalação", "lace", "serviço"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "s02",
    slug: "plucking-bleached-knots",
    name: "Plucking & Bleached Knots",
    category: "servicos",
    collection: "HD Lace Premium",
    subtitle: "Personalização da hairline e nós",
    description: "Personalização da hairline e nós. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Personalização da hairline e nós. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["plucking", "knots", "hairline"],
      difficultyLevel: "profissional",
      maintenanceLevel: "médio",
      stockType: "Serviço"
    },
    priceRange: "R$ 180 - R$ 450",
    duration: "1-3 dias",
    bestFor: "Cliente compatível com a coleção HD Lace Premium",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/plucking-bleached-knots/hero.png",
    galleryImages: [
      "/gal-assets/catalog/plucking-bleached-knots/hero.png",
      "/gal-assets/catalog/plucking-bleached-knots/lace-close.png",
      "/gal-assets/catalog/plucking-bleached-knots/inside-cap.png",
      "/gal-assets/catalog/plucking-bleached-knots/texture.png"
    ],
    tags: ["plucking", "knots", "hairline"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "s03",
    slug: "manutencao-premium",
    name: "Manutenção Premium",
    category: "servicos",
    collection: "Care & Maintenance",
    subtitle: "Lavagem, hidratação, finalização e revisão",
    description: "Lavagem, hidratação, finalização e revisão. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Lavagem, hidratação, finalização e revisão. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["manutenção", "cuidado"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Serviço"
    },
    priceRange: "R$ 220 - R$ 550",
    duration: "3-7 dias",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/manutencao-premium/hero.png",
    galleryImages: [
      "/gal-assets/catalog/manutencao-premium/hero.png",
      "/gal-assets/catalog/manutencao-premium/lace-close.png",
      "/gal-assets/catalog/manutencao-premium/inside-cap.png",
      "/gal-assets/catalog/manutencao-premium/texture.png"
    ],
    tags: ["manutenção", "cuidado"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "s04",
    slug: "higienizacao-hidratacao",
    name: "Higienização & Hidratação",
    category: "servicos",
    collection: "Care & Maintenance",
    subtitle: "Limpeza profunda com recuperação de maciez",
    description: "Limpeza profunda com recuperação de maciez. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Limpeza profunda com recuperação de maciez. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["higienização", "hidratação"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Serviço"
    },
    priceRange: "R$ 180 - R$ 420",
    duration: "2-5 dias",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/higienizacao-hidratacao/hero.png",
    galleryImages: [
      "/gal-assets/catalog/higienizacao-hidratacao/hero.png",
      "/gal-assets/catalog/higienizacao-hidratacao/lace-close.png",
      "/gal-assets/catalog/higienizacao-hidratacao/inside-cap.png",
      "/gal-assets/catalog/higienizacao-hidratacao/texture.png"
    ],
    tags: ["higienização", "hidratação"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "s05",
    slug: "coloracao-personalizada",
    name: "Coloração Personalizada",
    category: "servicos",
    collection: "Editorial Colors",
    subtitle: "Cor sob medida com estudo de tom",
    description: "Cor sob medida com estudo de tom. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Cor sob medida com estudo de tom. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["coloração", "cor", "editorial"],
      difficultyLevel: "profissional",
      maintenanceLevel: "alto",
      stockType: "Serviço"
    },
    priceRange: "R$ 350 - R$ 1.200",
    duration: "5-15 dias",
    bestFor: "Cliente compatível com a coleção Editorial Colors",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/coloracao-personalizada/hero.png",
    galleryImages: [
      "/gal-assets/catalog/coloracao-personalizada/hero.png",
      "/gal-assets/catalog/coloracao-personalizada/lace-close.png",
      "/gal-assets/catalog/coloracao-personalizada/inside-cap.png",
      "/gal-assets/catalog/coloracao-personalizada/texture.png"
    ],
    tags: ["coloração", "cor", "editorial"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "s06",
    slug: "reforma-wig-antiga",
    name: "Reforma de Wig Antiga",
    category: "servicos",
    collection: "Care & Maintenance",
    subtitle: "Recuperação estética e estrutural da peça",
    description: "Recuperação estética e estrutural da peça. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Recuperação estética e estrutural da peça. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["reforma", "restauração"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Serviço"
    },
    priceRange: "R$ 300 - R$ 1.000",
    duration: "7-15 dias",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/reforma-wig-antiga/hero.png",
    galleryImages: [
      "/gal-assets/catalog/reforma-wig-antiga/hero.png",
      "/gal-assets/catalog/reforma-wig-antiga/lace-close.png",
      "/gal-assets/catalog/reforma-wig-antiga/inside-cap.png",
      "/gal-assets/catalog/reforma-wig-antiga/texture.png"
    ],
    tags: ["reforma", "restauração"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },

  // ACESSÓRIOS (a01-a07)
  {
    id: "a01",
    slug: "wig-cap-premium",
    name: "Wig Cap Premium",
    category: "acessorios",
    collection: "Care & Maintenance",
    subtitle: "Touca confortável para proteção e fixação",
    description: "Touca confortável para proteção e fixação. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Touca confortável para proteção e fixação. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["wig-cap", "touca"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 35 - R$ 90",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/wig-cap-premium/hero.png",
    galleryImages: [
      "/gal-assets/catalog/wig-cap-premium/hero.png",
      "/gal-assets/catalog/wig-cap-premium/lace-close.png",
      "/gal-assets/catalog/wig-cap-premium/inside-cap.png",
      "/gal-assets/catalog/wig-cap-premium/texture.png"
    ],
    tags: ["wig-cap", "touca"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "a02",
    slug: "lace-glue-professional",
    name: "Lace Glue Professional",
    category: "acessorios",
    collection: "Care & Maintenance",
    subtitle: "Cola profissional para fixação segura",
    description: "Cola profissional para fixação segura. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Cola profissional para fixação segura. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["cola", "fixação"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 60 - R$ 180",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/lace-glue-professional/hero.png",
    galleryImages: [
      "/gal-assets/catalog/lace-glue-professional/hero.png",
      "/gal-assets/catalog/lace-glue-professional/lace-close.png",
      "/gal-assets/catalog/lace-glue-professional/inside-cap.png",
      "/gal-assets/catalog/lace-glue-professional/texture.png"
    ],
    tags: ["cola", "fixação"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "a03",
    slug: "lace-glue-remover",
    name: "Lace Glue Remover",
    category: "acessorios",
    collection: "Care & Maintenance",
    subtitle: "Removedor suave para preservar pele e lace",
    description: "Removedor suave para preservar pele e lace. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Removedor suave para preservar pele e lace. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["removedor", "lace"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 45 - R$ 150",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/lace-glue-remover/hero.png",
    galleryImages: [
      "/gal-assets/catalog/lace-glue-remover/hero.png",
      "/gal-assets/catalog/lace-glue-remover/lace-close.png",
      "/gal-assets/catalog/lace-glue-remover/inside-cap.png",
      "/gal-assets/catalog/lace-glue-remover/texture.png"
    ],
    tags: ["removedor", "lace"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "a04",
    slug: "wig-stand-deluxe",
    name: "Wig Stand Deluxe",
    category: "acessorios",
    collection: "Care & Maintenance",
    subtitle: "Suporte elegante para armazenar e secar",
    description: "Suporte elegante para armazenar e secar. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Suporte elegante para armazenar e secar. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["suporte", "stand"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 80 - R$ 250",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/wig-stand-deluxe/hero.png",
    galleryImages: [
      "/gal-assets/catalog/wig-stand-deluxe/hero.png",
      "/gal-assets/catalog/wig-stand-deluxe/lace-close.png",
      "/gal-assets/catalog/wig-stand-deluxe/inside-cap.png",
      "/gal-assets/catalog/wig-stand-deluxe/texture.png"
    ],
    tags: ["suporte", "stand"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "a05",
    slug: "care-kit-completo",
    name: "Care Kit Completo",
    category: "acessorios",
    collection: "Care & Maintenance",
    subtitle: "Kit de cuidado com cap, cola, removedor, escova e mousse",
    description: "Kit de cuidado com cap, cola, removedor, escova e mousse. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Kit de cuidado com cap, cola, removedor, escova e mousse. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["kit", "cuidado"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 180 - R$ 450",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/care-kit-completo/hero.png",
    galleryImages: [
      "/gal-assets/catalog/care-kit-completo/hero.png",
      "/gal-assets/catalog/care-kit-completo/lace-close.png",
      "/gal-assets/catalog/care-kit-completo/inside-cap.png",
      "/gal-assets/catalog/care-kit-completo/texture.png"
    ],
    tags: ["kit", "cuidado"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: true,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "a06",
    slug: "edge-brush-comb",
    name: "Edge Brush + Comb",
    category: "acessorios",
    collection: "Care & Maintenance",
    subtitle: "Ferramenta para baby hair e acabamento",
    description: "Ferramenta para baby hair e acabamento. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Ferramenta para baby hair e acabamento. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["edge", "brush", "comb"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 20 - R$ 70",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/edge-brush-comb/hero.png",
    galleryImages: [
      "/gal-assets/catalog/edge-brush-comb/hero.png",
      "/gal-assets/catalog/edge-brush-comb/lace-close.png",
      "/gal-assets/catalog/edge-brush-comb/inside-cap.png",
      "/gal-assets/catalog/edge-brush-comb/texture.png"
    ],
    tags: ["edge", "brush", "comb"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "a07",
    slug: "mousse-definidor-cachos",
    name: "Mousse Definidor de Cachos",
    category: "acessorios",
    collection: "Curls & Volume",
    subtitle: "Finalizador para definição e controle de volume",
    description: "Finalizador para definição e controle de volume. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Finalizador para definição e controle de volume. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["mousse", "cachos"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 45 - R$ 120",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Curls & Volume",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/mousse-definidor-cachos/hero.png",
    galleryImages: [
      "/gal-assets/catalog/mousse-definidor-cachos/hero.png",
      "/gal-assets/catalog/mousse-definidor-cachos/lace-close.png",
      "/gal-assets/catalog/mousse-definidor-cachos/inside-cap.png",
      "/gal-assets/catalog/mousse-definidor-cachos/texture.png"
    ],
    tags: ["mousse", "cachos"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 55,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },

  // KITS (k01-k05)
  {
    id: "k01",
    slug: "kit-primeira-wig",
    name: "Kit Primeira Wig",
    category: "kits",
    collection: "Primeira Wig",
    subtitle: "Wig iniciante + cap + guia + care básico",
    description: "Wig iniciante + cap + guia + care básico. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Wig iniciante + cap + guia + care básico. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["kit", "primeira-wig"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Sob medida"
    },
    priceRange: "R$ 1.600 - R$ 3.200",
    duration: "10-20 dias",
    bestFor: "Cliente compatível com a coleção Primeira Wig",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/kit-primeira-wig/hero.png",
    galleryImages: [
      "/gal-assets/catalog/kit-primeira-wig/hero.png",
      "/gal-assets/catalog/kit-primeira-wig/lace-close.png",
      "/gal-assets/catalog/kit-primeira-wig/inside-cap.png",
      "/gal-assets/catalog/kit-primeira-wig/texture.png"
    ],
    tags: ["kit", "primeira-wig"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: true,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "k02",
    slug: "kit-glueless-daily",
    name: "Kit Glueless Daily",
    category: "kits",
    collection: "Glueless Daily",
    subtitle: "Peça glueless + acessórios de rotina",
    description: "Peça glueless + acessórios de rotina. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Peça glueless + acessórios de rotina. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["kit", "glueless"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Sob medida"
    },
    priceRange: "R$ 1.400 - R$ 2.900",
    duration: "10-18 dias",
    bestFor: "Cliente compatível com a coleção Glueless Daily",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/kit-glueless-daily/hero.png",
    galleryImages: [
      "/gal-assets/catalog/kit-glueless-daily/hero.png",
      "/gal-assets/catalog/kit-glueless-daily/lace-close.png",
      "/gal-assets/catalog/kit-glueless-daily/inside-cap.png",
      "/gal-assets/catalog/kit-glueless-daily/texture.png"
    ],
    tags: ["kit", "glueless"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "k03",
    slug: "kit-hd-lace-premium",
    name: "Kit HD Lace Premium",
    category: "kits",
    collection: "HD Lace Premium",
    subtitle: "HD lace + personalização + care premium",
    description: "HD lace + personalização + care premium. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "HD lace + personalização + care premium. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["kit", "hd-lace", "premium"],
      difficultyLevel: "intermediário",
      maintenanceLevel: "médio",
      stockType: "Sob medida"
    },
    priceRange: "R$ 2.900 - R$ 5.800",
    duration: "20-35 dias",
    bestFor: "Cliente compatível com a coleção HD Lace Premium",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/kit-hd-lace-premium/hero.png",
    galleryImages: [
      "/gal-assets/catalog/kit-hd-lace-premium/hero.png",
      "/gal-assets/catalog/kit-hd-lace-premium/lace-close.png",
      "/gal-assets/catalog/kit-hd-lace-premium/inside-cap.png",
      "/gal-assets/catalog/kit-hd-lace-premium/texture.png"
    ],
    tags: ["kit", "hd-lace", "premium"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "k04",
    slug: "kit-manutencao-mensal",
    name: "Kit Manutenção Mensal",
    category: "kits",
    collection: "Care & Maintenance",
    subtitle: "Serviço + produtos para prolongar vida útil",
    description: "Serviço + produtos para prolongar vida útil. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Serviço + produtos para prolongar vida útil. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["kit", "manutenção"],
      difficultyLevel: "iniciante",
      maintenanceLevel: "baixo",
      stockType: "Serviço/Produto"
    },
    priceRange: "R$ 250 - R$ 700",
    duration: "Mensal",
    bestFor: "Cliente compatível com a coleção Care & Maintenance",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/kit-manutencao-mensal/hero.png",
    galleryImages: [
      "/gal-assets/catalog/kit-manutencao-mensal/hero.png",
      "/gal-assets/catalog/kit-manutencao-mensal/lace-close.png",
      "/gal-assets/catalog/kit-manutencao-mensal/inside-cap.png",
      "/gal-assets/catalog/kit-manutencao-mensal/texture.png"
    ],
    tags: ["kit", "manutenção"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  },
  {
    id: "k05",
    slug: "kit-wigmaker-starter",
    name: "Kit Wigmaker Starter",
    category: "kits",
    collection: "Wigmaker Tools",
    subtitle: "Caps, closures, ferramentas e insumos iniciais",
    description: "Caps, closures, ferramentas e insumos iniciais. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    shortDescription: "Caps, closures, ferramentas e insumos iniciais. Produto/serviço pensado para compra guiada, comparação clara e visual premium.",
    emotionalBenefit: "Mais segurança para escolher, visualizar e pedir orçamento sem confusão.",
    technicalSpecs: {
      tags: ["kit", "wigmaker", "profissional"],
      difficultyLevel: "profissional",
      maintenanceLevel: "médio",
      stockType: "Pronta entrega"
    },
    priceRange: "R$ 600 - R$ 1.800",
    duration: "Pronta entrega",
    bestFor: "Cliente compatível com a coleção Wigmaker Tools",
    notRecommendedFor: "Cliente que precisa de outra textura, prazo ou nível de manutenção sem consulta.",
    image: "/gal-assets/catalog/kit-wigmaker-starter/hero.png",
    galleryImages: [
      "/gal-assets/catalog/kit-wigmaker-starter/hero.png",
      "/gal-assets/catalog/kit-wigmaker-starter/lace-close.png",
      "/gal-assets/catalog/kit-wigmaker-starter/inside-cap.png",
      "/gal-assets/catalog/kit-wigmaker-starter/texture.png"
    ],
    tags: ["kit", "wigmaker", "profissional"],
    crossSell: ["wig-cap-premium", "care-kit-completo", "wig-stand-deluxe"],
    faq: [
      { q: "Serve para iniciantes?", a: "Depende do nível de instalação e manutenção. Use o quiz para confirmar." },
      { q: "Tem pronta entrega?", a: "Verificar stockType e disponibilidade no atendimento." }
    ],
    popularityScore: 70,
    featured: false,
    photoChecklist: ["hero", "lace-close", "inside-cap", "texture", "side-view", "scale-length", "before-after-if-service", "alt-text"]
  }
];

// Manter compatibilidade com UI atual - exportar campos básicos
export const catalogItemsBasic = catalogItems.map(item => ({
  id: item.id,
  name: item.name,
  category: item.category as "wigs" | "extensoes" | "servicos" | "acessorios",
  description: item.description,
  priceRange: item.priceRange,
  duration: item.duration,
  profile: item.bestFor,
  image: item.image,
  technicalTags: item.tags,
  subtitle: item.subtitle
}));

export const categories = [
  { id: "all", label: "Todos" },
  { id: "wigs", label: "Wigs" },
  { id: "extensoes", label: "Extensões" },
  { id: "servicos", label: "Serviços" },
  { id: "acessorios", label: "Acessórios" },
  { id: "bases", label: "Bases" },
  { id: "kits", label: "Kits" },
] as const;
