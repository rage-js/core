import { MongoClient } from "mongodb";
import formatLog from "../formatLog";
import path from "path";
import * as fs from "fs/promises";

/**
 * Reads the local json file to get the data and convert it into MongoDB feeable objects
 * @param {MongoClient} mongodbClient
 * @param {dbs} dbs
 * @param {excludeCollections} excludeCollections
 * @param {string} outDir
 */
async function readAndPushCollections(
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

          let content = await fs.readFile(fullPath, "utf-8");
          console.log(content);

          // Empty the collection
          // const c = db.collection(collectionName);
          // await c.deleteMany({});

          continue;
        }
      }
    });
  } catch (error: any) {
    formatLog("Unexpected error occurred!", "error", true);
  }
}

export default readAndPushCollections;
