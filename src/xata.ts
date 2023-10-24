// Generated by Xata Codegen 0.26.7. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "prospect",
    columns: [
      { name: "first", type: "string" },
      { name: "last", type: "string" },
      { name: "email", type: "email" },
      { name: "phone", type: "string" },
      { name: "difficulty", type: "text" },
      { name: "injury", type: "text" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Prospect = InferredTypes["prospect"];
export type ProspectRecord = Prospect & XataRecord;

export type DatabaseSchema = {
  prospect: ProspectRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://main-sv67m5.us-west-2.xata.sh/db/muv-collective",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
