import * as fs from "fs";
import { writeJsonFilesArguments } from "../env";
import * as path from "path";
import getCurrentTime from "./getCurrentTime";

/**
 * Writes JSON files with the given data in the given directory
 */
async function writeJsonFiles({
  dirPath,
  fileName,
  databaseName,
  dataToWrite,
}: writeJsonFilesArguments) {
  try {
    const folderPath = path.join(dirPath, databaseName);
    const finalFilePath = `${path.join(dirPath, databaseName, fileName)}.json`;
    let newlyUpdatedData = [];
    dataToWrite.forEach((document: any) => {
      if (document.id) {
        newlyUpdatedData.push(document);
      } else {
        document.id = document._id.toString();
        delete document._id;
        newlyUpdatedData.push(document);
      }
    });
    const convertedJsonData = JSON.stringify(dataToWrite, null, 2);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(
        `⚙️ |[${getCurrentTime()}]| Directory created: ${folderPath}`
      );
    }

    fs.writeFileSync(finalFilePath, convertedJsonData, "utf-8");

    return finalFilePath;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default writeJsonFiles;
