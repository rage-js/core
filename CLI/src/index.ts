#!/usr/bin/env node

import chalk from "chalk";
import * as inquirer from "@inquirer/prompts";

/**
 * Function that asks the user different set of questions and returns the given answers
 * @returns
 */
async function prompt() {
  try {
    return await inquirer.input({
      message: "Ready to dive in?",
    });
  } catch (error: any) {
    console.log(chalk.red(`\n${error.message}`));
  }
}

/**
 * Initial function that runs when the file is ran
 */
async function start() {
  await prompt();
}

start();
