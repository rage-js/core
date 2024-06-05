import readConfigFile from "./functions/readConfigFile";
import { configurationType } from "./main";
import chalk from "chalk";

/**
 * The core application
 */
class App {
  configFilePath: string;

  // @ts-ignore
  method: "PAI";
  // @ts-ignore
  databaseType: "MongoDB";
  // @ts-ignore
  outDir: string;

  interval?: number;
  secretKey?: string;
  dbs?: string[];
  excludeCollections?: string[];

  active: boolean;
  applicationSetup: boolean;

  /**
   * @param {string} configFilePath The path to the rage config file
   */
  constructor(configFilePath: string) {
    this.configFilePath = configFilePath;
    this.applicationSetup = false;
    this.active = false;
  }

  /**
   * Function that should be ran before the start function to read and setup the application configuration
   * @returns {boolean}
   */
  async setup() {
    const data = await readConfigFile(this.configFilePath);
    if (data !== false) {
      this.method = data.method;
      this.interval = data.methodSpecificSettings.interval;
      this.databaseType = data.databaseType;
      this.dbs = data.databaseSpecificSettings.dbs;
      this.excludeCollections =
        data.databaseSpecificSettings.excludeCollections;
      this.secretKey = data.databaseSpecificSettings.secretKey;
      this.outDir = data.outDir;

      this.applicationSetup = true;

      return true;
    } else {
      this.applicationSetup = false;
      return false;
    }
  }

  /**
   * The start function which ignites the method instnace
   */
  async start() {
    try {
      if (this.applicationSetup) {
        this.active = true;
        // console.log(this.configFilePath);
        // console.log(this.method);
        // console.log(this.interval);
        // console.log(this.databaseType);
        // console.log(this.dbs);
        // console.log(this.excludeCollections);
        // console.log(this.secretKey);
        // console.log(this.outDir);
      } else {
        console.log(
          chalk.red("[!] The application is not setup yet! Please use"),
          chalk.bold.green("setup()"),
          chalk.red("first in order to configure the application.")
        );
      }
    } catch (error: any) {
      console.log(chalk.red("[!] Unexpected error occurred!"));
    }
  }
}

export { App };
