import { Header } from "./header.js";
import { Footer } from "./footer.js";
import { FullscreenProducts } from "./home-products.js";
import { ContactComponent } from "./contact-section.js";

if (!customElements.get("my-header")) {
  customElements.define("my-header", Header);
}
if (!customElements.get("my-footer")) {
  customElements.define("my-footer", Footer);
}

if (!customElements.get("my-homeproducts")) {
  customElements.define("my-homeproducts", FullscreenProducts);
}
