const { VendingMachine } = require("../VendingMachine");
const { expect } = require("chai");

describe("vending machine", () => {
  // const juice = {name: `Apple Juice`, price: 350, count: 5};
  // const coffee = {name: "Tully's", price: 250, count: 7};

  // const inventory = [
  //   // [juice, coffee, ..., ...],
  //   // [..., ..., ..., ...],
  //   // [..., ..., ..., ...],
  //   // [..., ..., ..., ...],
  // ]

  it("should accept valid coins", () => {
    // Setup
    const machine = new VendingMachine();

    // Exercise
    machine.insertCoin(500);

    // Assert
    expect(machine.till).to.deep.equal({
      10: 0,
      50: 0,
      100: 0,
      500: 1,
    });
    expect(machine.balance).to.equal(500); // Use an ES6 getter
  });
});
