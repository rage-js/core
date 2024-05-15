import * as fs from "fs";
import { writeJsonFilesArguments } from "./env";
import * as path from "path";

async function writeJsonFiles({
  dirPath,
  fileName,
  databaseName,
  dataToWrite,
}: writeJsonFilesArguments) {
  try {
    const folderPath = path.join(dirPath, databaseName);
    const finalFilePath = `${path.join(dirPath, databaseName, fileName)}.json`;
    const convertedJsonData = JSON.stringify(dataToWrite, null, 2);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Directory created: ${folderPath}`);
    }

    fs.writeFileSync(finalFilePath, convertedJsonData, "utf-8");

    return finalFilePath;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default writeJsonFiles;
