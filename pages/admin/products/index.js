import { getAllProducts } from "../../../utils/getallProdudcts.js";

const loading = document.getElementById("loading");
const table = document.getElementById("products-table");
const tbody = table.querySelector("tbody");
const createBtn = document.getElementById("create-btn");
const searchInput = document.getElementById("search-input");

let allProducts = [];

createBtn.addEventListener("click", () => {
  window.location.href = "./product/index.html";
});

function renderRows(products) {
  if (!Array.isArray(products) || products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="muted">no hay un joraca</td>
      </tr>
    `;
    return;
  }

  const rows = products
    .map(
      (p) => `
      <tr data-id="${p.id}">
        <td>${p.name}</td>
        <td>$${p.price}</td>
        <td>${p.minQuantity}</td>
        <td>${p.category}</td>
        <td>${p.collection}</td>
        <td class="muted">${
          p.isAvailable === true ? "disponible" : "no disponible"
        }</td>
        <td>
          <button class="link edit" data-id="${p.id}">Editar</button>
        </td>
      </tr>
    `
    )
    .join("");

  tbody.innerHTML = rows;

  // listeners para ir a editar
  tbody.querySelectorAll("tr").forEach((tr) => {
    tr.addEventListener("click", () => {
      const id = tr.dataset.id;
      if (!id) return;
      window.location.href = `./product/index.html?id=${id}`;
    });
  });

  // que el botón Editar no dispare el click de la fila
  tbody.querySelectorAll("button.edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      window.location.href = `./product/index.html?id=${id}`;
    });
  });
}

async function loadProducts() {
  try {
    const products = await getAllProducts();

    if (!Array.isArray(products) || products.length === 0) {
      loading.textContent = "No hay productos.";
      return;
    }

    allProducts = products;

    renderRows(allProducts);
    loading.hidden = true;
    table.hidden = false;
  } catch (err) {
    console.error(err);
    loading.textContent = "Error al cargar los productos.";
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();

    if (!term) {
      renderRows(allProducts);
      return;
    }

    const filtered = allProducts.filter((p) => {
      const name = String(p.name).toLowerCase();
      const cat = String(p.category).toLowerCase();
      const col = String(p.collection).toLowerCase();

      return name.includes(term) || cat.includes(term) || col.includes(term);
    });

    renderRows(filtered);
  });
}

loadProducts();
