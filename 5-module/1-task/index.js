function hideSelf() {
  let button = document.getElementsByClassName('hide-self-button')[0];
  button.onclick =
    function (event) {
      event.target.hidden = true;
    };
}
