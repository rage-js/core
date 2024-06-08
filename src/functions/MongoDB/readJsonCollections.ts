import { MongoClient } from "mongodb";
import formatLog from "../formatLog";
import path from "path";
import * as fs from "fs/promises";

/**
 * Reads the local json file to get the data and convert it into MongoDB feeable objects
 */
async function readJsonCollections(
  mongodbClient: MongoClient,
  dbs: string[],
  excludeCollections: string[],
  outDir: string
) {
  try {
    const actualPath = path.join(process.cwd(), outDir);

    dbs.forEach(async (dbName) => {
      const db = mongodbClient.db(dbName);
      const collections = await db.listCollections().toArray();

      for (const collection of collections) {
        const collectionName = collection.name;
        if (collectionName in excludeCollections) {
          // Skip
        } else {
          const fullPath = path.join(
            actualPath,
            `/${dbName}`,
            `/${collectionName}.json`
          );

          let data = await fs.readFile(fullPath, "utf-8");
          data = JSON.parse(data);

          return data;
        }
      }
    });
  } catch (error: any) {
    formatLog("Unexpected error occurred!", "error", true);
  }
}

export default readJsonCollections;
