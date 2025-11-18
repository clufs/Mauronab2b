// components/product-grid/Filter.js
export class Filter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("aside");
    wrapper.classList.add("filters-sidebar");
    wrapper.innerHTML = `
      <div class="filters-header">
        <h2>Filtros</h2>
        <button class="clear" type="button" aria-label="Limpiar filtros">Limpiar</button>
      </div>

      <div class="filter-group" data-group="coleccion">
        <h3>Colección</h3>
        <div class="filter-grid">
          <div class="filter-option">
            <input type="checkbox" id="filter-autor" value="del autor – torneada a mano">
            <label for="filter-autor">Del autor – Torneada a mano</label>
          </div>
          <div class="filter-option">
            <input type="checkbox" id="filter-taller" value="edición de taller">
            <label for="filter-taller">Edición de taller</label>
          </div>
        </div>
      </div>

      <div class="filter-group" data-group="categoria">
        <h3>Categoría</h3>
        <div class="filter-grid">
          <div class="filter-option">
            <input type="checkbox" id="filter-tazas" value="tazas">
            <label for="filter-tazas">Tazas</label>
          </div>
          <div class="filter-option">
            <input type="checkbox" id="filter-platos" value="platos">
            <label for="filter-platos">Platos</label>
          </div>
          <div class="filter-option">
            <input type="checkbox" id="filter-bowls" value="cuencos">
            <label for="filter-bowls">Bowls</label>
          </div>
          <div class="filter-option">
            <input type="checkbox" id="filter-contenedores" value="contenedores">
            <label for="filter-contenedores">Contenedores</label>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      :host { display:block; }

      .filters-sidebar {
        position: relative;
        top: auto;
        margin: 0 0 1.25rem 0;
        padding: 1rem;
        border: 1px solid rgba(0,0,0,.06);
        border-radius: 12px;
        background: white;
      }

      .filters-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .75rem;
        margin-bottom: .5rem;
      }
      .filters-header h2 {
        font-size: clamp(1rem, 2vw, 1.1rem);
        font-weight: 800;
        letter-spacing: .04em;
      }
      .clear {
        font-size: .9rem;
        background: transparent;
        border: 1px solid rgba(0,0,0,.12);
        padding: .4rem .7rem;
        border-radius: 8px;
        cursor: pointer;
      }

      .filter-group { margin-top: 1rem; }
      .filter-group h3 {
        font-size: .95rem; font-weight: 700; margin-bottom: .75rem;
        letter-spacing: .05em; text-transform: uppercase;
      }

      .filter-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: .5rem .75rem;
      }

      .filter-option { display:flex; align-items:center; gap:.5rem; }
      .filter-option input[type="checkbox"] {
        width: 18px; height: 18px; cursor: pointer;
        accent-color: var(--primary, #1a5463);
      }
      .filter-option label {
        cursor: pointer; font-size: .95rem; color: var(--text-dark, #222);
        user-select: none; line-height: 1.2;
      }
      .filter-option input[type="checkbox"]:checked + label {
        font-weight: 600; color: var(--primary, #1a5463);
      }

      /* Desktop: sticky sidebar a la izquierda (si tu layout general lo permite) */
      @media (min-width: 1024px) {
        .filters-sidebar {
          position: sticky; top: 5rem;
          margin-top: 2rem;
          max-height: calc(100vh - 6rem);
          overflow: auto;
        }
        .filter-grid {
          grid-template-columns: 1fr; /* en sidebar, 1 columna se lee mejor */
        }
      }
    `;

    this.shadowRoot.append(style, wrapper);
  }

  connectedCallback() {
    this._emitFilters();

    this.shadowRoot.addEventListener("change", (e) => {
      if (e.target && e.target.matches('input[type="checkbox"]')) {
        this._emitFilters();
      }
    });

    this.shadowRoot.querySelector(".clear")?.addEventListener("click", () => {
      this.shadowRoot
        .querySelectorAll('input[type="checkbox"]')
        .forEach((cb) => (cb.checked = false));
      this._emitFilters();
    });
  }

  _emitFilters() {
    const getCheckedValues = (groupName) => {
      const group = this.shadowRoot.querySelector(
        `[data-group="${groupName}"]`
      );
      if (!group) return [];
      return Array.from(
        group.querySelectorAll('input[type="checkbox"]:checked')
      ).map((el) => el.value.toLowerCase());
    };

    const detail = {
      coleccion: getCheckedValues("coleccion"),
      categoria: getCheckedValues("categoria"),
    };

    this.dispatchEvent(
      new CustomEvent("filters-change", {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  // todo tenemos que obtener las categorias y colecciones de airtable y generar los filtros de manera dinamica.
}

customElements.define("filter-component", Filter);
