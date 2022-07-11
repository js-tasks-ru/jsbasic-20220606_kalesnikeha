function initCarousel() {
  let left = document.getElementsByClassName('carousel__arrow_left')[0];
  let right = document.getElementsByClassName('carousel__arrow_right')[0];
  let slider = document.getElementsByClassName('carousel__inner')[0];
  const slideWidth = document.getElementsByClassName('carousel__slide')[0].offsetWidth
  let offset = 0;
  left.style.display = 'none';

  left.onclick = function (e) {
    offset += slideWidth;
    right.style.display = 'flex';
    if (offset === 0) {
      left.style.display = 'none';
    }
    slider.style.transform = 'translateX(' + offset + 'px)';
  };

  right.onclick = function (e) {
    offset -= slideWidth;
    left.style.display = 'flex';
    if (offset === -(slideWidth * 3)) {
      right.style.display = 'none';
    }
    slider.style.transform = 'translateX(' + offset + 'px)';
  };
}
