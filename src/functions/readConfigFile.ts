import * as fs from "fs/promises";
import path from "path";
import formatLog from "./formatLog";
import { configurationType } from "../main";

/**
 * Reads the rage.config.file using the given path
 * @param {string} configFilePath
 * @param {boolean} logger
 * @returns {Promise<configurationType | false>}
 */
async function readConfigFile(
  configFilePath: string,
  logger: boolean
): Promise<configurationType | false> {
  try {
    const finalPath = path.join(process.cwd(), configFilePath);
    const data = await fs.readFile(finalPath, "utf-8");
    return JSON.parse(data);
  } catch (error: any) {
    formatLog("Failed to read the config file!", "error", logger);
    return false;
  }
}

export default readConfigFile;
