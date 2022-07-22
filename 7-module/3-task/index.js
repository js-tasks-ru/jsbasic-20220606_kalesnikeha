import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.counter = steps - 1;
    this.elem = createElement(`<div class="slider">` +
      `<div class="slider__thumb">` +
      ` <span class="slider__value"></span>` +
      `</div>` +
      `<div class="slider__progress"></div>` +
      `<div class="slider__steps">${"<span></span>".repeat(this.steps)}</div></div>`);
    this.elem.onclick = e => {
      let left = (e.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      this.setValue(Math.round(this.counter * left));
      this.elem.dispatchEvent(new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: !0
      }));
    };
    this.setValue(value);
  }

  setValue(val) {
    this.value = val;
    this.sel('slider__thumb').style.left = val / this.counter * 100 + "%";
    this.sel('slider__progress').style.width = val / this.counter * 100 + "%";
    this.sel('slider__value').innerHTML = val;
    let act = this.sel('slider__step-active');
    if (act) {
      act.classList.remove("slider__step-active");
    }
    this.sel('slider__steps').children[this.value].classList.add("slider__step-active");
  }

  sel(className) {
    return this.elem.querySelector("." + className);
  }
}
