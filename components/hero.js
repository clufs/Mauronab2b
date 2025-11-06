export class HeroComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("section");

    wrapper.classList.add("hero");

    wrapper.innerHTML = `
    `;

    const style = document.createElement("style");
    style.textContent = ``;

    this.shadowRoot.append(style, wrapper);
  }
}
