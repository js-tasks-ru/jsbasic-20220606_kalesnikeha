import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(
      '<div class="modal">' +
      '    <div class="modal__overlay"></div>' +
      '    <div class="modal__inner">' +
      '      <div class="modal__header">' +
      '        <button type="button" class="modal__close">' +
      '          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />' +
      '        </button>' +
      '        <h3 class="modal__title"></h3>' +
      '       </div>' +
      '      <div class="modal__body"></div>' +
      '    </div>' +
      '  </div>');
    this.elem.querySelector('.modal__close').addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.close();
      }
    });

  }

  setTitle(text) {
    this.elem.querySelector('.modal__title').textContent = text;
  }

  setBody(content) {
    this.elem.querySelector('.modal__body').innerHTML = "";
    this.elem.querySelector('.modal__body').appendChild(content);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.appendChild(this.elem);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.dispatchEvent(new CustomEvent("modal-close"));
    this.elem.remove();
  }

}
