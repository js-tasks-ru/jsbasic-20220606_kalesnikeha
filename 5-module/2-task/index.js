function toggleText() {
  let button = document.getElementsByClassName("toggle-text-button")[0];
  let text = document.getElementById('text');
  button.onclick =
    function () {
      text.hidden = !text.hidden;
    };
}
