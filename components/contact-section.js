import { createMessage } from "../utils/createMessage.js";

export class ContactComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <section id="contact" class="contact">
        <div class="contact-container">
          <div class="contact-header">
            <p>Contacto</p>
            <h2>Hablemos de tu Proyecto</h2>
            <p class="description">
              Completa el formulario y nuestro equipo te contactará en menos de 24
              horas para discutir los detalles de tu pedido.
            </p>
          </div>

          <form class="contact-form" id="contact-form" action="#" method="POST" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nombre Completo*</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div class="form-group">
                <label for="company">Empresa*</label>
                <input type="text" id="company" name="company" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email*</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div class="form-group">
                <label for="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" />
              </div>
            </div>
            <div class="form-group form-group-full">
              <label for="message">Mensaje*</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Cuéntanos sobre tu proyecto, tipo de negocio, cantidad estimada de piezas..."
                required
              ></textarea>
            </div>

            <!-- antispam de chatgpt -->
            <input type="text" name="website" tabindex="-1" autocomplete="off"
                   style="position:absolute;left:-9999px;opacity:0" />

            <button type="submit" class="btn btn-primary">Enviar Solicitud</button>
            <p id="form-status" aria-live="polite" style="margin-top:0.75rem;"></p>
          </form>
        </div>
      </section>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }
      .contact { padding: 5rem 1.5rem; background-color: var(--secondary); }
      .contact-container { max-width: 56rem; margin: 0 auto; }
      .contact-header { text-align: center; margin-bottom: 3rem; }
      .contact-header p { color: var(--muted-foreground); margin-bottom: 0.5rem; }
      .contact-header h2 { color: var(--foreground); margin-bottom: 1rem; }
      .contact-header .description { color: var(--muted-foreground); max-width: 40rem; margin: 0 auto; }
      .contact-form { background-color: white; padding: 3rem; border: 2px solid var(--border); }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
      .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
      .form-group label { font-weight: 500; }
      .form-group input, .form-group textarea {
        padding: 0.75rem 1rem; border: 1px solid var(--border);
        background-color: var(--secondary); font-size: 1rem; font-family: inherit;
      }
      .form-group input:focus, .form-group textarea:focus { outline: 2px solid var(--primary); outline-offset: 2px; }
      .form-group textarea { resize: vertical; }
      .form-group-full { margin-bottom: 1.5rem; }
      @media (max-width: 768px) {
        .contact-form { padding: 2rem 1.5rem; }
        .form-row { grid-template-columns: 1fr; }
      }
    `;

    this.shadowRoot.append(style, wrapper);
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector("#contact-form");
    const statusEl = this.shadowRoot.querySelector("#form-status");
    const submitBtn = form?.querySelector('button[type="submit"]');

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const hp = form.querySelector('input[name="website"]');
      if (hp && hp.value.trim() !== "") {
        statusEl.textContent = "Error al enviar.";
        return;
      }

      const name = this.shadowRoot.querySelector("#name")?.value?.trim();
      const company = this.shadowRoot.querySelector("#company")?.value?.trim();
      const email = this.shadowRoot.querySelector("#email")?.value?.trim();
      const phone = this.shadowRoot.querySelector("#phone")?.value?.trim();
      const message = this.shadowRoot.querySelector("#message")?.value?.trim();

      if (!name || !company || !email || !message) {
        statusEl.textContent = "Por favor, completá los campos obligatorios.";
        return;
      }

      statusEl.textContent = "Enviando...";
      submitBtn?.setAttribute("disabled", "true");

      const result = await createMessage({
        name,
        company,
        email,
        phone,
        message,
      });

      if (!result?.ok) {
        statusEl.textContent =
          result?.error || "No se pudo enviar. Intenta nuevamente.";
        submitBtn?.removeAttribute("disabled");
        return;
      }

      statusEl.textContent = "¡Gracias! Te contactaremos en menos de 24 horas.";
      form.reset();
      submitBtn?.removeAttribute("disabled");
    });
  }
}

customElements.define("contact-component", ContactComponent);
