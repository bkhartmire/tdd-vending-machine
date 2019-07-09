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
  }
  insertCoin(number) {
    this.balance = number;
    for (const key in this.till) {
      if (JSON.stringify(number) === key) {
        this.till[key]++;
      }
    }
  }
}

module.exports = { VendingMachine };
