// your class here
/*
>>> Don't forget to use module.exports!
What is that? Well, glad you asked.
Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/

class VendingMachine {
  constructor() {
    this.balance = 0;
    this.till = { 10: 10, 50: 10, 100: 10, 500: 10 };
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

  pushOrderButton() {
    const rowIndices = { A: 0, B: 1, C: 2, D: 3 };
    const rowIndex = rowIndices[this.selectedRow];
    let availability;
    let item;
    if (this.selectedRow && this.selectedColumn) {
      availability = this.checkIfInventory(rowIndex);
      item = this.inventory[rowIndex][this.selectedColumn - 1];
    } else {
      console.log("Please make a valid selection.");
    }
    if (availability && this.checkIfEnoughMoney(item.price)) {
      console.log("Please enjoy your", item.name);
      item.count--;
      if (this.balance > item.price) {
        this.dispenseChange(item.price);
      }
    }
    this.selectedRow = null;
    this.selectedColumn = null;
  }

  checkIfInventory(rowIndex) {
    if (this.inventory[rowIndex][this.selectedColumn - 1]) {
      return true;
    }
    console.log("Sorry, please make another selection.");
    return false;
  }

  checkIfEnoughMoney(price) {
    if (this.balance >= price) {
      return true;
    }
    console.log("Insufficient funds.");
    return false;
  }

  dispenseChange(price) {
    const coins = {};
    const change = this.balance - price;
    let remaining = change;
    while (remaining > 0) {
      if (remaining >= 100 && this.till[100] > 0) {
        coins[100] ? coins[100]++ : (coins[100] = 1);
        this.till[100]--;
        remaining -= 100;
      } else if (remaining >= 50 && this.till[50] > 0) {
        coins[50] ? coins[50]++ : (coins[50] = 1);
        this.till[50]--;
        remaining -= 50;
      } else if (remaining >= 10 && this.till[10] > 0) {
        coins[10] ? coins[10]++ : (coins[10] = 1);
        this.till[10]--;
        remaining -= 10;
      }
    }
    console.log("Here's your change:", change, coins);
    return change;
  }
}

module.exports = { VendingMachine };
