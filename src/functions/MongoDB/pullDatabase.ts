import { MongoClient } from "mongodb";
import formatLog from "../formatLog";

/**
 * Pulls the database data and converts it into arrays and returns them
 * @param {MongoClient} mongodbClient
 * @param {string[]} dbs
 * @param {string[]} excludeCollections
 */
async function pullDatabase(
  mongodbClient: MongoClient,
  dbs: string[],
  excludeCollections: string[],
  logger: boolean = false
) {
  try {
  } catch (error: any) {
    formatLog("Unexpected error occurred!", "error", logger);
  }
}

export default pullDatabase;
