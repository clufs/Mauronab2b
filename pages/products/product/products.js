import { getAllProducts } from "../../../utils/getallProdudcts.js";

const FAV_KEY = "maurona:favorites";

/* Helpers chiquitos */
function formatAR(n) {
  if (typeof n !== "number") return "sin datos";
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

function asText(v, unit) {
  return Number.isFinite(v) ? `${v} ${unit}` : v ?? "sin datos";
}

/* LocalStorage de favoritos */
function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

function isFavorite(id) {
  const favs = loadFavorites();
  return favs.some((p) => p.id === id);
}

function toggleFavorite(product) {
  const id = (product.id ?? product.slug)?.toString();
  if (!id) return false;

  const favs = loadFavorites();
  const index = favs.findIndex((p) => p.id === id);

  if (index >= 0) {
    // Quitar
    favs.splice(index, 1);
    saveFavorites(favs);
    return false;
  } else {
    // Agregar
    const img =
      Array.isArray(product.imgsUrls) && product.imgsUrls.length
        ? product.imgsUrls[0]
        : "https://placehold.co/600x600?text=sin+imagen";

    favs.push({
      id,
      name: product.name ?? "sin datos",
      price: product.price ?? product.precio ?? null,
      mainUrl: img,
    });
    saveFavorites(favs);
    return true;
  }
}

function updateFavButton(btn, isFav) {
  if (!btn) return;
  if (isFav) {
    btn.textContent = "★ En favoritos";
    btn.classList.remove("btn-outline");
    btn.classList.add("btn-primary");
  } else {
    btn.textContent = "★ Agregar a favoritos";
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  }
}

function renderProduct(p) {
  const collectionEl = document.getElementById("p-collection");
  const titleEl = document.getElementById("p-title");
  const categoryEl = document.getElementById("p-category");
  const priceEl = document.getElementById("p-price");
  const minEl = document.getElementById("p-min");
  const leadEl = document.getElementById("p-lead");
  const capEl = document.getElementById("p-capacity");
  const widthEl = document.getElementById("p-width");
  const heightEl = document.getElementById("p-height");
  const weightEl = document.getElementById("p-weight");
  const mainImg = document.getElementById("p-main-img");
  const favBtn = document.getElementById("favBtn");

  const collection = p.collection ?? "sin datos";
  const name = p.name ?? "sin datos";
  const category = p.category ?? "sin datos";

  const priceText = Number.isFinite(p.price ?? p.precio)
    ? `${formatAR(Number(p.price ?? p.precio))} c/u`
    : "sin datos";

  const minText =
    Number.isFinite(p.minQuantity) && p.minQuantity > 0
      ? `${p.minQuantity} unidades`
      : "sin datos";

  const leadText =
    Number.isFinite(p.leadTime) && p.leadTime > 0
      ? `${p.leadTime} ${p.leadTime === 1 ? "semana" : "semanas"}`
      : "sin datos";

  const img =
    Array.isArray(p.imgsUrls) && p.imgsUrls.length
      ? p.imgsUrls[0]
      : `https://placehold.co/1200x1200?text=${p.name}`;

  if (collectionEl) collectionEl.textContent = collection;
  if (titleEl) titleEl.textContent = name;
  if (categoryEl) categoryEl.textContent = category;
  if (priceEl) priceEl.textContent = priceText;
  if (minEl) minEl.textContent = minText;
  if (leadEl) leadEl.textContent = leadText;

  if (capEl) capEl.textContent = asText(p.capacity, "ml");
  if (widthEl) widthEl.textContent = asText(p.width, "cm");
  if (heightEl) heightEl.textContent = asText(p.height, "cm");
  if (weightEl) weightEl.textContent = asText(p.weight, "g");

  if (mainImg) mainImg.src = img;

  document.title = `Maurona | ${name}`;

  const id = (p.id ?? p.slug)?.toString();
  if (favBtn && id) {
    const favNow = isFavorite(id);
    updateFavButton(favBtn, favNow);

    favBtn.addEventListener("click", () => {
      const newState = toggleFavorite(p);
      updateFavButton(favBtn, newState);
    });
  }
}

function renderNotFound() {
  renderProduct({
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
    imgsUrls: [],
  });
}

const backBtn = document.getElementById("backBtn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else window.location.href = "/pages/products";
  });
}

(async () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  let product = null;

  // 1) Intentar desde localStorage.selectedProduct
  const raw = localStorage.getItem("selectedProduct");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const pid = parsed.id?.toString();
      if (!id || pid === id) product = parsed;
    } catch {}
  }

  // 2) Si no hay nada, buscar por API
  if (!product && id) {
    try {
      const all = await getAllProducts();
      product = all.find((p) => (p.id ?? p.slug)?.toString() === id);
    } catch (e) {
      console.error(e);
    }
  }

  // 3) Si sigue sin haber nada
  if (!product) {
    renderNotFound();
    return;
  }

  renderProduct(product);
})();
