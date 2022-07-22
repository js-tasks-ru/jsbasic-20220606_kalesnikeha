import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.sel("data-carousel-holder").append(this.carousel.elem);
    this.ribbon = new RibbonMenu(categories);
    this.sel("data-ribbon-holder").append(this.ribbon.elem);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    this.sel("data-slider-holder").append(this.stepSlider.elem);
    this.carticon = new CartIcon();
    this.sel("data-cart-icon-holder").append(this.carticon.elem);
    this.cart = new Cart(this.carticon);

    await this.getProducts();
    await this.addProductGrid();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      categoryId: this.ribbon.value
    });
    document.body.addEventListener("product-add", e => {
      let product = this.products.find(product => product.id === e.detail);
      this.cart.addProduct(product);
    });
    this.stepSlider.elem.addEventListener("slider-change", e => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail
      });
    });
    this.ribbon.elem.addEventListener("ribbon-select", e => {
      this.productsGrid.updateFilter({
        category: e.detail
      });
    });
    document.getElementById("nuts-checkbox").onchange = e => {
      this.productsGrid.updateFilter({
        noNuts: e.target.checked
      });
    };
    document.getElementById("vegeterian-checkbox").onchange = e => {
      this.productsGrid.updateFilter({
        vegeterianOnly: e.target.checked
      });
    };
  }

  async getProducts() {
    let e = await fetch("./products.json");
    this.products = await e.json();
  }

  addProductGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    this.sel("data-products-grid-holder").innerHTML = "";
    this.sel("data-products-grid-holder").append(this.productsGrid.elem);
  }

  sel(data) {
    return document.querySelector(`[${data}]`);
  }
}
