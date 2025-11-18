import { getAllMessages } from "../../../../utils/createMessage.js";

export class MessagesTable extends HTMLElement {
  constructor() {
    super();
    this._mounted = false;
  }

  async connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;

    this.innerHTML = `
      <div class="messages-wrap">
        <h2>Mensajes</h2>
        <div class="messages-loading">Cargando mensajes...</div>
        <table class="messages-table" hidden>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Mensaje</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <style>
        .messages-wrap { width:100%; }
        .messages-loading { color:#666; font-size:.95rem; padding:.5rem 0; }
        .messages-table {
          width:100%;
          border-collapse:collapse;
          background:#fff;
          border:1px solid #e5e5e5;
          border-radius:10px;
          overflow:hidden;
        }
        .messages-table thead { background:#fafafa; }
        .messages-table th {
          text-align:left; padding:12px 14px;
          font-weight:600; color:#444; border-bottom:1px solid #e5e5e5;
        }
        .messages-table td {
          padding:12px 14px; border-bottom:1px solid #f0f0f0;
          font-size:15px; color:#333;
        }
        .messages-table tbody tr:nth-child(even){ background:#fafafa; }

        /* Efecto hover + puntero */
        .messages-table tbody tr {
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .messages-table tbody tr:hover {
          background: #e8f0fe;
        }

        .pill {
          display:inline-block; padding:4px 10px; border-radius:30px;
          font-size:12px; font-weight:700; color:#fff;
            cursor: pointer;


        }
        .pill.recibido { background:#0f9d58;   cursor: pointer;
 }
        .pill.respondido  { background:#1a73e8;   cursor: pointer;
}

        @media (max-width:650px){
          .messages-table th, .messages-table td { font-size:13.5px; padding:10px; }
        }
      </style>
    `;

    await this.refresh();
  }

  async refresh() {
    const loading = this.querySelector(".messages-loading");
    const table = this.querySelector(".messages-table");
    const tbody = this.querySelector(".messages-table tbody");

    loading.textContent = "cargando...";
    table.hidden = true;
    tbody.innerHTML = "";

    try {
      const messages = await getAllMessages();
      console.log({ messages });
      if (!Array.isArray(messages) || messages.length === 0) {
        loading.textContent = "No hay mensajes.";
        return;
      }

      const rows = messages
        .map((m) => {
          const pillClass =
            /respondid/.test(m.isAnswered) ||
            /hecho|cerrado|closed/.test(m.isAnswered)
              ? "recibido"
              : "enviado";
          const fecha = this._fechita(m?.CreateAt);

          return `
          <tr data-id="${m?.id ?? ""}">
            <td>${m?.Name ?? "Sin Nombre"}</td>
            <td>${m?.Message ?? ""}</td>
            <td>${fecha}</td>
            <td><span class="pill ${
              !m.isAnswered ? "respondido" : "recibido"
            }">${m?.isAnswered ? "respondido" : "sin responder"}</span></td>
          </tr>
        `;
        })
        .join("");

      tbody.innerHTML = rows;
      loading.textContent = "";
      table.hidden = false;

      // Agregamos el listener a cada fila
      tbody.querySelectorAll("tr").forEach((tr) => {
        tr.addEventListener("click", () => {
          const id = tr.dataset.id;
          // Si querés pasar el id en la URL:
          window.location.href = `./message/index.html?id=${id}`;
        });
      });
    } catch (err) {
      console.error(err);
      loading.textContent = "Error al cargar los mensajes.";
    }
  }

  _fechita(fech) {
    if (!fech) return "";
    try {
      const d = new Date(fech);
      const dia = String(d.getUTCDate()).padStart(2, "0");
      const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
      const año = d.getUTCFullYear();
      return `${dia}/${mes}/${año}`;
    } catch {
      return String(fech);
    }
  }
}

customElements.define("messages-table", MessagesTable);
