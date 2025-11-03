import { getAllProducts } from "../utils/getallProdudcts.js";

export class HomeProducts extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("section");

    wrapper.classList.add("products");

    // wrapper.innerHTML = `

    //   <div class="section-header">
    //     <p>BAsfasd</p>
    //     <h2>Nuestros productos</h2>
    //   </div>

    //   <div class="product-grid">
    //     <div class="product-card">
    //       <div class="product-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1587560555570-4d3f84dcee05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    //           alt="Bowl Artesanal"
    //         />
    //       </div>
    //       <div class="product-info">
    //         <p class="product-category">Vajilla</p>
    //         <h3 class="product-name">Bowl Artesanal</h3>
    //         <p class="product-min-order">Pedido mínimo: 24 piezas</p>
    //       </div>
    //     </div>
    //     <div class="product-card">
    //       <div class="product-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1691678916234-34bb2512c7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    //           alt="Florero Minimalista"
    //         />
    //       </div>
    //       <div class="product-info">
    //         <p class="product-category">Decoración</p>
    //         <h3 class="product-name">Florero Minimalista</h3>
    //         <p class="product-min-order">Pedido mínimo: 12 piezas</p>
    //       </div>
    //     </div>
    //     <div class="product-card">
    //       <div class="product-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1591632288574-a387f820a1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    //           alt="Plato Signature"
    //         />
    //       </div>
    //       <div class="product-info">
    //         <p class="product-category">Vajilla</p>
    //         <h3 class="product-name">Plato Signature</h3>
    //         <p class="product-min-order">Pedido mínimo: 36 piezas</p>
    //       </div>
    //     </div>
    //     <div class="product-card">
    //       <div class="product-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1611152171907-886a565484b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    //           alt="Taza de Café"
    //         />
    //       </div>
    //       <div class="product-info">
    //         <p class="product-category">Vajilla</p>
    //         <h3 class="product-name">Taza de Café</h3>
    //         <p class="product-min-order">Pedido mínimo: 48 piezas</p>
    //       </div>
    //     </div>
    //     <div class="product-card">
    //       <div class="product-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1738421525319-7a9d839bdf51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    //           alt="Set de Mesa"
    //         />
    //       </div>
    //       <div class="product-info">
    //         <p class="product-category">Vajilla Completa</p>
    //         <h3 class="product-name">Set de Mesa</h3>
    //         <p class="product-min-order">Pedido mínimo: 12 sets</p>
    //       </div>
    //     </div>
    //     <div class="product-card">
    //       <div class="product-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    //           alt="Bowl Grande"
    //         />
    //       </div>
    //       <div class="product-info">
    //         <p class="product-category">Servicio</p>
    //         <h3 class="product-name">Bowl Grande</h3>
    //         <p class="product-min-order">Pedido mínimo: 18 piezas</p>
    //       </div>
    //     </div>
    //   </div>

    // `;

    wrapper.innerHTML = `
        <div class="section-name">
        <p>Catalogo</p>
        <h2>Mis productos</h2>
        </div>

        <div class="product-grid" id="grid">
        <p>Cargando Productos...</p>
        </div>
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
  grid-template-columns: repeat(1 minmax(0, 1fr));
  gap: 1rem;
}

.product-card {
  cursor: pointer;
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  margin-bottom: 1rem;
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

    console.log(products);

    grid.innerHTML = products
      .map((product) => {
        const image =
          product.image ??
          `https://placehold.co/600x400?text=${product.nombre}`;

        const minOrder = product.MinOrder || product.PedidoMinimo || "1 unidad";

        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${image}" alt="${product.nombre}" /> 
                </div>

                <div class="product-info">
                    
                    <h3 class="product-name">${product.nombre}</h3>
                    ${
                      minOrder
                        ? `<p class="product-min-order">Pedido mínimo: ${minOrder}</p>`
                        : ""
                    }


                </div>

            </div>
        `;
      })
      .join("");
  }
}
