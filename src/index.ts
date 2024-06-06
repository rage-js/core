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
  private logger: boolean;

  /**
   * @param {string} configFilePath The path to the rage config file
   */
  constructor(configFilePath: string, logger: boolean = false) {
    this.configFilePath = configFilePath;
    this.applicationSetup = false;
    this.active = false;
    this.logger = logger;
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
        this.logger,
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
        formatLog(
          `${chalk.red(
            "The application is not setup yet! Please use"
          )} ${chalk.bold.green("setup()")} ${chalk.red(
            "first in order to configure the application."
          )}`,
          "error",
          this.logger
        );
      }
    } catch (error: any) {
      formatLog("Unexpected error occurred!", "error", this.logger);
    }
  }
}

export { App };
