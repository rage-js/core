import readConfigFile from "./functions/readConfigFile";
import { configurationType } from "./main";

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

  /**
   * @param {string} configFilePath The path to the rage config file
   */
  constructor(configFilePath: string) {
    this.configFilePath = configFilePath;
    const readFiles = async () => {
      const data = await readConfigFile(configFilePath);
      if (data) {
        this.method = data.method;
        this.databaseType = data.databaseType;
        this.outDir = data.outDir;
        this.interval = data.methodSpecificSettings.interval;
        this.secretKey = data.databaseSpecificSettings.secretKey;
        this.dbs = data.databaseSpecificSettings.dbs;
        this.excludeCollections =
          data.databaseSpecificSettings.excludeCollections;
      }

      return;
    };

    readFiles();
  }

  async start() {
    console.log(this.configFilePath);
    console.log(this.method);
    console.log(this.interval);
    console.log(this.databaseType);
    console.log(this.dbs);
    console.log(this.excludeCollections);
    console.log(this.outDir);
  }
}

export { App };
