class Battery {
  providePower() {
    console.log("Battery provides power");
  }
}
class FuelSystem {
  pressurize() {
    console.log("Fuel system pressurized");
  }
}
class ECU {
  runChecks() {
    console.log("ECU checks sensors");
  }
}
class StarterMotor {
  crankEngine() {
    console.log("Starter cranks engine");
  }
}
class Ignition {
  ignite() {
    console.log("Ignition starts combustion");
  }
}

const battery = new Battery();
const fuelSystem = new FuelSystem();
const ecu = new ECU();
const starterMotor = new StarterMotor();
const ignition = new Ignition();

// Problem
// Client needs to know implementation details of every dependant service.

battery.providePower();
fuelSystem.pressurize();
ecu.runChecks();
starterMotor.crankEngine();
ignition.ignite();

// Solution
// Facade design pattern: layer between client and dependant services, now client only needs to know how to work with facade.

class CarFacade {
  private battery: Battery;
  private fuelSystem: FuelSystem;
  private ecu: ECU;
  private starterMotor: StarterMotor;
  private ignition: Ignition;

  constructor({
    battery,
    fuelSystem,
    ecu,
    starterMotor,
    ignition,
  }: {
    battery: Battery;
    fuelSystem: FuelSystem;
    ecu: ECU;
    starterMotor: StarterMotor;
    ignition: Ignition;
  }) {
    this.battery = battery;
    this.fuelSystem = fuelSystem;
    this.ecu = ecu;
    this.starterMotor = starterMotor;
    this.ignition = ignition;
  }

  start() {
    console.log("\n");

    this.battery.providePower();
    this.fuelSystem.pressurize();
    this.ecu.runChecks();
    this.starterMotor.crankEngine();
    this.ignition.ignite();

    console.log("\nCar started");
  }
}

const car = new CarFacade({
  battery: new Battery(),
  fuelSystem: new FuelSystem(),
  ecu: new ECU(),
  starterMotor: new StarterMotor(),
  ignition: new Ignition(),
});
car.start();
