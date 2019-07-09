// your class here
/*
  >>> Don't forget to use module.exports!
  What is that? Well, glad you asked.
  Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/

class VendingMachine {
  constructor() {
    this.balance = 0;
    this.till = { 10: 0, 50: 0, 100: 0, 500: 0 };
    this.selectedRow = null;
    this.selectedColumn = null;
    this.inventory = [[], [], [], []];
  }
  addInventory({ name, price, count }) {
    const newItem = { name: name, price: price, count: count };
    for (const row of this.inventory) {
      if (row.length < 4) {
        row.push(newItem);
        return;
      }
    }
  }
  insertCoin(number) {
    this.balance = number;
    for (const key in this.till) {
      if (JSON.stringify(number) === key) {
        this.till[key]++;
      }
    }
  }
  selectRow(rowLetter) {
    const validRows = ["A", "B", "C", "D"];
    if (validRows.includes(rowLetter)) {
      this.selectedRow = rowLetter;
    }
    console.log(this.selectedRow);
  }

  selectColumn(columnNumber) {
    const validColumns = [1, 2, 3, 4];
    if (validColumns.includes(columnNumber)) {
      this.selectedColumn = columnNumber;
    }
    console.log(this.selectedColumn);
  }
}

module.exports = { VendingMachine };
