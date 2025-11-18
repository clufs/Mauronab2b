// components/product-grid/ProductGrid.js
import { getAllProducts } from "../../../utils/getallProdudcts.js";

export class ProductGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.innerHTML = `<div class="products-grid" id="grid"></div>`;

    const style = document.createElement("style");
    style.textContent = `
      :host { display:block; width:100%; max-width:100%; }

      /* Layout base */
      .wrapper { width: 100%; }

      .products-grid {
        display: grid;
        /* Auto-fit hace fluida la grilla: 1 col en móviles chicos, 2 col a partir de ~380-420px, 3+ cuando entra */
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: clamp(1rem, 2.5vw, 2rem);
        width: 100%;
        margin: 0;
        box-sizing: border-box;
      }

      .product-card {
        color: inherit;
        text-decoration:none;
        background: white;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        overflow: hidden;
        border-radius: 12px;
        border: 1px solid rgba(0,0,0,.06);
      }
      .product-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      }

      /* Imagen responsive y consistente */
      .product-image {
        width: 100%;
        /* Mantiene proporción consistente en todas las cards */
        aspect-ratio: 4 / 5; /* cambialo a 1/1 si querés cuadradas */
        background: var(--bg-cream, #faf7f2);
        overflow: hidden;
      }
      .product-image img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }

      .product-info {
        padding: clamp(.6rem, 1.5vw, .85rem) clamp(.4rem, 1vw, .75rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .5rem;
      }
      .product-name {
        font-size: clamp(.9rem, 1.8vw, 1rem);
        font-weight: 700;
        letter-spacing: .02em;
        line-height: 1.2;
      }
      .product-price {
        font-size: clamp(.9rem, 1.7vw, .95rem);
        font-weight: 600;
        white-space: nowrap;
      }
      .empty {
        grid-column: 1 / -1;
        text-align: center;
        opacity: .7;
        padding: 1rem 0;
      }

      @media (min-width: 480px) {
        .products-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
      }
      @media (min-width: 768px) {
        .products-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
      }
      @media (min-width: 1024px) {
        .products-grid { grid-template-columns: repeat(3, minmax(240px, 1fr)); }
      }

    `;

    this.shadowRoot.append(style, wrapper);

    this._allProducts = [];
    this._filters = { coleccion: [], categoria: [] };
    this._onFiltersChange = this._onFiltersChange.bind(this);
  }

  async connectedCallback() {
    this._allProducts = await getAllProducts();
    this._render(this._allProducts);
    document.addEventListener("filters-change", this._onFiltersChange);
  }

  disconnectedCallback() {
    document.removeEventListener("filters-change", this._onFiltersChange);
  }

  _onFiltersChange(e) {
    this._filters = e.detail || { coleccion: [], categoria: [] };
    const filtered = this._applyFilters(this._allProducts, this._filters);
    this._render(filtered);
  }

  _applyFilters(products, { coleccion, categoria }) {
    const hasCol = Array.isArray(coleccion) && coleccion.length > 0;
    const hasCat = Array.isArray(categoria) && categoria.length > 0;

    return products.filter((p) => {
      const col = (p.collection || p.coleccion || "").toString().toLowerCase();
      const cat = (p.category || p.categoria || "").toString().toLowerCase();

      const passCol = !hasCol || coleccion.includes(col);
      const passCat = !hasCat || categoria.includes(cat);

      return passCol && passCat;
    });
  }

  _render(list) {
    const grid = this.shadowRoot.querySelector("#grid");
    const formatAR = (n) =>
      typeof n === "number"
        ? n.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
          })
        : n;

    if (!list || list.length === 0) {
      grid.innerHTML = `<p class="empty">No hay productos que coincidan con los filtros.</p>`;
      return;
    }

    grid.innerHTML = list
      .map((product) => {
        const id = product.id ?? product.slug ?? crypto.randomUUID();
        const image =
          product.imgsUrls[0] ??
          `https://placehold.co/600x800?text=${encodeURIComponent(
            product.name ?? "Producto"
          )}`;
        const name = product.name ?? "Producto";
        const price = formatAR(product.price ?? 0);

        // Link a la página de detalle con ?id=
        return `
    <a class="product-card" href="/pages/products/product?id=${encodeURIComponent(
      id
    )}" data-id="${id}">
      <div class="product-image">
        <img src="${image}" alt="${name}" loading="lazy" />
      </div>
      <div class="product-info">
        <p class="product-name">${name}</p>
        <p class="product-price">${price}</p>
      </div>
    </a>
  `;
      })
      .join("");

    // justo después de setear grid.innerHTML
    grid.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const id = card.dataset.id;
        // Buscamos el producto original para snapshot
        const prod = list.find((p) => (p.id ?? p.slug) == id);

        console.log(prod);

        if (prod) {
          localStorage.setItem("selectedProduct", JSON.stringify(prod));
        }
        // No prevenimos la navegación; que siga al href
      });
    });
  }
}

customElements.define("productgrid-component", ProductGrid);
