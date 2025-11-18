import { getAllProducts } from "../../utils/getallProdudcts.js";

export class ProductStatic2Col extends HTMLElement {
  static get observedAttributes() {
    return [
      "title",
      "category",
      "collection",
      "price",
      "min",
      "leadtime",
      "main",
      // dimensiones
      "capacity",
      "width",
      "height",
      "weight",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.state = {
      collection: "sin datos",
      title: "sin datos",
      category: "sin datos",
      price: "sin datos",
      min: "sin datos",
      leadTime: "sin datos",
      mainUrl: "https://placehold.co/1200x1200?text=sin+imagen",
      thumbs: [],
      capacity: "sin datos",
      width: "sin datos",
      height: "sin datos",
      weight: "sin datos",
    };

    this.shadowRoot.innerHTML = `
      <style>
        *{box-sizing:border-box}
        :host{
          --primary:#1a5463; --accent:#d4a574; --bg-light:#fdfcfb; --bg-cream:#f5f1ea;
          --text-dark:#2d2d2d; --text-muted:#6b6458; --border:#e5e5e5; display:block
        }

        .container{max-width:1400px;margin:0 auto;padding:0 2rem;margin-top:40px}
        .main{padding:3rem 0}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;margin-top:2rem}

        .gallery{display:flex;flex-direction:column;gap:1rem}
        .main-img{width:100%;aspect-ratio:1;background:var(--bg-cream);overflow:hidden;border-radius:14px}
        .main-img img{width:100%;height:100%;object-fit:cover;display:block}

        .thumbs{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:1rem;
        }
        .thumb{
          aspect-ratio:1;
          background:var(--bg-cream);
          overflow:hidden;
          border-radius:10px;
          border:1px solid var(--border);
          cursor:pointer;
        }
        .thumb img{width:100%;height:100%;object-fit:cover;display:block}

        .info{display:flex;flex-direction:column;gap:2rem}
        .badge{display:inline-flex;align-items:center;padding:.45rem .9rem;background:var(--accent);color:#fff;width:fit-content;margin-bottom:.75rem;border-radius:999px}
        .badge p { font-size:.78rem;font-weight:800;letter-spacing:.02em;margin:0 }
        .title{font-size:2.3rem;font-weight:900;letter-spacing:.02em;line-height:1.15;margin:.25rem 0 .35rem}
        .cat{color:var(--text-muted);font-size:1.05rem;text-transform:capitalize}

        .price-box{
          padding:1.25rem 0;
          border-top:1px solid var(--border);
          border-bottom:1px solid var(--border)
        }
        .row{display:flex;align-items:baseline;gap:.75rem;margin-bottom:.55rem}
        .row:last-child{margin-bottom:0}
        .label{color:var(--text-muted)}
        .value{color:var(--primary);font-weight:700;font-size:1.1rem}

        .specs{margin-top:1rem}
        .specs .label{font-weight:700}
        .specs ul{
          list-style:none;padding:0;margin:.5rem 0 0 0;
          display:grid;grid-template-columns:1fr 1fr;gap:.6rem 1.25rem
        }
        .specs li{display:flex;gap:.5rem}
        .specs .k{color:var(--text-muted);min-width:110px}
        .specs .v{color:var(--text-dark);font-weight:500}

        @media (max-width:768px){
          .container{padding:0 1rem;margin-top:50px}
          .main{padding:1.25rem 0 2.25rem}
          .grid{
            grid-template-columns:1fr;          /* 1 columna */
            gap:1.25rem;                         /* menos gap */
          }

          .main-img{aspect-ratio:4/5;border-radius:12px}

          .thumbs{
            display:flex;gap:.75rem;
            overflow-x:auto;overflow-y:hidden;
            -webkit-overflow-scrolling:touch;
            scroll-snap-type:x mandatory;
            padding-bottom:.25rem;
          }
          .thumb{
            flex:0 0 auto;min-width:88px;max-width:120px;
            scroll-snap-align:start;
          }

          .badge{padding:.35rem .75rem}
          .badge p{font-size:.72rem}
          .title{font-size:clamp(1.35rem, 6vw, 1.85rem)}
          .cat{font-size:.95rem}
          .price-box{padding:1rem 0}
          .row{gap:.5rem}
          .value{font-size:1rem}

          .specs ul{grid-template-columns:1fr}
        }

        /* Botón regresar */
        .back-wrap{margin-bottom:.75rem}
        .back-btn{
          background:none;border:none;color:var(--primary);
          font-weight:700;font-size:.95rem;cursor:pointer;padding:.35rem .25rem;
          display:inline-flex;align-items:center;gap:.4rem;border-radius:8px
        }
        .back-btn:hover{background:rgba(0,0,0,.04)}
        .back-btn a{color:inherit;text-decoration:none}
      </style>

      <main class="main">
        <div class="container">
          <div class="back-wrap">
            <button class="back-btn" id="backBtn" type="button" aria-label="Regresar">
              ← Regresar
            </button>
          </div>

          <div class="grid">
            <section class="gallery">
              <div class="main-img">
                <img id="mainImage" alt="Producto" loading="eager">
              </div>
              <div class="thumbs" id="thumbs" aria-label="Miniaturas"></div>
            </section>

            <section class="info">
              <div>
                <span class="badge"><p id="collection"></p></span>
                <h1 class="title" id="title"></h1>
                <p class="cat" id="category"></p>
              </div>

              <div class="price-box">
                <div class="row">
                  <span class="label">Precio mayorista:</span>
                  <span class="value" id="price"></span>
                </div>
                <div class="row">
                  <span class="label">Pedido mínimo:</span>
                  <span id="min"></span>
                </div>
                <div class="row">
                  <span class="label">Tiempo de producción:</span>
                  <span id="leadTime"></span>
                </div>
              </div>

              <div class="specs">
                <div class="row" style="margin-bottom:.5rem">
                  <span class="label">Especificaciones</span>
                </div>
                <ul>
                  <li><span class="k">Capacidad:</span><span class="v" id="capacity"></span></li>
                  <li><span class="k">Ancho:</span><span class="v" id="width"></span></li>
                  <li><span class="k">Alto:</span><span class="v" id="height"></span></li>
                  <li><span class="k">Peso:</span><span class="v" id="weight"></span></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    `;
  }

  connectedCallback() {
    const back = this.shadowRoot.getElementById("backBtn");
    if (back) {
      back.addEventListener("click", () => {
        if (history.length > 1) history.back();
        else window.location.href = "/pages/products"; //regreasr
      });
    }
    this.#renderAll();
  }
  attributeChangedCallback() {
    this.#renderAll();
  }

  #renderAll() {
    const st = this.state;

    st.collection = this.getAttribute("collection") ?? st.collection;
    st.title = this.getAttribute("title") ?? st.title;
    st.category = this.getAttribute("category") ?? st.category;
    st.price = this.getAttribute("price") ?? st.price;
    st.min = this.getAttribute("min") ?? st.min;
    st.leadTime = this.getAttribute("leadtime") ?? st.leadTime;
    st.mainUrl = this.getAttribute("main") ?? st.mainUrl;

    // dimensiones
    st.capacity = this.getAttribute("capacity") ?? st.capacity;
    st.width = this.getAttribute("width") ?? st.width;
    st.height = this.getAttribute("height") ?? st.height;
    st.weight = this.getAttribute("weight") ?? st.weight;

    const thumbsAttr = this.getAttribute("thumbs");
    if (thumbsAttr) {
      try {
        st.thumbs = JSON.parse(thumbsAttr) || [];
      } catch {}
    }

    this.shadowRoot.getElementById("collection").textContent = st.collection;
    this.shadowRoot.getElementById("title").textContent = st.title;
    this.shadowRoot.getElementById("category").textContent = st.category;
    this.shadowRoot.getElementById("price").textContent = st.price;
    this.shadowRoot.getElementById("min").textContent = st.min;
    this.shadowRoot.getElementById("leadTime").textContent = st.leadTime;

    this.shadowRoot.getElementById("capacity").textContent = st.capacity;
    this.shadowRoot.getElementById("width").textContent = st.width;
    this.shadowRoot.getElementById("height").textContent = st.height;
    this.shadowRoot.getElementById("weight").textContent = st.weight;

    const $main = this.shadowRoot.getElementById("mainImage");
    $main.src = st.mainUrl;
  }
}
customElements.define("product-static-2col", ProductStatic2Col);

const formatAR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      })
    : "sin datos";

const asText = (v, unit) =>
  Number.isFinite(v) ? `${v} ${unit}` : v ?? "sin datos";

const applyToComponent = (p) => {
  const comp = document.querySelector("product-static-2col");
  if (!comp || !p) return;

  comp.setAttribute("collection", p.collection ?? "sin datos");
  comp.setAttribute("title", p.name ?? "sin datos");
  comp.setAttribute("category", p.category ?? "sin datos");

  const priceText = Number.isFinite(p.price ?? p.precio)
    ? `${formatAR(Number(p.price ?? p.precio))} c/u`
    : "sin datos";
  comp.setAttribute("price", priceText);

  const minText =
    Number.isFinite(p.minQuantity) && p.minQuantity > 0
      ? `${p.minQuantity} unidades`
      : "sin datos";
  comp.setAttribute("min", minText);

  const leadText =
    Number.isFinite(p.leadTime) && p.leadTime > 0
      ? `${p.leadTime} ${p.leadTime === 1 ? "semana" : "semanas"}`
      : "sin datos";
  comp.setAttribute("leadtime", leadText);

  comp.setAttribute("capacity", asText(p.capacity, "ml"));
  comp.setAttribute("width", asText(p.width, "cm"));
  comp.setAttribute("height", asText(p.height, "cm"));
  comp.setAttribute("weight", asText(p.weight, "g"));

  const fromImgsUrls =
    Array.isArray(p.imgsUrls) && p.imgsUrls.length ? p.imgsUrls[0] : null;

  const mainUrl =
    fromImgsUrls || "https://placehold.co/1200x1200?text=sin+imagen";

  console.log("mainUrl FINAL →", mainUrl);

  comp.setAttribute("main", mainUrl);
  console.log(mainUrl);

  comp.setAttribute("main", mainUrl);

  document.title = `Maurona | ${p.name} ` ?? "Producto";
};

(async () => {
  const id = new URLSearchParams(location.search).get("id");

  let product = null;

  const raw = localStorage.getItem("selectedProduct");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      console.log(parsed);
      const pid = parsed.id?.toString();
      if (!id || pid === id) product = parsed;
    } catch {}
  }

  if (!product && id) {
    try {
      const all = await getAllProducts();
      product = all.find((p) => (p.id ?? p.slug)?.toString() === id);
    } catch {}
  }

  // 3) Si no hay nada, renderiza algo legible
  if (!product) {
    applyToComponent({
      name: "Producto no encontrado",
      collection: "sin datos",
      category: "sin datos",
      price: undefined,
      minQuantity: undefined,
      leadTime: undefined,
      capacity: "sin datos",
      width: "sin datos",
      height: "sin datos",
      weight: "sin datos",
      imgUrls: [],
      image: null,
    });
    return;
  }

  // 4) Render real
  applyToComponent(product);
})();
