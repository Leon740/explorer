type Problem = "electrical" | "engine" | "transmission";

// Problem
// A request may be handled by multiple potential handlers, but the sender should not be tightly coupled to a specific one.
class CarService {
  diagnose(problem: Problem): void {
    if (problem === "electrical") {
      console.log("Electrician handles the problem");
    } else if (problem === "engine") {
      console.log("Engine mechanic handles the problem");
    } else if (problem === "transmission") {
      console.log("Transmission mechanic handles the problem");
    } else {
      console.log("Unknown problem");
    }
  }
}

// Solution
// Organize handlers into a chain where each handler decides whether to process the request, pass it to the next handler, or stop propagation.
abstract class Mechanic {
  private next?: Mechanic;

  setNext(mechanic: Mechanic): Mechanic {
    this.next = mechanic;
    return mechanic;
  }

  handle(problem: string): void {
    if (this.next) {
      this.next.handle(problem);
    } else {
      console.log("No specialist available");
    }
  }
}

class Electrician extends Mechanic {
  override handle(problem: Problem): void {
    if (problem === "electrical") {
      console.log("Electrician handles the problem");
    } else {
      super.handle(problem);
    }
  }
}

class EngineMechanic extends Mechanic {
  override handle(problem: Problem): void {
    if (problem === "engine") {
      console.log("Engine mechanic handles the problem");
    } else {
      super.handle(problem);
    }
  }
}

class TransmissionMechanic extends Mechanic {
  override handle(problem: Problem): void {
    if (problem === "transmission") {
      console.log("Transmission mechanic handles the problem");
    } else {
      super.handle(problem);
    }
  }
}

const electrician = new Electrician();
const engineMechanic = new EngineMechanic();
const transmissionMechanic = new TransmissionMechanic();

electrician.setNext(engineMechanic).setNext(transmissionMechanic);
electrician.handle("transmission");
