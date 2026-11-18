interface Engine {
  start(): void;
}

class GasEngine implements Engine {
  start(): void {
    console.log("GasEngine start");
  }
}
class ElectricEngine implements Engine {
  start(): void {
    console.log("ElectricEngine start");
  }
}

abstract class Car {
  // Bridge design pattern
  // Replaces inheritance explosion with composition.
  constructor(protected engine: Engine) {}

  abstract drive(): void;
}

class Sedan extends Car {
  drive(): void {
    this.engine.start();
    console.log("Sedan drive");
  }
}
class SUV extends Car {
  drive(): void {
    this.engine.start();
    console.log("SUV drive");
  }
}

const gasSedan = new Sedan(new GasEngine());
const gasSUV = new SUV(new GasEngine());
const electricSedan = new Sedan(new ElectricEngine());
const electricSUV = new SUV(new ElectricEngine());

gasSedan.drive();
gasSUV.drive();
electricSedan.drive();
electricSUV.drive();
