// Factory Method

// 1 \ Product interface
// Defines what every created product must support
interface Pizza {
  prepare(): void;
  bake(): void;
  cut(): void;
  box(): void;
}

// 2 \ Concrete products
// These are the objects produced by factory methods
class NewYorkPizza implements Pizza {
  prepare(): void {
    console.log(`preparing NewYorkPizza`);
  }

  bake(): void {
    console.log(`baking NewYorkPizza`);
  }

  cut(): void {
    console.log(`cutting NewYorkPizza`);
  }

  box(): void {
    console.log(`boxing NewYorkPizza`);
  }
}
class ChicagoPizza implements Pizza {
  prepare(): void {
    console.log(`preparing ChicagoPizza`);
  }

  bake(): void {
    console.log(`baking ChicagoPizza`);
  }

  cut(): void {
    console.log(`cutting ChicagoPizza`);
  }

  box(): void {
    console.log(`boxing ChicagoPizza`);
  }
}

// 3 \ Abstract Creator
// Owns business workflow
abstract class PizzaStore {
  // 4 \ Factory Method
  // Subclasses implement this method to choose the product
  protected abstract createPizza(): Pizza;

  orderPizza(): Pizza {
    // The superclass uses the factory method without knowing which concrete Pizza the subclass will return
    const pizza = this.createPizza();
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
}

// 5 \ Concrete Creator
// Decides which concrete Product to instantiate
class NewYorkPizzaStore extends PizzaStore {
  protected override createPizza(): Pizza {
    return new NewYorkPizza();
  }
}
class ChicagoPizzaStore extends PizzaStore {
  protected override createPizza(): Pizza {
    return new ChicagoPizza();
  }
}

// Client
const newYorkPizzaStore = new NewYorkPizzaStore();
newYorkPizzaStore.orderPizza();
const chicagoPizzaStore = new ChicagoPizzaStore();
chicagoPizzaStore.orderPizza();
