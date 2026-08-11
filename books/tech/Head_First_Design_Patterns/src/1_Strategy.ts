/**
 * Strategy + Simple Factory example.
 *
 * Strategy defines interchangeable driving behaviors.
 * The factory centralizes the selection of a concrete behavior.
 */

enum Fuel {
  GAS = "Gas",
  ELECTRIC = "Electric",
  HYBRID = "Hybrid",
}

interface CarModel {
  model: string;
  fuel: Fuel;
}

const carModelsByBrand: Record<string, CarModel[]> = {
  Tesla: [
    { model: "Model Y", fuel: Fuel.ELECTRIC },
    { model: "Model X", fuel: Fuel.ELECTRIC },
  ],
  Audi: [
    { model: "RS 6", fuel: Fuel.GAS },
    { model: "E-tron", fuel: Fuel.ELECTRIC },
  ],
  Toyota: [{ model: "Prius", fuel: Fuel.HYBRID }],
};

// Strategy contract: every driving behavior supports the same operation.
interface DriveBehavior {
  drive(carName: string): void;
}
// Concrete strategies: interchangeable implementations of DriveBehavior.
class GasDriveBehavior implements DriveBehavior {
  drive(carName: string): void {
    console.log(`${carName} drives using ${Fuel.GAS}.`);
  }
}
class ElectricDriveBehavior implements DriveBehavior {
  drive(carName: string): void {
    console.log(`${carName} drives using ${Fuel.ELECTRIC}.`);
  }
}
class HybridDriveBehavior implements DriveBehavior {
  drive(carName: string): void {
    console.log(`${carName} drives using ${Fuel.HYBRID}.`);
  }
}

// Context: delegates the varying operation to its composed strategy.
class Car {
  private name: string;
  private driveBehavior: DriveBehavior;

  constructor({
    name,
    driveBehavior,
  }: {
    name: string;
    driveBehavior: DriveBehavior;
  }) {
    this.name = name;
    this.driveBehavior = driveBehavior;
  }

  drive(): void {
    this.driveBehavior.drive(this.name);
  }

  // Strategies can optionally be replaced at runtime.
  setDriveBehavior(driveBehavior: DriveBehavior): void {
    this.driveBehavior = driveBehavior;
  }
}

// Factory: centralizes which concrete strategy corresponds to each fuel type.
class DriveBehaviorFactory {
  static create(fuel: Fuel): DriveBehavior {
    switch (fuel) {
      case Fuel.GAS:
        return new GasDriveBehavior();
      case Fuel.ELECTRIC:
        return new ElectricDriveBehavior();
      case Fuel.HYBRID:
        return new HybridDriveBehavior();
      default:
        throw new Error(`Unsupported fuel: ${fuel}`);
    }
  }
}

for (const [brand, models] of Object.entries(carModelsByBrand)) {
  for (const { model, fuel } of models) {
    const car = new Car({
      name: `${brand} ${model}`,
      driveBehavior: DriveBehaviorFactory.create(fuel),
    });

    car.drive();
  }
}

// Runtime strategy replacement demonstration.
const experimentalCar = new Car({
  name: "Experimental Car",
  driveBehavior: new ElectricDriveBehavior(),
});
experimentalCar.drive();
experimentalCar.setDriveBehavior(new HybridDriveBehavior());
experimentalCar.drive();
