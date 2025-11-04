/**
 * @typedef {import('./Product.js').Product} Product
 */

/**
 * @interface
 */
export class ProductRepository {
  /**
   * @returns {Promise<Product[]>}
   */
  async list() {
    throw new Error("not implemented");
  }
}
