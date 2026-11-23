// Problem
// Imagine that a restaurant can have menu items and menus which contain menu items.
// Solution
// Composite Pattern
// Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

interface MenuNode {
  name: string;
  description: string;
}

interface MenuItemOptions {
  name: MenuNode["name"];
  description: MenuNode["description"];
  price: number;
}

// Component
abstract class MenuComponent {
  private throwNotSupportedOperationError(operation: string): never {
    throw new Error(`${operation} operation is not supported`);
  }

  add(menuComponent: MenuComponent): void {
    void menuComponent;
    this.throwNotSupportedOperationError("add");
  }
  remove(menuComponent: MenuComponent): void {
    void menuComponent;
    this.throwNotSupportedOperationError("remove");
  }
  getChild(index: number): MenuComponent {
    void index;
    this.throwNotSupportedOperationError("getChild");
  }

  getName(): MenuNode["name"] {
    this.throwNotSupportedOperationError("getName");
  }
  getDescription(): MenuNode["description"] {
    this.throwNotSupportedOperationError("getDescription");
  }
  getPrice(): MenuItemOptions["price"] {
    this.throwNotSupportedOperationError("getPrice");
  }

  print(depth = 0): void {
    void depth;
    this.throwNotSupportedOperationError("print");
  }
}

// Leaf
class MenuItem extends MenuComponent {
  private readonly name: MenuNode["name"];
  private readonly description: MenuNode["description"];
  private readonly price: MenuItemOptions["price"];

  constructor({ name, description, price }: MenuItemOptions) {
    super();

    this.name = name;
    this.description = description;
    this.price = price;
  }

  override getName(): MenuNode["name"] {
    return this.name;
  }
  override getDescription(): MenuNode["description"] {
    return this.description;
  }
  override getPrice(): MenuItemOptions["price"] {
    return this.price;
  }

  override print(depth = 0): void {
    const indentation = " ".repeat(depth);

    console.groupCollapsed(`${indentation}${this.getName()}`);
    console.log(`${indentation}${this.getDescription()}`);
    console.log(`${indentation}${this.getPrice()}`);
    console.groupEnd();
  }
}

// Composite
interface MenuOptions {
  name: MenuNode["name"];
  description: MenuNode["description"];
}
class Menu extends MenuComponent {
  private readonly name: MenuOptions["name"];
  private readonly description: MenuOptions["description"];

  private readonly menuComponents: MenuComponent[] = [];

  constructor({ name, description }: MenuOptions) {
    super();

    this.name = name;
    this.description = description;
  }

  override add(menuComponent: MenuComponent): void {
    this.menuComponents.push(menuComponent);
  }
  override remove(menuComponent: MenuComponent): void {
    const index = this.menuComponents.indexOf(menuComponent);

    if (index !== -1) {
      this.menuComponents.splice(index, 1);
    }
  }
  override getChild(index: number): MenuComponent {
    const component = this.menuComponents[index];

    if (!component) {
      throw new Error(`MenuComponent at index ${index} does not exist`);
    }

    return component;
  }

  override getName(): MenuNode["name"] {
    return this.name;
  }
  override getDescription(): MenuNode["description"] {
    return this.description;
  }

  override print(depth = 0): void {
    const indentation = " ".repeat(depth);

    console.groupCollapsed(`${indentation}${this.getName()}`);
    console.log(`${indentation}${this.getDescription()}`);
    for (const menuComponent of this.menuComponents) {
      menuComponent.print(depth + 1);
    }
    console.groupEnd();
  }
}

// Menus
const pancakeHouseMenu = new Menu({
  name: "Pancake House Menu",
  description: "Breakfast",
});
const steakHouseMenu = new Menu({
  name: "Steak House Menu",
  description: "Dinner",
});
const cafeMenu = new Menu({
  name: "Cafe House Menu",
  description: "Coffee and light meals",
});

// MenuItems
pancakeHouseMenu.add(
  new MenuItem({
    name: "Regular Pancakes",
    description: "Pancakes with eggs and sausage",
    price: 8.99,
  }),
);
pancakeHouseMenu.add(
  new MenuItem({
    name: "Blueberry Pancakes",
    description: "Pancakes with fresh blueberries",
    price: 9.99,
  }),
);

steakHouseMenu.add(
  new MenuItem({
    name: "NY Steak",
    description: "New York strip steak",
    price: 10,
  }),
);
steakHouseMenu.add(
  new MenuItem({
    name: "Ribeye Steak",
    description: "Grilled ribeye steak",
    price: 20,
  }),
);

cafeMenu.add(
  new MenuItem({
    name: "Avocado Toast",
    description: "Toast with avocado",
    price: 8,
  }),
);
cafeMenu.add(
  new MenuItem({
    name: "Crepes",
    description: "French-style crepes",
    price: 10,
  }),
);

// Submenus
const dessertMenu = new Menu({
  name: "Dessert Menu",
  description: "Desserts served after dinner",
});
dessertMenu.add(
  new MenuItem({
    name: "Cheesecake",
    description: "New York-style cheesecake",
    price: 7.99,
  }),
);
dessertMenu.add(
  new MenuItem({
    name: "Ice Cream",
    description: "Vanilla ice cream",
    price: 4.99,
  }),
);
steakHouseMenu.add(dessertMenu);

// RootComposite
const allMenus = new Menu({
  name: "All menus",
  description: "All available restaurant menus",
});
allMenus.add(pancakeHouseMenu);
allMenus.add(steakHouseMenu);
allMenus.add(cafeMenu);

// Client
class Waitress {
  constructor(private readonly allMenus: MenuComponent) {}

  menu(): void {
    this.allMenus.print();
  }
}
const waitress = new Waitress(allMenus);
waitress.menu();
