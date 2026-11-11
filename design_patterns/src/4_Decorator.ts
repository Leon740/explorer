// Add new responsibilities while keeping existing.

// Contract
interface Coffee {
  getDescription(): string;
  getPrice(): number;
}

// Concrete Component
class SimpleCoffee implements Coffee {
  getDescription(): string {
    return "SimpleCoffee";
  }
  getPrice(): number {
    return 3;
  }
}

// Base Decorator
// Stores wrapped component and delegates operations to it.
abstract class CoffeeDecorator implements Coffee {
  constructor(protected readonly coffee: Coffee) {}

  getDescription(): string {
    return this.coffee.getDescription();
  }
  getPrice(): number {
    return this.coffee.getPrice();
  }
}

class MilkDecorator extends CoffeeDecorator {
  override getDescription(): string {
    return `${super.getDescription()}, milk`;
  }
  override getPrice(): number {
    return super.getPrice() + 1;
  }
}

class SugarDecorator extends CoffeeDecorator {
  override getDescription(): string {
    return `${super.getDescription()}, sugar`;
  }
  override getPrice(): number {
    return super.getPrice() + 0.5;
  }
}

class CaramelDecorator extends CoffeeDecorator {
  override getDescription(): string {
    return `${super.getDescription()}, caramel`;
  }
  override getPrice(): number {
    return super.getPrice() + 0.75;
  }
}

const printCoffee = (coffee: Coffee) => {
  console.log(`${coffee.getDescription()} - ${coffee.getPrice()}`);
};

const simpleCoffee = new SimpleCoffee();
printCoffee(simpleCoffee);

const coffeeWithMilk = new MilkDecorator(simpleCoffee);
printCoffee(coffeeWithMilk);

const coffeeWithMilkAndSugar = new SugarDecorator(coffeeWithMilk);
printCoffee(coffeeWithMilkAndSugar);

const coffeeWithMilkSugarCaramel = new CaramelDecorator(coffeeWithMilkAndSugar);
printCoffee(coffeeWithMilkSugarCaramel);
