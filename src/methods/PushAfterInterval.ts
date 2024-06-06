import { MongoClient } from "mongodb";
import formatLog from "../functions/formatLog";

/**
 * The class which simulates the Push After Interval method
 */
class PushAfterInterval {
  active: boolean;
  interval: number;
  databaseType: "MongoDB";
  dbs?: string[];
  excludeCollections?: string[];
  secretKey?: string;
  outDir: string;
  mongodbClient?: any;
  logger: boolean;

  constructor(
    interval: number,
    databaseType: "MongoDB",
    outDir: string,
    logger: boolean,
    dbs?: string[],
    excludeCollections?: string[],
    secretKey?: string
  ) {
    this.active = false;
    this.logger = logger;
    this.interval = interval;
    this.databaseType = databaseType;
    this.outDir = outDir;
    if (databaseType === "MongoDB") {
      this.dbs = dbs;
      this.excludeCollections = excludeCollections;
      if (secretKey) {
        try {
          this.mongodbClient = new MongoClient(secretKey);
          this.mongodbClient.connect();
          formatLog("Connected to MongoDB Client", "config", this.logger);
        } catch (error) {
          formatLog(
            "Unable to connect to MongoDB Client",
            "error",
            this.logger
          );
        }
      }
    }
  }

  async start() {
    try {
      this.active = true;
      while (this.active) {}
    } catch (error: any) {
      formatLog("Unexpected error occurred!", "error", this.logger);
    }
  }
  async stop() {}

  // Start the loop
  // Pull stuff on start
  // Push stuff later
  // Push on end and delete json files
  // Force stop the loop
}

export default PushAfterInterval;
