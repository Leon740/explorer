// Problem
// Direct access to an object is undesirable due to business logic: access control etc.
// Solution
// Proxy: substitute object that implements same interface and controls access to the original object.

// Subject
interface EngineShape {
  start(): void;
}

// RealSubject
class Engine implements EngineShape {
  start(): void {
    console.log("Engine started");
  }
}

// Proxy
class EngineProxy implements Engine {
  private engine: Engine;
  private isAuthorized: boolean;
  constructor({
    engine,
    isAuthorized,
  }: {
    engine: Engine;
    isAuthorized: boolean;
  }) {
    this.engine = engine;
    this.isAuthorized = isAuthorized;
  }

  start(): void {
    if (!this.isAuthorized) {
      console.log("Access denied");
      return;
    }

    this.engine.start();
  }
}

// Client
const engine = new Engine();

const engineProxy_0 = new EngineProxy({ engine, isAuthorized: false });
engineProxy_0.start();

const engineProxy_1 = new EngineProxy({ engine, isAuthorized: true });
engineProxy_1.start();
