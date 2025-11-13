import { getAllCategories } from "../../../../utils/category.js";
import { getAllCollections } from "../../../../utils/collections.js";
import {
  createProduct,
  getAllProducts,
  uploadImageToAirtable,
} from "../../../../utils/getallProdudcts.js";
import { updateProduct } from "../../../../utils/product.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const title = document.getElementById("title");
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const minQInput = document.getElementById("minQuantity");
let catInput = document.getElementById("category");
let colInput = document.getElementById("collection");
const leadInput = document.getElementById("leadTime");
const cancelBtn = document.getElementById("cancel");
const isAvailable = document.getElementById("isAvailable");

const imagePreview = document.getElementById("imagePreview");
const imageUrlInput = document.getElementById("imageUrlInput");
const addImageBtn = document.getElementById("addImageBtn");

function addImageToPreview(url) {
  const img = document.createElement("img");
  img.src = url;
  img.loading = "lazy";
  imagePreview.appendChild(img);
}

addImageBtn?.addEventListener("click", async () => {
  const url = imageUrlInput.value.trim();

  if (!url) return alert("Pegá un URL de imagen primero");
  if (!url.startsWith("http")) return alert("URL inválido");

  addImageToPreview(url);

  await uploadImageToAirtable(url, id);

  imageUrlInput.value = "";
});

async function setupCategoryField() {
  if (id) return;

  try {
    const [categories, collections] = await Promise.all([
      getAllCategories(),
      getAllCollections(),
    ]);

    if (!Array.isArray(categories) || categories.length === 0) return;

    console.log(categories, collections);

    const select = document.createElement("select");
    select.id = "category";
    select.required = true;
    select.style.padding = "0.55rem 0.65rem";
    select.style.border = "1px solid #d0d7de";
    select.style.borderRadius = "6px";
    select.innerHTML = `<option value="">Seleccioná una categoría</option>`; //un ayuda placeholder

    // Opciones desde el server
    for (const c of categories) {
      const opt = document.createElement("option");
      // Ajustá estos nombres según lo que devuelve getAllCategories()
      opt.value = c.id; // por ejemplo, el ID de Airtable
      opt.textContent = c.name; // nombre legible
      select.appendChild(opt);
    }

    // Reemplazamos el input viejo por el select dentro del mismo <label>
    const label = catInput.parentElement;
    label.replaceChild(select, catInput);

    // Actualizamos la referencia para el submit
    catInput = select;

    const selectCol = document.createElement("select");
    selectCol.id = "collection";
    selectCol.required = true;
    selectCol.style.padding = "0.55rem 0.65rem";
    selectCol.style.border = "1px solid #d0d7de";
    selectCol.style.borderRadius = "6px";
    selectCol.innerHTML = `<option value="">Seleccioná una collecion</option>`;

    for (const c of collections) {
      const opt = document.createElement("option");
      opt.value = c.id; // por ejemplo, el ID de Airtable
      opt.textContent = c.name; // nombre legible
      selectCol.appendChild(opt);
    }

    const label2 = colInput.parentElement;
    label2.replaceChild(selectCol, colInput);
    colInput = selectCol;
  } catch (error) {
    console.error("Error cargando categorías:", error);
  }
}

async function loadForEdit() {
  if (!id) return;

  try {
    const all = await getAllProducts();
    const p = all.find((x) => x.id === id);
    if (!p) return;

    p.imgsUrls.map((img) => addImageToPreview(img));

    title.textContent = "Editar producto";
    nameInput.value = p.name ?? "";
    priceInput.value = p.price ?? "";
    minQInput.value = p.minQuantity ?? "";
    catInput.value = p.category ?? "";
    colInput.value = p.collection ?? "";
    leadInput.value = p.leadTime ?? "";
    isAvailable.checked = Boolean(p.isAvailable);
    if (Array.isArray(p.images)) {
      imagePreview.innerHTML = "";
      p.images.forEach((img) => {
        const url = img.url || img;
        if (url) addImageToPreview(url);
      });
    }
  } catch (e) {
    console.error("Error cargando producto:", e);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: nameInput.value.trim(),
    price: Number(priceInput.value),
    minQuantity: Number(minQInput.value) || null,
    leadTime: Number(leadInput.value.trim()) || null,
    isAvailable: isAvailable.checked,
    categoryId: catInput.value || null,
    Collection: colInput.value,
  };

  console.log({ payload });

  try {
    if (id) {
      await updateProduct(id, payload);
    } else {
      await createProduct(payload);
    }

    console.log("ist working madafkers");
    window.location.href = "./index.html";
  } catch (error) {
    console.error(error);
  }
});

cancelBtn.addEventListener("click", () => {
  window.location.href = "./index.html";
});

(async () => {
  await setupCategoryField();
  await loadForEdit();
})();
