export class AdminHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const el = document.createElement("header");
    el.className = "hdr";
    el.innerHTML = `
      <div class="bar">
        <a class="brand" href="/admin">
          <img class="logo" src="/public/logo.svg" alt="Maurona" />
        </a>

        <div class="rhs">
          <a href="/">Volver a la tienda</a>
        </div>
      </div>

      <nav class="nav-mobile" hidden>
        <a href="/admin" data-id="dashboard">Dashboard</a>
        <a href="/admin/products" data-id="products">Productos</a>
        <a href="/admin/messages" data-id="messages">Mensajes</a>
      </nav>
    `;

    const css = document.createElement("style");
    css.textContent = `
      :host {
        --bg: rgba(253,252,251,.95);
        --fg: #2d2d2d;
        --muted:#6b6458;
        --primary:#1a5463;
        --border: rgba(26,84,99,.15);
        --h: 60px;
        position: relative;
        z-index: 100;
      }
      .hdr{
        position: fixed; inset: 0 0 auto 0; height: var(--h);
        background: var(--bg); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--border);
        transition: box-shadow .2s ease;
      }
      .hdr.elev{ box-shadow: 0 6px 18px rgba(0,0,0,.06); }

      .bar{
        max-width: 1200px; margin: 0 auto; height: 100%;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 16px; gap: 12px;
      }
      .brand{ display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--primary); }
      .logo{ width:32px; height:32px; display:block; }
      .title{ font-weight:700; letter-spacing:-.02em; }

      .nav{ display:flex; gap:18px; }
      .nav a, .nav-mobile a{
        text-decoration:none; color:var(--muted); font-weight:600; font-size:.95rem;
      }
      .nav a.active, .nav a:hover, .nav-mobile a.active{ color:var(--fg); }

      .rhs{ display:flex; align-items:center; gap:8px; }
      .theme, .burger{
        border:1px solid var(--border); background:#fff; padding:.35rem .6rem;
        border-radius:8px; cursor:pointer; font-size:1rem;
      }
      .burger{ display:none; }

      .nav-mobile{ display:none; }
      .nav-mobile[hidden]{ display:none !important; }

      @media (max-width: 820px){
        .nav{ display:none; }
        .burger{ display:block; }
        .nav-mobile{
          position: fixed; top: var(--h); left:0; right:0;
          background: var(--bg); border-bottom: 1px solid var(--border);
          display:flex; flex-direction:column; gap:12px; padding:14px 16px;
        }
      }

      /* espacio para que el contenido no quede debajo */
      .spacer{ height: var(--h); display:block; }
    `;

    // spacer para empujar contenido
    const spacer = document.createElement("div");
    spacer.className = "spacer";

    this.shadowRoot.append(css, el, spacer);

    this._root = el;
    this._burger = this.shadowRoot.querySelector(".burger");
    this._mobile = this.shadowRoot.querySelector(".nav-mobile");
    this._themeBtn = this.shadowRoot.querySelector(".theme");
  }

  connectedCallback() {
    // resaltar link activo por pathname
    this._highlightActive();

    // menú móvil
    this._burger?.addEventListener("click", () => this._toggleMobile());
    this._mobile
      ?.querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", () => this._closeMobile()));
    document.addEventListener("keydown", this._escClose);

    // sombra al hacer scroll
    this._onScroll = () => {
      if (window.scrollY > 4) this._root.classList.add("elev");
      else this._root.classList.remove("elev");
    };
    this._onScroll();
    window.addEventListener("scroll", this._onScroll, { passive: true });

    // tema claro/oscuro (simple toggle con data-theme en html)
    this._themeBtn?.addEventListener("click", () => {
      const html = document.documentElement;
      const cur = html.getAttribute("data-theme");
      html.setAttribute("data-theme", cur === "dark" ? "light" : "dark");
    });
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll);
    document.removeEventListener("keydown", this._escClose);
  }

  _highlightActive() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const all = this.shadowRoot.querySelectorAll(".nav a, .nav-mobile a");
    all.forEach((a) => {
      const href = a.getAttribute("href")?.replace(/\/+$/, "") || "/";
      if (href === path) a.classList.add("active");
    });
  }

  _toggleMobile() {
    const isHidden = this._mobile.hasAttribute("hidden");
    if (isHidden) {
      this._mobile.removeAttribute("hidden");
      this._burger.setAttribute("aria-expanded", "true");
      document.documentElement.style.overflow = "hidden";
    } else {
      this._closeMobile();
    }
  }

  _closeMobile() {
    this._mobile.setAttribute("hidden", "");
    this._burger.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
  }

  _escClose = (e) => {
    if (e.key === "Escape") this._closeMobile();
  };
}

customElements.define("admin-header", AdminHeader);
