import * as TYPES from "./env";

import PushAfterInterval from "./methods/PushAfterInterval";

/**
 * Spams "Running" with the given interval
 */

class App {
  active: boolean;

  constructor() {
    this.active = false;
  }

  async start() {
    this.active = true;
    console.log("Starting...");
  }

  async stop() {
    this.active = false;
    console.log("Stopping the App...");
  }
}

export { App };
