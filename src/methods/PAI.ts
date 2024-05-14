/**
 * PushAfterInterval (PAI) is one of the methods on RAGE approach, where you can push the local data to the cloud database after every certain interval
 */

class PAI {
  interval: number;
  active: boolean;

  constructor(interval: number) {
    this.interval = interval;
    this.active = false;
  }

  async start() {
    this.active = true;

    while (this.active) {
      console.log("Running");
      await new Promise((resolve) => setTimeout(resolve, this.interval));
    }
  }

  async stop() {
    this.active = false;
    console.log("End");
  }
}

export default PAI;
