import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.initElem();
    this.ribbon = this.elem.querySelector('.ribbon');
    this.nav = this.elem.querySelector('.ribbon__inner');
    this.leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    this.leftArrow.addEventListener('click', e => {
      e.preventDefault();
      this.nav.scrollBy(-350, 0);
    });
    this.rightArrow = this.elem.querySelector('.ribbon__arrow_right');
    this.rightArrow.addEventListener('click', e => {
      e.preventDefault();
      this.nav.scrollBy(350, 0);
    });
    this.initScroll();
    this.makeCategories();
    this.selectedItem = this.nav.firstElementChild;
    this.selectedItem.classList.add('ribbon__item_active');
  }

  initScroll() {
    this.nav.addEventListener('scroll', e => {
      let scrollWidth = this.nav.scrollWidth;
      let scrollLeft = this.nav.scrollLeft;
      let clientWidth = this.nav.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollLeft) {
        this.leftArrow.classList.add('ribbon__arrow_visible');
      } else {
        this.leftArrow.classList.remove('ribbon__arrow_visible');
      }
      if (scrollRight - 0.5 > 0) {
        this.rightArrow.classList.add('ribbon__arrow_visible');
      } else {
        this.rightArrow.classList.remove('ribbon__arrow_visible');
      }
    });
  }

  makeCategories() {
    this.nav.classList.add('ribbon__inner');
    this.nav.style.overflow = 'hidden';
    this.categories.forEach(e => {
      let link = document.createElement('a');
      link.classList.add('ribbon__item');
      link.dataset.id = e.id;
      link.href = '#';
      link.innerText = e.name;
      link.onclick = (e) => {
        e.preventDefault();
        this.selectedItem.classList.remove('ribbon__item_active');
        e.target.classList.add('ribbon__item_active');
        this.selectedItem = e.target;
        e.target.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: e.target.dataset.id,
          bubbles: true
        }));
      };
      this.nav.appendChild(link);
    });
  }

  initElem() {
    this.elem = createElement('<div class="ribbon">' +
      '  <button class="ribbon__arrow ribbon__arrow_left">' +
      '    <img src="/assets/images/icons/angle-icon.svg" alt="icon">' +
      '  </button>' +
      '  <nav class="ribbon__inner"></nav>' +
      '  <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">' +
      '    <img src="/assets/images/icons/angle-icon.svg" alt="icon">' +
      '  </button>' +
      '</div>');
  }
}
