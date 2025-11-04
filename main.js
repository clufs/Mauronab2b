const dev = false;

const repo = dev ? createMockRepo : createAirTableRepo({});

customElements.whenDefined("my-home-products").then(() => {
  document
    .querySelectorAll("my-home-products")
    .forEach((el) => (el.repo = repo));
});
