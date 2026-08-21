const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalLink = document.querySelector("[data-modal-link]");
const modalClose = document.querySelector("[data-modal-close]");
const modalMedia = document.querySelector("[data-modal-media]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalDetails = document.querySelector("[data-modal-details]");
const projectList = document.querySelector("[data-project-list]");
const videoList = document.querySelector("[data-video-list]");
const serviceList = document.querySelector("[data-service-list]");
const logoList = document.querySelector("[data-logo-list]");
const testimonialList = document.querySelector("[data-testimonial-list]");
const metricList = document.querySelector("[data-metric-list]");
const filterButtons = document.querySelectorAll("[data-filter]");
const specialtiesTrack = document.querySelector("[data-specialties-track]");
const contactForm = document.querySelector("[data-contact-form]");
const formMessage = document.querySelector("[data-form-message]");
const floatingWhatsapp = document.querySelector("[data-floating-whatsapp]");
const budgetLinks = document.querySelectorAll("[data-budget-link]");
const currentYear = document.querySelector("[data-current-year]");
const revealElements = document.querySelectorAll(".reveal");

const appConfig = window.alvesConnectConfig || {};
let activeLinks = { ...(appConfig.contact || {}) };
let lastFocusedElement = null;
let activeProjects = appConfig.projects || [];
let activeServices = appConfig.services || [];

function isPublished(item = {}) {
  return !item.status || item.status === "Publicado";
}

async function fetchSiteData() {
  try {
    const response = await fetch("/api/site-data", { credentials: "same-origin" });
    if (!response.ok) throw new Error("API indisponível");
    return await response.json();
  } catch {
    return { content: {}, links: {}, videos: [] };
  }
}

function applyContent(content = {}) {
  Object.entries(content).forEach(([key, value]) => {
    document.querySelectorAll(`[data-content="${key}"]`).forEach((element) => {
      if (element && typeof value === "string" && value.trim()) {
        element.textContent = value;
      }
    });
  });
}

function renderSpecialties(value = "") {
  if (!specialtiesTrack || !value.trim()) return;
  const items = value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
  if (!items.length) return;
  const repeatedItems = Array.from({ length: 4 }, () => items).flat();
  specialtiesTrack.innerHTML = "";
  repeatedItems.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    specialtiesTrack.appendChild(span);
  });
}

function normalizeContactLinks(links = {}) {
  return { ...(appConfig.contact || {}), ...links };
}

function disableLink(element) {
  element.removeAttribute("href");
  element.removeAttribute("target");
  element.removeAttribute("rel");
  element.setAttribute("aria-disabled", "true");
}

function applyLinks(links = {}) {
  activeLinks = normalizeContactLinks(links);

  document.querySelectorAll("[data-link]").forEach((element) => {
    const value = activeLinks[element.dataset.link];
    if (!value) {
      disableLink(element);
      return;
    }

    element.href = value;
    element.target = "_blank";
    element.rel = "noopener";
    element.removeAttribute("aria-disabled");
  });

  if (activeLinks.whatsapp) {
    const whatsappUrl = buildWhatsAppUrl(activeLinks.whatsapp);
    floatingWhatsapp.href = whatsappUrl;
    floatingWhatsapp.target = "_blank";
    floatingWhatsapp.rel = "noopener";

    document.querySelectorAll('[data-link="whatsapp"]').forEach((link) => {
      link.href = whatsappUrl;
    });
  }
}

function buildWhatsAppUrl(baseUrl, message = "Olá! Conheci o trabalho de vocês pelo site e gostaria de conversar sobre um projeto.") {
  if (!baseUrl) return "#contato";
  try {
    const url = new URL(baseUrl);
    if (url.searchParams.has("text")) return baseUrl;
  } catch {
    return baseUrl;
  }
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
}

function createNeutralMedia(className = "") {
  const media = document.createElement("div");
  media.className = `portfolio-media ${className}`;
  media.innerHTML = "<span></span><span></span><span></span>";
  return media;
}

function createServicePreview(service) {
  if (service.mediaUrl && service.mediaType === "image") {
    const image = document.createElement("img");
    image.className = "service-media";
    image.src = service.mediaUrl;
    image.alt = service.title;
    image.loading = "lazy";
    return image;
  }

  if (service.mediaUrl && service.mediaType === "video") {
    const embedUrl = getVideoEmbedUrl(service.mediaUrl);
    if (embedUrl) {
      const iframe = createModalEmbed(embedUrl, service.title);
      iframe.className = "service-media";
      return iframe;
    }

    const video = createModalVideo(service.mediaUrl, service.title);
    video.className = "service-media";
    video.muted = true;
    video.loop = true;
    return video;
  }

  const preview = document.createElement("div");
  preview.className = `service-preview ${service.tone || "reels"}-preview`;
  preview.setAttribute("aria-hidden", "true");
  preview.innerHTML = "<span></span><span></span>";
  return preview;
}

function createServiceCard(service, index) {
  const card = document.createElement("article");
  const number = document.createElement("span");
  const title = document.createElement("h3");
  const description = document.createElement("p");

  card.className = "service-card";
  number.textContent = service.number || String(index + 1).padStart(2, "0");
  title.textContent = service.title;
  description.textContent = service.description;

  card.append(createServicePreview(service), number, title, description);
  return card;
}

function renderServices(services = []) {
  if (!serviceList) return;
  serviceList.innerHTML = "";
  const source = services.length > 0 ? services : activeServices;
  source.filter(isPublished).forEach((service, index) => serviceList.appendChild(createServiceCard(service, index)));
}

function renderAuthority(logos = [], testimonials = []) {
  const visibleLogos = logos.filter(isPublished);
  const visibleTestimonials = testimonials.filter(isPublished);
  if (logoList) {
    logoList.innerHTML = "";
    if (visibleLogos.length === 0) {
      ["Logo cliente", "Logo cliente", "Logo cliente", "Logo cliente"].forEach((label) => {
        const item = document.createElement("span");
        item.textContent = label;
        logoList.appendChild(item);
      });
    } else {
      visibleLogos.forEach((logo) => {
        const item = document.createElement("figure");
        const image = document.createElement("img");
        image.src = logo.imageUrl;
        image.alt = logo.name;
        image.loading = "lazy";
        item.appendChild(image);
        logoList.appendChild(item);
      });
    }
  }

  if (!testimonialList) return;
  testimonialList.innerHTML = "";

  if (visibleTestimonials.length === 0) {
    testimonialList.innerHTML = `
      <article class="testimonial-empty">
        <span>Depoimentos</span>
        <h3>Área pronta para provas sociais reais</h3>
        <p>Quando houver depoimentos autorizados, o painel poderá receber foto, nome, empresa, cargo e texto. Nenhum cliente ou resultado fictício será exibido.</p>
      </article>
    `;
    return;
  }

  visibleTestimonials.forEach((testimonial) => {
    const item = document.createElement("article");
    const avatar = document.createElement(testimonial.photoUrl ? "img" : "div");
    const quote = document.createElement("p");
    const name = document.createElement("strong");
    const meta = document.createElement("span");

    item.className = "testimonial-card";
    avatar.className = "testimonial-avatar";
    if (testimonial.photoUrl) {
      avatar.src = testimonial.photoUrl;
      avatar.alt = testimonial.name;
      avatar.loading = "lazy";
    }
    quote.textContent = testimonial.quote;
    name.textContent = testimonial.name;
    meta.textContent = [testimonial.company, testimonial.role].filter(Boolean).join(" • ");

    item.append(avatar, quote, name, meta);
    testimonialList.appendChild(item);
  });
}

function renderMetrics(metrics = []) {
  if (!metricList) return;
  metricList.innerHTML = "";
  const visibleMetrics = metrics.filter(isPublished);

  if (visibleMetrics.length === 0) {
    metricList.classList.add("is-empty");
    metricList.innerHTML = `
      <div class="results-empty">
        <strong>Métricas reais em preparação</strong>
        <span>Visualizações, projetos, marcas atendidas e conteúdos produzidos serão exibidos apenas com dados confirmados.</span>
      </div>
    `;
    return;
  }

  metricList.classList.remove("is-empty");
  visibleMetrics.forEach((metric) => {
    const item = document.createElement("article");
    const value = document.createElement("strong");
    const label = document.createElement("span");
    const description = document.createElement("p");
    item.className = "metric-card";
    value.textContent = metric.value;
    label.textContent = metric.label;
    description.textContent = metric.description || "";
    item.append(value, label, description);
    metricList.appendChild(item);
  });
}

function getVideoEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");
    const buildYoutubeEmbed = (videoId) => {
      const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
      embedUrl.searchParams.set("rel", "0");
      embedUrl.searchParams.set("modestbranding", "1");
      embedUrl.searchParams.set("playsinline", "1");
      if (window.location.origin) embedUrl.searchParams.set("origin", window.location.origin);
      return embedUrl.toString();
    };

    if (host === "youtu.be") {
      return buildYoutubeEmbed(parsedUrl.pathname.slice(1));
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) return buildYoutubeEmbed(videoId);

      const shortsMatch = parsedUrl.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shortsMatch) return buildYoutubeEmbed(shortsMatch[1]);

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

function getYoutubeThumbnail(url) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      videoId =
        parsedUrl.searchParams.get("v") ||
        parsedUrl.pathname.match(/^\/shorts\/([^/?]+)/)?.[1] ||
        parsedUrl.pathname.match(/^\/embed\/([^/?]+)/)?.[1] ||
        "";
    }

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  } catch {
    return "";
  }
}

function isDirectVideoUrl(url) {
  try {
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

function getVideoType(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    if (pathname.endsWith(".mp4")) return "video/mp4";
    if (pathname.endsWith(".webm")) return "video/webm";
    if (pathname.endsWith(".ogg")) return "video/ogg";
    if (pathname.endsWith(".mov")) return "video/quicktime";
  } catch {
    return "";
  }

  return "";
}

function createVideoFallback(url) {
  const fallback = document.createElement("div");
  const text = document.createElement("p");
  const link = document.createElement("a");

  fallback.className = "video-fallback";
  text.textContent = "Este navegador não conseguiu tocar esse formato. Para funcionar melhor no site, envie o vídeo em MP4.";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Abrir vídeo";

  fallback.append(text, link);
  return fallback;
}

function createModalVideo(url, title, poster = "") {
  const video = document.createElement("video");
  const source = document.createElement("source");

  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.setAttribute("aria-label", title);
  video.setAttribute("controlsList", "nodownload");
  if (poster) video.poster = poster;
  source.src = url;
  source.type = getVideoType(url);
  video.appendChild(source);
  video.addEventListener("error", () => {
    video.replaceWith(createVideoFallback(url));
  });
  return video;
}

function createModalEmbed(url, title) {
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.title = title;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  return iframe;
}

function createInlineVideo(url, title, poster = "") {
  const video = createModalVideo(url, title, poster);
  video.className = "inline-video-player";
  return video;
}

function createInlineEmbed(url, title) {
  const iframe = createModalEmbed(url, title);
  iframe.className = "inline-video-player";
  return iframe;
}

function openModal(item) {
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = item.title;
  modalText.textContent = item.description || "";
  modalCategory.textContent = item.category || "Portfólio";
  modalMedia.innerHTML = "";
  modalDetails.innerHTML = "";

  const playableUrl = item.videoUrl || item.url || "";
  const embedUrl = getVideoEmbedUrl(playableUrl);

  if (isDirectVideoUrl(playableUrl)) {
    modalMedia.appendChild(createModalVideo(playableUrl, item.title, item.thumbnail || ""));
  } else if (embedUrl) {
    modalMedia.appendChild(createModalEmbed(embedUrl, item.title));
  } else if (item.thumbnail) {
    const image = document.createElement("img");
    image.src = item.thumbnail;
    image.alt = item.title;
    modalMedia.appendChild(image);
  } else {
    modalMedia.appendChild(createNeutralMedia(item.tone || ""));
  }

  if (item.externalUrl || item.url) {
    modalLink.href = item.externalUrl || item.url;
    modalLink.classList.add("visible");
  } else {
    modalLink.classList.remove("visible");
    modalLink.removeAttribute("href");
  }

  [
    ["Cliente", item.client],
    ["Objetivo", item.objective],
    ["Serviço realizado", item.serviceDone],
    ["Desafio", item.challenge],
    ["Estratégia", item.strategy],
    ["Execução", item.execution],
    ["Resultado", item.result],
  ].forEach(([label, value]) => {
    if (!value) return;
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    modalDetails.append(term, description);
  });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

function createProjectCard(project) {
  const card = document.createElement("article");
  const mediaWrap = document.createElement("button");
  const body = document.createElement("div");
  const meta = document.createElement("span");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const specs = document.createElement("div");
  const hint = document.createElement("button");

  card.className = "project-card";
  card.dataset.category = project.category;
  mediaWrap.className = "project-media-button";
  mediaWrap.type = "button";
  mediaWrap.setAttribute("aria-label", `Abrir ${project.title}`);

  if (project.thumbnail) {
    const image = document.createElement("img");
    image.src = project.thumbnail;
    image.alt = project.title;
    mediaWrap.appendChild(image);
  } else {
    mediaWrap.appendChild(createNeutralMedia(project.tone || ""));
  }

  meta.textContent = `${project.category}${project.client ? ` • ${project.client}` : ""}`;
  title.textContent = project.title;
  description.textContent = project.description;
  specs.className = "project-specs";
  [project.client && `Cliente: ${project.client}`, project.serviceDone && `Serviços: ${project.serviceDone}`, project.result && `Resultado: ${project.result}`]
    .filter(Boolean)
    .forEach((item) => {
      const spec = document.createElement("span");
      spec.textContent = item;
      specs.appendChild(spec);
    });
  hint.className = "project-open";
  hint.type = "button";
  hint.textContent = "Ver case";
  hint.addEventListener("click", () => openModal(project));

  body.className = "project-body";
  body.append(meta, title, description, specs, hint);
  card.append(mediaWrap, body);
  mediaWrap.addEventListener("click", () => openModal(project));

  return card;
}

function renderProjects(filter = "Todos") {
  projectList.innerHTML = "";

  activeProjects
    .filter((project) => isPublished(project) && (filter === "Todos" || project.category === filter))
    .forEach((project) => projectList.appendChild(createProjectCard(project)));
}

function openVideoModalFromCard(video, index) {
  openModal({
    title: video.title,
    category: "Vídeo",
    description: video.description,
    url: video.url,
    externalUrl: video.url,
    tone: index % 2 === 0 ? "navy" : "gold",
  });
}

function createVideoCard(video, index) {
  const card = document.createElement("article");
  const frame = document.createElement("div");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const expandButton = document.createElement("button");
  const embedUrl = getVideoEmbedUrl(video.url);
  const canPlayInline = isDirectVideoUrl(video.url) || Boolean(embedUrl);

  card.className = "reel-card";
  frame.className = "reel-frame";

  if (isDirectVideoUrl(video.url)) {
    frame.appendChild(createInlineVideo(video.url, video.title, video.thumbnail || ""));
  } else if (embedUrl) {
    const posterButton = document.createElement("button");
    const poster = video.thumbnail || getYoutubeThumbnail(video.url);
    posterButton.className = "reel-placeholder-button video-poster-button";
    posterButton.type = "button";
    posterButton.setAttribute("aria-label", `Abrir vídeo ${video.title}`);

    if (poster) {
      const image = document.createElement("img");
      image.src = poster;
      image.alt = video.title;
      image.loading = "lazy";
      posterButton.appendChild(image);
    } else {
      posterButton.appendChild(createNeutralMedia(index % 2 === 0 ? "navy" : "gold"));
    }

    posterButton.insertAdjacentHTML("beforeend", '<span class="play-badge">Play</span>');
    posterButton.addEventListener("click", () => openVideoModalFromCard(video, index));
    frame.appendChild(posterButton);
  } else {
    const placeholderButton = document.createElement("button");
    placeholderButton.className = "reel-placeholder-button";
    placeholderButton.type = "button";
    placeholderButton.setAttribute("aria-label", `Abrir vídeo ${video.title}`);
    placeholderButton.appendChild(createNeutralMedia(index % 2 === 0 ? "navy" : "gold"));
    placeholderButton.insertAdjacentHTML("beforeend", '<span class="play-badge">Play</span>');
    placeholderButton.addEventListener("click", () => openVideoModalFromCard(video, index));
    frame.appendChild(placeholderButton);
  }

  title.textContent = video.title;
  description.textContent = video.description || "";

  card.append(frame, title);
  if (video.description) card.appendChild(description);

  if (canPlayInline) {
    expandButton.className = "reel-expand";
    expandButton.type = "button";
    expandButton.textContent = "Ver maior";
    expandButton.addEventListener("click", () => openVideoModalFromCard(video, index));
    card.appendChild(expandButton);
  }

  return card;
}

function renderVideos(videos = []) {
  videoList.innerHTML = "";

  const validVideos = videos.filter((video) => isPublished(video) && video.title && video.url);
  const source = validVideos.length > 0 ? validVideos : appConfig.sampleVideos || [];

  source.forEach((video, index) => {
    videoList.appendChild(createVideoCard(video, index));
  });
}

function buildWhatsAppMessage(formData) {
  return [
    `Olá! Conheci o trabalho de vocês pelo site e gostaria de conversar sobre um projeto.`,
    `Meu nome é ${formData.get("name")}.`,
    formData.get("service") ? `Tenho interesse em ${formData.get("service")}.` : "",
    formData.get("company") ? `Minha marca/empresa é ${formData.get("company")}.` : "",
    formData.get("phone") ? `Meu WhatsApp é ${formData.get("phone")}.` : "",
    formData.get("investmentRange") ? `Investimento mensal planejado: ${formData.get("investmentRange")}.` : "",
    formData.get("startTimeline") ? `Pretendo começar: ${formData.get("startTimeline")}.` : "",
    formData.get("message") || "",
  ]
    .filter(Boolean)
    .join("\n");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const whatsapp = activeLinks.whatsapp;
  const submitButton = contactForm.querySelector("button[type='submit']");

  submitButton.disabled = true;
  formMessage.textContent = "Enviando solicitação...";
  formMessage.classList.remove("is-error");

  try {
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Não foi possível enviar a solicitação.");

    if (whatsapp) {
      window.open(buildWhatsAppUrl(whatsapp, buildWhatsAppMessage(formData)), "_blank", "noopener");
      formMessage.textContent = "Solicitação salva. A conversa foi preparada no WhatsApp.";
    } else {
      formMessage.textContent = "Solicitação enviada. Cadastre o WhatsApp no admin para abrir a conversa automaticamente.";
    }
    contactForm.reset();
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
  }
});

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

header?.classList.toggle("is-scrolled", window.scrollY > 18);
renderProjects();
renderServices();
renderAuthority();
renderMetrics();

fetchSiteData().then((siteData) => {
  applyContent(siteData.content);
  renderSpecialties(siteData.content?.specialtiesItems || "");
  applyLinks(siteData.links);
  if (Array.isArray(siteData.projects) && siteData.projects.length > 0) {
    activeProjects = siteData.projects;
    const activeFilter = document.querySelector("[data-filter].active")?.dataset.filter || "Todos";
    renderProjects(activeFilter);
  }
  renderVideos(siteData.videos);
  renderServices(siteData.services || []);
  renderAuthority(siteData.logos || [], siteData.testimonials || []);
  renderMetrics(siteData.metrics || []);
});
