const FAV_KEY = "maurona:favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

function renderFavorites() {
  console.log("hola");

  const listEl = document.querySelector(".favoritos-list");
  const titleEl = document.querySelector(".favoritos-title");

  if (!listEl) return;

  const favs = loadFavorites();
  console.log(favs);

  listEl.innerHTML = "";

  if (!favs.length) {
    if (titleEl) titleEl.textContent = "No tenés favoritos todavía";
    const empty = document.createElement("p");
    empty.textContent = "Agregá productos a favoritos desde el catálogo.";
    empty.style.opacity = "0.7";
    listEl.appendChild(empty);
    return;
  }

  if (titleEl) titleEl.textContent = "Mis Favoritos";

  favs.forEach((item) => {
    const li = document.createElement("div");
    li.className = "fav-item";

    const img = document.createElement("img");
    img.className = "fav-img";
    img.alt = item.name || "Producto favorito";
    img.src = item.mainUrl || "https://placehold.co/600x600?text=sin+imagen";

    const info = document.createElement("div");
    info.className = "fav-info";

    const nameEl = document.createElement("h3");
    nameEl.className = "fav-name";
    nameEl.textContent = item.name || "sin nombre";

    info.appendChild(nameEl);

    const removeBtn = document.createElement("button");
    removeBtn.className = "fav-remove";
    removeBtn.textContent = "quitar";

    removeBtn.addEventListener("click", () => {
      const current = loadFavorites();
      const filtered = current.filter((p) => p.id !== item.id);
      saveFavorites(filtered);
      renderFavorites();
    });

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(removeBtn);

    li.style.cursor = "pointer"; //poner el dedito point

    // navegar hacia el producto
    li.addEventListener("click", (ev) => {
      // evitar que el click en quitar navegue
      if (ev.target === removeBtn) return;
      if (!item.id) return;
      window.location.href = `/pages/products/product?id=${item.id}`;
    });

    listEl.appendChild(li);
  });
}

renderFavorites();
