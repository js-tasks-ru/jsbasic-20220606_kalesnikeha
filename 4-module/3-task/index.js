function highlight(table) {
  for (let row of table.rows) {

    if (row.cells[3].dataset) {
      let dsClass = row.cells[3].dataset.available === 'true' ? "available" : "unavailable";
      row.classList.add(dsClass);
    } else {
      row.hidden = true;
    }

    let genClass = row.cells[2].innerText === 'm' ? 'male' : 'female';
    row.classList.add(genClass);

    if (parseInt(row.cells[1].innerText) < 18)
      row.style.textDecoration = 'line-through';
  }
}
