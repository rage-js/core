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
  methodInstance: any; // Method class instance

  constructor({ method, database, interval, outDir }: TYPES.AppArguments) {
    if (method === "PushAfterInterval") {
      this.interval = interval;
      this.methodInstance = new PushAfterInterval(database, interval!, outDir);
    }

    this.method = method;
    this.database = database;
    this.outDir = outDir;
    this.active = false;
  }

  async start() {
    this.active = true;
    console.log("Starting...");
    await this.methodInstance.start();
  }

  async stop() {
    this.active = false;
    console.log("Stopping the App...");
    await this.methodInstance.stop();
  }
}

export { App };
