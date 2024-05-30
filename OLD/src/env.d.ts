interface PushAfterIntervalArguments {
  interval: number;
  outDir: string;
  database: {
    type: "MongoDB";
    secretKey?: string;
    dbSpecificSettings: {
      dbs: string[];
      excludeCollections: string[];
    };
  };
}

interface writeJsonFilesArguments {
  dirPath: string;
  fileName: string;
  databaseName: string;
  dataToWrite: any[];
}

interface readJsonFilesArguments {
  dirPath: string;
  fileName: string;
  databaseName: string;
}

interface fetchAndWriteDBArguments {
  mongodbClient: any;
  configSettings: {
    dbs: string[];
    excludeCollections: string[];
  };
  outDir: string;
}

interface pushDataFromLocalArguments {
  mongodbClient: any;
  configSettings: {
    dbs: string[];
    excludeCollections: string[];
  };
  outDir: string;
}

export {
  PushAfterIntervalArguments,
  writeJsonFilesArguments,
  readJsonFilesArguments,
  fetchAndWriteDBArguments,
  pushDataFromLocalArguments,
};
