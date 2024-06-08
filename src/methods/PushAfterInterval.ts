import { MongoClient } from "mongodb";
import formatLog from "../functions/formatLog";
import pullDatabase from "../functions/MongoDB/pullDatabase";

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
      this.dbs = dbs ? dbs : [];
      this.excludeCollections = excludeCollections ? excludeCollections : [];
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

      await pullDatabase(
        this.mongodbClient,
        this.dbs!,
        this.excludeCollections!,
        this.outDir,
        this.logger
      );

      while (this.active) {
        // Read and push
        await new Promise((resolve) => setTimeout(resolve, this.interval));
      }
    } catch (error: any) {
      formatLog("Unexpected error occurred!", "error", this.logger);
    }
  }
  async stop() {
    try {
      this.active = false;
      // Push one last time
      formatLog("Terminating the method instance.", "error", this.logger);
    } catch (error: any) {
      formatLog("Unexpected error occurred!", "error", this.logger);
    }
  }
}

export default PushAfterInterval;
