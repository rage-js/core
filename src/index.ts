import * as fs from "fs";

import PushAfterInterval from "./methods/PushAfterInterval";
import getCurrentTime from "./util/getCurrentTime";

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
        this.methodInstance = new PushAfterInterval({
          interval: configSettings.methodSpecificSettings.interval,
          outDir: configSettings.outDir,
          database: configSettings.database,
        });
      }
    } catch (error: any) {
      if (error.code === "ENOENT") {
        throw new Error("Given config file path is not valid");
      } else {
        throw error;
      }
    }

    process.on("SIGINT" || "exit", async () => {
      await this.methodInstance.stop(true);
    });
  }

  /**
   * Starts the application
   */
  async start() {
    try {
      this.active = true;
      console.log(`⚙️ |[${getCurrentTime()}]| Starting...`);
      await this.methodInstance.start();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Stops the application
   */
  async stop() {
    try {
      this.active = false;
      await this.methodInstance.stop(false);
    } catch (error) {
      console.error(error);
    }
  }
}

export { App };
