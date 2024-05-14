interface AppArguments {
  method: "PAI" | "POC" | "NI";
  database: "MongoDB";
  interval?: number;
}

export { AppArguments };
