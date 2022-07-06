import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.offset = 0;
    this.elem = createElement(`<div class="carousel"></div>`);
    this.left = createElement(`<div class="carousel__arrow carousel__arrow_left"><img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div>`);
    this.right = createElement(`<div class="carousel__arrow carousel__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div>`);
    this.elem.appendChild(this.right);
    this.elem.appendChild(this.left);
    this.slider = document.createElement('div');
    this.slider.classList.add('carousel__inner');
    document.addEventListener('toggle_slide', (event) => {
      if (event.detail === 'left') {
        this.right.style.display = 'flex';
        if (this.offset === 0) {
          this.left.style.display = 'none';
        }
        this.slider.style.transform = 'translateX(' + this.offset + 'px)';
      } else {
        this.left.style.display = 'flex';
        if (this.offset === -(this.slideWidth * (this.slides.length - 1))) {
          this.right.style.display = 'none';
        }
        this.slider.style.transform = 'translateX(' + this.offset + 'px)';
      }
    });

    this.left.onclick = () => this.leftClick();
    this.left.style.display = 'none';

    this.right.onclick = () => this.rightClick();

    this.elem.appendChild(this.slider);
    this.slides.forEach(el => {
      let slide = createElement(`<div class="carousel__slide" data-id="${el.id}">
                                        <img src="/assets/images/carousel/${el.image}" class="carousel__img" alt="slide">
                                        <div class="carousel__caption">
                                          <span class="carousel__price">€${el.price.toFixed(2)}</span>
                                          <div class="carousel__title">${el.name}</div>
                                          <button type="button" class="carousel__button">
                                            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                                          </button>
                                        </div>
                                      </div>`);
      slide.querySelector('.carousel__button').onclick = e => {
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: el.id,
          bubbles: true
        }));
      };
      this.slider.appendChild(slide);
    });
  }

  leftClick() {
    this.slideWidth = this.elem.getElementsByClassName('carousel__slide')[0].offsetWidth;
    this.offset += this.slideWidth;
    this.elem.dispatchEvent(new CustomEvent("toggle_slide", {
      detail: "left",
      bubbles: true
    }));
  }

  rightClick() {
    this.slideWidth = this.elem.getElementsByClassName('carousel__slide')[0].offsetWidth;
    this.offset -= this.slideWidth;
    this.elem.dispatchEvent(new CustomEvent("toggle_slide", {
      detail: "right",
      bubbles: true
    }));
  }
}
