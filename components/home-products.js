export class FullscreenProducts extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("container");

    wrapper.innerHTML = `
      <!-- PRODUCTO 1 -->
      <section class="product-page">
        <div class="inner">
          <div class="left-info">
            <h2>Tazas</h2>
          </div>

          <div class="center-image">
            <img src="./public/taza.jpg" />
          </div>

          <div class="right-desc">
            <div class="desc-box">
              Diseñadas para esos momentos de pausa: café, té o lo que te sostenga el día. 
              Las tazas mantienen la calidez del material, con formas cómodas en la mano y 
              un diseño que invita a usarlas todos los días.
            </div>
          </div>
        </div>
      </section>

      <!-- PRODUCTO 2 -->
      <section class="product-page">
        <div class="inner">
          <div class="left-info">
            <h2>Platos</h2>
          </div>

          <div class="center-image">
            <img src="/public/platos.jpg" />
          </div>

          <div class="right-desc">
            <div class="desc-box">
              Piezas amplias, equilibradas y pensadas para acompañar cada comida. 
              Nuestros platos combinan líneas simples con el carácter de la cerámica artesanal, 
              ofreciendo una base sólida y estética para cualquier preparación.
            </div>
          </div>
        </div>
      </section>

      <!-- PRODUCTO 3 -->
      <section class="product-page">
        <div class="inner">
          <div class="left-info">
            <h2>Bowls</h2>
          </div>

          <div class="center-image">
            <img src="./public/bolw.jpg" />
          </div>

          <div class="right-desc">
            <div class="desc-box">
              Versátiles y esenciales. Los cuencos funcionan para todo: sopas, ensaladas, frutas 
              o preparaciones pequeñas. Su forma contenida y su peso equilibrado los convierten 
              en piezas prácticas sin perder la identidad artesanal.
            </div>
          </div>
        </div>
      </section>
    `;

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        scroll-snap-type: y mandatory;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .container {
        width: 100%;
      }

      /* Cada pantalla */
      .product-page {
        height: 100vh;
        width: 100%;
        scroll-snap-align: start;

        display: flex;
        align-items: center;

        padding-left: 4rem;
        padding-right: 4rem;
      }

      /* Contenedor interno */
      .inner {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;

        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 2rem;
        height: 100%;
        align-items: center;
      }

      /* Izquierda */
      .left-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .4rem;
      }

      .left-info h2 {
        font-size: 2.6rem;
        margin-bottom: .4rem;
      }

      .left-info p {
        font-size: 1.4rem;
        opacity: .75;
      }

      /* Centro – todas las imágenes del mismo tamaño máximo */
      .center-image {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        /* Tamaño “caja” común para todas */
        max-height: 480px;
        height: 100%;
      }

      .center-image img {
        max-height: 100%;
        width: auto;
        object-fit: contain; /* no corta la pieza */
        display: block;
      }

      /* Derecha */
      .right-desc {
        display: grid;
        font-style: italic;
      }

      .desc-box {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        font-size: .9rem;
        line-height: 1.3rem;
      }

      /* -------------------
         MOBILE
      ------------------- */
      @media (max-width: 1000px) {
        .product-page {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        /* Pasamos a columna y centramos todo
           para dejar aire arriba/abajo */
        .inner {
          display: flex;
          flex-direction: column;
          justify-content: center;  /* centra el bloque en el alto */
          align-items: center;
          text-align: center;
          gap: 1.2rem;
          height: 100%;
        }

        .left-info {
          align-items: center;
        }

        .left-info h2 {
          font-size: 2.1rem;
        }

        /* Imagen más acotada en alto pero consistente */
        .center-image {
          width: 100%;
          max-width: 420px;
          max-height: 320px;
          height: auto;
        }

        .center-image img {
          width: 100%;
          height: auto;
        }

        /* Descripción cerca de la imagen */
        .right-desc {
          width: 100%;
          max-width: 420px;
        }

        .desc-box {
          font-size: .95rem;
          line-height: 1.4rem;
        }
      }
    `;

    this.shadowRoot.append(style, wrapper);
  }
}
