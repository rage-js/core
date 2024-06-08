import chalk from "chalk";
import getCurrentTime from "./getCurrentTime";

/**
 * Formats the given message and logs it in the console.
 * @param {string} message
 */
function formatLog(
  message: string,
  type: "config" | "pull" | "push" | "warning" | "error",
  logger: boolean
) {
  if (logger) {
    try {
      let emoji = "⚙️";
      let color = chalk.white;

      if (type === "config") {
        emoji = "⚙️";
        color = chalk.white;
      }
      if (type === "pull") {
        emoji = "↙️";
        color = chalk.white;
      }
      if (type === "push") {
        emoji = "↗️";
        color = chalk.white;
      }
      if (type === "warning") {
        emoji = "⚠️";
        color = chalk.yellow;
      }
      if (type === "error") {
        emoji = "🛑";
        color = chalk.red;
      }

      console.log(
        `${emoji} ${chalk.bold(`[${getCurrentTime()}]`)} ${color(message)}`
      );

      return;
    } catch (error: any) {
      console.log(
        `🛑 ${chalk.bold(`[${getCurrentTime()}]`)} Unexpected error occurred!`
      );

      return;
    }
  } else return;
}

export default formatLog;
