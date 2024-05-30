import * as fs from "fs";
import { readJsonFilesArguments } from "../env";
import path from "path";

/**
 * Reads the given JSON files and returns a converted object of the JSON file content
 */
async function readJsonFiles({
  dirPath,
  fileName,
  databaseName,
}: readJsonFilesArguments) {
  try {
    const finalFilePath = `${path.join(dirPath, databaseName, fileName)}.json`;
    const fileContent = fs.readFileSync(finalFilePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default readJsonFiles;
