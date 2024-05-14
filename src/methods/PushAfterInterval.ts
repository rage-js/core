import * as TYPES from "../env";
import * as fs from "fs";
import { MongoClient } from "mongodb";

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

      const collectionData = [];
      for (const collection of collections) {
        const collectionName = collection.name;
        if (
          collectionName in this.database.dbSpecificSettings.excludeCollections
        ) {
          const data = await db.collection(collectionName).find().toArray();
          collectionData.push({ name: collectionName, data });
        } else {
          // Skip
        }
      }

      console.log(collectionData);
    });

    while (this.active) {
      /*
        Read JSON files and convert them into MongoDB data and then push it to MongoDB  
      */

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  async stop() {
    this.active = false;
    console.log("End");
  }
}

export default PushAfterInterval;
