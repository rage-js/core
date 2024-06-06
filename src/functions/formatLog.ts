import chalk from "chalk";
import getCurrentTime from "./getCurrentTime";

/**
 * Formats the given string into a logger string
 * @param {string} message
 */
function formatLog(
  message: string,
  type: "config" | "pull" | "push" | "warning" | "error"
) {
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

    return `${emoji} ${chalk.bold(`[${getCurrentTime()}]`)} ${color(message)}`;
  } catch (error: any) {
    console.log(
      `🛑 ${chalk.bold(`[${getCurrentTime()}]`)} Unexpected error occurred!`
    );
  }
}

export default formatLog;
