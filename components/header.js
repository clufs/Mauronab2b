export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("header");
    wrapper.classList.add("header");

    wrapper.innerHTML = `
      <div class="header-container">
        <div class="header-logo">
        <a href="/">
        <img src="/public/logo.svg" alt="Maurona Logo" />
        </a>
        </div>
        <nav class="nav">
          <a href="/">Inicio</a>
          <a href="/pages/products">Catálogo</a>
          <a href="/pages/galery">Galeria</a>
          <a href="/pages/about">Acerca de mi</a>
          <a href="/pages/contact">Contacto</a>
        </nav>
        <button class="mobile-menu" aria-label="Abrir menú">☰</button>
      </div>
      <nav class="mobile-nav">
        <a href="/">Inicio</a>
        <a href="/pages/products">Catálogo</a>
        <a href="/pages/galery">Galeria</a>
        <a href="/pages/about">Acerca de mi</a>
        <a href="/pages/contact">Contacto</a>
      </nav>
    `;

    const style = document.createElement("style");
    style.textContent = `
      :host {
        --background: #fdfcfb;
        --foreground: #2d2d2d;
        --primary: #1a5463;
        --primary-foreground: #ffffff;
        --muted-foreground: #6b6458;
        --border: rgba(26, 84, 99, 0.15);
        --header-height: 64px;
        position: relative;
        z-index: 50;
      }
      .header {
        position: fixed;
        inset: 0 0 auto 0;
        background-color: rgba(253, 252, 251, 0.95);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--border);
        height: var(--header-height);
        width: 100%;
        opacity: 1; /* visible por defecto */
        transition: opacity 0.35s ease;
      }
      .header-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1.5rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .header-logo { display:flex; align-items:center; gap: .75rem; color: var(--primary); }
      .header-logo img { height: 3rem; width: 3rem; display:block; }

      .nav { display:flex; align-items:center; gap:2rem; }
      .nav a { color: var(--muted-foreground); text-decoration:none; transition: color .2s; font-weight:500; }
      .nav a:hover { color: var(--foreground); }

      .mobile-menu { display:none; background:none; border:none; font-size:30px; line-height:1; cursor:pointer; }

      .mobile-nav { display:none; }

      @media (max-width: 768px) {
        .nav { display:none; }
        .mobile-menu { display:block; }

        .mobile-nav {
          position: fixed;
          top: var(--header-height);
          left: 0; right: 0;
          background: rgba(253, 252, 251, 0.98);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          transform-origin: top;
          transform: scaleY(0);
          opacity: 0;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .mobile-nav a { text-decoration:none; color: var(--foreground); font-weight:500; }
        .mobile-nav.open { transform: scaleY(1); opacity: 1; }
      }
    `;

    this.shadowRoot.append(style, wrapper);

    this._wrapper = wrapper;
    this._onScroll = null;
    this._mobileNav = null;
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector(".mobile-menu");
    const mobileNav = this.shadowRoot.querySelector(".mobile-nav");
    this._mobileNav = mobileNav;

    btn?.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });

    mobileNav?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => mobileNav.classList.remove("open"));
    });

    const hero = document.querySelector(".hero");

    if (!hero) {
      this._wrapper.style.opacity = "1";
      this._wrapper.style.pointerEvents = "auto";
      return;
    }

    const wrapper = this._wrapper;

    const onScroll = () => {
      // Solo ocultar en mobile
      if (window.innerWidth > 760) {
        wrapper.style.opacity = "1";
        wrapper.style.pointerEvents = "auto";
        return;
      }
      const heroHeight = hero?.offsetHeight ?? 0; // SAFE
      if (heroHeight === 0) {
        wrapper.style.opacity = "1";
        wrapper.style.pointerEvents = "auto";
        return;
      }
      if (window.scrollY > heroHeight - 50) {
        wrapper.style.opacity = "1";
        wrapper.style.pointerEvents = "auto";
      } else {
        wrapper.style.opacity = "0";
        wrapper.style.pointerEvents = "none";
      }
    };

    if (window.innerWidth <= 760) {
      this._wrapper.style.opacity = "0";
      this._wrapper.style.pointerEvents = "none";
    } else {
      this._wrapper.style.opacity = "1";
      this._wrapper.style.pointerEvents = "auto";
    }

    this._onScroll = onScroll;
    window.addEventListener("scroll", this._onScroll, { passive: true });
  }

  disconnectedCallback() {
    if (this._onScroll) {
      window.removeEventListener("scroll", this._onScroll);
      this._onScroll = null;
    }
  }
}

customElements.define("my-header", Header);
