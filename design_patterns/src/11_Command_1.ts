// Problem
// The sender of request if tightly coupled to the object that performs it, making request difficult to store, queue, delay, repeat or undo.
// Solution
// Command design pattern: encapsulate each request as an independent command object with a common execution interface.

enum ROOMS {
  WORKROOM = "Workroom",
  BEDROOM = "Bedroom",
  BATHROOM = "Bathroom",
  KITCHEN = "Kitchen",
  GARAGE = "Garage",
}

// CommandInterface
interface CommandInterface {
  execute(): void;
  undo(): void;
}

// Receiver knows how to perform operations
type LightState = "On" | "Off";
interface LightInterface {
  on(): void;
  off(): void;
}
class Light implements LightInterface {
  constructor(private readonly location: ROOMS) {}

  private state: LightState = "Off";
  private updateState(newState: LightState): void {
    this.state = newState;
    console.log(`${this.location} light is ${newState}`);
  }

  on(): void {
    this.updateState("On");
  }
  off(): void {
    this.updateState("Off");
  }
}
// Concrete commands store Receivers
class TurnLightOnCommand implements CommandInterface {
  constructor(private readonly light: Light) {}

  execute(): void {
    this.light.on();
  }
  undo(): void {
    this.light.off();
  }
}
class TurnLightOffCommand implements CommandInterface {
  constructor(private readonly light: Light) {}

  execute(): void {
    this.light.off();
  }
  undo(): void {
    this.light.on();
  }
}

// Receiver
type GarageState = "Opened" | "Closed";
interface GarageInterface {
  open(): void;
  close(): void;
}
class Garage implements GarageInterface {
  constructor() {}

  private state: GarageState = "Closed";
  private updateState(newState: GarageState): void {
    this.state = newState;
    console.log(`Garage is ${newState}`);
  }

  open(): void {
    this.updateState("Opened");
  }
  close(): void {
    this.updateState("Closed");
  }
}
// Concrete commands
class OpenGarageCommand implements CommandInterface {
  constructor(private readonly garage: Garage) {}

  execute(): void {
    this.garage.open();
  }
  undo(): void {
    this.garage.close();
  }
}
class CloseGarageCommand implements CommandInterface {
  constructor(private readonly garage: Garage) {}

  execute(): void {
    this.garage.close();
  }
  undo(): void {
    this.garage.open();
  }
}

// Invoker executes commands without knowing them
class HouseController {
  private lastCommand?: CommandInterface;

  pressButton(command: CommandInterface): void {
    command.execute();
    this.lastCommand = command;
  }
  pressUndo(): void {
    if (!this.lastCommand) {
      console.log("Nothing to undo");
      return;
    }

    this.lastCommand.undo();
  }
}
const houseController = new HouseController();

// MacroCommand contains a bunch of commands
class MacroCommand implements CommandInterface {
  constructor(private readonly commands: CommandInterface[]) {}

  execute(): void {
    for (const command of this.commands) {
      command.execute();
    }
  }
  undo(): void {
    for (const command of [...this.commands].reverse()) {
      command.undo();
    }
  }
}

// Client
const roomLights: Light[] = Object.values(ROOMS).map((room) => new Light(room));
const turnOnAllLightsCommand = new MacroCommand(
  roomLights.map((light) => new TurnLightOnCommand(light)),
);
const turnOffAllLightsCommand = new MacroCommand(
  roomLights.map((light) => new TurnLightOffCommand(light)),
);

const garage = new Garage();
const openGarageCommand = new OpenGarageCommand(garage);
const closeGarageCommand = new CloseGarageCommand(garage);

console.log("\n");
console.log("Departing from home");
const departFromHomeCommand = new MacroCommand([
  turnOffAllLightsCommand,
  closeGarageCommand,
]);
houseController.pressButton(departFromHomeCommand);

console.log("\n");
console.log("Arriving to home");
const arriveToHomeCommand = new MacroCommand([
  turnOnAllLightsCommand,
  openGarageCommand,
]);
houseController.pressButton(arriveToHomeCommand);
