interface DatabaseArgumentType {
  name: string;
  secretKey?: any;
}

interface AppArguments {
  method: "PushAfterInterval" | "PushOnUpdate" | "NoInterval";
  database: DatabaseArgumentType;
  interval?: number;
  outDir: string;
}

export { AppArguments, DatabaseArgumentType };
