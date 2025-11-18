export class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("footer");
    wrapper.classList.add("footer");

    wrapper.innerHTML = `
      <div class="footer-container">
        <div class="footer-socials">
          <a href="#" aria-label="Instagram">
            <img src="/public/instagram.svg" alt="Instagram" />
          </a>
          <a href="#" aria-label="Pinterest">
            <img src="/public/pinterest.svg" alt="Pinterest" />
          </a>
          <a href="#" aria-label="Facebook">
            <img src="/public/facebook.svg" alt="Facebook" />
          </a>
        </div>
      </div>
    `;

    const styles = document.createElement("style");
    styles.textContent = `
      :host {
        --background: #fdfcfb;
        --foreground: #2d2d2d;
        --border: rgba(26, 84, 99, 0.15);
      }

      .footer {
        background-color: #f7f3e6;
        border-top: 1px solid #2b1915;
        padding: 2rem 0;
        display: flex;
        justify-content: center;
      }

      .footer-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .footer-socials a img {
        width: 26px;
        height: 26px;
        margin: 0 0.75rem;
        filter: invert(10%) sepia(8%) saturate(200%) hue-rotate(355deg)
          brightness(90%) contrast(90%);
        transition: opacity 0.2s ease;
      }

      .footer-socials a img:hover {
        opacity: 0.6;
      }
    `;

    this.shadowRoot.append(styles, wrapper);
  }
}

customElements.define("my-footer", Footer);
