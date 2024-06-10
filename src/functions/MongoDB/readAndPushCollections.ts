import { MongoClient } from "mongodb";
import formatLog from "../formatLog";
import path from "path";
import * as fs from "fs/promises";
import chalk from "chalk";

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
  outDir: string,
  logger: boolean = false,
  finalPush: boolean = false
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

          let content: any;

          try {
            content = await fs.readFile(fullPath, "utf-8");
            if (content === "[]") {
              content = [];
            } else {
              content = JSON.parse(content);
            }

            // Empty the collection
            const c = db.collection(collectionName);
            await c.deleteMany({});

            content.forEach(async (document: any) => {
              c.insertOne(document).catch((error: any) => {
                formatLog(`Unexpected error occurred!`, "error", logger);
              });
            });

            if (!finalPush) {
              formatLog(
                `Pushing ${dbName}/${collectionName}.json`,
                "push",
                logger
              );
            } else {
              formatLog(
                `${chalk.red(
                  "(FINAL)"
                )} Pushing ${dbName}/${collectionName}.json`,
                "push",
                logger
              );
            }

            continue;
          } catch (error: any) {
            formatLog(
              `Error while trying read ${fullPath}, maybe the path doesn't exist.`,
              "error",
              logger
            );
          }
        }
      }
    });

    return;
  } catch (error: any) {
    formatLog("Unexpected error occurred!", "error", true);

    return;
  }
}

export default readAndPushCollections;
