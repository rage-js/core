interface AppArguments {
  method: "PAI" | "POU" | "NI";
  database: "MongoDB";
  interval?: number;
}

export { AppArguments };
