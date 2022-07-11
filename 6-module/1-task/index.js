/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  constructor(rows) {
    this.makeTable();
    this.allElems = rows;
    this.initContent();
  }

  initContent() {
    let content = document.createElement('tbody');
    const rowFields = [
      "name",
      "age",
      "salary",
      "city",
    ];
    this.allElems.forEach((row) => {
      let tr = document.createElement('tr');
      rowFields.forEach((name) => {
        let cell = document.createElement('td');
        cell.innerHTML = row[name];
        tr.appendChild(cell);
      });

      let buttonCell = document.createElement('td');
      let button = document.createElement('button');
      button.innerHTML = "X";
      button.onclick = this.buttonTrigger;
      buttonCell.appendChild(button);
      tr.appendChild(buttonCell);
      content.appendChild(tr);
    });
    this.elem.appendChild(content);
  }

  buttonTrigger(event) {
    event.preventDefault();
    const button = event.target;
    button.parentElement.closest('tr').remove();
  }

  makeTable() {
    this.elem = document.createElement('table');
    let head = document.createElement("thead");
    let row = document.createElement("tr");
    const colNames = [
      'Имя',
      'Возраст',
      'Зарплата',
      'Город',
      ''
    ];
    colNames.forEach((name) => {
      let cell = document.createElement("tr");
      cell.innerHTML = name;
      row.appendChild(cell);
    });
    head.appendChild(row);
    this.elem.appendChild(head);
  }
}
