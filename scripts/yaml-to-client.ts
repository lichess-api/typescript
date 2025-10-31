import { z } from "zod";

import { SchemaSchema } from "./shared";

const Semver = z.string().brand("Semver");

const OpenApiSchemaInfo = z.object({
  version: Semver,
  title: z.string(),
  contact: z.object({
    name: z.string(),
    url: z.url(),
    email: z.email(),
  }),
  "x-logo": z.object({
    url: z.url(),
  }),
  license: z.object({
    name: z.string(),
    url: z.url(),
  }),
  description: z.string(),
});

const OpenApiSchemaPath = z.string().brand("OpenApiSchemaPath");

const OpenApiSchemaPaths = z.record(OpenApiSchemaPath, SchemaSchema);

const OpenApiSchemaComponents = z.object();

const OpenApiSchemaSchema = z.object({
  openapi: z.literal("3.1.0"),
  info: OpenApiSchemaInfo,
  servers: z.tuple([z.object({ url: z.literal("https://lichess.org") })]),
  tags: z.array(z.object({ name: z.string(), description: z.string() })),
  paths: OpenApiSchemaPaths,
  components: OpenApiSchemaComponents,
});

type OpenApiSchema = z.infer<typeof OpenApiSchemaSchema>;

function processTag(tagSchema) {}

function processSchema(schema: OpenApiSchema) {
  const tagsDir = "specs/tags" as const;
  const clientDir = "src/client" as const;

  const API_URL = schema.servers[0].url;

  const clientCodeTs = `import * as z from "zod";

import * as schemas from "~/schemas";

import { Requestor } from "./requestor";

export const BASE_URL = "${API_URL}";
type BASE_URL = typeof BASE_URL;

export class Lichess {
  private readonly requestor: Requestor<BASE_URL>;

  constructor({ token }: { token: string }) {
    this.requestor = new Requestor({ token, baseUrl: BASE_URL });
  }

  /* methods */
}
` as const;

  const clientCodePath = `${clientDir}/index.ts` as const;

  Bun.write(clientCodePath, clientCodeTs);

  console.log(schema.paths);
}

async function main() {
  const filePath = "specs/lichess-api.yaml" as const;
  const yamlStr = await Bun.file(filePath).text();
  const yamlContent = Bun.YAML.parse(yamlStr);
  const parsedSchema = OpenApiSchemaSchema.parse(yamlContent);
  processSchema(parsedSchema);
}

await main();
