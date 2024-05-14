import { AppArguments } from "./env";

import PAI from "./methods/PAI";

/**
 * Spams "Running" with the given interval
 */
class App {
  method: string;
  database: string;
  interval?: number;
  active: boolean;

  constructor({ method, database, interval }: AppArguments) {
    if (method === "PAI") {
      this.interval = interval;
    }

    this.method = method;
    this.database = database;
    this.active = false;
  }

  async start() {
    if (this.method === "PAI") {
      const newInstance = new PAI(this.interval!);
      await newInstance.start();
    }
  }

  async stop() {
    this.active = false;
    console.log("Stopping the App...");
  }
}

export { App };
