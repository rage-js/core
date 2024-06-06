import { MongoClient } from "mongodb";

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

  constructor(
    interval: number,
    databaseType: "MongoDB",
    outDir: string,
    dbs?: string[],
    excludeCollections?: string[],
    secretKey?: string
  ) {
    this.active = false;
    this.interval = interval;
    this.databaseType = databaseType;
    this.outDir = outDir;
    if (databaseType === "MongoDB") {
      this.dbs = dbs;
      this.excludeCollections = excludeCollections;
      if (secretKey) {
        this.mongodbClient = new MongoClient(secretKey);
        this.mongodbClient.connect();
      }
    }
  }

  async start() {
    try {
      this.active = true;
      while (this.active) {}
    } catch (error: any) {}
  }
  async stop() {}

  // Start the loop
  // Pull stuff on start
  // Push stuff later
  // Push on end and delete json files
  // Force stop the loop
}
