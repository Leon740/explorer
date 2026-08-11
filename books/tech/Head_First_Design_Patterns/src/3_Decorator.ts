// Decorator Pattern
// Add responsibilities to an object dynamically by wrapping it with other objects that implement the same interface.
//
// Prefer composition over creating a subclass for every possible combination.

// Component contract:
// defines the interface shared by the original object and every Decorator.
interface Coffee {
  getDescription(): string;
  getPrice(): number;
}

// Concrete Component:
// provides the original/base behavior that will be decorated.
class SimpleCoffee implements Coffee {
  getDescription(): string {
    return "Coffee";
  }

  getPrice(): number {
    return 3;
  }
}

// Base Decorator:
// implements the same Component contract and stores a wrapped Component.
//
// Because CoffeeDecorator implements Coffee, clients can use a decorator
// anywhere that they can use a SimpleCoffee.
abstract class CoffeeDecorator implements Coffee {
  constructor(
    // Wrapped Component:
    // may be a Concrete Component or another Decorator.
    protected readonly coffee: Coffee,
  ) {}

  // Delegate the original operation to the wrapped Component.
  getDescription(): string {
    return this.coffee.getDescription();
  }

  // Delegate the original operation to the wrapped Component.
  getPrice(): number {
    return this.coffee.getPrice();
  }
}
// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  override getDescription(): string {
    return `${super.getDescription()}, milk`;
  }

  override getPrice(): number {
    return super.getPrice() + 0.5;
  }
}
class SugarDecorator extends CoffeeDecorator {
  override getDescription(): string {
    return `${super.getDescription()}, sugar`;
  }

  override getPrice(): number {
    return super.getPrice() + 0.25;
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

// Client helper
const printCoffee = (coffee: Coffee): void => {
  console.log(coffee.getDescription());
  console.log(`Price: ${coffee.getPrice().toFixed(2)}`);
};

// Client:
// creates a Concrete Component and dynamically composes Decorators around it.
const simpleCoffee: Coffee = new SimpleCoffee();
printCoffee(simpleCoffee);

// Wrapping order, from inside to outside:
// SimpleCoffee -> MilkDecorator -> SugarDecorator -> CaramelDecorator
const caramelMilkCoffee: Coffee = new CaramelDecorator(
  new SugarDecorator(new MilkDecorator(new SimpleCoffee())),
);
printCoffee(caramelMilkCoffee);

// Execution flow for caramelMilkCoffee.getPrice():
//
// CaramelDecorator.getPrice()
//   -> SugarDecorator.getPrice()
//     -> MilkDecorator.getPrice()
//       -> SimpleCoffee.getPrice() returns 3.00
//     <- MilkDecorator adds 0.50
//   <- SugarDecorator adds 0.25
// <- CaramelDecorator adds 0.75
//
// Final price: 4.50
