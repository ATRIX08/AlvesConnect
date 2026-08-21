const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");

dotenv.config();

const app = express();
const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const dataFile = path.join(dataDir, "site-data.json");
const port = Number(process.env.PORT || 3000);
let supabaseClient = null;
const projectsContentKey = "portfolioProjects";
const videosContentKey = "siteVideos";
const leadsContentKey = "siteLeads";
const servicesContentKey = "siteServices";
const logosContentKey = "clientLogos";
const testimonialsContentKey = "testimonials";
const metricsContentKey = "siteMetrics";
const imageBucket = "portfolio-images";
const videoBucket = "portfolio-videos";
const sessionCookieName = "alves_connect_auth";
const sessionDurationMs = 1000 * 60 * 60 * 6;
const loginWindowMs = 1000 * 60 * 15;
const maxLoginAttempts = 8;
const loginAttempts = new Map();
const maxImageUploadSize = 12 * 1024 * 1024;
const maxVideoUploadSize = 250 * 1024 * 1024;
const leadWindowMs = 1000 * 60 * 10;
const maxLeadSubmissions = 5;
const leadSubmissions = new Map();
const fallbackSessionSecret = crypto.randomBytes(32).toString("base64url");

const defaultServices = [
  {
    id: "service-social",
    number: "01",
    title: "Gestão de Redes Sociais",
    description: "Planejamento, calendário editorial, criação de conteúdo e acompanhamento da presença digital.",
    mediaUrl: "",
    mediaType: "visual",
    tone: "reels",
    status: "Publicado",
  },
  {
    id: "service-reels",
    number: "02",
    title: "Produção de Reels",
    description: "Ideia, roteiro, gravação e edição de vídeos curtos pensados para redes sociais.",
    mediaUrl: "",
    mediaType: "visual",
    tone: "video",
    status: "Publicado",
  },
  {
    id: "service-content",
    number: "03",
    title: "Criação de Conteúdo",
    description: "Conteúdos desenvolvidos de acordo com a identidade, público e objetivo de cada marca.",
    mediaUrl: "",
    mediaType: "visual",
    tone: "content",
    status: "Publicado",
  },
  {
    id: "service-design",
    number: "04",
    title: "Design para Redes Sociais",
    description: "Posts, stories, campanhas, materiais promocionais e peças visuais com unidade.",
    mediaUrl: "",
    mediaType: "visual",
    tone: "design",
    status: "Publicado",
  },
  {
    id: "service-identity",
    number: "05",
    title: "Identidade Visual",
    description: "Desenvolvimento e organização da comunicação visual para deixar a marca mais consistente.",
    mediaUrl: "",
    mediaType: "visual",
    tone: "identity",
    status: "Publicado",
  },
  {
    id: "service-events",
    number: "06",
    title: "Cobertura de Eventos",
    description: "Produção de fotos, vídeos, bastidores e conteúdo em tempo real.",
    mediaUrl: "",
    mediaType: "visual",
    tone: "event",
    status: "Publicado",
  },
];

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
  videosText:
    "Uma seleção de vídeos verticais para apresentar ritmo, linguagem visual e produção de conteúdo.",
  worksTitle: "Projetos selecionados",
  worksText:
    "Um pouco do conteúdo, das campanhas e das experiências desenvolvidas para diferentes marcas.",
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

const defaultData = {
  content: defaultContent,
  links: {
    instagram: "",
    whatsapp: "",
    email: "",
  },
  projects: [],
  videos: [],
  leads: [],
  services: defaultServices,
  logos: [],
  testimonials: [],
  metrics: [],
};

app.use(helmet({ contentSecurityPolicy: false }));
app.use((_request, response, next) => {
  response.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https:",
      "connect-src 'self' https://*.supabase.co",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  );
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use(express.json({ limit: "12mb" }));
app.set("trust proxy", 1);

app.use("/assets", express.static(path.join(rootDir, "assets")));

function cleanText(value, maxLength = 1500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidUuid(value = "") {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function normalizeUuid(value, fallback = crypto.randomUUID()) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  const candidate = raw.replace(/^video-/i, "");
  return isValidUuid(candidate) ? candidate : fallback;
}

function normalizeData(data) {
  return {
    content: { ...defaultContent, ...(data.content || {}) },
    links: { ...defaultData.links, ...(data.links || {}) },
    projects: Array.isArray(data.projects) ? data.projects : [],
    videos: Array.isArray(data.videos)
      ? data.videos.map((video, index) => ({
          ...video,
          id: normalizeUuid(video?.id, crypto.randomUUID()),
          position: Number.isFinite(Number(video?.position)) ? Number(video.position) : index,
        }))
      : [],
    leads: Array.isArray(data.leads) ? data.leads : [],
    services: Array.isArray(data.services) && data.services.length > 0 ? data.services : defaultServices,
    logos: Array.isArray(data.logos) ? data.logos : [],
    testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
    metrics: Array.isArray(data.metrics) ? data.metrics : [],
  };
}

function parseJsonList(value, fallback = []) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function hasSupabaseStorage() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const { createClient } = await import("@supabase/supabase-js");
  supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return supabaseClient;
}

async function readFileData() {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return normalizeData(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") {
    console.warn("Não foi possível ler os dados. Usando padrão.", error.message);
    }
    await writeSiteData(defaultData);
    return normalizeData(defaultData);
  }
}

async function writeFileData(data) {
  await fs.mkdir(dataDir, { recursive: true });
  const normalized = normalizeData(data);
  const temporaryFile = `${dataFile}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  await fs.rename(temporaryFile, dataFile);
}

async function readSupabaseData() {
  const supabase = await getSupabaseClient();
  const [contentResult, linksResult, videosResult] = await Promise.all([
    supabase.from("site_content").select("key,value"),
    supabase.from("site_links").select("type,url"),
    supabase.from("videos").select("id,title,description,url,position,created_at").eq("active", true).order("position", {
      ascending: true,
    }).order("created_at", { ascending: true }),
  ]);

  if (contentResult.error) throw contentResult.error;
  if (linksResult.error) throw linksResult.error;
  if (videosResult.error) throw videosResult.error;

  const content = { ...defaultContent };
  let projects = [];
  let leads = [];
  let services = defaultServices;
  let logos = [];
  let testimonials = [];
  let metrics = [];
  let enhancedVideos = null;
  contentResult.data.forEach((item) => {
    if ([projectsContentKey, videosContentKey, leadsContentKey, servicesContentKey, logosContentKey, testimonialsContentKey, metricsContentKey].includes(item.key)) {
      const parsed = parseJsonList(item.value, item.key === servicesContentKey ? defaultServices : []);
      if (item.key === projectsContentKey) projects = parsed;
      if (item.key === videosContentKey) enhancedVideos = parsed;
      if (item.key === leadsContentKey) leads = parsed;
      if (item.key === servicesContentKey) services = parsed;
      if (item.key === logosContentKey) logos = parsed;
      if (item.key === testimonialsContentKey) testimonials = parsed;
      if (item.key === metricsContentKey) metrics = parsed;
      return;
    }

    content[item.key] = item.value || "";
  });

  const links = { ...defaultData.links };
  linksResult.data.forEach((item) => {
    links[item.type] = item.url || "";
  });

  const tableVideos = videosResult.data.map((video) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    url: video.url,
    position: video.position,
    thumbnail: "",
    status: "Publicado",
    createdAt: video.created_at,
  }));
  const videos = Array.isArray(enhancedVideos) && enhancedVideos.length > 0 ? enhancedVideos : tableVideos;

  const databaseLeads = await readSupabaseLeads().catch(() => null);
  if (databaseLeads) {
    leads = databaseLeads;
  }

  return normalizeData({ content, links, projects, videos, leads, services, logos, testimonials, metrics });
}

async function writeSupabaseData(data) {
  const supabase = await getSupabaseClient();
  const normalized = normalizeData(data);
  const contentRows = [
    ...Object.entries(normalized.content).map(([key, value]) => ({ key, value })),
    { key: projectsContentKey, value: JSON.stringify(normalized.projects) },
    { key: videosContentKey, value: JSON.stringify(normalized.videos) },
    { key: leadsContentKey, value: JSON.stringify(normalized.leads) },
    { key: servicesContentKey, value: JSON.stringify(normalized.services) },
    { key: logosContentKey, value: JSON.stringify(normalized.logos) },
    { key: testimonialsContentKey, value: JSON.stringify(normalized.testimonials) },
    { key: metricsContentKey, value: JSON.stringify(normalized.metrics) },
  ];
  const linkRows = Object.entries(normalized.links).map(([type, url]) => ({ type, url }));
  const videoRows = normalized.videos.map((video, index) => ({
    id: normalizeUuid(video.id, crypto.randomUUID()),
    title: video.title,
    description: video.description,
    url: video.url,
    position: Number.isFinite(Number(video.position)) ? Number(video.position) : index,
    active: (video.status || "Publicado") === "Publicado",
  }));

  const [contentResult, linksResult, existingVideosResult] = await Promise.all([
    supabase.from("site_content").upsert(contentRows, { onConflict: "key" }),
    supabase.from("site_links").upsert(linkRows, { onConflict: "type" }),
    supabase.from("videos").select("id"),
  ]);

  if (contentResult.error) throw contentResult.error;
  if (linksResult.error) throw linksResult.error;
  if (existingVideosResult.error) throw existingVideosResult.error;

  const nextIds = new Set(videoRows.map((video) => video.id));
  const idsToDeactivate = existingVideosResult.data.map((video) => video.id).filter((id) => !nextIds.has(id));

  if (idsToDeactivate.length > 0) {
    const deactivateResult = await supabase.from("videos").update({ active: false }).in("id", idsToDeactivate);
    if (deactivateResult.error) throw deactivateResult.error;
  }

  if (videoRows.length > 0) {
    const videosResult = await supabase.from("videos").upsert(videoRows, { onConflict: "id" });
    if (videosResult.error) throw videosResult.error;
  }
}

function mapLeadRow(row) {
  return {
    id: row.id,
    name: row.name || "",
    company: row.company || "",
    phone: row.phone || "",
    service: row.service || "",
    investmentRange: row.investment_range || "",
    startTimeline: row.start_timeline || "",
    message: row.message || "",
    status: row.status || "Novo",
    createdAt: row.created_at || new Date().toISOString(),
  };
}

async function readSupabaseLeads() {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("leads")
    .select("id,name,company,phone,service,investment_range,start_timeline,message,status,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(mapLeadRow);
}

async function readFallbackLeads() {
  const data = await readSiteData();
  return data.leads || [];
}

async function writeFallbackLeads(leads) {
  const data = await readSiteData();
  data.leads = leads;
  await writeSiteData(data);
  return leads;
}

async function readSiteData() {
  if (hasSupabaseStorage()) {
    return readSupabaseData();
  }

  return readFileData();
}

async function writeSiteData(data) {
  if (hasSupabaseStorage()) {
    await writeSupabaseData(data);
    return;
  }

  await writeFileData(data);
}

function normalizeContent(body) {
  return Object.keys(defaultContent).reduce((content, key) => {
    const lowerKey = key.toLowerCase();
    content[key] = cleanText(body[key], lowerKey.includes("text") || lowerKey.includes("message") ? 2500 : 180);
    return content;
  }, {});
}

function normalizeLink(value, fieldName) {
  const link = cleanText(value, 600);
  if (!link) return "";

  if (fieldName === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(link)) {
    return `mailto:${link}`;
  }

  let url;
  try {
    url = new URL(link);
  } catch {
    throw new Error(`Link inválido em ${fieldName}.`);
  }

  const allowedProtocols = fieldName === "email" ? ["mailto:", "http:", "https:"] : ["http:", "https:"];
  if (!allowedProtocols.includes(url.protocol)) {
    throw new Error(`Use um link http, https${fieldName === "email" ? " ou mailto" : ""} em ${fieldName}.`);
  }

  return link;
}

function cleanFileName(fileName) {
  return cleanText(fileName, 160)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function ensureImageBucket() {
  const supabase = await getSupabaseClient();
  const { data } = await supabase.storage.getBucket(imageBucket);
  const options = {
    public: true,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"],
    fileSizeLimit: maxImageUploadSize,
  };

  const { error } = data
    ? await supabase.storage.updateBucket(imageBucket, options)
    : await supabase.storage.createBucket(imageBucket, options);

  if (error && !String(error.message).toLowerCase().includes("already exists")) {
    throw error;
  }
}

async function ensureVideoBucket() {
  const supabase = await getSupabaseClient();
  const { data } = await supabase.storage.getBucket(videoBucket);
  if (!data) {
    const { error } = await supabase.storage.createBucket(videoBucket, {
      public: true,
      allowedMimeTypes: ["video/mp4", "video/webm", "video/ogg", "video/quicktime"],
      fileSizeLimit: maxVideoUploadSize,
    });

    if (error && !String(error.message).toLowerCase().includes("already exists")) {
      throw error;
    }
    return;
  }

  await supabase.storage.updateBucket(videoBucket, {
    public: true,
    allowedMimeTypes: ["video/mp4", "video/webm", "video/ogg", "video/quicktime"],
    fileSizeLimit: maxVideoUploadSize,
  });
}

function parseImageUpload(body = {}) {
  const fileName = cleanFileName(body.fileName || "imagem.jpg");
  const contentType = cleanText(body.contentType, 80);
  const dataUrl = cleanText(body.dataUrl, 9_000_000);
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"]);

  if (!allowedTypes.has(contentType)) {
    throw new Error("Use uma imagem JPG, PNG, WEBP, GIF, HEIC ou HEIF.");
  }

  const match = dataUrl.match(/^data:image\/(?:jpeg|png|webp|gif|heic|heif);base64,([a-zA-Z0-9+/=]+)$/);
  if (!match) {
    throw new Error("Imagem inválida.");
  }

  const buffer = Buffer.from(match[1], "base64");
  if (buffer.length === 0 || buffer.length > maxImageUploadSize) {
    throw new Error("A imagem precisa ter até 12MB.");
  }

  const extensionFromType = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/heic": "heic",
    "image/heif": "heif",
  }[contentType];
  const extension = path.extname(fileName).replace(".", "") || extensionFromType;
  const baseName = path.basename(fileName, path.extname(fileName)) || "imagem";

  return {
    buffer,
    contentType,
    filePath: `portfolio/${Date.now()}-${crypto.randomUUID()}-${baseName}.${extension}`,
  };
}

function parseImageUploadRequest(body = {}) {
  const fileName = cleanFileName(body.fileName || "imagem.jpg");
  const contentType = cleanText(body.contentType, 80);
  const size = Number(body.size || 0);
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"]);

  if (!allowedTypes.has(contentType)) {
    throw new Error("Use uma imagem JPG, PNG, WEBP, GIF, HEIC ou HEIF.");
  }

  if (!Number.isFinite(size) || size <= 0 || size > maxImageUploadSize) {
    throw new Error("A imagem precisa ter até 12MB.");
  }

  const extensionFromType = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/heic": "heic",
    "image/heif": "heif",
  }[contentType];
  const extension = path.extname(fileName).replace(".", "") || extensionFromType;
  const baseName = path.basename(fileName, path.extname(fileName)) || "imagem";

  return {
    contentType,
    filePath: cleanStoragePath(body.path, "portfolio") || `portfolio/${Date.now()}-${crypto.randomUUID()}-${baseName}.${extension}`,
  };
}

function cleanStoragePath(value, expectedPrefix) {
  const filePath = cleanText(value, 500);
  if (!filePath || filePath.includes("..") || filePath.startsWith("/") || !filePath.startsWith(`${expectedPrefix}/`)) {
    return "";
  }
  return filePath;
}

function parseVideoUploadRequest(body = {}) {
  const fileName = cleanFileName(body.fileName || "video.mp4");
  const contentType = cleanText(body.contentType, 80);
  const size = Number(body.size || 0);
  const allowedTypes = new Set(["video/mp4", "video/webm", "video/ogg", "video/quicktime"]);

  if (!allowedTypes.has(contentType)) {
    throw new Error("Use um vídeo MP4, WEBM, OGG ou MOV.");
  }

  if (!Number.isFinite(size) || size <= 0 || size > maxVideoUploadSize) {
    throw new Error("O vídeo precisa ter até 250MB.");
  }

  const extensionFromType = {
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/ogg": "ogg",
    "video/quicktime": "mov",
  }[contentType];
  const extension = path.extname(fileName).replace(".", "") || extensionFromType;
  const baseName = path.basename(fileName, path.extname(fileName)) || "video";

  return {
    contentType,
    filePath: cleanStoragePath(body.path, "videos") || `videos/${Date.now()}-${crypto.randomUUID()}-${baseName}.${extension}`,
  };
}

function normalizeInstagram(value) {
  const input = cleanText(value, 160);
  if (!input) return "";
  if (/^https?:\/\//i.test(input)) return normalizeLink(input, "instagram");
  const handle = input.replace(/^@/, "").replace(/^instagram\.com\//i, "").replace(/\/+$/, "");
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(handle)) {
    throw new Error("Informe um @ do Instagram válido ou um link completo.");
  }
  return `https://instagram.com/${handle}`;
}

function normalizeWhatsApp(value, message = "") {
  const input = cleanText(value, 180);
  if (!input) return "";
  if (/^https?:\/\//i.test(input)) return normalizeLink(input, "whatsapp");
  const digits = input.replace(/\D/g, "");
  if (digits.length < 10) {
    throw new Error("Informe um WhatsApp válido.");
  }
  const normalizedDigits = digits.startsWith("55") ? digits : `55${digits}`;
  const text = cleanText(message, 300);
  return `https://wa.me/${normalizedDigits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

function normalizeEmail(value) {
  const input = cleanText(value, 180);
  if (!input) return "";
  if (input.startsWith("mailto:") || /^https?:\/\//i.test(input)) return normalizeLink(input, "email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
    throw new Error("Informe um e-mail válido.");
  }
  return `mailto:${input}`;
}

function normalizeLinks(body) {
  return {
    instagram: normalizeInstagram(body.instagram),
    whatsapp: normalizeWhatsApp(body.whatsapp, body.whatsappMessage),
    email: normalizeEmail(body.email),
  };
}

function normalizeStatus(value, fallback = "Publicado") {
  const status = cleanText(value, 40) || fallback;
  return ["Publicado", "Rascunho", "Oculto"].includes(status) ? status : fallback;
}

function normalizeProject(body) {
  const title = cleanText(body.title, 140);
  const category = cleanText(body.category, 80) || "Social Media";
  const description = cleanText(body.description, 900);
  const client = cleanText(body.client, 120);
  const objective = cleanText(body.objective, 700);
  const serviceDone = cleanText(body.serviceDone, 400);
  const result = cleanText(body.result, 700);
  const challenge = cleanText(body.challenge, 900);
  const strategy = cleanText(body.strategy, 900);
  const execution = cleanText(body.execution, 900);
  const thumbnail = normalizeLink(body.thumbnail, "imagem");
  const videoUrl = body.videoUrl ? normalizeLink(body.videoUrl, "video") : "";
  const externalUrl = body.externalUrl ? normalizeLink(body.externalUrl, "link externo") : "";
  const tone = cleanText(body.tone, 40) || "navy";
  const gallery = Array.isArray(body.gallery)
    ? body.gallery.map((item) => normalizeOptionalMediaUrl(item, "galeria")).filter(Boolean).slice(0, 12)
    : [];

  if (!title || !description) {
    throw new Error("Preencha título e descrição do projeto.");
  }

  return {
    id: cleanText(body.id, 80) || crypto.randomUUID(),
    title,
    client,
    category,
    thumbnail,
    videoUrl,
    externalUrl,
    description,
    gallery,
    objective,
    serviceDone,
    result,
    challenge,
    strategy,
    execution,
    status: normalizeStatus(body.status),
    position: Number.isFinite(Number(body.position)) ? Number(body.position) : 0,
    tone,
  };
}

function normalizeProjects(projects) {
  if (!Array.isArray(projects)) return [];
  return projects.map((project) => normalizeProject(project)).slice(0, 24);
}

function normalizeOptionalMediaUrl(value, fieldName) {
  return value ? normalizeLink(value, fieldName) : "";
}

function normalizeService(body = {}, index = 0) {
  const title = cleanText(body.title, 120);
  const description = cleanText(body.description, 700);
  if (!title || !description) {
    throw new Error("Preencha título e descrição do serviço.");
  }

  return {
    id: cleanText(body.id, 80) || crypto.randomUUID(),
    number: cleanText(body.number, 8) || String(index + 1).padStart(2, "0"),
    title,
    description,
    mediaUrl: normalizeOptionalMediaUrl(body.mediaUrl, "mídia do serviço"),
    mediaType: ["visual", "image", "video"].includes(body.mediaType) ? body.mediaType : "visual",
    tone: cleanText(body.tone, 40) || "reels",
    status: normalizeStatus(body.status),
    position: Number.isFinite(Number(body.position)) ? Number(body.position) : index,
  };
}

function normalizeLogo(body = {}) {
  const name = cleanText(body.name, 120);
  const imageUrl = normalizeOptionalMediaUrl(body.imageUrl, "logo");
  if (!name || !imageUrl) {
    throw new Error("Preencha nome e imagem da logo.");
  }
  return {
    id: cleanText(body.id, 80) || crypto.randomUUID(),
    name,
    imageUrl,
    status: normalizeStatus(body.status),
    position: Number.isFinite(Number(body.position)) ? Number(body.position) : 0,
  };
}

function normalizeTestimonial(body = {}) {
  const name = cleanText(body.name, 120);
  const company = cleanText(body.company, 140);
  const role = cleanText(body.role, 140);
  const quote = cleanText(body.quote, 1200);
  const photoUrl = normalizeOptionalMediaUrl(body.photoUrl, "foto do depoimento");
  if (!name || !quote) {
    throw new Error("Preencha nome e depoimento.");
  }
  return {
    id: cleanText(body.id, 80) || crypto.randomUUID(),
    name,
    company,
    role,
    quote,
    photoUrl,
    status: normalizeStatus(body.status),
    position: Number.isFinite(Number(body.position)) ? Number(body.position) : 0,
  };
}

function normalizeMetric(body = {}) {
  const label = cleanText(body.label, 120);
  const value = cleanText(body.value, 80);
  const description = cleanText(body.description, 280);
  if (!label || !value) {
    throw new Error("Preencha valor e rótulo da métrica.");
  }
  return {
    id: cleanText(body.id, 80) || crypto.randomUUID(),
    value,
    label,
    description,
    status: normalizeStatus(body.status),
    position: Number.isFinite(Number(body.position)) ? Number(body.position) : 0,
  };
}

function normalizeEditableSections(body = {}) {
  return {
    services: Array.isArray(body.services) ? body.services.map(normalizeService).slice(0, 12) : defaultServices,
    logos: Array.isArray(body.logos) ? body.logos.map(normalizeLogo).slice(0, 24) : [],
    testimonials: Array.isArray(body.testimonials) ? body.testimonials.map(normalizeTestimonial).slice(0, 12) : [],
    metrics: Array.isArray(body.metrics) ? body.metrics.map(normalizeMetric).slice(0, 8) : [],
  };
}

function normalizeVideo(body, existing = {}, index = 0) {
  const title = cleanText(body.title, 120);
  const description = cleanText(body.description, 700);
  const url = normalizeLink(body.url, "video");
  const thumbnail = normalizeOptionalMediaUrl(body.thumbnail, "capa do vídeo");

  if (!title || !url) {
    throw new Error("Preencha título e vídeo.");
  }

  return {
    id: normalizeUuid(cleanText(body.id, 80) || existing.id || crypto.randomUUID(), crypto.randomUUID()),
    title,
    description,
    url,
    thumbnail,
    status: normalizeStatus(body.status),
    position: Number.isFinite(Number(body.position)) ? Number(body.position) : Number(existing.position || index),
    createdAt: cleanText(body.createdAt, 80) || existing.createdAt || new Date().toISOString(),
  };
}

function normalizeLead(body) {
  const name = cleanText(body.name, 120);
  const company = cleanText(body.company, 140);
  const phone = cleanText(body.phone, 80);
  const service = cleanText(body.service, 120);
  const investmentRange = cleanText(body.investmentRange || body.investment_range, 80);
  const startTimeline = cleanText(body.startTimeline || body.start_timeline, 80);
  const message = cleanText(body.message, 1200);

  if (!name || !phone || !service || !investmentRange || !startTimeline) {
    throw new Error("Preencha nome, WhatsApp, serviço, investimento e prazo para começar.");
  }

  return {
    id: cleanText(body.id, 80) || crypto.randomUUID(),
    name,
    company,
    phone,
    service,
    investmentRange,
    startTimeline,
    message,
    status: cleanText(body.status, 40) || "Novo",
    createdAt: cleanText(body.createdAt, 80) || new Date().toISOString(),
  };
}

function toLeadRow(lead) {
  return {
    id: lead.id,
    name: lead.name,
    company: lead.company,
    phone: lead.phone,
    service: lead.service,
    investment_range: lead.investmentRange,
    start_timeline: lead.startTimeline,
    message: lead.message,
    status: lead.status,
  };
}

async function createLead(body) {
  const lead = normalizeLead(body);

  if (hasSupabaseStorage()) {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.from("leads").insert(toLeadRow(lead)).select().single();

    if (!error) return mapLeadRow(data);
  }

  const leads = await readFallbackLeads();
  const nextLeads = [lead, ...leads].slice(0, 200);
  await writeFallbackLeads(nextLeads);
  return lead;
}

async function updateLeadStatus(id, status) {
  const nextStatus = cleanText(status, 40);
  const allowedStatuses = new Set(["Novo", "Em contato", "Proposta enviada", "Fechado", "Perdido"]);

  if (!allowedStatuses.has(nextStatus)) {
    throw new Error("Status inválido.");
  }

  if (hasSupabaseStorage()) {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from("leads")
      .update({ status: nextStatus })
      .eq("id", id)
      .select()
      .single();

    if (!error && data) return mapLeadRow(data);
  }

  const leads = await readFallbackLeads();
  const nextLeads = leads.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead));
  await writeFallbackLeads(nextLeads);
  return nextLeads.find((lead) => lead.id === id);
}

function collectUsedMedia(data) {
  const used = new Map();
  const add = (url, label) => {
    if (!url) return;
    const current = used.get(url) || [];
    current.push(label);
    used.set(url, current);
  };

  (data.projects || []).forEach((item) => {
    add(item.thumbnail, `Projeto: ${item.title}`);
    add(item.videoUrl, `Projeto: ${item.title}`);
    (item.gallery || []).forEach((url) => add(url, `Galeria: ${item.title}`));
  });
  (data.videos || []).forEach((item) => {
    add(item.url, `Vídeo: ${item.title}`);
    add(item.thumbnail, `Capa do vídeo: ${item.title}`);
  });
  (data.services || []).forEach((item) => add(item.mediaUrl, `Serviço: ${item.title}`));
  (data.logos || []).forEach((item) => add(item.imageUrl, `Cliente: ${item.name}`));
  (data.testimonials || []).forEach((item) => add(item.photoUrl, `Depoimento: ${item.name}`));

  return used;
}

function getStorageObjectUrl(bucket, filePath) {
  if (!hasSupabaseStorage()) return "";
  const baseUrl = process.env.SUPABASE_URL.replace(/\/$/, "");
  return `${baseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
}

function parseStorageUrl(url) {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (!match) return null;
    return {
      bucket: decodeURIComponent(match[1]),
      filePath: decodeURIComponent(match[2]),
    };
  } catch {
    return null;
  }
}

async function listBucketMedia(bucket, prefix, type, usedMedia) {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.storage.from(bucket).list(prefix, {
    limit: 100,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error) throw error;

  return (data || [])
    .filter((item) => item.name && !item.name.endsWith("/"))
    .map((item) => {
      const filePath = `${prefix}/${item.name}`;
      const url = getStorageObjectUrl(bucket, filePath);
      const usedIn = usedMedia.get(url) || [];
      return {
        id: `${bucket}:${filePath}`,
        bucket,
        path: filePath,
        name: item.name,
        type,
        url,
        size: item.metadata?.size || 0,
        createdAt: item.created_at || item.updated_at || "",
        used: usedIn.length > 0,
        usedIn,
      };
    });
}

async function listMediaLibrary() {
  if (!hasSupabaseStorage()) return [];
  await ensureImageBucket();
  await ensureVideoBucket();
  const siteData = await readSiteData();
  const usedMedia = collectUsedMedia(siteData);
  const [images, videos] = await Promise.all([
    listBucketMedia(imageBucket, "portfolio", "image", usedMedia),
    listBucketMedia(videoBucket, "videos", "video", usedMedia),
  ]);
  return [...images, ...videos].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

async function deleteMediaObject(bucket, filePath) {
  if (!hasSupabaseStorage()) {
    throw new Error("Configure o Supabase para gerenciar mídia.");
  }
  if (![imageBucket, videoBucket].includes(bucket)) {
    throw new Error("Bucket inválido.");
  }

  const url = getStorageObjectUrl(bucket, filePath);
  const usedIn = collectUsedMedia(await readSiteData()).get(url) || [];
  if (usedIn.length > 0) {
    throw new Error(`Esta mídia está em uso: ${usedIn.join(", ")}.`);
  }

  const supabase = await getSupabaseClient();
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw error;
}

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (!name) return cookies;
    const value = valueParts.join("=");
    try {
      cookies[name] = decodeURIComponent(value);
    } catch {
      cookies[name] = value;
    }
    return cookies;
  }, {});
}

function getSessionSecret() {
  return process.env.SESSION_SECRET || fallbackSessionSecret;
}

function getClientKey(request) {
  const forwardedFor = String(request.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return cleanText(forwardedFor || request.ip || request.socket?.remoteAddress || "unknown", 120);
}

function readLoginAttempt(key) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    return { count: 0, resetAt: now + loginWindowMs };
  }
  return attempt;
}

function pruneLoginAttempts() {
  const now = Date.now();
  loginAttempts.forEach((attempt, key) => {
    if (attempt.resetAt <= now) loginAttempts.delete(key);
  });
}

function isLoginBlocked(key) {
  return readLoginAttempt(key).count >= maxLoginAttempts;
}

function recordFailedLogin(key) {
  pruneLoginAttempts();
  const attempt = readLoginAttempt(key);
  loginAttempts.set(key, {
    count: attempt.count + 1,
    resetAt: attempt.resetAt,
  });
}

function clearLoginAttempts(key) {
  loginAttempts.delete(key);
}

function readLeadSubmission(key) {
  const now = Date.now();
  const attempt = leadSubmissions.get(key);
  if (!attempt || attempt.resetAt <= now) {
    return { count: 0, resetAt: now + leadWindowMs };
  }
  return attempt;
}

function isLeadSubmissionBlocked(key) {
  return readLeadSubmission(key).count >= maxLeadSubmissions;
}

function recordLeadSubmission(key) {
  const attempt = readLeadSubmission(key);
  leadSubmissions.set(key, {
    count: attempt.count + 1,
    resetAt: attempt.resetAt,
  });
}

function signValue(value) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function signaturesMatch(expected, received) {
  const expectedBuffer = Buffer.from(String(expected || ""));
  const receivedBuffer = Buffer.from(String(received || ""));
  return expectedBuffer.length === receivedBuffer.length && crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

function createAuthSession() {
  const csrfToken = crypto.randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + sessionDurationMs;
  const payload = Buffer.from(JSON.stringify({ role: "admin", expiresAt, csrfToken })).toString("base64url");
  return {
    csrfToken,
    token: `${payload}.${signValue(payload)}`,
  };
}

function parseAuthToken(token) {
  if (!token || !token.includes(".")) return false;

  const [payload, signature] = token.split(".");
  if (!signaturesMatch(signValue(payload), signature)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.role !== "admin" || Number(data.expiresAt) <= Date.now() || !data.csrfToken) return false;
    return data;
  } catch {
    return false;
  }
}

function isAuthenticated(request, response, next) {
  const cookies = parseCookies(request.headers.cookie);
  const auth = parseAuthToken(cookies[sessionCookieName]);
  if (auth) {
    request.auth = auth;
    next();
    return;
  }
  response.status(401).json({ error: "Acesso não autorizado." });
}

function requireCsrf(request, response, next) {
  const receivedToken = cleanText(request.headers["x-csrf-token"], 200);
  const expectedToken = request.auth?.csrfToken;
  if (expectedToken && signaturesMatch(expectedToken, receivedToken)) {
    next();
    return;
  }
  response.status(403).json({ error: "Sessão expirada. Entre novamente no admin." });
}

app.get("/", (_request, response) => {
  response.sendFile(path.join(rootDir, "index.html"));
});

app.get("/index.html", (_request, response) => {
  response.sendFile(path.join(rootDir, "index.html"));
});

app.get("/admin.html", (_request, response) => {
  response.sendFile(path.join(rootDir, "admin.html"));
});

app.get("/admin", (_request, response) => {
  response.sendFile(path.join(rootDir, "admin.html"));
});

app.get("/robots.txt", (_request, response) => {
  response.type("text/plain").sendFile(path.join(rootDir, "robots.txt"));
});

app.get("/sitemap.xml", (_request, response) => {
  response.type("application/xml").sendFile(path.join(rootDir, "sitemap.xml"));
});

app.get("/api/site-data", async (_request, response, next) => {
  try {
    const { leads, ...publicData } = await readSiteData();
    response.json(publicData);
  } catch (error) {
    next(error);
  }
});

app.get("/api/session", (request, response) => {
  const cookies = parseCookies(request.headers.cookie);
  const auth = parseAuthToken(cookies[sessionCookieName]);
  response.json(auth ? { authenticated: true, csrfToken: auth.csrfToken } : { authenticated: false });
});

app.post("/api/login", (request, response) => {
  const username = cleanText(request.body.username, 120);
  const password = cleanText(request.body.password, 200);
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "alvesconnect";
  const loginKey = getClientKey(request);

  if (isLoginBlocked(loginKey)) {
    response.status(429).json({ error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." });
    return;
  }

  if (username !== adminUsername || password !== adminPassword) {
    recordFailedLogin(loginKey);
    response.status(401).json({ error: "Usuário ou senha incorretos." });
    return;
  }

  clearLoginAttempts(loginKey);
  const session = createAuthSession();
  response.cookie(sessionCookieName, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionDurationMs,
  });
  response.json({ ok: true, csrfToken: session.csrfToken });
});

app.post("/api/logout", (request, response) => {
  response.clearCookie(sessionCookieName, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.json({ ok: true });
});

app.get("/api/admin/data", isAuthenticated, async (_request, response, next) => {
  try {
    response.json(await readSiteData());
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/leads", isAuthenticated, async (_request, response, next) => {
  try {
    const data = await readSiteData();
    response.json({ leads: data.leads || [] });
  } catch (error) {
    next(error);
  }
});

app.post("/api/leads", async (request, response, next) => {
  try {
    const leadKey = getClientKey(request);
    if (isLeadSubmissionBlocked(leadKey)) {
      response.status(429).json({ error: "Muitas solicitações. Aguarde alguns minutos e tente novamente." });
      return;
    }

    const lead = await createLead(request.body || {});
    recordLeadSubmission(leadKey);
    response.status(201).json({ lead });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/leads/:id/status", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const lead = await updateLeadStatus(request.params.id, request.body.status);
    if (!lead) {
      response.status(404).json({ error: "Lead não encontrado." });
      return;
    }
    response.json({ lead });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/leads/:id", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const leadId = cleanText(request.params.id, 80);

    if (hasSupabaseStorage()) {
      const supabase = await getSupabaseClient();
      const { error } = await supabase.from("leads").delete().eq("id", leadId);
      if (!error) {
        response.json(await readSiteData());
        return;
      }
    }

    const leads = await readFallbackLeads();
    await writeFallbackLeads(leads.filter((lead) => lead.id !== leadId));
    response.json(await readSiteData());
  } catch (error) {
    next(error);
  }
});

app.put("/api/content", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    data.content = normalizeContent(request.body || {});
    await writeSiteData(data);
    response.json(data);
  } catch (error) {
    next(error);
  }
});

app.put("/api/links", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    data.content = {
      ...data.content,
      whatsappMessage: cleanText(request.body.whatsappMessage, 300) || defaultContent.whatsappMessage,
    };
    data.links = normalizeLinks(request.body || {});
    await writeSiteData(data);
    response.json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/api/uploads/images", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    if (!hasSupabaseStorage()) {
      response.status(400).json({ error: "Configure o Supabase para enviar imagens." });
      return;
    }

    const supabase = await getSupabaseClient();
    const upload = parseImageUpload(request.body || {});
    await ensureImageBucket();

    const { error } = await supabase.storage.from(imageBucket).upload(upload.filePath, upload.buffer, {
      contentType: upload.contentType,
      cacheControl: "31536000",
      upsert: false,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(imageBucket).getPublicUrl(upload.filePath);
    response.status(201).json({ url: data.publicUrl, path: upload.filePath, bucket: imageBucket, type: "image" });
  } catch (error) {
    next(error);
  }
});

app.post("/api/uploads/images/sign", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    if (!hasSupabaseStorage()) {
      response.status(400).json({ error: "Configure o Supabase para enviar imagens." });
      return;
    }

    const supabase = await getSupabaseClient();
    const upload = parseImageUploadRequest(request.body || {});
    await ensureImageBucket();

    const { data, error } = await supabase.storage
      .from(imageBucket)
      .createSignedUploadUrl(upload.filePath, { upsert: Boolean(request.body.upsert) });
    if (error) throw error;

    const publicUrl = supabase.storage.from(imageBucket).getPublicUrl(upload.filePath).data.publicUrl;
    response.status(201).json({
      signedUrl: data.signedUrl,
      token: data.token,
      path: data.path,
      url: publicUrl,
      bucket: imageBucket,
      type: "image",
      contentType: upload.contentType,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/uploads/videos/sign", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    if (!hasSupabaseStorage()) {
      response.status(400).json({ error: "Configure o Supabase para enviar vídeos." });
      return;
    }

    const supabase = await getSupabaseClient();
    const upload = parseVideoUploadRequest(request.body || {});
    await ensureVideoBucket();

    const { data, error } = await supabase.storage
      .from(videoBucket)
      .createSignedUploadUrl(upload.filePath, { upsert: Boolean(request.body.upsert) });
    if (error) throw error;

    const publicUrl = supabase.storage.from(videoBucket).getPublicUrl(upload.filePath).data.publicUrl;
    response.status(201).json({
      signedUrl: data.signedUrl,
      token: data.token,
      path: data.path,
      url: publicUrl,
      bucket: videoBucket,
      type: "video",
      contentType: upload.contentType,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/media/images/replace", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    if (!hasSupabaseStorage()) {
      response.status(400).json({ error: "Configure o Supabase para substituir imagens." });
      return;
    }

    const bucket = cleanText(request.body.bucket, 80);
    const filePath = cleanStoragePath(request.body.path, "portfolio");
    if (bucket !== imageBucket || !filePath) {
      response.status(400).json({ error: "Imagem inválida para substituição." });
      return;
    }

    const supabase = await getSupabaseClient();
    const upload = parseImageUpload(request.body || {});
    await ensureImageBucket();

    const { error } = await supabase.storage.from(imageBucket).upload(filePath, upload.buffer, {
      contentType: upload.contentType,
      cacheControl: "31536000",
      upsert: true,
    });

    if (error) throw error;

    response.json({ url: getStorageObjectUrl(imageBucket, filePath), path: filePath, bucket: imageBucket, type: "image" });
  } catch (error) {
    next(error);
  }
});

app.get("/api/media", isAuthenticated, async (_request, response, next) => {
  try {
    response.json({ media: await listMediaLibrary() });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/media", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const bucket = cleanText(request.body.bucket, 80);
    const filePath = cleanText(request.body.path, 500);
    await deleteMediaObject(bucket, filePath);
    response.json({ ok: true, media: await listMediaLibrary() });
  } catch (error) {
    next(error);
  }
});

app.put("/api/projects", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    data.projects = normalizeProjects(request.body.projects || []);
    await writeSiteData(data);
    response.json(data);
  } catch (error) {
    next(error);
  }
});

app.put("/api/sections", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    const sections = normalizeEditableSections(request.body || {});
    data.services = sections.services;
    data.logos = sections.logos;
    data.testimonials = sections.testimonials;
    data.metrics = sections.metrics;
    await writeSiteData(data);
    response.json(data);
  } catch (error) {
    next(error);
  }
});

app.put("/api/videos", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    data.videos = Array.isArray(request.body.videos)
      ? request.body.videos.map((video, index) => normalizeVideo(video, data.videos[index] || {}, index)).slice(0, 48)
      : data.videos;
    await writeSiteData(data);
    response.json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/api/videos", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    data.videos.push(normalizeVideo(request.body || {}, {}, data.videos.length));
    await writeSiteData(data);
    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.put("/api/videos/:id", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    const videoIndex = data.videos.findIndex((video, index) => video.id === request.params.id || String(index) === request.params.id);

    if (videoIndex < 0) {
      response.status(404).json({ error: "Vídeo não encontrado." });
      return;
    }

    data.videos[videoIndex] = normalizeVideo(
      {
        ...request.body,
        id: data.videos[videoIndex].id,
        createdAt: data.videos[videoIndex].createdAt,
      },
      data.videos[videoIndex],
      videoIndex,
    );
    await writeSiteData(data);
    response.json(data);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/videos/:id", isAuthenticated, requireCsrf, async (request, response, next) => {
  try {
    const data = await readSiteData();
    const nextVideos = data.videos.filter((video, index) => video.id !== request.params.id && String(index) !== request.params.id);

    if (nextVideos.length === data.videos.length) {
      response.status(404).json({ error: "Vídeo não encontrado." });
      return;
    }

    data.videos = nextVideos;
    await writeSiteData(data);
    response.json(data);
  } catch (error) {
    next(error);
  }
});

app.use((_request, response) => {
  response.status(404).sendFile(path.join(rootDir, "index.html"));
});

app.use((error, _request, response, _next) => {
  const status =
    error.message?.includes("invalido") ||
    error.message?.includes("inválido") ||
    error.message?.includes("Preencha") ||
    error.message?.includes("imagem") ||
    error.message?.includes("Imagem") ||
    error.message?.includes("vídeo") ||
    error.message?.includes("Vídeo") ||
    error.message?.includes("Status")
      ? 400
      : 500;
  response.status(status).json({ error: error.message || "Erro interno do servidor." });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Alves Connect rodando em http://localhost:${port}`);
  });
}

module.exports = app;
