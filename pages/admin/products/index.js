import { getAllProducts } from "../../../utils/getallProdudcts.js";

const loading = document.getElementById("loading");
const table = document.getElementById("products-table");
const tbody = table.querySelector("tbody");
const createBtn = document.getElementById("create-btn");

createBtn.addEventListener("click", () => {
  window.location.href = "./product/index.html";
});

function tdSafe(v) {
  return v ?? "";
}

async function loadProducts() {
  try {
    const products = await getAllProducts();

    if (!Array.isArray(products) || products.length === 0) {
      loading.textContent = "No hay productos.";
      return;
    }

    console.log(products);

    const rows = products
      .map(
        (p) => `
      <tr data-id="${p.id}">
        <td>${tdSafe(p.name)}</td>
        <td>$${tdSafe(p.price)}</td>
        <td>${tdSafe(p.minQuantity)}</td>
        <td>${tdSafe(p.category)}</td>
        <td>${tdSafe(p.collection)}</td>
        <td class="muted"> ${
          tdSafe(p.isAvailable) === true ? "disponible" : "no disponible"
        } </td>
        <td>
          <button class="link edit" data-id="${p.id}">Editar</button>
        </td>
      </tr>
    `
      )
      .join("");

    tbody.innerHTML = rows;
    loading.hidden = true;
    table.hidden = false;

    // click en fila → editar
    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.addEventListener("click", (e) => {
        // si clickean el botón, también edita (evitamos doble navegación)
        const id = tr.dataset.id;
        if (!id) return;
        window.location.href = `./product/index.html?id=${id}`;
      });
    });

    // botón Editar (por si preferís solo botón)
    tbody.querySelectorAll("button.edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        window.location.href = `./product/index.html?id=${id}`;
      });
    });
  } catch (err) {
    console.error(err);
    loading.textContent = "Error al cargar los productos.";
  }
}

loadProducts();
