import * as TYPES from "../env";
import * as fs from "fs";
import { MongoClient } from "mongodb";

/**
 * PushAfterInterval (PAI) is one of the methods on RAGE approach, where you can push the local data to the cloud database after every certain interval
 */

class PushAfterInterval {
  active: boolean;

  // Database specific properties

  constructor() {
    this.active = false;
  }

  async start() {
    this.active = true;

    /*
      Connect to MongoDB globally first and let it run till the application is closed. 
      Read MongoDB data and convert it into objects,
      Then convert it into JSON files
    */

    while (this.active) {
      // const db = this.mongodbClient!.db("test");
      // const collections = await db.listCollections().toArray();

      // const collectionData = [];
      // for (const collection of collections) {
      //   const collectionName = collection.name;
      //   const data = await db.collection(collectionName).find().toArray();
      //   collectionData.push({ name: collectionName, data });
      // }

      // console.log(collectionData);

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
