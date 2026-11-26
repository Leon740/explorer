// CommandInterface
interface CommandInterface {
  execute(): void;
  undo(): void;
}

// Receiver
type EngineState = "On" | "Off";
interface EngineInterface {
  start(): void;
  stop(): void;
}
class Engine implements EngineInterface {
  private state: EngineState = "Off";
  private updateState(newState: EngineState): void {
    this.state = newState;
    console.log(`Engine is ${newState}`);
  }

  start(): void {
    this.updateState("On");
  }
  stop(): void {
    this.updateState("Off");
  }
}
// Commands
class StartEngineCommand implements CommandInterface {
  constructor(private readonly engine: Engine) {}

  execute(): void {
    this.engine.start();
  }
  undo(): void {
    this.engine.stop();
  }
}
class StopEngineCommand implements CommandInterface {
  constructor(private readonly engine: Engine) {}

  execute(): void {
    this.engine.stop();
  }
  undo(): void {
    this.engine.start();
  }
}

// Receiver
type LightsState = "On" | "Off";
interface LightsInterface {
  on(): void;
  off(): void;
}
class Lights implements LightsInterface {
  private lightsState: LightsState = "Off";
  private updateState(newState: LightsState): void {
    this.lightsState = newState;
    console.log(`Lights are ${newState}`);
  }

  on(): void {
    this.updateState("On");
  }
  off(): void {
    this.updateState("Off");
  }
}
// Commands
class TurnLightsOnCommand implements CommandInterface {
  constructor(private readonly lights: Lights) {}

  execute(): void {
    this.lights.on();
  }
  undo(): void {
    this.lights.off();
  }
}
class TurnLightsOffCommand implements CommandInterface {
  constructor(private readonly lights: Lights) {}

  execute(): void {
    this.lights.off();
  }
  undo(): void {
    this.lights.on();
  }
}

// Invoker
class CarController {
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
const carController = new CarController();

// MacroCommand
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
const engine = new Engine();
const startEngineCommand = new StartEngineCommand(engine);
const stopEngineCommand = new StopEngineCommand(engine);

const lights = new Lights();
const turnLightsOnCommand = new TurnLightsOnCommand(lights);
const turnLightsOffCommand = new TurnLightsOffCommand(lights);

console.log("\n");
console.log("Staring the car");
const startCarCommand = new MacroCommand([
  startEngineCommand,
  turnLightsOnCommand,
]);
carController.pressButton(startCarCommand);

console.log("\n");
console.log("Stopping the car");
const stopCarCommand = new MacroCommand([
  stopEngineCommand,
  turnLightsOffCommand,
]);
carController.pressButton(stopCarCommand);
