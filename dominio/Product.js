// Entidad simple + fábrica
export class Product {
  constructor({ id, name, category, minOrder, imageUrl }) {
    this.id = id;
    this.name = name;
    this.category = category ?? "Sin categoría";
    this.minOrder = minOrder ?? null;
    this.imageUrl =
      imageUrl ?? "https://via.placeholder.com/600x600?text=Maurona";
  }
}

export function makeProduct(raw) {
  return new Product(raw);
}
