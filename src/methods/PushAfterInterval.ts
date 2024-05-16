import * as TYPES from "../env";
import getCurrentTime from "../util/getCurrentTime";
import readJsonFiles from "../util/readJsonFiles";
import writeJsonFiles from "../util/writeJsonFiles";
import { MongoClient, ObjectId } from "mongodb";

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
  }

  /**
   * Starts the instance
   */
  async start() {
    this.active = true;

    /*
      Connect to MongoDB globally first and let it run till the application is closed. 
      Read MongoDB data and convert it into objects,
      Then convert it into JSON files
    */

    this.database.dbSpecificSettings.dbs.forEach(async (dbName) => {
      const db = this.mongodbClient!.db(dbName);
      const collections = await db.listCollections().toArray();

      for (const collection of collections) {
        const collectionName = collection.name;
        if (
          collectionName in this.database.dbSpecificSettings.excludeCollections
        ) {
          // Skip
        } else {
          const data = await db.collection(collectionName).find().toArray();
          const res = await writeJsonFiles({
            dirPath: this.outDir,
            fileName: collectionName,
            databaseName: dbName,
            dataToWrite: data,
          });

          if (res !== false) {
            console.log(
              `↙️ |[${getCurrentTime()}]| Fetching ${dbName}.${collectionName} => ${res}`
            );
          }
        }
      }
    });

    let firstIteration = true;
    while (this.active) {
      /*
        Read JSON files and convert them into MongoDB data and then push it to MongoDB  
      */

      if (!firstIteration) {
        this.database.dbSpecificSettings.dbs.forEach((dbName) => {
          const db = this.mongodbClient!.db(dbName);
          db.listCollections()
            .toArray()
            .then(async (collections) => {
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
                  });
                }
              }
            });
        });
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
    console.log(
      `⚙️ |[${getCurrentTime()}]| PushAfterInterval instance terminated.`
    );
  }
}

export default PushAfterInterval;
