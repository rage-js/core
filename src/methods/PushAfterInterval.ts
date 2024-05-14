import * as TYPES from "../env";
import * as fs from "fs";

/**
 * PushAfterInterval (PAI) is one of the methods on RAGE approach, where you can push the local data to the cloud database after every certain interval
 */

class PushAfterInterval {
  database: TYPES.DatabaseArgumentType;
  interval: number;
  outDir: string;
  active: boolean;

  constructor(
    database: TYPES.DatabaseArgumentType,
    interval: number,
    outDir: string
  ) {
    this.database = database;
    this.interval = interval;
    this.outDir = outDir;
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
      console.log(
        "The Database is " +
          this.database.name +
          "\nSecretKey: " +
          this.database.secretKey
      );

      /*
        Read JSON files and convert them into MongoDB data and then push it to MongoDB  
      */

      await new Promise((resolve) => setTimeout(resolve, this.interval));
    }
  }

  async stop() {
    this.active = false;
    console.log("End");
  }
}

export default PushAfterInterval;
