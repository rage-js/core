import readConfigFile from "./functions/readConfigFile";
import chalk from "chalk";
import PushAfterInterval from "./methods/PushAfterInterval";
import formatLog from "./functions/formatLog";

/**
 * The core application
 */
class App {
  private configFilePath: string;

  // @ts-ignore
  private method: "PAI";
  // @ts-ignore
  private databaseType: "MongoDB";
  // @ts-ignore
  private outDir: string;

  private interval?: number;
  private secretKey?: string;
  private dbs?: string[];
  private excludeCollections?: string[];

  private active: boolean;
  private applicationSetup: boolean;
  private methodInstance: PushAfterInterval | undefined;

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

      this.methodInstance = new PushAfterInterval(
        this.interval!,
        this.databaseType,
        this.outDir,
        this.dbs,
        this.excludeCollections,
        this.secretKey
      );

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
        await this.methodInstance!.start();
      } else {
        console.log(
          formatLog(
            `${chalk.red(
              "The application is not setup yet! Please use"
            )} ${chalk.bold.green("setup()")} ${chalk.red(
              "first in order to configure the application."
            )}`,
            "error"
          )
        );
      }
    } catch (error: any) {
      console.log(formatLog("Unexpected error occurred!", "error"));
    }
  }
}

export { App };
