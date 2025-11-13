export class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // const wrapper = document.createElement("footer");

    // wrapper.classList.add("footer");

    // wrapper.innerHTML = `
    //   <div class="footer">
    //     <div class="footer-content">
    //       <div class="footer-left">
    //         <ul>
    //           <li><a href="#">Acerca de mi</a></li>
    //           <li><a href="#">Contactanos</a></li>
    //           <li><a href="#">Galeria</a></li>
    //           <li><a href="#">Pregutas Frecuentes</a></li>
    //           <li><a href="#">Terminos y Condiciones</a></li>
    //         </ul>
    //       </div>

    //       <div class="footer-right">
    //         <div class="footer-socials">
    //           <a href="#"><img src="/public/instagram.svg" alt="Instagram" /></a>
    //           <a href="#"><img src="/public/pinterest.svg" alt="Twitter" /></a>
    //           <a href="#"><img src="/public/facebook.svg" alt="Facebook" /></a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // `;

    const styles = document.createElement("style");
    styles.textContent = `
            :host {
                --background: #fdfcfb;
                --foreground: #2d2d2d;
                --primary: #1a5463;
                --primary-foreground: #ffffff;
                --muted-foreground: #6b6458;
                --border: rgba(26, 84, 99, 0.15);
                --header-height: 64px;
                position: relative;
                z-index: 50;
            }
                /* Footer */
.footer {
  background-color: #f7f3e6;
  color: #2b1915;
  border-top: 1px solid #2b1915;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  padding: 2rem 5vw;
  flex-wrap: wrap;
}

.footer-left ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-left li {
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.footer-left a {
  text-decoration: none;
  color: #2b1915;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.footer-left a:hover {
  text-decoration: underline;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
}

.footer-socials a img {
  width: 22px;
  height: 22px;
  margin-left: 1rem;
  filter: invert(10%) sepia(8%) saturate(200%) hue-rotate(355deg)
    brightness(90%) contrast(90%);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-right {
    align-items: flex-start;
  }

  .footer-bottom h1 {
    font-size: 16vw;
  }
}

        `;

    this.shadowRoot.append(styles, wrapper);
  }
}
