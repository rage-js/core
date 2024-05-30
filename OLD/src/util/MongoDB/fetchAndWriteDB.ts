import { fetchAndWriteDBArguments } from "../../env";
import getCurrentTime from "../getCurrentTime";
import writeJsonFiles from "../writeJsonFiles";

/**
 * Reads MongoDB data and converts it into objects, later turning it into JSON files
 */
async function fetchAndWriteDB({
  mongodbClient,
  configSettings,
  outDir,
}: fetchAndWriteDBArguments) {
  configSettings.dbs.forEach(async (dbName) => {
    const db = mongodbClient.db(dbName);
    const collections = await db.listCollections().toArray();

    for (const collection of collections) {
      const collectionName = collection.name;
      if (collectionName in configSettings.excludeCollections) {
        // Skip
      } else {
        const data = await db.collection(collectionName).find().toArray();
        const res = await writeJsonFiles({
          dirPath: outDir,
          fileName: collectionName,
          databaseName: dbName,
          dataToWrite: data,
        });

        if (res !== false) {
          console.log(
            `↙️ |[${getCurrentTime()}]| Fetching ${dbName}.${collectionName} => ${res}`
          );
        }
      }
    }
  });
}

export default fetchAndWriteDB;
