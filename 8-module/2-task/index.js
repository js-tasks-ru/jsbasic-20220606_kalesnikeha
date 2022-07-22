import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement('<div class="products-grid"><div class="products-grid__inner"></div></div>');
    this.renderProducts();
  }

  renderProducts() {
    let productContainer = this.elem.querySelector(".products-grid__inner");
    productContainer.innerHTML = "";
    for (let product of this.products) {
      if (this.filters.category && product.category !== this.filters.category) {continue;}
      if (this.filters.noNuts && product.nuts) {continue;}
      if (this.filters.vegeterianOnly && !product.vegeterian) {continue;}
      if ((this.filters.maxSpiciness !== 0) && (product.spiciness > this.filters.maxSpiciness)) {continue;}
      let prodCart = new ProductCard(product);
      productContainer.append(prodCart.elem);
    }
  }

  updateFilter(filter) {
    Object.assign(this.filters, filter);
    this.renderProducts();
  }
}
