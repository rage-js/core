import { pushDataFromLocalArguments } from "../../env";
import getCurrentTime from "../getCurrentTime";
import readJsonFiles from "../readJsonFiles";

/**
 * Pushes the local JSON data back to the connected MongoDB database
 */
async function pushDataFromLocal({
  mongodbClient,
  configSettings,
  outDir,
}: pushDataFromLocalArguments) {
  configSettings.dbs.forEach((dbName) => {
    const db = mongodbClient.db(dbName);
    db.listCollections()
      .toArray()
      .then(async (collections: any) => {
        for (const collection of collections) {
          const collectionName = collection.name;
          if (collectionName in configSettings.excludeCollections) {
            // Skip
          } else {
            const res = await readJsonFiles({
              dirPath: outDir,
              fileName: collectionName,
              databaseName: dbName,
            });

            // Empty the collection
            const c = db.collection(collectionName);
            c.deleteMany({}).then(() => {
              // Insert all the documents in the collection
              res.forEach(async (document: any) => {
                c.insertOne(document).catch((error: any) => {
                  throw error;
                });
              });

              console.log(
                `↗️ |[${getCurrentTime()}]| Pushing ${dbName}/${collectionName}.json`
              );
            });
          }
        }
      });
  });
}

export default pushDataFromLocal;
