/**
 * Spams "Running" with the given interval
 */

class App {
  time: number;
  active: boolean;

  constructor(time: number) {
    this.time = time;
    this.active = false;
  }

  async start() {
    this.active = true;

    while (this.active) {
      console.log("Running");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  async stop() {
    this.active = false;
    console.log("End");
  }
}

export { App };
