import { MongoClient } from "mongodb";
import formatLog from "../functions/formatLog";
import pullDatabase from "../functions/MongoDB/pullDatabase";
import readAndPushCollections from "../functions/MongoDB/readAndPushCollections";
import { parentPort, workerData } from "worker_threads";

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

  constructor() {
    const {
      logger,
      interval,
      databaseType,
      outDir,
      dbs,
      excludeCollections,
      secretKey,
    } = workerData;

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

    this.start();
  }

  /**
   * The start function which starts this method instance
   */
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

      let firstIteration = true;
      while (this.active) {
        if (!firstIteration) {
          await readAndPushCollections(
            this.mongodbClient,
            this.dbs!,
            this.excludeCollections!,
            this.outDir,
            this.logger
          );
        } else {
          firstIteration = false;
        }
        await new Promise((resolve) => setTimeout(resolve, this.interval));
      }
    } catch (error: any) {
      formatLog("Unexpected error occurred!", "error", this.logger);
    }
  }

  /**
   * The stop function which is called when the method instance should be terminated
   * @returns {Promise<any> | undefined}
   */
  async stop() {
    try {
      if (this.active === false) {
        formatLog(
          "The application is already inactive!",
          "warning",
          this.logger
        );
      } else {
        this.active = false;

        await readAndPushCollections(
          this.mongodbClient,
          this.dbs!,
          this.excludeCollections!,
          this.outDir,
          this.logger,
          true // Set this to final push mode
        );

        return new Promise((resolve) =>
          setTimeout(() => {
            formatLog("Terminating the method instance.", "error", this.logger);
            resolve(true);
          }, 3500)
        );
      }
    } catch (error: any) {
      formatLog("Unexpected error occurred!", "error", this.logger);
    }
  }
}

const methodInstance = new PushAfterInterval();

parentPort?.on("message", async (message) => {
  if (message.action === "stop") {
    await methodInstance.stop();
  }
});
