interface DatabaseArgumentType {
  name: string;
  secretKey?: any;
}

interface AppArguments {
  method: "PAI" | "POU" | "NI";
  database: DatabaseArgumentType;
  interval?: number;
  outDir: string;
}

export { AppArguments, DatabaseArgumentType };
