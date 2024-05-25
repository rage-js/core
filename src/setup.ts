#!/usr/bin/env node

interface promptFunctionReturnValues {
  dirPath: string;
  mainFile: string;
  moduleType: "commonjs" | "module";
  method: "PAI" | "POU" | "NI";
  interval?: number;
  databaseType: "MongoDB";
  databaseSecret?: string;
  mongodbDatabasedbs?: string[];
  mongodbDatabaseExcludeCollections?: string[];
  outDir: string;
}

import { input, select, Separator } from "@inquirer/prompts";

/**
 * Prompts different set of questions for the user to answer and return the user's answers.
 * @returns {promptFunctionReturnValues | undefined}
 */
async function prompt() {
  try {
    // Initialize with default values
    var returnValues: promptFunctionReturnValues = {
      dirPath: ".",
      mainFile: "index.js",
      moduleType: "commonjs",
      method: "PAI",
      interval: 600000,
      databaseType: "MongoDB",
      outDir: ".",
    };

    // File setup related questions
    var dirPath = await input({
      message:
        "Enter the directory path (Hit enter to proceed with default option):",
      default: ".",
    });
    dirPath = dirPath.toString();
    if (dirPath && dirPath !== "") {
      returnValues.dirPath = dirPath;

      var mainFile = await input({
        message:
          "Enter the main file name (Hit enter to proceed with default option):",
        default: "index.js",
      });
      if (mainFile && mainFile !== "") {
        returnValues.mainFile = mainFile;

        var moduleType: "commonjs" | "module" = await select({
          message: "Enter the package type:",
          choices: [
            {
              name: "commonjs",
              value: "commonjs",
            },
            {
              name: "module",
              value: "module",
            },
          ],
        });

        returnValues.moduleType = moduleType;

        // RAGE related questions
        var method: "PAI" | "POU" | "NI" = await select({
          message: "Enter which RAGE method to use for this project:",
          choices: [
            {
              name: "Push After Interval",
              value: "PAI",
              description:
                "Visit this URL for docs: https://github.com/Maghish/RAGE?tab=readme-ov-file#push-after-interval-%EF%B8%8F",
            },
            {
              name: "Push On Update",
              value: "POU",
              description:
                "Visit this URL for docs: https://github.com/Maghish/RAGE?tab=readme-ov-file#push-on-update-%EF%B8%8F",
              disabled: "(Not supported yet)",
            },
            {
              name: "No Interval",
              value: "NI",
              description:
                "Visit this URL for docs: https://github.com/Maghish/RAGE?tab=readme-ov-file#no-interval-%EF%B8%8F",
              disabled: "(Not supported yet)",
            },
          ],
        });

        returnValues.method = method;

        if (method === "PAI") {
          var interval = await input({
            message: "Set the interval (Enter in milliseconds):",
          });

          returnValues.interval = Number(interval);
        }

        var databaseType: "MongoDB" = await select({
          message: "Select the cloud database",
          choices: [
            {
              name: "MongoDB",
              value: "MongoDB",
            },
          ],
        });

        returnValues.databaseType = databaseType;

        if (databaseType === "MongoDB") {
          var databaseSecret: string = await input({
            message: "Enter the database secret key (MongoDB URI):",
          });
          returnValues.databaseSecret = databaseSecret;

          var mongodbDatabasedbs: string | string[] = await input({
            message:
              "Enter the whitelisted databases (Use ',' to seperate the values):",
          });

          mongodbDatabasedbs = mongodbDatabasedbs.split(",");
          mongodbDatabasedbs = mongodbDatabasedbs.map((e) => e.trim());

          returnValues.mongodbDatabasedbs = mongodbDatabasedbs;

          var mongodbDatabaseExcludeCollections: string | string[] =
            await input({
              message:
                "Enter the blacklisted collections in all databases (Mention the database of the collection, e.g. 'db/col') (Use ',' to seperate the values):",
            });

          mongodbDatabaseExcludeCollections =
            mongodbDatabaseExcludeCollections.split(",");
          mongodbDatabaseExcludeCollections =
            mongodbDatabaseExcludeCollections.map((e) => e.trim());

          returnValues.mongodbDatabaseExcludeCollections =
            mongodbDatabaseExcludeCollections;
        }

        return returnValues;
      } else {
        console.log("Please enter the file name properly and try again!");
        process.exit(1);
      }
    } else {
      console.log("Please enter the working directory properly and try again!");
      process.exit(1);
    }
  } catch (error: any) {
    if (error.code === "ExitPromptError") {
      console.log("Unexpected error occured!");
      process.exit(1);
    } else {
      console.log("Terminating process...");
      process.exit(1);
    }
  }
}

async function start() {
  const res = await prompt();
  console.log(res);
}

start();
