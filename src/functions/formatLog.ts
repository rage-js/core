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

    if (type === "config") {
      emoji = "⚙️";
    }
    if (type === "pull") {
      emoji = "↙️";
    }
    if (type === "push") {
      emoji = "↗️";
    }
    if (type === "warning") {
      emoji = "⚠️";
    }
    if (type === "error") {
      emoji = "🛑";
    }

    return `${emoji} ${chalk.bold(`[${getCurrentTime()}]`)} ${message}`;
  } catch (error: any) {
    console.log(
      `🛑 ${chalk.bold(`[${getCurrentTime()}]`)} Unexpected error occurred!`
    );
  }
}

export default formatLog;
