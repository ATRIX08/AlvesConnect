const loginScreen = document.querySelector("[data-login-screen]");
const adminArea = document.querySelector("[data-admin-area]");
const loginForm = document.querySelector("[data-login-form]");
const loginMessage = document.querySelector("[data-login-message]");
const logoutButtons = document.querySelectorAll("[data-logout]");
const sidebar = document.querySelector("[data-sidebar]");
const sidebarOpen = document.querySelector("[data-sidebar-open]");
const sidebarOverlay = document.querySelector("[data-sidebar-overlay]");
const navButtons = document.querySelectorAll("[data-page]");
const pageTitle = document.querySelector("[data-page-title]");
const pageKicker = document.querySelector("[data-page-kicker]");
const view = document.querySelector("[data-admin-view]");
const editor = document.querySelector("[data-editor]");
const editorTitle = document.querySelector("[data-editor-title]");
const editorKicker = document.querySelector("[data-editor-kicker]");
const editorBody = document.querySelector("[data-editor-body]");
const editorClose = document.querySelector("[data-editor-close]");
const confirmDialogElement = document.querySelector("[data-confirm]");
const confirmTitle = document.querySelector("[data-confirm-title]");
const confirmText = document.querySelector("[data-confirm-text]");
const confirmOk = document.querySelector("[data-confirm-ok]");
const confirmCancel = document.querySelector("[data-confirm-cancel]");
const toastRegion = document.querySelector("[data-toast-region]");

const appConfig = window.alvesConnectConfig || {};
const imageAccept = "image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif";
const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"]);
const acceptedVideoTypes = new Set(["video/mp4", "video/webm", "video/ogg", "video/quicktime"]);
const videoAccept = "video/mp4,video/webm,video/ogg,video/quicktime,.mov";
const acceptedImageExtensions = /\.(jpe?g|png|webp|gif|heic|heif)$/i;
const acceptedVideoExtensions = /\.(mp4|webm|ogg|mov)$/i;
const maxImageUploadSize = 12 * 1024 * 1024;
const maxVideoUploadSize = 250 * 1024 * 1024;

const defaultContent = {
  navHome: "Início",
  navAbout: "Sobre",
  navServices: "Serviços",
  navPortfolio: "Portfólio",
  navAuthority: "Autoridade",
  navContact: "Contato",
  navCta: "Solicitar orçamento",
  heroEyebrow: "Social Media • Conteúdo • Estratégia",
  heroTitle: "Alves Connect",
  heroLineOne: "Conteúdo que conecta.",
  heroLineTwo: "Estratégia que posiciona.",
  heroLineThree: "Criatividade que faz sua marca ser lembrada.",
  heroText:
    "Criamos estratégias, conteúdos, vídeos e identidades visuais para transformar a presença digital de marcas em algo profissional, consistente e memorável.",
  heroPrimaryButton: "Conhecer meu trabalho",
  heroSecondaryButton: "Solicitar orçamento",
  heroProofOne: "Social Media",
  heroProofTwo: "Reels",
  heroProofThree: "Design",
  heroProofFour: "Estratégia Digital",
  heroNoteOne: "Diagnóstico e estratégia",
  heroNoteTwo: "Conteúdo com intenção",
  heroNoteThree: "Marca mais memorável",
  specialtiesItems: "Social Media\nReels\nCriação de Conteúdo\nDesign\nEstratégia\nIdentidade Visual",
  aboutLabel: "Sobre",
  aboutTitle: "Conteúdo bonito é importante. Conteúdo com propósito é melhor ainda.",
  aboutText:
    "A Alves Connect nasceu para ajudar marcas a construírem uma presença digital mais profissional, estratégica e autêntica. Cada projeto é pensado de forma personalizada, unindo planejamento, criatividade, produção de conteúdo, vídeo e identidade visual para comunicar aquilo que torna cada negócio único.",
  aboutPillOne: "Planejamento",
  aboutPillTwo: "Criatividade",
  aboutPillThree: "Estratégia",
  aboutPillFour: "Consistência",
  servicesLabel: "Serviços",
  servicesTitle: "O que pode ser desenvolvido para a sua marca",
  servicesText: "Planos e entregas pensados para dar direção, estética e consistência à presença digital.",
  worksLabel: "Portfólio",
  worksFilterAll: "Todos",
  worksFilterReels: "Reels",
  worksFilterSocial: "Social Media",
  worksFilterDesign: "Design",
  worksFilterCampaigns: "Campanhas",
  worksFilterEvents: "Eventos",
  authorityLabel: "Autoridade",
  resultsLabel: "Resultados",
  videosLabel: "Vídeos",
  videosTitle: "Reels e vídeos",
  videosText: "Uma seleção de vídeos verticais para apresentar ritmo, linguagem visual e produção de conteúdo.",
  worksTitle: "Projetos selecionados",
  worksText: "Um pouco do conteúdo, das campanhas e das experiências desenvolvidas para diferentes marcas.",
  proofTitle: "Marcas que confiam no nosso trabalho",
  proofText: "Espaço preparado para logos e depoimentos reais cadastrados posteriormente.",
  resultsTitle: "Conteúdo bonito chama atenção. Resultado faz a diferença.",
  resultsText: "Quando houver métricas reais, elas poderão ser apresentadas aqui com clareza e responsabilidade.",
  processLabel: "Processo",
  processTitle: "Da ideia até uma presença digital mais consistente",
  processStepOneTitle: "Briefing",
  processStepOneText: "Entendemos a marca, o público, os objetivos e o momento atual da comunicação.",
  processStepTwoTitle: "Estratégia",
  processStepTwoText: "Definimos posicionamento, formatos, linguagem e calendário com intenção.",
  processStepThreeTitle: "Produção",
  processStepThreeText: "Transformamos ideias em conteúdo, design, vídeos, Reels e materiais visuais.",
  processStepFourTitle: "Publicação",
  processStepFourText: "Organizamos a entrega para manter consistência, frequência e clareza.",
  processStepFiveTitle: "Análise e otimização",
  processStepFiveText: "Avaliamos o que funcionou e ajustamos a rota para evoluir a presença digital.",
  finalCtaTitle: "Pronta para transformar a presença digital da sua marca?",
  finalCtaText: "Conte um pouco sobre seu negócio e receba uma proposta personalizada.",
  finalCtaPrimaryButton: "Solicitar orçamento",
  finalCtaWhatsappButton: "Falar no WhatsApp",
  contactLabel: "Contato",
  contactTitle: "Vamos criar algo juntos?",
  contactText:
    "Se você quer melhorar a presença digital da sua marca, criar conteúdos profissionais ou desenvolver uma comunicação mais consistente, entre em contato.",
  contactSubmitButton: "Solicitar orçamento",
  footerText: "Social Media • Conteúdo • Estratégia",
  footerNavHome: "Início",
  footerNavAbout: "Sobre",
  footerNavServices: "Serviços",
  footerNavPortfolio: "Portfólio",
  footerNavContact: "Contato",
  floatingWhatsappSmall: "Fale comigo",
  floatingWhatsappStrong: "WhatsApp",
  whatsappMessage: "Olá! Gostaria de saber mais sobre a Alves Connect.",
};

const defaultServices = (appConfig.services || []).map((service, index) => ({
  ...service,
  id: service.id || `service-${index}`,
  status: service.status || "Publicado",
  position: Number.isFinite(Number(service.position)) ? Number(service.position) : index,
}));

const emptyData = {
  content: defaultContent,
  links: { instagram: "", whatsapp: "", email: "" },
  projects: [],
  videos: [],
  leads: [],
  services: defaultServices,
  logos: [],
  testimonials: [],
  metrics: [],
};

const pageMeta = {
  overview: ["Visão Geral", "Resumo do site"],
  content: ["Conteúdo do Site", "Textos por seção"],
  services: ["Serviços", "O que a Alves Connect oferece"],
  projects: ["Projetos", "Portfólio visual"],
  videos: ["Vídeos", "Reels e materiais audiovisuais"],
  clients: ["Clientes", "Logos e marcas"],
  testimonials: ["Depoimentos", "Provas sociais"],
  leads: ["Leads", "Contatos recebidos"],
  contacts: ["Contatos e Redes", "Links de contato"],
  media: ["Biblioteca de Mídia", "Arquivos enviados"],
  settings: ["Configurações", "Ajustes gerais"],
};

const contentSections = [
  {
    id: "navigation",
    title: "Menu",
    anchor: "inicio",
    description: "Textos do menu superior e chamada principal.",
    keys: ["navHome", "navAbout", "navServices", "navPortfolio", "navAuthority", "navContact", "navCta"],
    fields: [
      { key: "navHome", label: "Link: Início", max: 80 },
      { key: "navAbout", label: "Link: Sobre", max: 80 },
      { key: "navServices", label: "Link: Serviços", max: 80 },
      { key: "navPortfolio", label: "Link: Portfólio", max: 80 },
      { key: "navAuthority", label: "Link: Autoridade", max: 80 },
      { key: "navContact", label: "Link: Contato", max: 80 },
      { key: "navCta", label: "Botão do menu", max: 100 },
    ],
  },
  {
    id: "hero",
    title: "Início",
    anchor: "inicio",
    description: "Primeira dobra do site.",
    keys: [
      "heroEyebrow",
      "heroTitle",
      "heroLineOne",
      "heroLineTwo",
      "heroLineThree",
      "heroText",
      "heroPrimaryButton",
      "heroSecondaryButton",
      "heroProofOne",
      "heroProofTwo",
      "heroProofThree",
      "heroProofFour",
      "heroNoteOne",
      "heroNoteTwo",
      "heroNoteThree",
      "specialtiesItems",
    ],
    fields: [
      { key: "heroEyebrow", label: "Etiqueta pequena", max: 180 },
      { key: "heroTitle", label: "Título principal", max: 180 },
      { key: "heroLineOne", label: "Frase de destaque 1", max: 180 },
      { key: "heroLineTwo", label: "Frase de destaque 2", max: 180 },
      { key: "heroLineThree", label: "Frase de destaque 3", max: 180 },
      { key: "heroText", label: "Descrição", type: "textarea", max: 2500 },
      { key: "heroPrimaryButton", label: "Botão principal", max: 100 },
      { key: "heroSecondaryButton", label: "Botão secundário", max: 100 },
      { key: "heroProofOne", label: "Selo 1", max: 100 },
      { key: "heroProofTwo", label: "Selo 2", max: 100 },
      { key: "heroProofThree", label: "Selo 3", max: 100 },
      { key: "heroProofFour", label: "Selo 4", max: 100 },
      { key: "heroNoteOne", label: "Nota visual 1", max: 120 },
      { key: "heroNoteTwo", label: "Nota visual 2", max: 120 },
      { key: "heroNoteThree", label: "Nota visual 3", max: 120 },
      { key: "specialtiesItems", label: "Letreiro de especialidades (uma por linha)", type: "textarea", max: 1200 },
    ],
  },
  {
    id: "about",
    title: "Sobre",
    anchor: "sobre",
    description: "Apresentação da marca e do posicionamento.",
    keys: ["aboutLabel", "aboutTitle", "aboutText", "aboutPillOne", "aboutPillTwo", "aboutPillThree", "aboutPillFour"],
    fields: [
      { key: "aboutLabel", label: "Etiqueta", max: 80 },
      { key: "aboutTitle", label: "Título exibido no site", max: 180 },
      { key: "aboutText", label: "Texto sobre", type: "textarea", max: 2500 },
      { key: "aboutPillOne", label: "Pílula 1", max: 80 },
      { key: "aboutPillTwo", label: "Pílula 2", max: 80 },
      { key: "aboutPillThree", label: "Pílula 3", max: 80 },
      { key: "aboutPillFour", label: "Pílula 4", max: 80 },
    ],
  },
  {
    id: "servicesIntro",
    title: "Serviços - chamada",
    anchor: "servicos",
    description: "Texto acima dos cards de serviços.",
    keys: ["servicesLabel", "servicesTitle", "servicesText"],
    fields: [
      { key: "servicesLabel", label: "Etiqueta", max: 80 },
      { key: "servicesTitle", label: "Título", max: 180 },
      { key: "servicesText", label: "Descrição", type: "textarea", max: 2500 },
    ],
  },
  {
    id: "works",
    title: "Projetos",
    anchor: "portfolio",
    description: "Chamada da seção de portfólio.",
    keys: [
      "worksLabel",
      "worksTitle",
      "worksText",
      "worksFilterAll",
      "worksFilterReels",
      "worksFilterSocial",
      "worksFilterDesign",
      "worksFilterCampaigns",
      "worksFilterEvents",
    ],
    fields: [
      { key: "worksLabel", label: "Etiqueta", max: 80 },
      { key: "worksTitle", label: "Título da seção", max: 180 },
      { key: "worksText", label: "Descrição da seção", type: "textarea", max: 2500 },
      { key: "worksFilterAll", label: "Filtro: Todos", max: 80 },
      { key: "worksFilterReels", label: "Filtro: Reels", max: 80 },
      { key: "worksFilterSocial", label: "Filtro: Social Media", max: 80 },
      { key: "worksFilterDesign", label: "Filtro: Design", max: 80 },
      { key: "worksFilterCampaigns", label: "Filtro: Campanhas", max: 80 },
      { key: "worksFilterEvents", label: "Filtro: Eventos", max: 80 },
    ],
  },
  {
    id: "authority",
    title: "Clientes e autoridade",
    anchor: "autoridade",
    description: "Texto acima de logos e depoimentos.",
    keys: ["authorityLabel", "proofTitle", "proofText"],
    fields: [
      { key: "authorityLabel", label: "Etiqueta", max: 80 },
      { key: "proofTitle", label: "Título exibido no site", max: 180 },
      { key: "proofText", label: "Descrição", type: "textarea", max: 2500 },
    ],
  },
  {
    id: "results",
    title: "Resultados",
    anchor: "resultados",
    description: "Texto da seção de métricas.",
    keys: ["resultsLabel", "resultsTitle", "resultsText"],
    fields: [
      { key: "resultsLabel", label: "Etiqueta", max: 80 },
      { key: "resultsTitle", label: "Título exibido no site", max: 180 },
      { key: "resultsText", label: "Descrição", type: "textarea", max: 2500 },
    ],
  },
  {
    id: "videos",
    title: "Vídeos",
    anchor: "videos",
    description: "Chamada da área de reels e vídeos.",
    keys: ["videosLabel", "videosTitle", "videosText"],
    fields: [
      { key: "videosLabel", label: "Etiqueta", max: 80 },
      { key: "videosTitle", label: "Título da seção", max: 180 },
      { key: "videosText", label: "Descrição", type: "textarea", max: 2500 },
    ],
  },
  {
    id: "process",
    title: "Processo",
    anchor: "processo",
    description: "Etapas explicadas no final da página.",
    keys: [
      "processLabel",
      "processTitle",
      "processStepOneTitle",
      "processStepOneText",
      "processStepTwoTitle",
      "processStepTwoText",
      "processStepThreeTitle",
      "processStepThreeText",
      "processStepFourTitle",
      "processStepFourText",
      "processStepFiveTitle",
      "processStepFiveText",
    ],
    fields: [
      { key: "processLabel", label: "Etiqueta", max: 80 },
      { key: "processTitle", label: "Título da seção", max: 180 },
      { key: "processStepOneTitle", label: "Etapa 1 - título", max: 120 },
      { key: "processStepOneText", label: "Etapa 1 - texto", type: "textarea", max: 700 },
      { key: "processStepTwoTitle", label: "Etapa 2 - título", max: 120 },
      { key: "processStepTwoText", label: "Etapa 2 - texto", type: "textarea", max: 700 },
      { key: "processStepThreeTitle", label: "Etapa 3 - título", max: 120 },
      { key: "processStepThreeText", label: "Etapa 3 - texto", type: "textarea", max: 700 },
      { key: "processStepFourTitle", label: "Etapa 4 - título", max: 120 },
      { key: "processStepFourText", label: "Etapa 4 - texto", type: "textarea", max: 700 },
      { key: "processStepFiveTitle", label: "Etapa 5 - título", max: 120 },
      { key: "processStepFiveText", label: "Etapa 5 - texto", type: "textarea", max: 700 },
    ],
  },
  {
    id: "cta",
    title: "CTA final",
    anchor: "contato",
    description: "Chamada antes do formulário de contato.",
    keys: ["finalCtaTitle", "finalCtaText", "finalCtaPrimaryButton", "finalCtaWhatsappButton"],
    fields: [
      { key: "finalCtaTitle", label: "Título da chamada", max: 180 },
      { key: "finalCtaText", label: "Texto de apoio", type: "textarea", max: 2500 },
      { key: "finalCtaPrimaryButton", label: "Botão principal", max: 100 },
      { key: "finalCtaWhatsappButton", label: "Botão WhatsApp", max: 100 },
    ],
  },
  {
    id: "contact",
    title: "Contato",
    anchor: "contato",
    description: "Texto principal da área de contato.",
    keys: ["contactLabel", "contactTitle", "contactText", "contactSubmitButton"],
    fields: [
      { key: "contactLabel", label: "Etiqueta", max: 80 },
      { key: "contactTitle", label: "Título exibido no site", max: 180 },
      { key: "contactText", label: "Descrição", type: "textarea", max: 2500 },
      { key: "contactSubmitButton", label: "Botão do formulário", max: 100 },
    ],
  },
  {
    id: "footer",
    title: "Rodapé e WhatsApp",
    anchor: "contato",
    description: "Textos pequenos do rodapé e botão flutuante.",
    keys: [
      "footerText",
      "footerNavHome",
      "footerNavAbout",
      "footerNavServices",
      "footerNavPortfolio",
      "footerNavContact",
      "floatingWhatsappSmall",
      "floatingWhatsappStrong",
    ],
    fields: [
      { key: "footerText", label: "Texto abaixo da logo", max: 180 },
      { key: "footerNavHome", label: "Rodapé: Início", max: 80 },
      { key: "footerNavAbout", label: "Rodapé: Sobre", max: 80 },
      { key: "footerNavServices", label: "Rodapé: Serviços", max: 80 },
      { key: "footerNavPortfolio", label: "Rodapé: Portfólio", max: 80 },
      { key: "footerNavContact", label: "Rodapé: Contato", max: 80 },
      { key: "floatingWhatsappSmall", label: "WhatsApp flutuante - texto pequeno", max: 80 },
      { key: "floatingWhatsappStrong", label: "WhatsApp flutuante - texto forte", max: 80 },
    ],
  },
];

const leadStatusOptions = [
  { value: "Novo", label: "Novo" },
  { value: "Em contato", label: "Em contato" },
  { value: "Proposta enviada", label: "Proposta enviada" },
  { value: "Fechado", label: "Fechado" },
  { value: "Perdido", label: "Arquivado" },
];

const state = {
  data: normalizeData(emptyData),
  page: "overview",
  filters: {
    services: "",
    projects: "",
    projectStatus: "Todos",
    videos: "",
    videoStatus: "Todos",
    clients: "",
    testimonials: "",
    leads: "",
    leadStatus: "Todos",
    media: "",
    mediaType: "Todos",
  },
  media: [],
  mediaLoaded: false,
  csrfToken: "",
  drag: null,
};

let drawerDirty = false;
let pendingConfirmResolve = null;
let lastFocusedBeforeEditor = null;

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function text(value = "", fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function truncate(value = "", length = 120) {
  const normalized = text(value);
  if (normalized.length <= length) return normalized;
  return `${normalized.slice(0, length - 1).trim()}...`;
}

function slug(value = "item") {
  return text(value, "item")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function generateUuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = Math.random() * 16 | 0;
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function isValidUuid(value = "") {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function normalizeUuid(value, fallback = generateUuid()) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  const candidate = raw.replace(/^video-/i, "");
  return isValidUuid(candidate) ? candidate : fallback;
}

function createId(prefix) {
  return `${prefix}-${generateUuid()}`;
}

function sortByPosition(items = []) {
  return [...items]
    .map((item, index) => ({
      ...item,
      id: item.id || `item-${slug(item.title || item.name || item.label || item.value || index)}`,
      position: Number.isFinite(Number(item.position)) ? Number(item.position) : index,
    }))
    .sort((a, b) => Number(a.position) - Number(b.position));
}

function normalizePublicationStatus(value) {
  return ["Publicado", "Rascunho", "Oculto"].includes(value) ? value : "Publicado";
}

function normalizeData(data = {}) {
  const services = Array.isArray(data.services) && data.services.length > 0 ? data.services : defaultServices;
  return {
    content: { ...defaultContent, ...(data.content || {}) },
    links: { ...emptyData.links, ...(data.links || {}) },
    projects: sortByPosition(Array.isArray(data.projects) ? data.projects : []).map((project, index) => ({
      ...project,
      id: project.id || `project-${slug(project.title || index)}`,
      status: normalizePublicationStatus(project.status),
      gallery: Array.isArray(project.gallery) ? project.gallery : [],
      position: Number.isFinite(Number(project.position)) ? Number(project.position) : index,
    })),
    videos: sortByPosition(Array.isArray(data.videos) ? data.videos : []).map((video, index) => ({
      ...video,
      id: normalizeUuid(video.id, generateUuid()),
      status: normalizePublicationStatus(video.status),
      position: Number.isFinite(Number(video.position)) ? Number(video.position) : index,
      createdAt: video.createdAt || video.created_at || "",
    })),
    leads: Array.isArray(data.leads) ? data.leads : [],
    services: sortByPosition(services).map((service, index) => ({
      ...service,
      id: service.id || `service-${slug(service.title || index)}`,
      status: normalizePublicationStatus(service.status),
      position: Number.isFinite(Number(service.position)) ? Number(service.position) : index,
    })),
    logos: sortByPosition(Array.isArray(data.logos) ? data.logos : []).map((logo, index) => ({
      ...logo,
      id: logo.id || `client-${slug(logo.name || index)}`,
      status: normalizePublicationStatus(logo.status),
      position: Number.isFinite(Number(logo.position)) ? Number(logo.position) : index,
    })),
    testimonials: sortByPosition(Array.isArray(data.testimonials) ? data.testimonials : []).map((testimonial, index) => ({
      ...testimonial,
      id: testimonial.id || `testimonial-${slug(testimonial.name || index)}`,
      status: normalizePublicationStatus(testimonial.status),
      position: Number.isFinite(Number(testimonial.position)) ? Number(testimonial.position) : index,
    })),
    metrics: sortByPosition(Array.isArray(data.metrics) ? data.metrics : []).map((metric, index) => ({
      ...metric,
      id: metric.id || `metric-${slug(metric.label || metric.value || index)}`,
      status: normalizePublicationStatus(metric.status),
      position: Number.isFinite(Number(metric.position)) ? Number(metric.position) : index,
    })),
  };
}

async function apiRequest(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };
  const method = String(options.method || "GET").toUpperCase();

  if (options.body !== undefined && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (!["GET", "HEAD"].includes(method) && state.csrfToken) {
    headers["X-CSRF-Token"] = state.csrfToken;
  }

  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      state.csrfToken = "";
      showLogin("Sua sessão expirou. Entre novamente para salvar alterações.");
    }
    throw new Error(payload.error || "Não foi possível concluir a ação.");
  }

  return payload;
}

function showLogin(message = "") {
  loginScreen.hidden = false;
  adminArea.hidden = true;
  setInlineMessage(loginMessage, message, Boolean(message));
}

function showAdmin() {
  loginScreen.hidden = true;
  adminArea.hidden = false;
}

function setInlineMessage(element, message, isError = false) {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function showToast(message, type = "success") {
  if (!toastRegion) return;
  const toast = document.createElement("div");
  toast.className = `cms-toast ${type}`;
  toast.textContent = message;
  toastRegion.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 220);
  }, 3600);
}

function confirmAction({ title = "Confirmar ação?", message = "Deseja continuar?", confirmLabel = "Confirmar", danger = true } = {}) {
  return new Promise((resolve) => {
    pendingConfirmResolve = resolve;
    confirmTitle.textContent = title;
    confirmText.textContent = message;
    confirmOk.textContent = confirmLabel;
    confirmOk.classList.toggle("danger", danger);
    confirmDialogElement.hidden = false;
    confirmOk.focus();
  });
}

function resolveConfirm(value) {
  if (pendingConfirmResolve) pendingConfirmResolve(value);
  pendingConfirmResolve = null;
  confirmDialogElement.hidden = true;
}

function openSidebar() {
  sidebar?.classList.add("open");
  sidebarOverlay?.classList.add("open");
  document.body.classList.add("cms-menu-open");
}

function closeSidebar() {
  sidebar?.classList.remove("open");
  sidebarOverlay?.classList.remove("open");
  document.body.classList.remove("cms-menu-open");
}

function setPage(page) {
  if (!pageMeta[page]) return;
  state.page = page;
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  closeSidebar();
  renderPage();
  if (page === "media" && !state.mediaLoaded) {
    loadMediaLibrary();
  }
}

function openEditor({ title, kicker = "Editar", body }) {
  lastFocusedBeforeEditor = document.activeElement;
  drawerDirty = false;
  editorTitle.textContent = title;
  editorKicker.textContent = kicker;
  editorBody.innerHTML = body;
  editor.classList.add("open");
  editor.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  editorBody.querySelector("input, textarea, select, button")?.focus();
}

async function closeEditor(force = false) {
  if (drawerDirty && !force) {
    const shouldClose = await confirmAction({
      title: "Sair sem salvar?",
      message: "Você possui alterações não salvas. Deseja sair mesmo assim?",
      confirmLabel: "Sair sem salvar",
      danger: true,
    });
    if (!shouldClose) return;
  }

  drawerDirty = false;
  editor.classList.remove("open");
  editor.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
  editorBody.innerHTML = "";
  lastFocusedBeforeEditor?.focus?.();
}

function statusBadge(status = "Publicado") {
  const normalized = normalizePublicationStatus(status);
  return `<span class="cms-status ${normalized.toLowerCase().replace(/\s+/g, "-")}">${escapeHtml(normalized)}</span>`;
}

function leadStatusLabel(status = "Novo") {
  return leadStatusOptions.find((option) => option.value === status)?.label || status;
}

function leadStatusBadge(status = "Novo") {
  const className = status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  return `<span class="cms-status lead-${className}">${escapeHtml(leadStatusLabel(status))}</span>`;
}

function formatDate(value) {
  if (!value) return "Sem data";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function formatFileSize(value = 0) {
  const size = Number(value || 0);
  if (!Number.isFinite(size) || size <= 0) return "Tamanho não informado";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

function titleFromFileName(fileName = "Vídeo enviado") {
  const baseName = String(fileName || "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return baseName || "Vídeo enviado";
}

function isDirectVideoUrl(url = "") {
  try {
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

function getVideoContentType(file) {
  if (acceptedVideoTypes.has(file.type)) return file.type;
  const extension = file.name.split(".").pop()?.toLowerCase();
  return {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    mov: "video/quicktime",
  }[extension] || "";
}

function isAcceptedVideoFile(file) {
  return acceptedVideoTypes.has(file.type) || acceptedVideoExtensions.test(file.name);
}

function isAcceptedImageFile(file) {
  return acceptedImageTypes.has(file.type) || acceptedImageExtensions.test(file.name);
}

function getImageContentType(file) {
  if (acceptedImageTypes.has(file.type)) return file.type;
  const extension = file.name.split(".").pop()?.toLowerCase();
  return {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heif",
  }[extension] || "";
}

function getVideoEmbedUrl(url = "") {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      const shortsMatch = parsedUrl.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      const embedMatch = parsedUrl.pathname.match(/^\/embed\/([^/?]+)/);
      if (embedMatch) return url;
    }
    if (host === "vimeo.com") {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean).pop();
      if (videoId) return `https://player.vimeo.com/video/${videoId}`;
    }
    if (host === "player.vimeo.com") return url;
  } catch {
    return "";
  }
  return "";
}

function getYoutubeId(url = "") {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return parsedUrl.pathname.slice(1);
    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) return videoId;
      const shortsMatch = parsedUrl.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shortsMatch) return shortsMatch[1];
      const embedMatch = parsedUrl.pathname.match(/^\/embed\/([^/?]+)/);
      if (embedMatch) return embedMatch[1];
    }
  } catch {
    return "";
  }
  return "";
}

function getVideoPoster(video = {}) {
  if (video.thumbnail) return video.thumbnail;
  const youtubeId = getYoutubeId(video.url);
  return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "";
}

function mediaPreview(url = "", type = "image", title = "Mídia") {
  if (!url) {
    return `<div class="cms-media-placeholder"><span></span><strong>Sem mídia</strong></div>`;
  }

  if (type === "video" && isDirectVideoUrl(url)) {
    return `<video src="${escapeAttr(url)}" controls muted playsinline preload="metadata" aria-label="${escapeAttr(title)}"></video>`;
  }

  if (type === "video") {
    const poster = getVideoPoster({ url });
    if (poster) {
      return `<img src="${escapeAttr(poster)}" alt="${escapeAttr(title)}" loading="lazy" /><span class="cms-play-chip">Play</span>`;
    }
    return `<div class="cms-media-placeholder"><span></span><strong>Vídeo</strong></div>`;
  }

  return `<img src="${escapeAttr(url)}" alt="${escapeAttr(title)}" loading="lazy" />`;
}

function emptyState(title, description, actionLabel = "", action = "") {
  return `
    <div class="cms-empty">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(description)}</p>
      ${
        actionLabel
          ? `<button type="button" class="cms-button primary" data-action="${escapeAttr(action)}">${escapeHtml(actionLabel)}</button>`
          : ""
      }
    </div>
  `;
}

function pageHeader(title, description, actionLabel = "", action = "") {
  return `
    <div class="cms-page-head">
      <div>
        <span>Alves Connect CMS</span>
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(description)}</p>
      </div>
      ${
        actionLabel
          ? `<button type="button" class="cms-button primary" data-action="${escapeAttr(action)}">${escapeHtml(actionLabel)}</button>`
          : ""
      }
    </div>
  `;
}

function searchToolbar({ searchKey, searchPlaceholder, statusKey = "", statusLabel = "Status" }) {
  return `
    <div class="cms-toolbar">
      <label class="cms-search">
        <span>Buscar</span>
        <input data-filter-input="${escapeAttr(searchKey)}" value="${escapeAttr(state.filters[searchKey] || "")}" placeholder="${escapeAttr(
          searchPlaceholder,
        )}" />
      </label>
      ${
        statusKey
          ? `<label class="cms-compact-field">
              <span>${escapeHtml(statusLabel)}</span>
              <select data-filter-input="${escapeAttr(statusKey)}">
                ${["Todos", "Publicado", "Rascunho", "Oculto"]
                  .map((status) => `<option value="${status}" ${state.filters[statusKey] === status ? "selected" : ""}>${status}</option>`)
                  .join("")}
              </select>
            </label>`
          : ""
      }
    </div>
  `;
}

function field({ name, label, value = "", placeholder = "", type = "text", required = false, hint = "", max = "" }) {
  return `
    <label class="cms-field">
      <span>${escapeHtml(label)}</span>
      <input
        name="${escapeAttr(name)}"
        value="${escapeAttr(value)}"
        placeholder="${escapeAttr(placeholder)}"
        type="${escapeAttr(type)}"
        ${required ? "required" : ""}
        ${max ? `maxlength="${escapeAttr(max)}"` : ""}
      />
      ${hint ? `<small>${escapeHtml(hint)}</small>` : ""}
    </label>
  `;
}

function textareaField({ name, label, value = "", placeholder = "", required = false, rows = 4, hint = "", max = "" }) {
  return `
    <label class="cms-field">
      <span>${escapeHtml(label)}</span>
      <textarea
        name="${escapeAttr(name)}"
        rows="${escapeAttr(rows)}"
        placeholder="${escapeAttr(placeholder)}"
        ${required ? "required" : ""}
        ${max ? `maxlength="${escapeAttr(max)}"` : ""}
      >${escapeHtml(value)}</textarea>
      ${hint ? `<small>${escapeHtml(hint)}</small>` : ""}
    </label>
  `;
}

function selectField({ name, label, value = "", options = [], hint = "" }) {
  return `
    <label class="cms-field">
      <span>${escapeHtml(label)}</span>
      <select name="${escapeAttr(name)}">
        ${options
          .map((option) => {
            const optionValue = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            return `<option value="${escapeAttr(optionValue)}" ${optionValue === value ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`;
          })
          .join("")}
      </select>
      ${hint ? `<small>${escapeHtml(hint)}</small>` : ""}
    </label>
  `;
}

function uploadField({ target, label, type = "image", value = "", title = "", hint = "" }) {
  const accept =
    type === "video"
      ? videoAccept
      : type === "mixed"
        ? `${imageAccept},${videoAccept}`
        : imageAccept;
  const buttonLabel = value ? "Trocar mídia" : type === "video" ? "Enviar vídeo" : type === "mixed" ? "Enviar mídia" : "Enviar imagem";
  const secondaryLabel = type === "video" ? "Ou cole um link do YouTube, Vimeo ou MP4" : "Ou cole uma URL de imagem";
  const previewType = type === "mixed" ? (isDirectVideoUrl(value) || getVideoEmbedUrl(value) ? "video" : "image") : type;

  return `
    <div class="cms-upload" data-upload="${escapeAttr(type)}" data-target="${escapeAttr(target)}">
      <div class="cms-upload-preview" data-upload-preview>
        ${mediaPreview(value, previewType, title || label)}
      </div>
      <div class="cms-upload-controls">
        <strong>${escapeHtml(label)}</strong>
        <p>${escapeHtml(hint || "Envie pelo computador ou celular. O sistema salva a URL automaticamente.")}</p>
        <div class="cms-upload-actions">
          <label class="cms-button secondary cms-file-button">
            <span>${escapeHtml(buttonLabel)}</span>
            <input class="cms-hidden-file" type="file" accept="${escapeAttr(accept)}" data-upload-input />
          </label>
          <button type="button" class="cms-button ghost" data-clear-media="${escapeAttr(target)}">Remover</button>
        </div>
        <label class="cms-field cms-url-field">
          <span>${escapeHtml(secondaryLabel)}</span>
          <input name="${escapeAttr(target)}" value="${escapeAttr(value)}" placeholder="${type === "video" ? "https://..." : "https://.../imagem.jpg"}" data-upload-url-field />
        </label>
        <div class="cms-upload-status" data-upload-status></div>
      </div>
    </div>
  `;
}

function galleryUploadField(project = {}) {
  const value = Array.isArray(project.gallery) ? project.gallery.join("\n") : "";
  return `
    <div class="cms-gallery-field" data-gallery-upload="gallery">
      ${textareaField({
        name: "gallery",
        label: "Galeria de imagens",
        value,
        rows: 4,
        placeholder: "Uma URL por linha. Você também pode enviar imagens pelo botão abaixo.",
        hint: "Use para imagens extras do projeto. A imagem principal continua sendo o thumbnail.",
      })}
      <div class="cms-upload-actions">
        <label class="cms-button secondary cms-file-button">
          <span>Enviar imagens para galeria</span>
          <input class="cms-hidden-file" type="file" accept="${imageAccept}" multiple data-gallery-input />
        </label>
      </div>
      <div class="cms-upload-status" data-gallery-status></div>
    </div>
  `;
}

function formActions(saveLabel = "Salvar alterações") {
  return `
    <div class="cms-drawer-actions">
      <span data-dirty-message hidden>Alterações não salvas</span>
      <button type="button" class="cms-button secondary" data-editor-cancel>Cancelar</button>
      <button type="submit" class="cms-button primary">${escapeHtml(saveLabel)}</button>
    </div>
  `;
}

function renderPage() {
  const [title, kicker] = pageMeta[state.page] || pageMeta.overview;
  pageTitle.textContent = title;
  pageKicker.textContent = kicker;

  const renderers = {
    overview: renderOverview,
    content: renderContent,
    services: renderServicesPage,
    projects: renderProjectsPage,
    videos: renderVideosPage,
    clients: renderClientsPage,
    testimonials: renderTestimonialsPage,
    leads: renderLeadsPage,
    contacts: renderContactsPage,
    media: renderMediaPage,
    settings: renderSettingsPage,
  };

  view.innerHTML = renderers[state.page]?.() || "";
}

function renderOverview() {
  const publishedProjects = state.data.projects.filter((item) => item.status === "Publicado").length;
  const publishedVideos = state.data.videos.filter((item) => item.status === "Publicado").length;
  const newLeads = state.data.leads.filter((lead) => !lead.status || lead.status === "Novo").length;
  const recentItems = buildRecentActivity();

  return `
    ${pageHeader("Visão Geral", "Um resumo simples do que está publicado e do que precisa de atenção.")}
    <section class="cms-dashboard-grid">
      ${statCard("Projetos publicados", publishedProjects, "Cases visíveis no portfólio")}
      ${statCard("Serviços", state.data.services.length, "Itens cadastrados")}
      ${statCard("Vídeos", publishedVideos, "Materiais publicados")}
      ${statCard("Leads", state.data.leads.length, `${newLeads} novo${newLeads === 1 ? "" : "s"}`)}
      ${statCard("Clientes", state.data.logos.length, "Logos cadastrados")}
      ${statCard("Depoimentos", state.data.testimonials.length, "Provas sociais")}
    </section>

    <section class="cms-split">
      <article class="cms-panel">
        <div class="cms-panel-head">
          <span>Ações rápidas</span>
          <h3>Comece pelo que você quer atualizar</h3>
        </div>
        <div class="cms-quick-actions">
          <button type="button" class="cms-button primary" data-action="new-project">Novo projeto</button>
          <button type="button" class="cms-button secondary" data-action="new-video">Novo vídeo</button>
          <button type="button" class="cms-button secondary" data-action="new-service">Novo serviço</button>
          <button type="button" class="cms-button secondary" data-action="new-client">Adicionar cliente</button>
          <button type="button" class="cms-button secondary" data-action="new-testimonial">Adicionar depoimento</button>
        </div>
      </article>

      <article class="cms-panel">
        <div class="cms-panel-head">
          <span>Atividade recente</span>
          <h3>Últimas movimentações reais</h3>
        </div>
        ${
          recentItems.length
            ? `<div class="cms-activity-list">${recentItems
                .map(
                  (item) => `
                    <div>
                      <strong>${escapeHtml(item.title)}</strong>
                      <span>${escapeHtml(item.meta)}</span>
                    </div>
                  `,
                )
                .join("")}</div>`
            : emptyState("Nenhuma atividade com data ainda", "Quando novos leads e vídeos forem cadastrados, eles aparecerão aqui.")
        }
      </article>
    </section>
  `;
}

function statCard(label, value, description) {
  return `
    <article class="cms-stat-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <p>${escapeHtml(description)}</p>
    </article>
  `;
}

function buildRecentActivity() {
  const leads = state.data.leads
    .filter((lead) => lead.createdAt)
    .map((lead) => ({
      date: lead.createdAt,
      title: `Novo lead: ${lead.name || "Contato recebido"}`,
      meta: formatDate(lead.createdAt),
    }));

  const videos = state.data.videos
    .filter((video) => video.createdAt)
    .map((video) => ({
      date: video.createdAt,
      title: `Vídeo cadastrado: ${video.title}`,
      meta: formatDate(video.createdAt),
    }));

  return [...leads, ...videos]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
}

function renderContent() {
  return `
    ${pageHeader("Conteúdo do Site", "Edite cada parte do site de forma isolada, sem procurar em uma lista enorme.")}
    <section class="cms-content-grid">
      ${contentSections.map((section) => renderContentCard(section)).join("")}
    </section>
  `;
}

function renderContentCard(section) {
  const values = section.keys.map((key) => state.data.content[key]).filter(Boolean);
  return `
    <article class="cms-content-card">
      <div>
        <span>${escapeHtml(section.title)}</span>
        <h3>${escapeHtml(values[0] || section.title)}</h3>
        <p>${escapeHtml(truncate(values.slice(1).join(" "), 180) || section.description)}</p>
      </div>
      <div class="cms-card-actions">
        <a class="cms-button ghost" href="index.html#${escapeAttr(section.anchor)}" target="_blank" rel="noopener">Ver seção</a>
        <button type="button" class="cms-button secondary" data-action="edit-content" data-id="${escapeAttr(section.id)}">Editar</button>
      </div>
    </article>
  `;
}

function renderServicesPage() {
  const filtered = state.data.services.filter((service) => matchesSearch(service, state.filters.services, ["title", "description"]));
  return `
    ${pageHeader("Serviços", "Gerencie nome, descrição, mídia, ordem e visibilidade dos serviços.", "Adicionar serviço", "new-service")}
    ${searchToolbar({ searchKey: "services", searchPlaceholder: "Buscar serviço..." })}
    <section class="cms-card-grid">
      ${
        filtered.length
          ? filtered.map((service) => renderServiceCard(service)).join("")
          : emptyState("Nenhum serviço encontrado", "Cadastre ou ajuste a busca para visualizar os serviços.", "Adicionar serviço", "new-service")
      }
    </section>
  `;
}

function renderServiceCard(service) {
  return `
    <article class="cms-item-card" draggable="true" data-drag-type="services" data-id="${escapeAttr(service.id)}">
      <div class="cms-item-media">
        ${mediaPreview(service.mediaUrl, service.mediaType === "video" ? "video" : "image", service.title)}
      </div>
      <div class="cms-item-body">
        <div class="cms-item-meta">
          <span>${escapeHtml(service.number || "00")}</span>
          ${statusBadge(service.status)}
        </div>
        <h3>${escapeHtml(service.title)}</h3>
        <p>${escapeHtml(truncate(service.description, 150))}</p>
      </div>
      <div class="cms-card-actions">
        <button type="button" class="cms-icon-button" data-action="move-up" data-type="services" data-id="${escapeAttr(service.id)}" aria-label="Mover para cima">↑</button>
        <button type="button" class="cms-icon-button" data-action="move-down" data-type="services" data-id="${escapeAttr(service.id)}" aria-label="Mover para baixo">↓</button>
        <button type="button" class="cms-button secondary" data-action="edit-service" data-id="${escapeAttr(service.id)}">Editar</button>
        <button type="button" class="cms-button danger ghost-danger" data-action="delete-service" data-id="${escapeAttr(service.id)}">Excluir</button>
      </div>
    </article>
  `;
}

function renderProjectsPage() {
  const filtered = state.data.projects.filter((project) => {
    const bySearch = matchesSearch(project, state.filters.projects, ["title", "client", "category", "description"]);
    const byStatus = state.filters.projectStatus === "Todos" || project.status === state.filters.projectStatus;
    return bySearch && byStatus;
  });
  return `
    ${pageHeader("Projetos", "Cadastre trabalhos do portfólio com imagem, galeria, vídeo e status.", "Novo projeto", "new-project")}
    ${searchToolbar({ searchKey: "projects", searchPlaceholder: "Buscar projeto...", statusKey: "projectStatus" })}
    <section class="cms-card-grid cms-project-grid">
      ${
        filtered.length
          ? filtered.map((project) => renderProjectCard(project)).join("")
          : emptyState("Nenhum projeto encontrado", "Crie um projeto ou ajuste a busca para ver os cards.", "Novo projeto", "new-project")
      }
    </section>
  `;
}

function renderProjectCard(project) {
  return `
    <article class="cms-item-card" draggable="true" data-drag-type="projects" data-id="${escapeAttr(project.id)}">
      <div class="cms-item-media">
        ${mediaPreview(project.thumbnail, "image", project.title)}
      </div>
      <div class="cms-item-body">
        <div class="cms-item-meta">
          <span>${escapeHtml(project.category || "Projeto")}</span>
          ${statusBadge(project.status)}
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(truncate(project.description, 150))}</p>
        <small>${escapeHtml([project.client, project.serviceDone].filter(Boolean).join(" • ") || "Sem cliente informado")}</small>
      </div>
      <div class="cms-card-actions">
        <button type="button" class="cms-icon-button" data-action="move-up" data-type="projects" data-id="${escapeAttr(project.id)}" aria-label="Mover para cima">↑</button>
        <button type="button" class="cms-icon-button" data-action="move-down" data-type="projects" data-id="${escapeAttr(project.id)}" aria-label="Mover para baixo">↓</button>
        <button type="button" class="cms-button secondary" data-action="edit-project" data-id="${escapeAttr(project.id)}">Editar</button>
        <button type="button" class="cms-button ghost" data-action="duplicate-project" data-id="${escapeAttr(project.id)}">Duplicar</button>
        <button type="button" class="cms-button danger ghost-danger" data-action="delete-project" data-id="${escapeAttr(project.id)}">Excluir</button>
      </div>
    </article>
  `;
}

function renderVideosPage() {
  const filtered = state.data.videos.filter((video) => {
    const bySearch = matchesSearch(video, state.filters.videos, ["title", "description", "url"]);
    const byStatus = state.filters.videoStatus === "Todos" || video.status === state.filters.videoStatus;
    return bySearch && byStatus;
  });
  return `
    ${pageHeader("Vídeos", "Adicione vídeos enviados do dispositivo, YouTube, Vimeo ou links externos.", "Adicionar vídeo", "new-video")}
    ${searchToolbar({ searchKey: "videos", searchPlaceholder: "Buscar vídeo...", statusKey: "videoStatus" })}
    <section class="cms-card-grid cms-video-grid">
      ${
        filtered.length
          ? filtered.map((video) => renderVideoCard(video)).join("")
          : emptyState("Nenhum vídeo encontrado", "Envie um vídeo ou cole um link para ele aparecer no site.", "Adicionar vídeo", "new-video")
      }
    </section>
  `;
}

function renderVideoCard(video) {
  const sourceLabel = isDirectVideoUrl(video.url) ? "Vídeo enviado" : getVideoEmbedUrl(video.url) ? "Vídeo incorporado" : "Link externo";
  const poster = getVideoPoster(video);
  const previewType = poster ? "image" : isDirectVideoUrl(video.url) ? "video" : "video";
  const previewUrl = poster || (isDirectVideoUrl(video.url) ? video.url : "");
  return `
    <article class="cms-item-card" draggable="true" data-drag-type="videos" data-id="${escapeAttr(video.id)}">
      <div class="cms-item-media cms-video-media">
        ${mediaPreview(previewUrl, previewType, video.title)}
      </div>
      <div class="cms-item-body">
        <div class="cms-item-meta">
          <span>${escapeHtml(sourceLabel)}</span>
          ${statusBadge(video.status)}
        </div>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(truncate(video.description, 150))}</p>
      </div>
      <div class="cms-card-actions">
        <button type="button" class="cms-icon-button" data-action="move-up" data-type="videos" data-id="${escapeAttr(video.id)}" aria-label="Mover para cima">↑</button>
        <button type="button" class="cms-icon-button" data-action="move-down" data-type="videos" data-id="${escapeAttr(video.id)}" aria-label="Mover para baixo">↓</button>
        <button type="button" class="cms-button ghost" data-action="preview-video" data-id="${escapeAttr(video.id)}">Visualizar</button>
        <button type="button" class="cms-button secondary" data-action="edit-video" data-id="${escapeAttr(video.id)}">Editar</button>
        <button type="button" class="cms-button danger ghost-danger" data-action="delete-video" data-id="${escapeAttr(video.id)}">Excluir</button>
      </div>
    </article>
  `;
}

function renderClientsPage() {
  const filtered = state.data.logos.filter((logo) => matchesSearch(logo, state.filters.clients, ["name", "imageUrl"]));
  return `
    ${pageHeader("Clientes", "Cadastre logos de clientes e marcas com upload direto.", "Adicionar cliente", "new-client")}
    ${searchToolbar({ searchKey: "clients", searchPlaceholder: "Buscar cliente..." })}
    <section class="cms-card-grid cms-logo-grid">
      ${
        filtered.length
          ? filtered.map((logo) => renderClientCard(logo)).join("")
          : emptyState("Nenhum cliente cadastrado", "Adicione logos autorizados para exibir na seção de autoridade.", "Adicionar cliente", "new-client")
      }
    </section>
  `;
}

function renderClientCard(logo) {
  return `
    <article class="cms-item-card cms-logo-card" draggable="true" data-drag-type="logos" data-id="${escapeAttr(logo.id)}">
      <div class="cms-logo-preview">${mediaPreview(logo.imageUrl, "image", logo.name)}</div>
      <div class="cms-item-body">
        <div class="cms-item-meta">${statusBadge(logo.status)}</div>
        <h3>${escapeHtml(logo.name)}</h3>
      </div>
      <div class="cms-card-actions">
        <button type="button" class="cms-icon-button" data-action="move-up" data-type="logos" data-id="${escapeAttr(logo.id)}" aria-label="Mover para cima">↑</button>
        <button type="button" class="cms-icon-button" data-action="move-down" data-type="logos" data-id="${escapeAttr(logo.id)}" aria-label="Mover para baixo">↓</button>
        <button type="button" class="cms-button secondary" data-action="edit-client" data-id="${escapeAttr(logo.id)}">Editar</button>
        <button type="button" class="cms-button danger ghost-danger" data-action="delete-client" data-id="${escapeAttr(logo.id)}">Excluir</button>
      </div>
    </article>
  `;
}

function renderTestimonialsPage() {
  const filtered = state.data.testimonials.filter((testimonial) =>
    matchesSearch(testimonial, state.filters.testimonials, ["name", "company", "role", "quote"]),
  );
  return `
    ${pageHeader("Depoimentos", "Gerencie depoimentos reais com foto, cargo, empresa e status.", "Novo depoimento", "new-testimonial")}
    ${searchToolbar({ searchKey: "testimonials", searchPlaceholder: "Buscar depoimento..." })}
    <section class="cms-card-grid">
      ${
        filtered.length
          ? filtered.map((testimonial) => renderTestimonialCard(testimonial)).join("")
          : emptyState("Nenhum depoimento cadastrado", "Adicione depoimentos autorizados para fortalecer a autoridade do site.", "Novo depoimento", "new-testimonial")
      }
    </section>
  `;
}

function renderTestimonialCard(testimonial) {
  return `
    <article class="cms-item-card" draggable="true" data-drag-type="testimonials" data-id="${escapeAttr(testimonial.id)}">
      <div class="cms-avatar-preview">${mediaPreview(testimonial.photoUrl, "image", testimonial.name)}</div>
      <div class="cms-item-body">
        <div class="cms-item-meta">
          <span>${escapeHtml([testimonial.company, testimonial.role].filter(Boolean).join(" • ") || "Depoimento")}</span>
          ${statusBadge(testimonial.status)}
        </div>
        <h3>${escapeHtml(testimonial.name)}</h3>
        <p>${escapeHtml(truncate(testimonial.quote, 180))}</p>
      </div>
      <div class="cms-card-actions">
        <button type="button" class="cms-icon-button" data-action="move-up" data-type="testimonials" data-id="${escapeAttr(testimonial.id)}" aria-label="Mover para cima">↑</button>
        <button type="button" class="cms-icon-button" data-action="move-down" data-type="testimonials" data-id="${escapeAttr(testimonial.id)}" aria-label="Mover para baixo">↓</button>
        <button type="button" class="cms-button secondary" data-action="edit-testimonial" data-id="${escapeAttr(testimonial.id)}">Editar</button>
        <button type="button" class="cms-button danger ghost-danger" data-action="delete-testimonial" data-id="${escapeAttr(testimonial.id)}">Excluir</button>
      </div>
    </article>
  `;
}

function renderLeadsPage() {
  const filtered = state.data.leads.filter((lead) => {
    const bySearch = matchesSearch(lead, state.filters.leads, ["name", "company", "phone", "service", "message"]);
    const byStatus = state.filters.leadStatus === "Todos" || lead.status === state.filters.leadStatus;
    return bySearch && byStatus;
  });

  return `
    ${pageHeader("Leads", "Acompanhe contatos recebidos pelo formulário do site.")}
    <div class="cms-toolbar">
      <label class="cms-search">
        <span>Buscar</span>
        <input data-filter-input="leads" value="${escapeAttr(state.filters.leads)}" placeholder="Buscar por nome, telefone ou serviço..." />
      </label>
      <label class="cms-compact-field">
        <span>Status</span>
        <select data-filter-input="leadStatus">
          <option value="Todos" ${state.filters.leadStatus === "Todos" ? "selected" : ""}>Todos</option>
          ${leadStatusOptions
            .map((option) => `<option value="${escapeAttr(option.value)}" ${state.filters.leadStatus === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
            .join("")}
        </select>
      </label>
    </div>
    <section class="cms-lead-list">
      ${
        filtered.length
          ? filtered.map((lead) => renderLeadRow(lead)).join("")
          : emptyState("Nenhum lead encontrado", "Quando alguém enviar o formulário do site, o contato aparecerá aqui.")
      }
    </section>
  `;
}

function renderLeadRow(lead) {
  const whatsappLink = getLeadWhatsAppLink(lead);
  const emailLink = lead.email ? `mailto:${lead.email}` : "";
  return `
    <article class="cms-lead-row">
      <div>
        <strong>${escapeHtml(lead.name || "Sem nome")}</strong>
        <span>${escapeHtml([lead.company, lead.phone, formatDate(lead.createdAt)].filter(Boolean).join(" • "))}</span>
      </div>
      <div>
        <small>Interesse</small>
        <p>${escapeHtml(lead.service || "Não informado")}</p>
      </div>
      <label class="cms-inline-select">
        <span>Status</span>
        <select data-lead-status="${escapeAttr(lead.id)}">
          ${leadStatusOptions
            .map((option) => `<option value="${escapeAttr(option.value)}" ${lead.status === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
            .join("")}
        </select>
      </label>
      <div class="cms-lead-actions">
        ${leadStatusBadge(lead.status || "Novo")}
        <button type="button" class="cms-button ghost" data-action="open-lead" data-id="${escapeAttr(lead.id)}">Abrir</button>
        ${whatsappLink ? `<a class="cms-button secondary" href="${escapeAttr(whatsappLink)}" target="_blank" rel="noopener">WhatsApp</a>` : ""}
        ${emailLink ? `<a class="cms-button secondary" href="${escapeAttr(emailLink)}">E-mail</a>` : ""}
        <button type="button" class="cms-button danger ghost-danger" data-action="delete-lead" data-id="${escapeAttr(lead.id)}">Excluir</button>
      </div>
    </article>
  `;
}

function renderContactsPage() {
  const links = state.data.links || {};
  return `
    ${pageHeader("Contatos e Redes", "Preencha dados simples. O sistema monta os links técnicos automaticamente.")}
    <section class="cms-panel cms-narrow-panel">
      <form class="cms-form" data-form="contacts">
        ${field({
          name: "instagram",
          label: "Instagram",
          value: toFriendlyInstagram(links.instagram),
          placeholder: "@alvesconnect",
          hint: "Pode ser @usuario ou link completo.",
        })}
        ${field({
          name: "whatsapp",
          label: "WhatsApp",
          value: toFriendlyWhatsApp(links.whatsapp),
          placeholder: "(61) 99400-4991",
          hint: "Pode escrever só o número com DDD.",
        })}
        ${field({
          name: "email",
          label: "E-mail",
          value: toFriendlyEmail(links.email),
          placeholder: "contato@alvesconnect.com.br",
        })}
        ${textareaField({
          name: "whatsappMessage",
          label: "Mensagem padrão do WhatsApp",
          value: state.data.content.whatsappMessage || defaultContent.whatsappMessage,
          rows: 3,
          max: 300,
          hint: "Essa mensagem é usada nos botões de WhatsApp do site.",
        })}
        <div class="cms-form-actions">
          <button type="submit" class="cms-button primary">Salvar contatos</button>
        </div>
      </form>
    </section>
  `;
}

function renderMediaPage() {
  const filtered = state.media.filter((item) => {
    const byType = state.filters.mediaType === "Todos" || item.type === state.filters.mediaType;
    const query = state.filters.media.toLowerCase();
    const bySearch = !query || [item.name, item.url, ...(item.usedIn || [])].join(" ").toLowerCase().includes(query);
    return byType && bySearch;
  });

  return `
    ${pageHeader("Biblioteca de Mídia", "Veja imagens e vídeos enviados pelo painel.")}
    <section class="cms-panel cms-media-uploader-panel">
      <div>
        <span class="cms-panel-label">Enviar nova mídia</span>
        <h3>Arquivos disponíveis para usar no site</h3>
        <p>Depois de enviar, copie a URL ou selecione a mídia dentro de projetos, serviços, vídeos, clientes e depoimentos.</p>
      </div>
      <div class="cms-upload-actions">
        <label class="cms-button secondary cms-file-button">
          <span>Enviar imagem</span>
          <input class="cms-hidden-file" type="file" accept="${imageAccept}" data-media-upload-input="image" />
        </label>
        <label class="cms-button secondary cms-file-button">
          <span>Enviar vídeo</span>
          <input class="cms-hidden-file" type="file" accept="${videoAccept}" data-media-upload-input="video" />
        </label>
      </div>
      <div class="cms-upload-status" data-media-upload-status></div>
    </section>

    <div class="cms-toolbar">
      <label class="cms-search">
        <span>Buscar</span>
        <input data-filter-input="media" value="${escapeAttr(state.filters.media)}" placeholder="Buscar mídia..." />
      </label>
      <label class="cms-compact-field">
        <span>Tipo</span>
        <select data-filter-input="mediaType">
          <option value="Todos" ${state.filters.mediaType === "Todos" ? "selected" : ""}>Todos</option>
          <option value="image" ${state.filters.mediaType === "image" ? "selected" : ""}>Imagens</option>
          <option value="video" ${state.filters.mediaType === "video" ? "selected" : ""}>Vídeos</option>
        </select>
      </label>
      <button type="button" class="cms-button ghost" data-action="refresh-media">Atualizar</button>
    </div>

    <section class="cms-media-grid">
      ${
        state.mediaLoaded
          ? filtered.length
            ? filtered.map((item) => renderMediaCard(item)).join("")
            : emptyState("Nenhuma mídia encontrada", "Envie imagens ou vídeos para formar a biblioteca do site.")
          : `<div class="cms-skeleton"></div><div class="cms-skeleton"></div><div class="cms-skeleton"></div>`
      }
    </section>
  `;
}

function renderMediaCard(item) {
  const canReplace = item.type === "image" || item.type === "video";
  return `
    <article class="cms-media-card" data-id="${escapeAttr(item.id)}">
      <div class="cms-media-card-preview">
        ${mediaPreview(item.url, item.type, item.name)}
      </div>
      <div class="cms-media-card-body">
        <strong>${escapeHtml(item.name || "Mídia")}</strong>
        <span>${escapeHtml(formatFileSize(item.size))}</span>
        ${item.used ? `<p class="cms-used">Em uso: ${escapeHtml((item.usedIn || []).join(", "))}</p>` : `<p>Arquivo livre para uso.</p>`}
      </div>
      <div class="cms-card-actions">
        <a class="cms-button ghost" href="${escapeAttr(item.url)}" target="_blank" rel="noopener">Visualizar</a>
        <button type="button" class="cms-button secondary" data-action="copy-media" data-id="${escapeAttr(item.id)}">Copiar URL</button>
        ${
          canReplace
            ? `<label class="cms-button secondary cms-file-button">
                 <span>Substituir</span>
                 <input class="cms-hidden-file" type="file" accept="${item.type === "video" ? videoAccept : imageAccept}" data-media-replace-input="${escapeAttr(item.id)}" />
               </label>`
            : ""
        }
        <button type="button" class="cms-button danger ghost-danger" data-action="delete-media" data-id="${escapeAttr(item.id)}">Excluir</button>
      </div>
    </article>
  `;
}

function renderSettingsPage() {
  return `
    ${pageHeader("Configurações", "Ajustes reais disponíveis na estrutura atual do site.")}
    <section class="cms-split">
      <article class="cms-panel">
        <div class="cms-panel-head">
          <span>Identidade</span>
          <h3>Logo do site</h3>
        </div>
        <div class="cms-logo-setting">
          <img src="assets/img/logo-alves-connect-crop.png" alt="Logo Alves Connect" />
          <p>A logo principal está salva em <strong>assets/img/logo-alves-connect-crop.png</strong>.</p>
        </div>
      </article>

      <article class="cms-panel">
        <div class="cms-panel-head">
          <span>Resultados</span>
          <h3>Métricas exibidas no site</h3>
        </div>
        <div class="cms-quick-actions">
          <button type="button" class="cms-button primary" data-action="new-metric">Adicionar métrica</button>
        </div>
        <div class="cms-mini-list">
          ${
            state.data.metrics.length
              ? state.data.metrics.map((metric) => renderMetricRow(metric)).join("")
              : emptyState("Nenhuma métrica cadastrada", "Cadastre apenas métricas reais e conferidas.")
          }
        </div>
      </article>
    </section>
  `;
}

function renderMetricRow(metric) {
  return `
    <div class="cms-mini-row" draggable="true" data-drag-type="metrics" data-id="${escapeAttr(metric.id)}">
      <div>
        <strong>${escapeHtml(metric.value)} ${escapeHtml(metric.label)}</strong>
        <span>${escapeHtml(metric.description || "Sem descrição")}</span>
      </div>
      ${statusBadge(metric.status)}
      <button type="button" class="cms-button secondary" data-action="edit-metric" data-id="${escapeAttr(metric.id)}">Editar</button>
      <button type="button" class="cms-button danger ghost-danger" data-action="delete-metric" data-id="${escapeAttr(metric.id)}">Excluir</button>
    </div>
  `;
}

function matchesSearch(item, query, keys) {
  const normalized = text(query).toLowerCase();
  if (!normalized) return true;
  return keys.some((key) => String(item[key] || "").toLowerCase().includes(normalized));
}

function findById(type, id) {
  return (state.data[type] || []).find((item) => item.id === id);
}

function upsertItem(type, item) {
  const list = state.data[type] || [];
  const index = list.findIndex((current) => current.id === item.id);
  const nextList = index >= 0 ? list.map((current, itemIndex) => (itemIndex === index ? item : current)) : [...list, item];
  state.data[type] = nextList.map((entry, itemIndex) => ({ ...entry, position: itemIndex }));
}

function removeItem(type, id) {
  state.data[type] = (state.data[type] || [])
    .filter((item) => item.id !== id)
    .map((entry, index) => ({ ...entry, position: index }));
}

function getSectionsPayload() {
  return {
    services: state.data.services.map((item, index) => ({ ...item, position: index })),
    logos: state.data.logos.map((item, index) => ({ ...item, position: index })),
    testimonials: state.data.testimonials.map((item, index) => ({ ...item, position: index })),
    metrics: state.data.metrics.map((item, index) => ({ ...item, position: index })),
  };
}

async function saveSections(message = "Alterações salvas com sucesso.") {
  state.data = normalizeData(
    await apiRequest("/api/sections", {
      method: "PUT",
      body: JSON.stringify(getSectionsPayload()),
    }),
  );
  renderPage();
  showToast(message);
}

async function saveProjects(projects, message = "Projetos salvos com sucesso.") {
  state.data = normalizeData(
    await apiRequest("/api/projects", {
      method: "PUT",
      body: JSON.stringify({ projects: projects.map((project, index) => ({ ...project, position: index })) }),
    }),
  );
  renderPage();
  showToast(message);
}

async function saveVideos(videos, message = "Vídeos salvos com sucesso.") {
  state.data = normalizeData(
    await apiRequest("/api/videos", {
      method: "PUT",
      body: JSON.stringify({ videos: videos.map((video, index) => ({ ...video, position: index })) }),
    }),
  );
  renderPage();
  showToast(message);
}

function openContentEditor(sectionId) {
  const section = contentSections.find((item) => item.id === sectionId);
  if (!section) return;
  const body = `
    <form class="cms-form" data-editor-form="content" data-section-id="${escapeAttr(section.id)}">
      <div class="cms-editor-preview">
        <span>${escapeHtml(section.title)}</span>
        <strong>${escapeHtml(state.data.content[section.keys[0]] || section.title)}</strong>
        <p>${escapeHtml(truncate(section.keys.slice(1).map((key) => state.data.content[key]).join(" "), 160))}</p>
      </div>
      ${section.fields
        .map((item) =>
          item.type === "textarea"
            ? textareaField({
                name: item.key,
                label: item.label,
                value: state.data.content[item.key],
                rows: 5,
                max: item.max,
                required: true,
              })
            : field({ name: item.key, label: item.label, value: state.data.content[item.key], max: item.max, required: true }),
        )
        .join("")}
      ${formActions("Salvar seção")}
    </form>
  `;
  openEditor({ title: section.title, kicker: "Conteúdo do Site", body });
}

function openServiceEditor(id = "") {
  const service = id
    ? findById("services", id)
    : {
        id: createId("service"),
        number: String(state.data.services.length + 1).padStart(2, "0"),
        title: "",
        description: "",
        mediaUrl: "",
        mediaType: "visual",
        tone: "reels",
        status: "Publicado",
        position: state.data.services.length,
      };
  if (!service) return;

  const body = `
    <form class="cms-form" data-editor-form="service">
      <input type="hidden" name="id" value="${escapeAttr(service.id)}" />
      <div class="cms-form-grid two">
        ${field({ name: "number", label: "Número/ordem", value: service.number, placeholder: "01", required: true })}
        ${field({ name: "position", label: "Posição", value: service.position, type: "number", required: true })}
      </div>
      ${field({ name: "title", label: "Nome do serviço", value: service.title, placeholder: "Gestão de Redes Sociais", required: true })}
      ${textareaField({ name: "description", label: "Descrição", value: service.description, rows: 5, required: true })}
      <div class="cms-form-grid two">
        ${selectField({
          name: "mediaType",
          label: "Tipo de mídia",
          value: service.mediaType || "visual",
          options: [
            { value: "visual", label: "Visual padrão" },
            { value: "image", label: "Imagem" },
            { value: "video", label: "Vídeo" },
          ],
        })}
        ${selectField({
          name: "status",
          label: "Status",
          value: service.status || "Publicado",
          options: ["Publicado", "Rascunho", "Oculto"],
        })}
      </div>
      ${uploadField({
        target: "mediaUrl",
        label: "Mídia do serviço",
        type: "mixed",
        value: service.mediaUrl,
        title: service.title,
        hint: "Use imagem ou vídeo quando quiser substituir o visual padrão.",
      })}
      ${formActions(id ? "Salvar alterações" : "Cadastrar serviço")}
    </form>
  `;
  openEditor({ title: id ? "Editar serviço" : "Adicionar serviço", kicker: "Serviços", body });
}

function openProjectEditor(id = "", duplicate = false) {
  const source = id ? findById("projects", id) : null;
  const project = source
    ? {
        ...source,
        id: duplicate ? createId("project") : source.id,
        title: duplicate ? `${source.title} - cópia` : source.title,
        status: duplicate ? "Rascunho" : source.status,
        position: duplicate ? state.data.projects.length : source.position,
      }
    : {
        id: createId("project"),
        title: "",
        client: "",
        category: "Social Media",
        description: "",
        objective: "",
        serviceDone: "",
        result: "",
        challenge: "",
        strategy: "",
        execution: "",
        thumbnail: "",
        gallery: [],
        videoUrl: "",
        externalUrl: "",
        status: "Publicado",
        position: state.data.projects.length,
        tone: "navy",
      };
  if (!project) return;

  const body = `
    <form class="cms-form" data-editor-form="project">
      <input type="hidden" name="id" value="${escapeAttr(project.id)}" />
      <section class="cms-form-section">
        <h3>Informações básicas</h3>
        ${field({ name: "title", label: "Título", value: project.title, required: true })}
        <div class="cms-form-grid two">
          ${field({ name: "client", label: "Cliente", value: project.client, placeholder: "Nome do cliente" })}
          ${field({ name: "category", label: "Categoria", value: project.category, placeholder: "Social Media" })}
        </div>
        ${textareaField({ name: "description", label: "Descrição", value: project.description, rows: 4, required: true })}
      </section>

      <section class="cms-form-section">
        <h3>Trabalho</h3>
        ${textareaField({ name: "objective", label: "Objetivo", value: project.objective, rows: 3 })}
        ${field({ name: "serviceDone", label: "Serviço realizado", value: project.serviceDone })}
        ${textareaField({ name: "result", label: "Resultado", value: project.result, rows: 3 })}
        ${textareaField({ name: "challenge", label: "Desafio", value: project.challenge, rows: 3 })}
        ${textareaField({ name: "strategy", label: "Estratégia", value: project.strategy, rows: 3 })}
        ${textareaField({ name: "execution", label: "Execução", value: project.execution, rows: 3 })}
      </section>

      <section class="cms-form-section">
        <h3>Mídia</h3>
        ${uploadField({ target: "thumbnail", label: "Imagem principal", type: "image", value: project.thumbnail, title: project.title })}
        ${galleryUploadField(project)}
        ${uploadField({ target: "videoUrl", label: "Vídeo do projeto", type: "video", value: project.videoUrl, title: project.title })}
        ${field({ name: "externalUrl", label: "Link externo", value: project.externalUrl, placeholder: "https://..." })}
      </section>

      <section class="cms-form-section">
        <h3>Publicação</h3>
        <div class="cms-form-grid two">
          ${selectField({ name: "status", label: "Status", value: project.status || "Publicado", options: ["Publicado", "Rascunho", "Oculto"] })}
          ${field({ name: "position", label: "Ordem", value: project.position, type: "number" })}
        </div>
      </section>
      ${formActions(source && !duplicate ? "Salvar alterações" : "Cadastrar projeto")}
    </form>
  `;
  openEditor({ title: source && !duplicate ? "Editar projeto" : "Novo projeto", kicker: "Projetos", body });
}

function openVideoEditor(id = "") {
  const video = id
    ? findById("videos", id)
    : {
        id: generateUuid(),
        title: "",
        description: "",
        url: "",
        thumbnail: "",
        status: "Publicado",
        position: state.data.videos.length,
        createdAt: new Date().toISOString(),
      };
  if (!video) return;

  const body = `
    <form class="cms-form" data-editor-form="video">
      <input type="hidden" name="id" value="${escapeAttr(video.id)}" />
      <input type="hidden" name="createdAt" value="${escapeAttr(video.createdAt || new Date().toISOString())}" />
      <div class="cms-choice-note">
        <strong>Como deseja adicionar?</strong>
        <p>Use upload para vídeo do celular/computador. YouTube, Vimeo e links externos também funcionam.</p>
      </div>
      ${field({ name: "title", label: "Título", value: video.title, placeholder: "Reels para restaurante", required: true })}
      ${textareaField({ name: "description", label: "Descrição", value: video.description, rows: 4 })}
      ${uploadField({
        target: "url",
        label: "Vídeo",
        type: "video",
        value: video.url,
        title: video.title,
        hint: "Envie MP4 sempre que possível. MOV pode não tocar em alguns navegadores.",
      })}
      ${uploadField({ target: "thumbnail", label: "Capa do vídeo", type: "image", value: video.thumbnail, title: video.title })}
      <div class="cms-form-grid two">
        ${selectField({ name: "status", label: "Status", value: video.status || "Publicado", options: ["Publicado", "Rascunho", "Oculto"] })}
        ${field({ name: "position", label: "Ordem", value: video.position, type: "number" })}
      </div>
      ${formActions(id ? "Salvar alterações" : "Cadastrar vídeo")}
    </form>
  `;
  openEditor({ title: id ? "Editar vídeo" : "Adicionar vídeo", kicker: "Vídeos", body });
}

function openVideoPreview(id) {
  const video = findById("videos", id);
  if (!video) return;
  const embedUrl = getVideoEmbedUrl(video.url);
  const player = isDirectVideoUrl(video.url)
    ? `<video src="${escapeAttr(video.url)}" controls playsinline preload="metadata"></video>`
    : embedUrl
      ? `<iframe src="${escapeAttr(embedUrl)}" title="${escapeAttr(video.title)}" loading="lazy" allowfullscreen></iframe>`
      : `<a class="cms-button primary" href="${escapeAttr(video.url)}" target="_blank" rel="noopener">Abrir vídeo</a>`;
  openEditor({
    title: video.title,
    kicker: "Visualizar vídeo",
    body: `
      <div class="cms-preview-only">
        <div class="cms-preview-player">${player}</div>
        <p>${escapeHtml(video.description)}</p>
        <a class="cms-button secondary" href="${escapeAttr(video.url)}" target="_blank" rel="noopener">Abrir link externo</a>
      </div>
    `,
  });
}

function openClientEditor(id = "") {
  const logo = id
    ? findById("logos", id)
    : { id: createId("client"), name: "", imageUrl: "", status: "Publicado", position: state.data.logos.length };
  if (!logo) return;

  openEditor({
    title: id ? "Editar cliente" : "Adicionar cliente",
    kicker: "Clientes",
    body: `
      <form class="cms-form" data-editor-form="client">
        <input type="hidden" name="id" value="${escapeAttr(logo.id)}" />
        ${field({ name: "name", label: "Nome do cliente", value: logo.name, required: true })}
        ${uploadField({ target: "imageUrl", label: "Logo", type: "image", value: logo.imageUrl, title: logo.name, hint: "Envie PNG ou WEBP com boa qualidade." })}
        <div class="cms-form-grid two">
          ${selectField({ name: "status", label: "Status", value: logo.status || "Publicado", options: ["Publicado", "Rascunho", "Oculto"] })}
          ${field({ name: "position", label: "Ordem", value: logo.position, type: "number" })}
        </div>
        ${formActions(id ? "Salvar alterações" : "Adicionar cliente")}
      </form>
    `,
  });
}

function openTestimonialEditor(id = "") {
  const testimonial = id
    ? findById("testimonials", id)
    : {
        id: createId("testimonial"),
        name: "",
        company: "",
        role: "",
        photoUrl: "",
        quote: "",
        status: "Publicado",
        position: state.data.testimonials.length,
      };
  if (!testimonial) return;

  openEditor({
    title: id ? "Editar depoimento" : "Novo depoimento",
    kicker: "Depoimentos",
    body: `
      <form class="cms-form" data-editor-form="testimonial">
        <input type="hidden" name="id" value="${escapeAttr(testimonial.id)}" />
        <div class="cms-form-grid two">
          ${field({ name: "name", label: "Nome", value: testimonial.name, required: true })}
          ${field({ name: "company", label: "Empresa", value: testimonial.company })}
        </div>
        ${field({ name: "role", label: "Cargo", value: testimonial.role })}
        ${uploadField({ target: "photoUrl", label: "Foto", type: "image", value: testimonial.photoUrl, title: testimonial.name })}
        ${textareaField({ name: "quote", label: "Depoimento", value: testimonial.quote, rows: 6, required: true })}
        <div class="cms-form-grid two">
          ${selectField({ name: "status", label: "Status", value: testimonial.status || "Publicado", options: ["Publicado", "Rascunho", "Oculto"] })}
          ${field({ name: "position", label: "Ordem", value: testimonial.position, type: "number" })}
        </div>
        ${formActions(id ? "Salvar alterações" : "Cadastrar depoimento")}
      </form>
    `,
  });
}

function openMetricEditor(id = "") {
  const metric = id
    ? findById("metrics", id)
    : { id: createId("metric"), value: "", label: "", description: "", status: "Publicado", position: state.data.metrics.length };
  if (!metric) return;

  openEditor({
    title: id ? "Editar métrica" : "Adicionar métrica",
    kicker: "Configurações",
    body: `
      <form class="cms-form" data-editor-form="metric">
        <input type="hidden" name="id" value="${escapeAttr(metric.id)}" />
        <div class="cms-form-grid two">
          ${field({ name: "value", label: "Valor", value: metric.value, placeholder: "+120%" })}
          ${field({ name: "label", label: "Rótulo", value: metric.label, placeholder: "em alcance" })}
        </div>
        ${textareaField({ name: "description", label: "Descrição", value: metric.description, rows: 3 })}
        <div class="cms-form-grid two">
          ${selectField({ name: "status", label: "Status", value: metric.status || "Publicado", options: ["Publicado", "Rascunho", "Oculto"] })}
          ${field({ name: "position", label: "Ordem", value: metric.position, type: "number" })}
        </div>
        ${formActions(id ? "Salvar alterações" : "Adicionar métrica")}
      </form>
    `,
  });
}

function openLeadDetails(id) {
  const lead = state.data.leads.find((item) => item.id === id);
  if (!lead) return;
  const whatsappLink = getLeadWhatsAppLink(lead);
  const emailLink = lead.email ? `mailto:${lead.email}` : "";
  openEditor({
    title: lead.name || "Lead",
    kicker: "Detalhes do lead",
    body: `
      <div class="cms-lead-detail">
        ${leadStatusBadge(lead.status || "Novo")}
        <dl>
          <dt>Nome</dt><dd>${escapeHtml(lead.name || "Não informado")}</dd>
          <dt>Empresa</dt><dd>${escapeHtml(lead.company || "Não informado")}</dd>
          <dt>Telefone</dt><dd>${escapeHtml(lead.phone || "Não informado")}</dd>
          <dt>E-mail</dt><dd>${escapeHtml(lead.email || "Não informado")}</dd>
          <dt>Serviço</dt><dd>${escapeHtml(lead.service || "Não informado")}</dd>
          <dt>Investimento</dt><dd>${escapeHtml(lead.investmentRange || "Não informado")}</dd>
          <dt>Prazo</dt><dd>${escapeHtml(lead.startTimeline || "Não informado")}</dd>
          <dt>Mensagem</dt><dd>${escapeHtml(lead.message || "Sem mensagem")}</dd>
          <dt>Recebido em</dt><dd>${escapeHtml(formatDate(lead.createdAt))}</dd>
        </dl>
        <div class="cms-drawer-actions static">
          ${whatsappLink ? `<a class="cms-button primary" href="${escapeAttr(whatsappLink)}" target="_blank" rel="noopener">Abrir WhatsApp</a>` : ""}
          ${emailLink ? `<a class="cms-button secondary" href="${escapeAttr(emailLink)}">Enviar e-mail</a>` : ""}
        </div>
      </div>
    `,
  });
}

function getFormValue(form, name) {
  return String(new FormData(form).get(name) || "").trim();
}

function parseGallery(value = "") {
  return String(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function numberValue(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

async function handleEditorSubmit(event) {
  const form = event.target.closest("[data-editor-form]");
  if (!form) return;
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const type = form.dataset.editorForm;
    if (type === "content") await submitContentForm(form);
    if (type === "service") await submitServiceForm(form);
    if (type === "project") await submitProjectForm(form);
    if (type === "video") await submitVideoForm(form);
    if (type === "client") await submitClientForm(form);
    if (type === "testimonial") await submitTestimonialForm(form);
    if (type === "metric") await submitMetricForm(form);

    drawerDirty = false;
    await closeEditor(true);
  } catch (error) {
    showToast(error.message || "Não foi possível salvar. Tente novamente.", "error");
  } finally {
    submitButton.disabled = false;
  }
}

async function submitContentForm(form) {
  const section = contentSections.find((item) => item.id === form.dataset.sectionId);
  const nextContent = { ...state.data.content };
  section.fields.forEach((item) => {
    nextContent[item.key] = getFormValue(form, item.key);
  });
  state.data = normalizeData(
    await apiRequest("/api/content", {
      method: "PUT",
      body: JSON.stringify(nextContent),
    }),
  );
  renderPage();
  showToast("Alterações salvas com sucesso.");
}

async function submitServiceForm(form) {
  const item = {
    id: getFormValue(form, "id") || createId("service"),
    number: getFormValue(form, "number"),
    title: getFormValue(form, "title"),
    description: getFormValue(form, "description"),
    mediaType: getFormValue(form, "mediaType"),
    mediaUrl: getFormValue(form, "mediaUrl"),
    tone: "reels",
    status: getFormValue(form, "status"),
    position: numberValue(getFormValue(form, "position"), state.data.services.length),
  };
  upsertItem("services", item);
  state.data.services = sortByPosition(state.data.services);
  await saveSections("Serviço salvo com sucesso.");
}

async function submitProjectForm(form) {
  const item = {
    id: getFormValue(form, "id") || createId("project"),
    title: getFormValue(form, "title"),
    client: getFormValue(form, "client"),
    category: getFormValue(form, "category") || "Social Media",
    description: getFormValue(form, "description"),
    objective: getFormValue(form, "objective"),
    serviceDone: getFormValue(form, "serviceDone"),
    result: getFormValue(form, "result"),
    challenge: getFormValue(form, "challenge"),
    strategy: getFormValue(form, "strategy"),
    execution: getFormValue(form, "execution"),
    thumbnail: getFormValue(form, "thumbnail"),
    gallery: parseGallery(getFormValue(form, "gallery")),
    videoUrl: getFormValue(form, "videoUrl"),
    externalUrl: getFormValue(form, "externalUrl"),
    status: getFormValue(form, "status"),
    position: numberValue(getFormValue(form, "position"), state.data.projects.length),
    tone: "navy",
  };
  const nextProjects = upsertAndSort("projects", item);
  await saveProjects(nextProjects, "Projeto salvo com sucesso.");
}

async function submitVideoForm(form) {
  const item = {
    id: normalizeUuid(getFormValue(form, "id"), generateUuid()),
    title: getFormValue(form, "title"),
    description: getFormValue(form, "description"),
    url: getFormValue(form, "url"),
    thumbnail: getFormValue(form, "thumbnail"),
    status: getFormValue(form, "status"),
    position: numberValue(getFormValue(form, "position"), state.data.videos.length),
    createdAt: getFormValue(form, "createdAt") || new Date().toISOString(),
  };
  const nextVideos = upsertAndSort("videos", item);
  await saveVideos(nextVideos, "Vídeo salvo com sucesso.");
}

async function submitClientForm(form) {
  const item = {
    id: getFormValue(form, "id") || createId("client"),
    name: getFormValue(form, "name"),
    imageUrl: getFormValue(form, "imageUrl"),
    status: getFormValue(form, "status"),
    position: numberValue(getFormValue(form, "position"), state.data.logos.length),
  };
  upsertItem("logos", item);
  state.data.logos = sortByPosition(state.data.logos);
  await saveSections("Cliente salvo com sucesso.");
}

async function submitTestimonialForm(form) {
  const item = {
    id: getFormValue(form, "id") || createId("testimonial"),
    name: getFormValue(form, "name"),
    company: getFormValue(form, "company"),
    role: getFormValue(form, "role"),
    photoUrl: getFormValue(form, "photoUrl"),
    quote: getFormValue(form, "quote"),
    status: getFormValue(form, "status"),
    position: numberValue(getFormValue(form, "position"), state.data.testimonials.length),
  };
  upsertItem("testimonials", item);
  state.data.testimonials = sortByPosition(state.data.testimonials);
  await saveSections("Depoimento salvo com sucesso.");
}

async function submitMetricForm(form) {
  const item = {
    id: getFormValue(form, "id") || createId("metric"),
    value: getFormValue(form, "value"),
    label: getFormValue(form, "label"),
    description: getFormValue(form, "description"),
    status: getFormValue(form, "status"),
    position: numberValue(getFormValue(form, "position"), state.data.metrics.length),
  };
  upsertItem("metrics", item);
  state.data.metrics = sortByPosition(state.data.metrics);
  await saveSections("Métrica salva com sucesso.");
}

function upsertAndSort(type, item) {
  const list = state.data[type] || [];
  const exists = list.some((current) => current.id === item.id);
  const nextList = exists ? list.map((current) => (current.id === item.id ? item : current)) : [...list, item];
  return sortByPosition(nextList).map((entry, index) => ({ ...entry, position: index }));
}

async function deleteItem(type, id, label, saveCallback) {
  const confirmed = await confirmAction({
    title: `Excluir ${label}?`,
    message: `Essa ação removerá este ${label} do site.`,
    confirmLabel: "Excluir",
    danger: true,
  });
  if (!confirmed) return;

  removeItem(type, id);
  await saveCallback();
}

async function moveItem(type, id, direction) {
  const list = [...(state.data[type] || [])];
  const index = list.findIndex((item) => item.id === id);
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= list.length) return;
  const [item] = list.splice(index, 1);
  list.splice(nextIndex, 0, item);
  const ordered = list.map((entry, itemIndex) => ({ ...entry, position: itemIndex }));

  if (type === "projects") await saveProjects(ordered, "Ordem dos projetos salva.");
  else if (type === "videos") await saveVideos(ordered, "Ordem dos vídeos salva.");
  else {
    state.data[type] = ordered;
    await saveSections("Ordem salva com sucesso.");
  }
}

async function handleDrop(type, fromId, toId) {
  if (!fromId || !toId || fromId === toId) return;
  const list = [...(state.data[type] || [])];
  const fromIndex = list.findIndex((item) => item.id === fromId);
  const toIndex = list.findIndex((item) => item.id === toId);
  if (fromIndex < 0 || toIndex < 0) return;
  const [item] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, item);
  const ordered = list.map((entry, index) => ({ ...entry, position: index }));

  if (type === "projects") await saveProjects(ordered, "Ordem dos projetos salva.");
  else if (type === "videos") await saveVideos(ordered, "Ordem dos vídeos salva.");
  else {
    state.data[type] = ordered;
    await saveSections("Ordem salva com sucesso.");
  }
}

async function handleViewClick(event) {
  const actionTarget = event.target.closest("[data-action]");

  const clearButton = event.target.closest("[data-clear-media]");
  if (clearButton) {
    const upload = clearButton.closest("[data-upload]");
    const fieldName = clearButton.dataset.clearMedia;
    const form = clearButton.closest("form");
    if (form?.elements[fieldName]) form.elements[fieldName].value = "";
    upload.querySelector("[data-upload-preview]").innerHTML = mediaPreview("", upload.dataset.upload);
    drawerDirty = true;
    markDrawerDirty();
    return;
  }

  if (!actionTarget) return;
  const { action, id, type } = actionTarget.dataset;

  if (action === "new-project") openProjectEditor();
  if (action === "new-video") openVideoEditor();
  if (action === "new-service") openServiceEditor();
  if (action === "new-client") openClientEditor();
  if (action === "new-testimonial") openTestimonialEditor();
  if (action === "new-metric") openMetricEditor();
  if (action === "edit-content") openContentEditor(id);
  if (action === "edit-service") openServiceEditor(id);
  if (action === "edit-project") openProjectEditor(id);
  if (action === "duplicate-project") openProjectEditor(id, true);
  if (action === "edit-video") openVideoEditor(id);
  if (action === "preview-video") openVideoPreview(id);
  if (action === "edit-client") openClientEditor(id);
  if (action === "edit-testimonial") openTestimonialEditor(id);
  if (action === "edit-metric") openMetricEditor(id);
  if (action === "open-lead") openLeadDetails(id);
  if (action === "move-up") await moveItem(type, id, "up");
  if (action === "move-down") await moveItem(type, id, "down");
  if (action === "delete-service") await deleteItem("services", id, "serviço", () => saveSections("Serviço excluído."));
  if (action === "delete-project") await deleteProject(id);
  if (action === "delete-video") await deleteVideo(id);
  if (action === "delete-client") await deleteItem("logos", id, "cliente", () => saveSections("Cliente excluído."));
  if (action === "delete-testimonial") await deleteItem("testimonials", id, "depoimento", () => saveSections("Depoimento excluído."));
  if (action === "delete-metric") await deleteItem("metrics", id, "métrica", () => saveSections("Métrica excluída."));
  if (action === "delete-lead") await deleteLead(id);
  if (action === "copy-media") await copyMediaUrl(id);
  if (action === "delete-media") await deleteMedia(id);
  if (action === "refresh-media") await loadMediaLibrary(true);
}

async function deleteProject(id) {
  const confirmed = await confirmAction({
    title: "Excluir projeto?",
    message: "Essa ação removerá este projeto do portfólio do site.",
    confirmLabel: "Excluir",
    danger: true,
  });
  if (!confirmed) return;
  await saveProjects(state.data.projects.filter((project) => project.id !== id), "Projeto excluído.");
}

async function deleteVideo(id) {
  const confirmed = await confirmAction({
    title: "Excluir vídeo?",
    message: "Essa ação removerá este vídeo do site.",
    confirmLabel: "Excluir",
    danger: true,
  });
  if (!confirmed) return;
  state.data = normalizeData(await apiRequest(`/api/videos/${encodeURIComponent(id)}`, { method: "DELETE" }));
  renderPage();
  showToast("Vídeo excluído.");
}

async function deleteLead(id) {
  const confirmed = await confirmAction({
    title: "Excluir lead?",
    message: "Essa ação removerá o contato do painel.",
    confirmLabel: "Excluir",
    danger: true,
  });
  if (!confirmed) return;
  state.data = normalizeData(await apiRequest(`/api/leads/${encodeURIComponent(id)}`, { method: "DELETE" }));
  renderPage();
  showToast("Lead excluído.");
}

async function copyMediaUrl(id) {
  const item = state.media.find((media) => media.id === id);
  if (!item) return;
  await navigator.clipboard?.writeText(item.url);
  showToast("URL copiada.");
}

async function deleteMedia(id) {
  const item = state.media.find((media) => media.id === id);
  if (!item) return;
  if (item.used) {
    showToast(`Esta mídia está em uso: ${(item.usedIn || []).join(", ")}.`, "error");
    return;
  }
  const confirmed = await confirmAction({
    title: "Excluir mídia?",
    message: "Essa ação removerá o arquivo do Supabase Storage.",
    confirmLabel: "Excluir",
    danger: true,
  });
  if (!confirmed) return;
  const result = await apiRequest("/api/media", {
    method: "DELETE",
    body: JSON.stringify({ bucket: item.bucket, path: item.path }),
  });
  state.media = result.media || [];
  state.mediaLoaded = true;
  renderPage();
  showToast("Mídia excluída.");
}

async function handleViewSubmit(event) {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();

  if (form.dataset.form === "contacts") {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      state.data = normalizeData(
        await apiRequest("/api/links", {
          method: "PUT",
          body: JSON.stringify({
            instagram: getFormValue(form, "instagram"),
            whatsapp: getFormValue(form, "whatsapp"),
            email: getFormValue(form, "email"),
            whatsappMessage: getFormValue(form, "whatsappMessage"),
          }),
        }),
      );
      renderPage();
      showToast("Contatos salvos com sucesso.");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      button.disabled = false;
    }
  }
}

async function handleViewChange(event) {
  const filter = event.target.closest("[data-filter-input]");
  if (filter) {
    state.filters[filter.dataset.filterInput] = filter.value;
    renderPage();
    return;
  }

  const leadStatus = event.target.closest("[data-lead-status]");
  if (leadStatus) {
    leadStatus.disabled = true;
    try {
      await apiRequest(`/api/leads/${encodeURIComponent(leadStatus.dataset.leadStatus)}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: leadStatus.value }),
      });
      state.data = normalizeData(await apiRequest("/api/admin/data"));
      renderPage();
      showToast("Status do lead atualizado.");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      leadStatus.disabled = false;
    }
    return;
  }

  const mediaUploadInput = event.target.closest("[data-media-upload-input]");
  if (mediaUploadInput) {
    await handleStandaloneMediaUpload(mediaUploadInput);
    return;
  }

  const mediaReplaceInput = event.target.closest("[data-media-replace-input]");
  if (mediaReplaceInput) {
    await handleMediaReplace(mediaReplaceInput);
  }
}

async function handleEditorChange(event) {
  const uploadInput = event.target.closest("[data-upload-input]");
  const galleryInput = event.target.closest("[data-gallery-input]");

  if (event.type === "change" && uploadInput) {
    await handleUpload(uploadInput);
    return;
  }

  if (event.type === "change" && galleryInput) {
    await handleGalleryUpload(galleryInput);
    return;
  }

  drawerDirty = true;
  markDrawerDirty();

  const urlInput = event.target.closest("[data-upload-url-field]");
  if (urlInput) {
    const upload = urlInput.closest("[data-upload]");
    const previewType =
      upload.dataset.upload === "mixed"
        ? isDirectVideoUrl(urlInput.value) || getVideoEmbedUrl(urlInput.value)
          ? "video"
          : "image"
        : upload.dataset.upload;
    upload.querySelector("[data-upload-preview]").innerHTML = mediaPreview(urlInput.value, previewType);
  }
}

function markDrawerDirty() {
  editorBody.querySelector("[data-dirty-message]")?.removeAttribute("hidden");
}

async function handleUpload(input) {
  const upload = input.closest("[data-upload]");
  const form = input.closest("form");
  const target = upload.dataset.target;
  const file = input.files?.[0];
  if (!file || !form?.elements[target]) return;

  const status = upload.querySelector("[data-upload-status]");
  const preview = upload.querySelector("[data-upload-preview]");
  setUploadStatus(status, "Preparando envio...");
  input.disabled = true;

  try {
    const kind = upload.dataset.upload === "mixed" ? (isAcceptedVideoFile(file) ? "video" : "image") : upload.dataset.upload;
    const result = kind === "video" ? await uploadVideo(file, status) : await uploadImage(file, status);
    form.elements[target].value = result.url;
    preview.innerHTML = mediaPreview(result.url, kind, file.name);

    if (target === "mediaUrl" && form.elements.mediaType) {
      form.elements.mediaType.value = kind === "video" ? "video" : "image";
    }

    drawerDirty = true;
    markDrawerDirty();
    setUploadStatus(status, "Arquivo enviado. Salve para publicar a alteração.", "success");
  } catch (error) {
    setUploadStatus(status, error.message, "error");
  } finally {
    input.disabled = false;
    input.value = "";
  }
}

async function handleGalleryUpload(input) {
  const fieldWrapper = input.closest("[data-gallery-upload]");
  const textarea = fieldWrapper.querySelector("textarea[name='gallery']");
  const status = fieldWrapper.querySelector("[data-gallery-status]");
  const files = [...(input.files || [])];
  if (!files.length || !textarea) return;

  input.disabled = true;
  const urls = [];

  try {
    for (const [index, file] of files.entries()) {
      setUploadStatus(status, `Enviando imagem ${index + 1} de ${files.length}...`);
      const upload = await uploadImage(file, status);
      urls.push(upload.url);
    }
    textarea.value = [textarea.value.trim(), ...urls].filter(Boolean).join("\n");
    drawerDirty = true;
    markDrawerDirty();
    setUploadStatus(status, "Galeria atualizada. Salve o projeto para publicar.", "success");
  } catch (error) {
    setUploadStatus(status, error.message, "error");
  } finally {
    input.disabled = false;
    input.value = "";
  }
}

function setUploadStatus(element, message, type = "") {
  if (!element) return;
  element.textContent = message;
  element.className = `cms-upload-status ${type}`;
}

async function uploadImage(file, statusElement = null, replacePath = "") {
  if (!isAcceptedImageFile(file)) {
    throw new Error("Use uma imagem JPG, PNG, WEBP, GIF, HEIC ou HEIF.");
  }
  if (file.size > maxImageUploadSize) {
    throw new Error("Escolha uma imagem de até 12MB.");
  }

  const contentType = getImageContentType(file);
  setUploadStatus(statusElement, "Gerando envio seguro...");
  const upload = await apiRequest("/api/uploads/images/sign", {
    method: "POST",
    body: JSON.stringify({
      fileName: file.name,
      contentType,
      size: file.size,
      path: replacePath,
      upsert: Boolean(replacePath),
    }),
  });

  await uploadFileToSignedUrl(upload.signedUrl, file, (progress) => {
    setUploadStatus(statusElement, `Enviando imagem... ${progress}%`);
  });
  return upload;
}

async function uploadVideo(file, statusElement = null, replacePath = "") {
  if (!isAcceptedVideoFile(file)) {
    throw new Error("Use um vídeo MP4, WEBM, OGG ou MOV. Para celular, prefira MP4.");
  }
  if (file.size > maxVideoUploadSize) {
    throw new Error("Escolha um vídeo de até 250MB.");
  }

  const contentType = getVideoContentType(file);
  setUploadStatus(statusElement, "Gerando envio seguro...");
  const upload = await apiRequest("/api/uploads/videos/sign", {
    method: "POST",
    body: JSON.stringify({
      fileName: file.name,
      contentType,
      size: file.size,
      path: replacePath,
      upsert: Boolean(replacePath),
    }),
  });

  await uploadFileToSignedUrl(upload.signedUrl, file, (progress) => {
    setUploadStatus(statusElement, `Enviando vídeo... ${progress}%`);
  });
  return upload;
}

function uploadFileToSignedUrl(signedUrl, file, onProgress) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("cacheControl", "31536000");
    formData.append("file", file);

    request.open("PUT", signedUrl);
    request.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    });
    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 300) {
        resolve();
        return;
      }
      const details = request.responseText ? ` ${request.responseText.slice(0, 180)}` : "";
      reject(new Error(`Não foi possível enviar o vídeo.${details}`));
    });
    request.addEventListener("error", () => reject(new Error("Falha de conexão durante o upload.")));
    request.send(formData);
  });
}

async function handleStandaloneMediaUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const type = input.dataset.mediaUploadInput;
  const panel = input.closest(".cms-media-uploader-panel");
  const status = panel?.querySelector("[data-media-upload-status]");
  input.disabled = true;

  try {
    setUploadStatus(status, type === "video" ? "Enviando vídeo..." : "Enviando imagem...");
    const result = type === "video" ? await uploadVideo(file, status) : await uploadImage(file, status);
    if (type === "video") {
      const video = {
        id: generateUuid(),
        title: titleFromFileName(file.name),
        description: "",
        url: result.url,
        thumbnail: "",
        status: "Publicado",
        position: state.data.videos.length,
        createdAt: new Date().toISOString(),
      };
      state.data = normalizeData(
        await apiRequest("/api/videos", {
          method: "POST",
          body: JSON.stringify(video),
        }),
      );
      setUploadStatus(status, "Vídeo enviado e publicado no site.", "success");
    }
    await loadMediaLibrary(true);
    await navigator.clipboard?.writeText(result.url);
    if (type !== "video") setUploadStatus(status, "Mídia enviada. A URL foi copiada.", "success");
    showToast(type === "video" ? "Vídeo enviado e publicado no site." : "Mídia enviada. URL copiada.");
  } catch (error) {
    setUploadStatus(status, error.message, "error");
    showToast(error.message, "error");
  } finally {
    input.disabled = false;
    input.value = "";
  }
}

async function handleMediaReplace(input) {
  const item = state.media.find((media) => media.id === input.dataset.mediaReplaceInput);
  const file = input.files?.[0];
  if (!item || !file) return;
  const confirmed = await confirmAction({
    title: "Substituir mídia?",
    message: item.used
      ? "Este arquivo está em uso no site. A substituição trocará o arquivo mantendo a mesma URL."
      : "A substituição trocará o arquivo mantendo a mesma URL.",
    confirmLabel: "Substituir",
    danger: false,
  });
  if (!confirmed) return;

  input.disabled = true;
  try {
    if (item.type === "video") {
      await uploadVideo(file, null, item.path);
    } else {
      await uploadImage(file, null, item.path);
    }
    await loadMediaLibrary(true);
    showToast("Mídia substituída com sucesso.");
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    input.disabled = false;
    input.value = "";
  }
}

async function loadMediaLibrary(force = false) {
  if (state.mediaLoaded && !force) return;
  state.mediaLoaded = false;
  renderPage();
  try {
    const result = await apiRequest("/api/media");
    state.media = Array.isArray(result.media) ? result.media : [];
    state.mediaLoaded = true;
  } catch (error) {
    state.media = [];
    state.mediaLoaded = true;
    showToast(error.message, "error");
  }
  renderPage();
}

function toFriendlyInstagram(value = "") {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.hostname.includes("instagram.com")) {
      const handle = url.pathname.split("/").filter(Boolean)[0];
      return handle ? `@${handle}` : value;
    }
  } catch {
    return value;
  }
  return value;
}

function toFriendlyWhatsApp(value = "") {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.hostname.includes("wa.me")) return url.pathname.replace("/", "");
    if (url.hostname.includes("api.whatsapp.com")) return url.searchParams.get("phone") || value;
  } catch {
    return value;
  }
  return value;
}

function toFriendlyEmail(value = "") {
  return value.startsWith("mailto:") ? value.replace("mailto:", "") : value;
}

function getLeadWhatsAppLink(lead) {
  const digits = String(lead.phone || "").replace(/\D/g, "");
  if (digits.length < 10) return "";
  const phone = digits.startsWith("55") ? digits : `55${digits}`;
  const message = `Olá, ${lead.name || ""}! Recebi seu contato pelo site da Alves Connect.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function handleNavigation(event) {
  const button = event.target.closest("[data-page]");
  if (button) setPage(button.dataset.page);
}

async function loadAdminData() {
  view.innerHTML = `<div class="cms-loading">Carregando painel...</div>`;
  const data = await apiRequest("/api/admin/data");
  state.data = normalizeData(data);
  renderPage();
}

async function bootAdmin() {
  try {
    const session = await apiRequest("/api/session");
    if (session.authenticated) {
      state.csrfToken = session.csrfToken || "";
      showAdmin();
      await loadAdminData();
      return;
    }
    showLogin();
  } catch {
    showLogin("Inicie o servidor local para usar o admin.");
  }
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = loginForm.querySelector('button[type="submit"]');
  const formData = new FormData(loginForm);
  submitButton.disabled = true;
  setInlineMessage(loginMessage, "Entrando...");

  try {
    const session = await apiRequest("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: String(formData.get("username") || "").trim(),
        password: String(formData.get("password") || "").trim(),
      }),
    });
    state.csrfToken = session.csrfToken || "";
    loginForm.reset();
    showAdmin();
    await loadAdminData();
    setInlineMessage(loginMessage, "");
  } catch (error) {
    setInlineMessage(loginMessage, error.message, true);
  } finally {
    submitButton.disabled = false;
  }
});

logoutButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    await apiRequest("/api/logout", { method: "POST", body: "{}" }).catch(() => {});
    state.csrfToken = "";
    showLogin();
  });
});

navButtons.forEach((button) => button.addEventListener("click", handleNavigation));
sidebarOpen?.addEventListener("click", openSidebar);
sidebarOverlay?.addEventListener("click", closeSidebar);
editorClose?.addEventListener("click", () => closeEditor(false));
confirmOk?.addEventListener("click", () => resolveConfirm(true));
confirmCancel?.addEventListener("click", () => resolveConfirm(false));

view?.addEventListener("click", handleViewClick);
view?.addEventListener("submit", handleViewSubmit);
view?.addEventListener("change", handleViewChange);
view?.addEventListener("dragstart", (event) => {
  const card = event.target.closest("[data-drag-type]");
  if (!card) return;
  state.drag = { type: card.dataset.dragType, id: card.dataset.id };
  card.classList.add("is-dragging");
});
view?.addEventListener("dragend", (event) => {
  event.target.closest("[data-drag-type]")?.classList.remove("is-dragging");
  state.drag = null;
});
view?.addEventListener("dragover", (event) => {
  if (event.target.closest("[data-drag-type]")) event.preventDefault();
});
view?.addEventListener("drop", async (event) => {
  const card = event.target.closest("[data-drag-type]");
  if (!card || !state.drag || state.drag.type !== card.dataset.dragType) return;
  event.preventDefault();
  await handleDrop(state.drag.type, state.drag.id, card.dataset.id);
});

editorBody?.addEventListener("submit", handleEditorSubmit);
editorBody?.addEventListener("input", handleEditorChange);
editorBody?.addEventListener("change", handleEditorChange);
editorBody?.addEventListener("click", (event) => {
  if (event.target.closest("[data-editor-cancel]")) closeEditor(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && editor.classList.contains("open")) closeEditor(false);
  if (event.key === "Escape" && !confirmDialogElement.hidden) resolveConfirm(false);
});

window.addEventListener("beforeunload", (event) => {
  if (!drawerDirty) return;
  event.preventDefault();
  event.returnValue = "";
});

bootAdmin();
