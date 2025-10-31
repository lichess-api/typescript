import { z } from "zod";

import { SchemaSchemaRef, SchemaSchema, convertToZod } from "./shared";

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

const OpenApiSchemaPaths = z.record(OpenApiSchemaPath, SchemaSchemaRef);

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

const AccessTokenScopeSchemaRead = z.literal([
  "email:read",
  "preference:read",
  "challenge:read",
  "puzzle:read",
  "follow:read",
  "team:read",
  "study:read",
  "engine:read",
]);

const AccessTokenScopeSchemaWrite = z.literal([
  "preference:write",
  "challenge:write",
  "tournament:write",
  "puzzle:write",
  "racer:write",
  "follow:write",
  "msg:write",
  "team:write",
  "study:write",
  "engine:write",
]);

const AccessTokenScopeSchema = z.union([
  AccessTokenScopeSchemaRead,
  AccessTokenScopeSchemaWrite,
  z.literal(["team:lead", "challenge:bulk", "bot:play", "board:play"]),
]);

const OAuth2Scope = z.union([AccessTokenScopeSchema, z.literal(["web:mod"])]);

const OAuth2Schema = z.tuple([z.object({ OAuth2: z.array(OAuth2Scope) })]);

const SecuritySchema = z.union([z.array(AccessTokenScopeSchema), OAuth2Schema]);

const ResponseStatus = z.coerce.number<string>();

const StringJsonRef = z
  .string()
  .refine((str) => str.endsWith(".json"))
  .brand("StringJsonRef");

const SchemaSchemaExampleRef = z
  .object({ $ref: StringJsonRef })
  .strict()
  .transform((s) => ({ ...s, __schema: "$ref" as const }));

const ResponseContentBase = z.object({
  schema: SchemaSchema,
  example: SchemaSchemaExampleRef.optional(),
  examples: z.record(z.string(), SchemaSchemaRef).optional(),
});

const ResponseContextPlainText = ResponseContentBase.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "text" }));

const ResponseContentJson = ResponseContentBase.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "json" }));

const ResponseContentNdjson = ResponseContentBase.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "ndjson" }));

const ResponseContentChessPgn = ResponseContentBase.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "chess-pgn" }));

const ResponseContent = z
  .object({
    "text/plain": ResponseContextPlainText.optional(),
    "application/json": ResponseContentJson.optional(),
    "application/vnd.lichess.v3+json": ResponseContentJson.optional(),
    "application/x-chess-pgn": ResponseContentChessPgn.optional(),
    "application/x-ndjson": ResponseContentNdjson.optional(),
  })
  .strict();

const ResponseSchema = z
  .object({
    description: z.string(),
    headers: z.object({}).optional(),
    content: ResponseContent.optional(),
  })
  .strict();

const BaseTagSchemaOperation = z.object({
  operationId: z.string(),
  summary: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  security: SecuritySchema,
  parameters: z.array(z.object({})).optional(),
  responses: z.record(ResponseStatus, ResponseSchema),
});

const TagSchemaSchemaGet = BaseTagSchemaOperation.extend({})
  .strict()
  .transform((s) => ({ ...s, __method: "get" as const }));

const TagSchemaSchemaPost = BaseTagSchemaOperation.extend({
  requestBody: z.object().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __method: "post" as const }));

const TagSchemaSchema = z.object({
  get: TagSchemaSchemaGet.optional(),
  post: TagSchemaSchemaPost.optional(),
});
type TagSchema = z.infer<typeof TagSchemaSchema>;

function processTag(tagSchema: TagSchema, rawApiPath: string) {
  const methodsCode: string[] = [];
  return;
  for (const operation of Object.values(tagSchema)) {
    const operationId = operation.operationId;
    const summary = operation.summary || "";
    const description = operation.description || "";

    // JSDoc
    let jsdoc = "/**\n * " + summary.replace(/\n/g, "\n * ") + "\n";
    if (description) {
      const descLines = description.split("\n").map((line) =>
        line
          .trim()
          .replace(/^\|\s*/, "")
          .replace(/^- /, "- ")
      );
      jsdoc += descLines.map((line) => " * " + line).join("\n") + "\n";
    }
    jsdoc += " */\n";

    // Parameters
    const allParams = operation.parameters || [];
    const pathParams = allParams.filter((p) => p.in === "path");
    const queryParams = allParams.filter((p) => p.in === "query");
    const requestBody = operation.requestBody;

    // Destructure names and type props
    const destrNames: string[] = [];
    const typeProps: string[] = [];

    // Path params
    let pathParamsType = "";
    if (pathParams.length > 0) {
      const propStrs = pathParams
        .map((p) => {
          const { zodSchema } = convertToZod(p.schema, "schemas.");
          return `"${p.name}": ${zodSchema}`;
        })
        .join(",\n    ");
      const pathParamsZod = `z.object({\n    ${propStrs}\n  })`;
      pathParamsType = `pathParams: z.infer<typeof ${pathParamsZod}>`;
      destrNames.push("pathParams");
      typeProps.push(pathParamsType);
    }

    // Query params
    let queryType = "";
    if (queryParams.length > 0) {
      const propStrs = queryParams
        .map((p) => {
          const { zodSchema } = convertToZod(p.schema, "schemas.");
          return `"${p.name}": ${zodSchema}`;
        })
        .join(",\n    ");
      const queryZod = `z.object({\n    ${propStrs}\n  })`;
      queryType = `query: z.infer<typeof ${queryZod}>`;
      destrNames.push("query");
      typeProps.push(queryType);
    }

    // Body
    let bodyType = "";
    if (requestBody?.content?.["application/json"]) {
      const { zodSchema } = convertToZod(
        requestBody.content["application/json"].schema,
        "schemas."
      );
      bodyType = `body: z.infer<typeof ${zodSchema}>`;
      destrNames.push("body");
      typeProps.push(bodyType);
    }

    // Function signature
    const destr = destrNames.length > 0 ? `{ ${destrNames.join(", ")} }` : "";
    const typeStr = typeProps.length > 0 ? `{ ${typeProps.join(", ")} }` : "";
    const fullSig = `async ${operationId}${destr ? `(${destr}` : "("}${
      typeStr ? `: ${typeStr}` : ""
    }) `;

    // Path construction
    let pathCode: string;
    if (pathParams.length > 0) {
      const templatePath = rawApiPath.replace(
        /\{([^}]+)\}/g,
        (_, name: string) => `\${pathParams.${name}}`
      );
      pathCode = `    const path = \`${templatePath}\` as const;`;
    } else {
      pathCode = `    const path = \`${rawApiPath}\` as const;`;
    }

    // Request call
    let requestArgs = "path";
    if (queryParams.length > 0) requestArgs += ", query";
    if (bodyType) requestArgs += ", body";
    const requestCode = `    const { json, status } = await this.requestor.${operation.__method}({ ${requestArgs} });`;

    // Response handling
    let responseCases = "";
    const responses = operation.responses || {};
    for (const [statusStr, resp] of Object.entries(responses)) {
      const status = Number(statusStr);
      let caseBody = "        const data = json;";
      if (resp.content?.["application/json"]?.schema) {
        const { zodSchema } = convertToZod(
          resp.content["application/json"].schema,
          "schemas."
        );
        caseBody = `        const schema = ${zodSchema};\n        const data = schema.parse(json);`;
      }
      responseCases += `      case ${status}: {\n${caseBody}\n        return { status, data } as const;\n      }\n`;
    }
    const switchCode = `    switch (status) {\n${responseCases}      default: {\n        throw new Error(\`Unexpected status \${status}: \${JSON.stringify(json)}\`);\n      }\n    }`;

    // Full method
    const methodCode = `${jsdoc}${fullSig}{\n  ${pathCode}\n  ${requestCode}\n  ${switchCode}\n  }`;
    methodsCode.push(methodCode);
  }
  return methodsCode;
}

async function processSchema(schema: OpenApiSchema) {
  const tagsDir = "specs/tags" as const;
  const clientDir = "src/client" as const;

  const methodsCode: string[] = [];

  for (const [rawApiPath, pathItemSchema] of Object.entries(schema.paths)) {
    const tagPath = pathItemSchema.$ref.split("/").slice(2, 4).join("/");
    const fullYamlPath = `${tagsDir}/${tagPath}` as const;
    const yamlStr = await Bun.file(fullYamlPath).text();
    const schema = Bun.YAML.parse(yamlStr);
    console.log({ schema, rawApiPath });
    const tagSchema = TagSchemaSchema.parse(schema);
    console.log({ tagSchema });
    const newMethods = processTag(tagSchema, rawApiPath);
    methodsCode.concat(newMethods);
  }

  const methodsStr = methodsCode.join("\n\n");

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

  ${methodsStr}
}
` as const;

  const clientCodePath = `${clientDir}/index.ts` as const;

  Bun.write(clientCodePath, clientCodeTs);
}

async function main() {
  const filePath = "specs/lichess-api.yaml" as const;
  const yamlStr = await Bun.file(filePath).text();
  const yamlContent = Bun.YAML.parse(yamlStr);
  const parsedSchema = OpenApiSchemaSchema.parse(yamlContent);
  await processSchema(parsedSchema);
}

await main();
