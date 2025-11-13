export class StatsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {}
}
customElements.define("stats-components", StatsComponent);
