import { getAllProducts } from "../utils/getallProdudcts.js";

export class HomeProducts extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("section");

    wrapper.classList.add("products");

    wrapper.innerHTML = `


        <div class="product-grid" id="grid">
        <p>Cargando Productos...</p>

        </div>
        <a href="pages/products">Ver Catalogo completo</a>


    `;
    const style = document.createElement("style");
    style.textContent = `

    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --background: #fdfcfb;
  --foreground: #2d2d2d;
  --primary: #1a5463;
  --primary-foreground: #ffffff;
  --secondary: #f5f1ea;
  --muted-foreground: #6b6458;
  --accent: #d4a574;
  --border: rgba(26, 84, 99, 0.15);

  --header-height: 64px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: var(--background);
  color: var(--foreground);

  line-height: 1.6;
}

    .products {
  padding: 5rem 1.5rem;
  background-color: var(--secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  color: var(--foreground);
}

.section-header p {
  color: var(--muted-foreground);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.product-card {
  cursor: pointer;
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: white;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.product-category {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.product-name {
  color: var(--foreground);
}

.product-min-order {
  color: var(--muted-foreground);
  opacity: 0.7;
  font-size: 0.875rem;
}

@media (min-width: 640px) {
  .products {
    padding: 5rem 10rem;
  }

  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

    `;
    this.shadowRoot.append(style, wrapper);
  }

  //   ESta es uan funcion que se ejecuta ucnaod el componente se agrea a ldom
  async connectedCallback() {
    const grid = this.shadowRoot.querySelector("#grid");

    const products = await getAllProducts();

    const six = products.slice(0, 6);

    console.log({ productsFromComponents: products });

    grid.innerHTML = six
      .map((product) => {
        const image =
          product.image ?? `https://placehold.co/600x400?text=${product.name}`;

        const minOrder =
          product.minQuantity || product.PedidoMinimo || "1 unidad";

        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${image}" alt="${product.name}" />
                </div>

            </div>
        `;
      })

      .join("");
  }
}
