import * as TYPES from "./env";

import PushAfterInterval from "./methods/PushAfterInterval";

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
    if (method === "PushAfterInterval") {
      this.interval = interval;
    }

    this.method = method;
    this.database = database;
    this.outDir = outDir;
    this.active = false;
  }

  async start() {
    if (this.method === "PushAfterInterval") {
      const newInstance = new PushAfterInterval(this.database, this.interval!);
      await newInstance.start();
    }
  }

  async stop() {
    this.active = false;
    console.log("Stopping the App...");
  }
}

export { App };
