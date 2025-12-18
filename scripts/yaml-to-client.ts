import { z } from "zod";

import {
  SchemaSchemaRef,
  SchemaSchema,
  convertToZod_ as convertToZod,
  Primitive,
  SchemaSchemaPrimitive,
  SchemaSchemaBoolean,
  assertNever,
  type Schema,
} from "./shared";

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
  servers: z.tuple([
    z.object({ url: z.literal("https://lichess.org") }),
    z.object({ url: z.literal("https://lichess.dev") }),
    z.object({ url: z.literal("http://localhost:{port}") }),
    z.object({ url: z.literal("http://l.org") }),
  ]),
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

const StringJsonRef = z
  .string()
  .refine((str) => str.endsWith(".json"))
  .brand("StringJsonRef");

const SchemaSchemaExampleRef = z
  .object({ $ref: StringJsonRef })
  .strict()
  .transform((s) => ({ ...s, __schema: "$ref" as const }));

const ResponseContentBaseContent = z.object({
  schema: SchemaSchema,
  example: SchemaSchemaExampleRef.optional(),
  examples: z.record(z.string(), SchemaSchemaRef).optional(),
});

const ResponseContextPlainTextContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "text" as const }));

const ResponseContentJsonContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "json" as const }));

const ResponseContentNdjsonContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "ndjson" as const }));

const ResponseContentChessPgnContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "chess-pgn" as const }));

const ResponseContentJson = z
  .union([
    z
      .object({ "application/json": ResponseContentJsonContent })
      .strict()
      .transform((x) => x["application/json"]),
    z
      .object({ "application/vnd.lichess.v3+json": ResponseContentJsonContent })
      .strict()
      .transform((x) => x["application/vnd.lichess.v3+json"]),
  ])
  .transform((x) => ({ ...x, __content_type: "json" as const }));

const ResponseContentNdjson = z
  .object({ "application/x-ndjson": ResponseContentNdjsonContent })
  .strict()
  .transform((x) => x["application/x-ndjson"])
  .transform((x) => ({ ...x, __content_type: "ndjson" as const }));

const ResponseContentChessPgn = z
  .object({ "application/x-chess-pgn": ResponseContentChessPgnContent })
  .strict()
  .transform((x) => x["application/x-chess-pgn"])
  .transform((x) => ({ ...x, __content_type: "chess-pgn" as const }));

const ResponseContentMixed = z
  .object({
    "text/plain": ResponseContextPlainTextContent.optional(),
    "application/json": ResponseContentJsonContent.optional(),
    "application/vnd.lichess.v3+json": ResponseContentJsonContent.optional(),
    "application/x-chess-pgn": ResponseContentChessPgnContent.optional(),
    "application/x-ndjson": ResponseContentNdjsonContent.optional(),
  })
  .strict()
  .transform((x) => ({ ...x, __content_type: "mixed" as const }));

const ResponseContentNoContent = z
  .undefined()
  .transform(() => ({ __content_type: "nocontent" as const }));

const ResponseContent = z.union([
  ResponseContentJson,
  ResponseContentNdjson,
  ResponseContentChessPgn,
  ResponseContentMixed,
  ResponseContentNoContent,
]);
type ResponseCaseContent = z.infer<typeof ResponseContent>;

const ResponseSchemaHeaders = z
  .object({
    "Access-Control-Allow-Origin": z
      .object({
        schema: z.object({
          type: z.literal("string"),
          default: z.literal("'*'"),
        }),
      })
      .strict(),
    "Last-Modified": z
      .object({
        schema: z.object({
          type: z.literal("string"),
          example: z.string(),
        }),
      })
      .strict()
      .optional(),
  })
  .strict();

const ResponseSchema = z
  .object({
    description: z.string(),
    headers: ResponseSchemaHeaders.optional(),
    content: ResponseContent,
  })
  .strict();
type ResponseCase = z.infer<typeof ResponseSchema>;

const OperationParameterBase = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    example: Primitive.optional(),
  })
  .strict();

const SchemaSchemaNullableRefToPrimitive = z
  .object({
    allOf: z.tuple([SchemaSchemaRef, z.object({ default: z.null() })]),
  })
  .strict()
  .transform((s) => ({
    ...s,
    __schema: "notverified:reftoprimitive:nullable" as const,
  }))
  .brand("notverified:SchemaSchemaNullableRefToPrimitive");

const SchemaSchemaRefToPrimitive = SchemaSchemaRef.brand(
  "notverified:SchemaSchemaRefToPrimitive",
).transform((s) => ({ ...s, __schema: "notverified:reftoprimitive" as const }));

const SchemaSchemaBooleanLike = z
  .object({
    anyOf: z.tuple([
      SchemaSchemaBoolean,
      z.object({ type: z.literal("string"), const: z.literal("yes") }),
    ]),
    example: z.literal("yes"),
  })
  .strict()
  .transform((s) => ({ ...s, __schema: "boolean-like" as const }))
  .brand("SchemaSchemaBooleanLike");

const SchemaSchemaArrayOfPrimitive = z
  .object({ type: z.literal("array"), items: SchemaSchemaPrimitive })
  .strict()
  .transform((s) => ({ ...s, __schema: "array:primitive" as const }));

const SchemaSchemaArrayOfRefToPrimitive = z
  .object({ type: z.literal("array"), items: SchemaSchemaRefToPrimitive })
  .strict()
  .transform((s) => ({
    ...s,
    __schema: "array:notverified:reftoprimitive" as const,
  }));

const QueryParamSchemaSchema = z.union([
  SchemaSchemaPrimitive,
  SchemaSchemaArrayOfPrimitive,
  SchemaSchemaRefToPrimitive,
  SchemaSchemaArrayOfRefToPrimitive,
  SchemaSchemaNullableRefToPrimitive,
]);

type QueryParamSchema = z.infer<typeof QueryParamSchemaSchema>;

const OperationQueryParameterSchema = OperationParameterBase.extend({
  in: z.literal("query"),
  required: z.boolean().optional(),
  schema: QueryParamSchemaSchema,
})
  .strict()
  .transform((s) => ({ ...s, __type: "query" as const }));

type OperationQueryParameter = z.infer<typeof OperationQueryParameterSchema>;

const PathParamSchemaSchema = z.union([
  SchemaSchemaPrimitive,
  SchemaSchemaRefToPrimitive,
  SchemaSchemaBooleanLike,
]);

type PathParamSchema = z.infer<typeof PathParamSchemaSchema>;

const OperationPathParameterSchema = OperationParameterBase.extend({
  in: z.literal("path"),
  required: z.literal(true),
  schema: PathParamSchemaSchema,
})
  .strict()
  .transform((s) => ({ ...s, __type: "path" as const }));

type OperationPathParameter = z.infer<typeof OperationPathParameterSchema>;

const OperationParameterRefSchema = z
  .object({ $ref: z.string() })
  .transform((s) => ({ ...s, __type: "$ref" as const }));

const OperationParameter = z.union([
  OperationQueryParameterSchema,
  OperationPathParameterSchema,
  OperationParameterRefSchema,
]);
const OperationParameters = z.array(OperationParameter).optional();
type OperationParameters = z.infer<typeof OperationParameters>;

const ResponseStatus = z.string();

const OperationResponses = z.record(ResponseStatus, ResponseSchema);
type OperationResponses = z.infer<typeof OperationResponses>;

const BaseTagSchemaOperation = z.object({
  operationId: z.string(),
  summary: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  security: SecuritySchema,
  parameters: OperationParameters,
  responses: OperationResponses,
});

const RequestBodyContentJson = z
  .object({ "application/json": z.object({ schema: SchemaSchema }) })
  .strict()
  .transform((s) => ({ ...s, __type: "json" as const }));

const RequestBodyContentPlainText = z
  .object({ "text/plain": z.object({ schema: SchemaSchema }) })
  .strict()
  .transform((s) => ({ ...s, __type: "text/plain" as const }));

const RequestBodyContentWebFormUrlEncoded = z
  .object({
    "application/x-www-form-urlencoded": z.object({ schema: SchemaSchema }),
  })
  .strict()
  .transform((s) => ({ ...s, __type: "x-www-form-urlencoded" as const }));

const RequestBodyContent = z.union([
  RequestBodyContentJson,
  RequestBodyContentPlainText,
  RequestBodyContentWebFormUrlEncoded,
]);

const RequestBodySchema = z
  .object({
    description: z.string().optional(),
    required: z.boolean().optional(),
    content: RequestBodyContent,
  })
  .strict();

const TagSchemaSchemaGet = BaseTagSchemaOperation.extend({})
  .strict()
  .transform((s) => ({ ...s, __id: "method:get", __method: "get" }) as const);

const TagSchemaSchemaPost = BaseTagSchemaOperation.extend({
  requestBody: RequestBodySchema.optional(),
})
  .strict()
  .transform((s) => ({ ...s, __id: "method:post", __method: "post" }) as const);

const TagSchemaSchemaHead = BaseTagSchemaOperation.extend({})
  .strict()
  .transform((s) => ({ ...s, __id: "method:head", __method: "head" }) as const);

const TagSchemaSchemaDelete = BaseTagSchemaOperation.extend({})
  .strict()
  .transform(
    (s) => ({ ...s, __id: "method:delete", __method: "delete" }) as const,
  );

const TagSchemaSchemaPut = BaseTagSchemaOperation.extend({
  requestBody: RequestBodySchema.optional(),
})
  .strict()
  .transform((s) => ({ ...s, __id: "method:put", __method: "put" }) as const);

const TagSchemaSchema = z
  .object({
    servers: z
      .tuple([
        z.object({
          url: z.literal([
            "https://engine.lichess.ovh",
            "https://explorer.lichess.ovh",
            "https://tablebase.lichess.ovh",
          ]),
        }),
      ])
      .transform((s) => ({ url: s[0].url, __id: "__servers" as const }))
      .optional(),
    parameters: z
      .array(OperationPathParameterSchema)
      .transform((s) => ({ parameters: s, __id: "__parameters" as const }))
      .optional(),
    get: TagSchemaSchemaGet.optional(),
    post: TagSchemaSchemaPost.optional(),
    head: TagSchemaSchemaHead.optional(),
    delete: TagSchemaSchemaDelete.optional(),
    put: TagSchemaSchemaPut.optional(),
  })
  .strict();
type TagSchema = z.infer<typeof TagSchemaSchema>;

type Operation = NonNullable<TagSchema[keyof TagSchema]>;

function processResponseCaseContent(content: ResponseCaseContent) {
  switch (content.__content_type) {
    case "nocontent": {
      const caseBody = "return { status, response } as const;" as const;
      return { caseBody } as const;
    }
    case "json": {
      const { zodSchema } = convertToZod(content.schema, "schemas.");
      const caseBody = `const schema = ${zodSchema};
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;` as const;
      return { caseBody } as const;
    }
    case "ndjson": {
      const { zodSchema } = convertToZod(content.schema, "schemas.");
      const caseBody = `const schema = ${zodSchema};
        const stream = ndjsonStream({ response, schema });
        return { status, stream } as const;` as const;
      return { caseBody } as const;
    }
    case "chess-pgn": {
      const caseBody = `/* chess-pgn */
        return { status, response } as const;` as const;
      return { caseBody } as const;
    }
    case "mixed": {
      const caseBody = `/* mixed */
        return { status, response } as const;` as const;
      return { caseBody } as const;
    }
  }

  assertNever(content);
}

function processResponseCase({
  statusStr,
  resp,
}: {
  statusStr: string;
  resp: ResponseCase;
}) {
  const status = Number(statusStr);
  const { caseBody } = processResponseCaseContent(resp.content);

  const responseCase = `case ${status}: {
        ${caseBody}
      }` as const;
  return responseCase;
}

function processMethod({
  method,
}: {
  method: Exclude<Operation, { __id: "__parameters" | "__servers" }>;
}) {
  const responseCasesLines: string[] = [];

  for (const [statusStr, resp] of Object.entries(method.responses)) {
    const responseCaseLine = processResponseCase({ statusStr, resp });
    responseCasesLines.push(responseCaseLine);
  }
  const responseCases = responseCasesLines.join("\n");

  switch (method.__method) {
    case "get":
    case "head":
    case "delete": {
      return {
        responseCases,
        requestBody: undefined,
        requestBodySchema: null,
      } as const;
    }
    case "post":
    case "put": {
      const requestBody = method.requestBody;
      if (!requestBody) {
        return { responseCases, requestBody, requestBodySchema: null } as const;
      }
      const requestBodyType = requestBody.content.__type;
      const requestBodySchema = (() => {
        switch (requestBodyType) {
          case "json": {
            return requestBody.content["application/json"].schema;
          }
          case "text/plain": {
            return requestBody.content["text/plain"].schema;
          }
          case "x-www-form-urlencoded": {
            return requestBody.content["application/x-www-form-urlencoded"]
              .schema;
          }
        }
        assertNever(requestBodyType);
      })();
      return { responseCases, requestBody, requestBodySchema } as const;
    }
  }

  assertNever(method);
}

function processRawPath(rawApiPath: string) {
  const processedPath = rawApiPath.replaceAll("/{", "/${params.");
  const hasPathParams = rawApiPath.includes("{");
  return { processedPath, hasPathParams } as const;
}

function processParams(params: OperationParameters) {
  if (!params) {
    return {
      hasAnyParams: false,
      hasQueryParams: false,
      hasPathParams: false,
      hasQueryAndPathParams: false,
      hasOnlyQueryParams: false,
      hasOnlyPathParams: false,
    } as const;
  }

  const queryParams = params.filter((param) => param.__type === "query");
  const pathParams = params.filter((param) => param.__type === "path");
  const hasQueryParams = queryParams.length > 0;
  const hasPathParams = pathParams.length > 0;
  const hasQueryAndPathParams = hasQueryParams && hasPathParams;
  const hasOnlyQueryParams = hasQueryParams && !hasPathParams;
  const hasOnlyPathParams = hasPathParams && !hasQueryParams;

  return {
    hasAnyParams: true,
    hasPathParams,
    hasQueryParams,
    queryParams,
    pathParams,
    hasQueryAndPathParams,
    hasOnlyQueryParams,
    hasOnlyPathParams,
  } as const;
}

function schemaToTypescriptTypes(
  schema: Schema | PathParamSchema | QueryParamSchema,
) {
  switch (schema.__schema) {
    case "$ref":
    case "notverified:reftoprimitive": {
      const ref = schema.$ref;
      const name = ref.split("/").pop()!.replace(".yaml", "");
      const typescriptSchema = `schemas.${name}` as const;
      return typescriptSchema;
    }
    case "notverified:reftoprimitive:nullable": {
      const ref = schema.allOf[0].$ref;
      const name = ref.split("/").pop()!.replace(".yaml", "");
      const typescriptSchema = `schemas.${name} | null` as const;
      return typescriptSchema;
    }
    case "object": {
      const props = schema.properties || {};
      const required = new Set(schema.required || []);
      const objectRecord: Record<string, `: ${string}` | `?: ${string}`> = {};
      for (const [k, v] of Object.entries(props)) {
        const typescriptSchema = schemaToTypescriptTypes(SchemaSchema.parse(v));
        const propStr = required.has(k)
          ? (`: ${typescriptSchema}` as const)
          : (`?: ${typescriptSchema}` as const);
        objectRecord[k] = propStr;
      }
      const entries = Object.entries(objectRecord);
      if (entries.length === 1) {
        return `{ "${entries[0]![0]}" ${entries[0]![1]} }` as const;
      }
      return (
        "{\n" +
        entries.map(([k, v]) => `  "${k}" ${v},` as const).join("\n") +
        "\n}"
      );
    }
    case "boolean":
    case "boolean-like": {
      return "boolean" as const;
    }
    case "string": {
      return "string" as const;
    }
    case "number":
    case "integer": {
      return "number" as const;
    }
    case "enum:number": {
      const literals = schema.enum.map((v) => JSON.stringify(v)).join(" | ");
      return `(${literals})` as const;
    }
    case "allOf": {
      const leftPart: string = schemaToTypescriptTypes(
        SchemaSchema.parse(schema.allOf[0]),
      );
      const rightPart: string = schemaToTypescriptTypes(
        SchemaSchema.parse(schema.allOf[1]),
      );
      return `${leftPart} & ${rightPart}` as const;
    }
    case "oneOf": {
      const typescriptSchemas: string = schema.oneOf
        .map((s) => schemaToTypescriptTypes(SchemaSchema.parse(s)))
        .join(" | ");
      return `(${typescriptSchemas})` as const;
    }
    case "array:primitive": {
      const typescriptSchema: string = schemaToTypescriptTypes(schema.items);
      return `(${typescriptSchema})[]` as const;
    }
    case "array:notverified:reftoprimitive": {
      const ref = schema.items.$ref;
      const name = ref.split("/").pop()!.replace(".yaml", "");
      const typescriptSchema = `schemas.${name}` as const;
      return `(${typescriptSchema})[]` as const;
    }
    case "additionalProperties":
    case "anyOf":
    case "array":
    case "integer:nullable":
    case "null":
    case "string:nullable": {
      throw new Error("Unsupported schema");
    }
  }

  assertNever(schema);
}

function extractQueryParams(queryParams: OperationQueryParameter[]) {
  const params: Record<string, string> = {};
  for (const param of queryParams) {
    const typescriptSchema = schemaToTypescriptTypes(param.schema);
    params[param.name] = param.required
      ? `: ${typescriptSchema}`
      : `?: ${typescriptSchema}`;
  }
  const entries = Object.entries(params);
  if (entries.length === 1) {
    return `{ "${entries[0]![0]}" ${entries[0]![1]} }` as const;
  }
  return (
    "{\n" +
    entries.map(([k, v]) => `  "${k}" ${v},` as const).join("\n") +
    "\n}"
  );
}

function extractPathParams(pathParams: OperationPathParameter[]) {
  const params: Record<string, string> = {};
  for (const param of pathParams) {
    const typescriptSchema = schemaToTypescriptTypes(param.schema);
    params[param.name] = `: ${typescriptSchema}` as const;
  }
  const entries = Object.entries(params);
  if (entries.length === 1) {
    return `{ "${entries[0]![0]}" ${entries[0]![1]} }` as const;
  }
  return (
    "{\n" +
    entries.map(([k, v]) => `  "${k}" ${v},` as const).join("\n") +
    "\n}"
  );
}

function extractBodyTypes(bodySchema: Schema) {
  if (bodySchema.__schema === "string") {
    return "{ body: string }" as const;
  }
  const typescriptSchema = schemaToTypescriptTypes(bodySchema);
  return `{ body: ${typescriptSchema}} ` as const;
}

function toJsdoc(summary: string) {
  const jsdoc = `/**\n   * ${summary}\n   */` as const;
  return jsdoc;
}

function processOperation(
  operation: Operation,
  rawApiPath: string,
  options?: { sharedPathParams?: OperationPathParameter[]; baseUrl?: string },
) {
  if (operation.__id === "__parameters") {
    const parameters = operation.parameters;
    return {
      methodCode: "/* --- Shared path params for methods below --- */",
      parameters,
      __type: "__parameters",
    } as const;
  }

  if (operation.__id === "__servers") {
    const baseUrl = operation.url;
    return {
      methodCode: `/* --- Base URL for methods below: ${baseUrl} --- */`,
      baseUrl,
      __type: "__servers",
    } as const;
  }
  const stringifiedProcessedPath = (() => {
    const { processedPath, hasPathParams } = processRawPath(rawApiPath);
    return hasPathParams
      ? (`\`${processedPath}\`` as const)
      : (`"${processedPath}"` as const);
  })();

  // JSDoc
  const jsdoc = toJsdoc(`${operation.summary}`);

  const { responseCases, requestBodySchema } = processMethod({
    method: operation,
  });

  // Parameters
  const {
    hasQueryParams,
    hasQueryAndPathParams,
    hasOnlyQueryParams,
    hasPathParams,
    queryParams,
    pathParams,
  } = processParams(
    (operation.parameters ?? []).concat(options?.sharedPathParams ?? []),
  );

  const pathAssignment =
    `const path = ${stringifiedProcessedPath} as const;` as const;

  const requestCode = (() => {
    const bodyArg = requestBodySchema ? (", body" as const) : ("" as const);

    const bodyComment = requestBodySchema
      ? ("const body = params.body;\n" as const)
      : ("" as const);

    if (!hasQueryParams) {
      return `${bodyComment}const { response, status } = await this.requestor.${operation.__method}({ path${bodyArg} });` as const;
    }

    const queryComment =
      hasOnlyQueryParams && !requestBodySchema
        ? ("const query = params;\n" as const)
        : hasQueryParams
          ? ((queryParams) => {
              const extractedQueryParams = queryParams.map((queryParam) => {
                return `${queryParam.name}: params.${queryParam.name},` as const;
              });

              return `const query = { ${extractedQueryParams.join(
                "",
              )} } as const;\n` as const;
            })(queryParams)
          : ("" as const);

    const queryArg = hasQueryParams ? ", query" : "";

    return `${queryComment}${bodyComment}const { response, status } = await this.requestor.${operation.__method}({ path${queryArg}${bodyArg} });` as const;
  })();

  const paramsComment = (() => {
    const bodyParamsComment = requestBodySchema
      ? (` & ${extractBodyTypes(requestBodySchema)}` as const)
      : ("" as const);

    if (hasQueryAndPathParams) {
      const pathParamsTypes = extractPathParams(pathParams);
      const queryParamsTypes = extractQueryParams(queryParams);
      return `params: ${pathParamsTypes} & ${queryParamsTypes}${bodyParamsComment}` as const;
    }

    if (hasPathParams) {
      const pathParamsTypes = extractPathParams(pathParams);
      return `params: ${pathParamsTypes}${bodyParamsComment}` as const;
    }

    if (hasQueryParams) {
      const queryParamsTypes = extractQueryParams(queryParams);
      return `params: ${queryParamsTypes}${bodyParamsComment}` as const;
    }

    if (requestBodySchema) {
      return `params: ${extractBodyTypes(requestBodySchema)}` as const;
    }

    return "" as const;
  })();

  const switchCode = `switch (status) {
      ${responseCases}
      default: {
        throw new Error("Unexpected status code");
      }
    }` as const;

  const fullContent = `
  ${jsdoc}
  async ${operation.operationId}(${paramsComment}) {
    ${pathAssignment}
    ${requestCode}
    ${switchCode}
  }
` as const;

  return { methodCode: fullContent, __type: "__methodCode" } as const;
}

function processTag(tagSchema: TagSchema, rawApiPath: string) {
  const methodsCode: string[] = [];
  let sharedPathParams: OperationPathParameter[] | undefined = undefined;
  let baseUrl: string | undefined = undefined;

  for (const operation of Object.values(tagSchema)) {
    const processedOperation = processOperation(operation, rawApiPath, {
      sharedPathParams,
      baseUrl,
    });
    console.log(processedOperation);
    if (processedOperation.__type === "__parameters") {
      sharedPathParams = processedOperation.parameters;
    }
    if (processedOperation.__type === "__servers") {
      baseUrl = processedOperation.baseUrl;
    }
    methodsCode.push(processedOperation.methodCode);
  }
  return methodsCode;
}

async function processSchema(schema: OpenApiSchema): Promise<void> {
  const tagsDir = "specs/tags" as const;

  const methodsCode: string[] = [];

  for (const [rawApiPath, pathItemSchema] of Object.entries(schema.paths)) {
    const tagPath = pathItemSchema.$ref.split("/").slice(2, 4).join("/");
    const fullYamlPath = `${tagsDir}/${tagPath}` as const;
    const yamlStr = await Bun.file(fullYamlPath).text();
    const schema = Bun.YAML.parse(yamlStr);
    console.log({ fullYamlPath, schema });
    const tagSchema = TagSchemaSchema.parse(schema);
    const newMethods = processTag(tagSchema, rawApiPath);
    methodsCode.push(...newMethods);
  }

  const methodsStr = methodsCode.join("\n");

  const API_URL = schema.servers[0].url;

  const clientCodeTs = `import * as z from "zod";

import * as schemas from "~/schemas";

import { ndjsonStream } from "~/lib/ndjson";

import { Requestor } from "./requestor";

export const BASE_URL = "${API_URL}";
type BASE_URL = typeof BASE_URL;

export class Lichess {
  private readonly requestor: Requestor<BASE_URL>;

  constructor(options: { token: string | null }) {
    const { token } = options;
    this.requestor = new Requestor({ token, baseUrl: BASE_URL });
  }

  ${methodsStr}
}
` as const;

  const clientDir = "src/client" as const;
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
