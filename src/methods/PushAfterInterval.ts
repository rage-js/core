import * as TYPES from "../env";
import getCurrentTime from "../util/getCurrentTime";
import readJsonFiles from "../util/readJsonFiles";
import fetchAndWriteDB from "../util/MongoDB/fetchAndWriteDB";
import { MongoClient, ObjectId } from "mongodb";
import pushDataFromLocal from "../util/MongoDB/pushDataFromLocal";

/**
 * PushAfterInterval (PAI) is one of the methods on RAGE approach,
 * where you can push the local data to the cloud database after every certain interval
 */

class PushAfterInterval {
  interval: number;
  outDir: string;
  database: {
    type: "MongoDB";
    secretKey?: string;
    dbSpecificSettings: {
      dbs: string[];
      excludeCollections: string[];
    };
  };
  active: boolean;

  // Database specific properties

  mongodbClient?: MongoClient;

  constructor({
    interval,
    outDir,
    database,
  }: TYPES.PushAfterIntervalArguments) {
    this.interval = interval;
    this.outDir = outDir;
    this.database = database;
    this.active = false;

    if (database.type === "MongoDB") {
      if (database.secretKey) {
        this.mongodbClient = new MongoClient(database.secretKey);
        this.mongodbClient.connect();
      } else {
        throw new Error("Secret key for the database is not provided");
      }
    }

    process.on("SIGINT", async () => {
      await this.stop();
    });
  }

  /**
   * Starts the instance
   */
  async start() {
    this.active = true;

    if (this.database.type === "MongoDB") {
      await fetchAndWriteDB({
        mongodbClient: this.mongodbClient!,
        configSettings: this.database.dbSpecificSettings,
        outDir: this.outDir,
      });
    }

    let firstIteration = true;
    while (this.active) {
      if (!firstIteration) {
        if (this.database.type === "MongoDB") {
          await pushDataFromLocal({
            mongodbClient: this.mongodbClient!,
            configSettings: this.database.dbSpecificSettings,
            outDir: this.outDir,
          });
        }
      } else {
        firstIteration = false;
      }

      await new Promise((resolve) => setTimeout(resolve, this.interval));
    }
  }

  /**
   * Terminates the instance
   */
  async stop() {
    this.active = false;
    try {
      let index = 0;
      this.database.dbSpecificSettings.dbs.forEach(async (dbName) => {
        const db = this.mongodbClient!.db(dbName);

        const collections = await db.listCollections().toArray();

        for (const collection of collections) {
          const collectionName = collection.name;
          if (
            collectionName in
            this.database.dbSpecificSettings.excludeCollections
          ) {
            // Skip
          } else {
            const res = await readJsonFiles({
              dirPath: this.outDir,
              fileName: collectionName,
              databaseName: dbName,
            });

            // Empty the collection
            const c = db.collection(collectionName);
            c.deleteMany({}).then(() => {
              // Insert all the documents in the collection
              res.forEach(async (document: any) => {
                c.insertOne(document).catch((error) => {
                  throw error;
                });
              });

              console.log(
                `↗️ |[${getCurrentTime()}]| Pushing ${dbName}/${collectionName}.json`
              );
              if (index === this.database.dbSpecificSettings.dbs.length) {
                console.log(
                  `⚙️ |[${getCurrentTime()}]| PushAfterInterval instance terminated.`
                );
                process.exit(0);
              } else {
                index++;
              }
            });
          }
        }
        index++;
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default PushAfterInterval;
