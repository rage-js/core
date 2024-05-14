import * as TYPES from "../env";

/**
 * PushAfterInterval (PAI) is one of the methods on RAGE approach, where you can push the local data to the cloud database after every certain interval
 */

class PushAfterInterval {
  database: TYPES.DatabaseArgumentType;
  interval: number;
  active: boolean;

  constructor(database: TYPES.DatabaseArgumentType, interval: number) {
    this.database = database;
    this.interval = interval;
    this.active = false;
  }

  async start() {
    this.active = true;

    while (this.active) {
      console.log(
        "The Database is " +
          this.database.name +
          "\nSecretKey: " +
          this.database.secretKey
      );
      await new Promise((resolve) => setTimeout(resolve, this.interval));
    }
  }

  async stop() {
    this.active = false;
    console.log("End");
  }
}

export default PushAfterInterval;
