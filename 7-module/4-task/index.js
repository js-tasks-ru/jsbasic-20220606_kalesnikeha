import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({steps, value = 0}) {
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
    let thumb = this.sel('slider__thumb');
    thumb.ondragstart = () => false;
    thumb.onpointerdown = this.pointerDown;
    this.setValue(value);
  }

  sel(className) {
    return this.elem.querySelector("." + className);
  }

  setValue(val) {
    this.value = val;
    this.sel('slider__thumb').style.left = val / this.counter * 100 + "%";
    this.sel('slider__progress').style.width = val / this.counter * 100 + "%";
    this.toggleActive();
  }

  pointerDown = (e) => {
    e.preventDefault();
    this.elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.pointerMove);
    document.addEventListener("pointerup", this.pointerUp);
  }

  pointerMove = (e) => {
    e.preventDefault();
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    this.value = Math.round(this.counter * leftRelative);
    let leftPercents = leftRelative * 100;
    this.sel("slider__thumb").style.left = leftPercents + "%";
    this.sel("slider__progress").style.width = leftPercents + "%";
    this.toggleActive();
    this.elem.dispatchEvent(new CustomEvent("slider-move", {
      detail: this.value,
      bubbles: true
    }));
  }

  pointerUp = (e) => {
    document.removeEventListener("pointermove", this.pointerMove);
    document.removeEventListener("pointerup", this.pointerUp);
    this.elem.classList.remove("slider_dragging");
    this.sel("slider__thumb").style.left = this.value / this.counter * 100 + "%";
    this.sel("slider__progress").style.width = this.value / this.counter * 100 + "%";
    this.elem.dispatchEvent(new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    }));
  }

  toggleActive() {
    this.sel("slider__value").innerHTML = this.value;
    let act = this.sel('slider__step-active');
    if (act) {
      act.classList.remove("slider__step-active");
    }
    this.sel('slider__steps').children[this.value].classList.add("slider__step-active");
  }
}
