import * as fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { configurationType } from "../main";

/**
 * Reads the rage.config.file using the given path
 * @param {string} configFilePath
 * @returns {Promise<configurationType | false>}
 */
async function readConfigFile(
  configFilePath: string
): Promise<configurationType | false> {
  try {
    const finalPath = path.join(process.cwd(), configFilePath);
    const data = await fs.readFile(finalPath, "utf-8");
    return JSON.parse(data);
  } catch (error: any) {
    console.log(chalk.red(`[!] Failed to read the file "${configFilePath}"`));
    return false;
  }
}

export default readConfigFile;
