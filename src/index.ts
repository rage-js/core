import * as fs from "fs";

import PushAfterInterval from "./methods/PushAfterInterval";

/**
 * Spams "Running" with the given interval
 */

class App {
  configPath: string;
  methodInstance: any;
  active: boolean;

  constructor(configPath: string) {
    this.configPath = configPath;
    this.active = false;

    try {
      const fileContent = fs.readFileSync(this.configPath, "utf-8");
      const configSettings = JSON.parse(fileContent);

      if (
        configSettings.method &&
        configSettings.method === "PushAfterInterval"
      ) {
        this.methodInstance = new PushAfterInterval(configSettings);
      }
    } catch (error: any) {
      if (error.code === "ENOENT") {
        throw new Error("Given config file path is not valid");
      } else {
        throw error;
      }
    }
  }

  async start() {
    try {
      this.active = true;
      console.log("Starting...");
    } catch (error) {
      console.error(error);
    }
  }

  async stop() {
    this.active = false;
    console.log("Stopping the App...");
  }
}

export { App };
