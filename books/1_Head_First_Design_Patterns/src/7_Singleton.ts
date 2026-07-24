// SINGLETON PATTERN: Airport Control Tower
//
// Problem:
// Every aircraft must coordinate through the same runway state.
// If each aircraft created its own control tower, every tower could believe
// that the runway was available and issue conflicting instructions.
//
// Singleton solution:
// AirportControlTower allows only one instance to exist and gives every
// aircraft access to that same instance through getInstance().

type FlightOperation = "landing" | "takeoff";

interface FlightRequest {
  readonly flightNumber: string;
  readonly operation: FlightOperation;
}

// SINGLETON
//
// This class owns the shared runway state for the entire application.
class AirportControlTower {
  // The one shared instance belongs to the class, not to an individual object.
  private static instance: AirportControlTower | undefined;

  private activeRequest: FlightRequest | undefined;
  private readonly requestsQueue: FlightRequest[] = [];

  // A private constructor prevents outside code from doing this:
  //
  // new AirportControlTower()
  //
  // Only AirportControlTower itself can create an instance.
  private constructor() {
    console.log("Control tower is online.");
  }

  // GLOBAL ACCESS POINT
  //
  // The first call creates the instance.
  // Every later call returns exactly the same instance.
  static getInstance(): AirportControlTower {
    AirportControlTower.instance ??= new AirportControlTower();
    return AirportControlTower.instance;
  }

  private clearForOperation(request: FlightRequest): void {
    this.activeRequest = request;

    console.log(`${request.flightNumber} is cleared for ${request.operation}.`);
  }

  private processNextRequest(): void {
    const nextRequest = this.requestsQueue.shift();

    if (nextRequest) {
      this.clearForOperation(nextRequest);
    }
  }

  requestRunway(request: FlightRequest): void {
    if (!this.activeRequest) {
      this.clearForOperation(request);
      return;
    }

    this.requestsQueue.push(request);

    console.log(
      `${request.flightNumber} must wait to ${request.operation}. Runway is being used by ${this.activeRequest.flightNumber}`,
    );
  }

  completeOperation(flightNumber: string): void {
    if (!this.activeRequest) {
      console.log(`No active runway operation for ${flightNumber} to complete`);
      return;
    }

    if (this.activeRequest.flightNumber !== flightNumber) {
      console.log(
        `${flightNumber} cannot release the runway because ` +
          `${this.activeRequest.flightNumber} is using it.`,
      );
      return;
    }

    console.log(
      `${flightNumber} completed ${this.activeRequest.operation}. ` +
        "Runway is available.",
    );

    this.activeRequest = undefined;
    this.processNextRequest();
  }
}

// CLIENT
//
// Every Aircraft asks for the Singleton control tower.
// They do not create independent control towers.
class Aircraft {
  private readonly controlTower = AirportControlTower.getInstance();

  constructor(public readonly flightNumber: string) {}

  requestLanding(): void {
    this.controlTower.requestRunway({
      flightNumber: this.flightNumber,
      operation: "landing",
    });
  }

  requestTakeoff(): void {
    this.controlTower.requestRunway({
      flightNumber: this.flightNumber,
      operation: "takeoff",
    });
  }

  completeOperation(): void {
    this.controlTower.completeOperation(this.flightNumber);
  }
}

// CLIENT CODE
const towerA = AirportControlTower.getInstance();
const towerB = AirportControlTower.getInstance();

console.log("Both references point to one tower:", towerA === towerB);

const flight101 = new Aircraft("AA101");
const flight202 = new Aircraft("UA202");
const flight303 = new Aircraft("DL303");

// AA101 receives the runway immediately.
flight101.requestLanding();

// The runway is occupied, so these requests enter one shared queue.
flight202.requestTakeoff();
flight303.requestLanding();

// Finishing one operation automatically clears the next aircraft.
flight101.completeOperation();
flight202.completeOperation();
flight303.completeOperation();

/*
Expected output:

Control tower is online.
Both references point to one tower: true
AA101 is cleared for landing.
UA202 must wait to takeoff. Runway is being used by AA101.
DL303 must wait to landing. Runway is being used by AA101.
AA101 completed landing. Runway is available.
UA202 is cleared for takeoff.
UA202 completed takeoff. Runway is available.
DL303 is cleared for landing.
DL303 completed landing. Runway is available.
*/
