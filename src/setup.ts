#!/usr/bin/env node

import { input, select, Separator } from "@inquirer/prompts";

async function prompt() {
  try {
    // File setup related questions
    var dirPath = await input({ message: "Enter the directory path:" });
    dirPath = dirPath.toString();
    if (dirPath && dirPath !== "") {
      var moduleType = await select({
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

      // RAGE related questions
      var method = await select({
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
            disabled: "(Push On Update not supported yet)",
          },
          {
            name: "No Interval",
            value: "NI",
            description:
              "Visit this URL for docs: https://github.com/Maghish/RAGE?tab=readme-ov-file#no-interval-%EF%B8%8F",
            disabled: "(No Interval not supported yet)",
          },
        ],
      });

      return [dirPath, moduleType, method];
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
