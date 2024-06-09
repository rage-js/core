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
async function readJsonCollections(
  mongodbClient: MongoClient,
  dbs: string[],
  excludeCollections: string[],
  outDir: string
) {
  try {
    const actualPath = path.join(process.cwd(), outDir);

    let data: { [key: string]: any } = {};
    /*
      data: {
        database1: {
          collection1: [...]
          collection2: [...]
          collection3: [...]
        },
        database2: {
          collection1: [...]
          collection2: [...]
        }
      }
    */

    dbs.forEach(async (dbName) => {
      const db = mongodbClient.db(dbName);
      const collections = await db.listCollections().toArray();

      data[dbName] = {};

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
          content = JSON.parse(content);

          data[dbName][collectionName] = content;

          continue;
        }
      }
    });

    return data;
  } catch (error: any) {
    formatLog("Unexpected error occurred!", "error", true);
  }
}

export default readJsonCollections;
