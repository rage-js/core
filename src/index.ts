import * as TYPES from "./env";

import PAI from "./methods/PAI";

/**
 * Spams "Running" with the given interval
 */
class App {
  method: string;
  database: TYPES.DatabaseArgumentType;
  interval?: number;
  outDir: string;
  active: boolean;

  constructor({ method, database, interval, outDir }: TYPES.AppArguments) {
    if (method === "PAI") {
      this.interval = interval;
    }

    this.method = method;
    this.database = database;
    this.outDir = outDir;
    this.active = false;
  }

  async start() {
    if (this.method === "PAI") {
      const newInstance = new PAI(this.database, this.interval!);
      await newInstance.start();
    }
  }

  async stop() {
    this.active = false;
    console.log("Stopping the App...");
  }
}

export { App };
