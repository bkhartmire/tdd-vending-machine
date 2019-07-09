const { VendingMachine } = require("../VendingMachine");
const { expect } = require("chai");

describe("vending machine", () => {
  const juice = { name: `Apple Juice`, price: 350, count: 5 };
  const coffee = { name: "Tully's", price: 250, count: 7 };
  const jungleJuice = { name: `Jungle Juice`, price: 700, count: 10 };
  const icedCoffee = { name: "Starbucks", price: 500, count: 2 };

  // const inventory = [
  //   [juice, coffee, jungleJuice, icedCoffee],
  //   [coffee, jungleJuice, icedCoffee, juice],
  //   [jungleJuice, icedCoffee, juice, coffee],
  //   [icedCoffee, juice, coffee, jungleJuice],
  // ];
  new it("should accept valid coins", () => {
    // Setup
    const machine = new VendingMachine();

    // Exercise
    machine.insertCoin(500);

    // Assert
    expect(machine.till).to.deep.equal({
      10: 10,
      50: 10,
      100: 10,
      500: 11,
    });
    expect(machine.balance).to.equal(500); // Use an ES6 getter
  });
  it("should have a selectRow method that checks for valid row input", () => {
    const machine = new VendingMachine();
    expect(machine.selectedRow).to.equal(null);
    machine.selectRow(201);
    expect(machine.selectedRow).to.equal(null);
    machine.selectRow("B");
    expect(machine.selectedRow).to.equal("B");
    machine.selectRow("Z");
    expect(machine.selectedRow).to.equal("B");
    machine.selectRow("A");
    expect(machine.selectedRow).to.equal("A");
  });
  it("should have a selectColumn method that checks for valid column input", () => {
    const machine = new VendingMachine();
    expect(machine.selectedColumn).to.equal(null);
    machine.selectColumn(201);
    expect(machine.selectedColumn).to.equal(null);
    machine.selectColumn(1);
    expect(machine.selectedColumn).to.equal(1);
    machine.selectColumn(5);
    expect(machine.selectedColumn).to.equal(1);
    machine.selectColumn(2);
    expect(machine.selectedColumn).to.equal(2);
  });
  it("should have an add inventory method", () => {
    const machine = new VendingMachine();
    machine.addInventory(coffee);
    machine.addInventory(coffee);
    machine.addInventory(coffee);
    machine.addInventory(coffee);

    let expectedInventory = [[coffee, coffee, coffee, coffee], [], [], []];
    expect(machine.inventory).to.deep.equal(expectedInventory);

    machine.addInventory(juice);
    machine.addInventory(juice);
    machine.addInventory(juice);
    machine.addInventory(juice);

    expectedInventory = [
      [coffee, coffee, coffee, coffee],
      [juice, juice, juice, juice],
      [],
      [],
    ];
    expect(machine.inventory).to.deep.equal(expectedInventory);

    machine.addInventory(icedCoffee);
    machine.addInventory(icedCoffee);
    machine.addInventory(icedCoffee);
    machine.addInventory(icedCoffee);

    expectedInventory = [
      [coffee, coffee, coffee, coffee],
      [juice, juice, juice, juice],
      [icedCoffee, icedCoffee, icedCoffee, icedCoffee],
      [],
    ];

    expect(machine.inventory).to.deep.equal(expectedInventory);

    machine.addInventory(jungleJuice);
    machine.addInventory(jungleJuice);
    machine.addInventory(jungleJuice);
    machine.addInventory(jungleJuice);

    expectedInventory = [
      [coffee, coffee, coffee, coffee],
      [juice, juice, juice, juice],
      [icedCoffee, icedCoffee, icedCoffee, icedCoffee],
      [jungleJuice, jungleJuice, jungleJuice, jungleJuice],
    ];

    expect(machine.inventory).to.deep.equal(expectedInventory);

    machine.addInventory(coffee);
    expect(machine.inventory).to.deep.equal(expectedInventory);
  });
  it("should check if the user put in enough money", () => {
    const machine = new VendingMachine();
    machine.addInventory(coffee);
    machine.insertCoin(100);
    machine.selectRow("A");
    machine.selectColumn(1);
    expect(machine.checkIfEnoughMoney()).to.equal(false);
    machine.insertCoin(500);
    expect(machine.checkIfEnoughMoney()).to.equal(true);
  });

  it("should check if there is any inventory at user selection", () => {
    const machine = new VendingMachine();
    machine.addInventory(coffee);
    machine.selectRow("A");
    machine.selectColumn(2);

    expect(machine.checkIfInventory()).to.equal(false);

    machine.selectRow("A");
    machine.selectColumn(1);

    expect(machine.checkIfInventory()).to.equal(true);
  });

  it("should return the proper change after they buy something", () => {
    const machine = new VendingMachine();
    machine.addInventory(coffee);
    machine.insertCoin(500);
    machine.selectRow("A");
    machine.selectColumn(1);
    expect(machine.dispenseChange(coffee.price)).to.equal(250);
  });
});
