interface configurationType {
  method: "PAI" | "NI";
  methodSpecificSettings: {
    // Push After Interval
    interval?: number;
  };
  databaseType: "MongoDB";
  databaseSpecificSettings: {
    // MongoDB
    secretKey?: string;
    dbs?: string[];
    excludeCollections?: string[];
  };
  outDir: string;
  fetchOnFirst?: boolean;
}

export { configurationType };
