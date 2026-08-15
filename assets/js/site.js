(function () {
  const root = document.documentElement;
  const nav = document.querySelector("[data-nav]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const backToTop = document.querySelector("[data-back-to-top]");
  const form = document.querySelector("[data-contact-form]");
  const starterShowcase = document.querySelector("[data-starter-showcase]");

  const storedTheme = localStorage.getItem("app-theme") || "dark";
  root.classList.toggle("dark", storedTheme === "dark");

  themeToggle?.addEventListener("click", () => {
    const shouldUseDark = !root.classList.contains("dark");
    root.classList.toggle("dark", shouldUseDark);
    localStorage.setItem("app-theme", shouldUseDark ? "dark" : "light");
  });

  menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("menu-visible");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav?.classList.remove("menu-visible"));
  });

  const onScroll = () => {
    nav?.classList.toggle("is-scrolled", window.scrollY > 20);
    backToTop?.classList.toggle("visible", window.scrollY > 300);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  if (starterShowcase) {
    const cycleWord = starterShowcase.querySelector("[data-starter-cycle-word]");
    const cycleWords = ["name", "brand", "business", "dream"];
    let cycleIndex = 0;
    if (cycleWord && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.setInterval(() => {
        cycleWord.classList.add("is-blurring");
        window.setTimeout(() => {
          cycleIndex = (cycleIndex + 1) % cycleWords.length;
          cycleWord.textContent = cycleWords[cycleIndex];
          cycleWord.classList.remove("is-blurring");
        }, 320);
      }, 2200);
    }

    const domainOptions = [...starterShowcase.querySelectorAll("[data-domain-option]")];
    const domainText = starterShowcase.querySelector("[data-domain-text]");
    const domainName = starterShowcase.querySelector("[data-domain-name]");
    const domainRole = starterShowcase.querySelector("[data-domain-role]");
    const domainMonogram = starterShowcase.querySelector("[data-domain-monogram]");
    const domainProfile = starterShowcase.querySelector(".domain-profile");
    let domainTimer;
    let domainRotation;

    const showDomain = (option) => {
      window.clearTimeout(domainTimer);
      domainOptions.forEach((item) => item.classList.toggle("is-active", item === option));
      const value = option.dataset.domain;
      domainText.textContent = "";
      domainName.textContent = option.dataset.name;
      domainRole.textContent = option.dataset.role;
      domainMonogram.textContent = option.dataset.monogram;
      domainProfile.dataset.theme = option.dataset.theme;
      let index = 0;
      const type = () => {
        domainText.textContent = value.slice(0, ++index);
        if (index < value.length) domainTimer = window.setTimeout(type, 46);
      };
      type();
    };
    const startDomainRotation = () => {
      window.clearInterval(domainRotation);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        domainRotation = window.setInterval(() => {
          const activeIndex = domainOptions.findIndex((option) => option.classList.contains("is-active"));
          showDomain(domainOptions[(activeIndex + 1) % domainOptions.length]);
        }, 3200);
      }
    };
    domainOptions.forEach((option) => option.addEventListener("click", () => { showDomain(option); startDomainRotation(); }));
    startDomainRotation();

    const navVariants = [...starterShowcase.querySelectorAll("[data-nav-variant]")];
    const navProgress = [...starterShowcase.querySelectorAll("[data-nav-progress] button")];
    const navNumber = starterShowcase.querySelector("[data-nav-number]");
    const navTitle = starterShowcase.querySelector("[data-nav-title]");
    const navCurrent = starterShowcase.querySelector("[data-nav-current]");
    const navTitles = ["Jane · Gentle confidence", "James · Editorial authority", "André · Energy in motion"];
    let navIndex = 0;
    let navRotation;
    const showNav = (index) => {
      navIndex = (index + navVariants.length) % navVariants.length;
      navVariants.forEach((item, index) => item.classList.toggle("is-active", index === navIndex));
      navProgress.forEach((item, index) => item.classList.toggle("is-active", index === navIndex));
      navNumber.textContent = String(navIndex + 1).padStart(2, "0");
      navCurrent.textContent = String(navIndex + 1).padStart(2, "0");
      navTitle.textContent = navTitles[navIndex];
    };
    const startNavRotation = () => {
      window.clearInterval(navRotation);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) navRotation = window.setInterval(() => showNav(navIndex + 1), 3200);
    };
    starterShowcase.querySelector("[data-nav-prev]")?.addEventListener("click", () => { showNav(navIndex - 1); startNavRotation(); });
    starterShowcase.querySelector("[data-nav-next]")?.addEventListener("click", () => { showNav(navIndex + 1); startNavRotation(); });
    navProgress.forEach((dot, index) => dot.addEventListener("click", () => { showNav(index); startNavRotation(); }));
    showNav(0);
    startNavRotation();

    const slides = [...starterShowcase.querySelectorAll("[data-hero-slide]")];
    const dots = [...starterShowcase.querySelectorAll("[data-hero-dots] button")];
    const current = starterShowcase.querySelector("[data-hero-current]");
    let slideIndex = 0;
    const showSlide = (index) => {
      slideIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === slideIndex));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === slideIndex));
      current.textContent = String(slideIndex + 1).padStart(2, "0");
    };
    starterShowcase.querySelector("[data-hero-prev]")?.addEventListener("click", () => showSlide(slideIndex - 1));
    starterShowcase.querySelector("[data-hero-next]")?.addEventListener("click", () => showSlide(slideIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

    const serviceSlides = [...starterShowcase.querySelectorAll("[data-services-slide]")];
    const serviceDots = [...starterShowcase.querySelectorAll("[data-services-dots] button")];
    const serviceCurrent = starterShowcase.querySelector("[data-services-current]");
    const serviceNumber = starterShowcase.querySelector("[data-services-number]");
    const serviceTitle = starterShowcase.querySelector("[data-services-title]");
    const serviceTitles = ["Jane · A gentle pathway", "James · Structured expertise", "André · Energy in action"];
    let serviceIndex = 0;
    let serviceRotation;
    const showService = (index) => {
      serviceIndex = (index + serviceSlides.length) % serviceSlides.length;
      serviceSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === serviceIndex));
      serviceDots.forEach((dot, i) => dot.classList.toggle("is-active", i === serviceIndex));
      const number = String(serviceIndex + 1).padStart(2, "0");
      serviceCurrent.textContent = number;
      serviceNumber.textContent = number;
      serviceTitle.textContent = serviceTitles[serviceIndex];
    };
    const startServiceRotation = () => {
      window.clearInterval(serviceRotation);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) serviceRotation = window.setInterval(() => showService(serviceIndex + 1), 4200);
    };
    starterShowcase.querySelector("[data-services-prev]")?.addEventListener("click", () => { showService(serviceIndex - 1); startServiceRotation(); });
    starterShowcase.querySelector("[data-services-next]")?.addEventListener("click", () => { showService(serviceIndex + 1); startServiceRotation(); });
    serviceDots.forEach((dot, index) => dot.addEventListener("click", () => { showService(index); startServiceRotation(); }));
    showService(0);
    startServiceRotation();

    const optionSlides = [...starterShowcase.querySelectorAll("[data-options-slide]")];
    const optionDots = [...starterShowcase.querySelectorAll("[data-options-dots] button")];
    const optionCurrent = starterShowcase.querySelector("[data-options-current]");
    const optionNumber = starterShowcase.querySelector("[data-options-number]");
    const optionTitle = starterShowcase.querySelector("[data-options-title]");
    const optionTitles = ["Location", "Testimonials", "Contact", "Team", "Portfolio", "Footer"];
    let optionIndex = 0;
    const showOption = (index) => {
      optionIndex = (index + optionSlides.length) % optionSlides.length;
      optionSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === optionIndex));
      optionDots.forEach((dot, i) => dot.classList.toggle("is-active", i === optionIndex));
      const number = String(optionIndex + 1).padStart(2, "0");
      optionCurrent.textContent = number;
      optionNumber.textContent = number;
      optionTitle.textContent = optionTitles[optionIndex];
    };
    starterShowcase.querySelector("[data-options-prev]")?.addEventListener("click", () => showOption(optionIndex - 1));
    starterShowcase.querySelector("[data-options-next]")?.addEventListener("click", () => showOption(optionIndex + 1));
    optionDots.forEach((dot, index) => dot.addEventListener("click", () => showOption(index)));
    showOption(0);
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector("button[type='submit']");
    const data = new FormData(form);

    if (data.get("location")) return;
    submit.disabled = true;
    status.textContent = form.dataset.sendingMessage;

    try {
      const apiUrl = form.dataset.apiUrl;
      if (!apiUrl) throw new Error("Missing API URL");

      const body = {
        name: String(data.get("name") || "").trim(),
        emailAddress: String(data.get("emailAddress") || "").trim(),
        phoneNumber: String(data.get("phoneNumber") || "").trim(),
        location: String(data.get("location") || ""),
        content: String(data.get("content") || "").trim(),
      };

      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/v1/messages`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");
      form.reset();
      status.textContent = form.dataset.sentMessage;
    } catch {
      const email = form.dataset.errorEmail;
      status.innerHTML = `${form.dataset.errorPrefix} <a href="mailto:${email}">${email}</a>.`;
    } finally {
      submit.disabled = false;
    }
  });
})();
