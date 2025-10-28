import type { Schema, SchemaUnparsed } from "./shared";
import { SchemaSchema } from "./shared";

type ConvertResult = { readonly zodSchema: string; readonly refs: string[] };

function convertToZod_(schema: Schema): ConvertResult {
  if (schema.const !== undefined) {
    return {
      zodSchema: `z.literal(${JSON.stringify(schema.const)})`,
      refs: [],
    };
  }

  switch (schema.__schema) {
    case "$ref": {
      const ref = schema.$ref;
      const name = ref.split("/").pop()!.replace(".yaml", "");
      return { zodSchema: `${name}`, refs: [name] };
    }
    case "oneOf": {
      const subResults = schema.oneOf.map((item) => convertToZod(item));
      const zodSchemas = subResults.map((r) => r.zodSchema);
      const allRefs = new Set<string>();
      subResults.forEach((r) => r.refs.forEach((ref) => allRefs.add(ref)));
      return {
        zodSchema: `z.union([${zodSchemas.join(", ")}])`,
        refs: Array.from(allRefs),
      };
    }
    case "allOf": {
      const leftPart = convertToZod(schema.allOf[0]);
      const rightPart = convertToZod(schema.allOf[1]);
      const allRefs = new Set([...leftPart.refs, ...rightPart.refs]);
      return {
        zodSchema: `z.intersection(${leftPart.zodSchema}, ${rightPart.zodSchema})`,
        refs: Array.from(allRefs),
      };
    }
    case "anyOf": {
      const refNames: string[] = [];
      const allRefs = new Set<string>();
      for (const [_, refYaml] of Object.entries(schema.discriminator.mapping)) {
        const name = refYaml.split("/").pop()!.replace(".yaml", "");
        refNames.push(name);
        allRefs.add(name);
      }
      return {
        zodSchema: `z.discriminatedUnion("${
          schema.discriminator.propertyName
        }", [${refNames.join(", ")}])`,
        refs: Array.from(allRefs),
      };
    }
    case "null": {
      return { zodSchema: "z.null()", refs: [] };
    }
    case "string": {
      if (schema.enum) {
        const literals = JSON.stringify(schema.enum);
        return { zodSchema: `z.literal(${literals})`, refs: [] };
      }
      if (schema.format === "uri") {
        return { zodSchema: "z.url()", refs: [] };
      }
      if (schema.format === "date-time") {
        return { zodSchema: "z.iso.datetime()", refs: [] };
      }
      let schemaStr = "z.string()";
      if (schema.minLength !== undefined) {
        schemaStr += `.min(${schema.minLength})`;
      }
      if (schema.maxLength !== undefined) {
        schemaStr += `.max(${schema.maxLength})`;
      }
      return { zodSchema: schemaStr, refs: [] };
    }
    case "string:nullable": {
      return { zodSchema: "z.string().nullable()", refs: [] };
    }
    case "integer": {
      if (schema.enum) {
        const literals = schema.enum.join(", ");
        return { zodSchema: `z.literal([${literals}])`, refs: [] };
      }
      let schemaStr = "z.int()";
      if (schema.minimum !== undefined && schema.maximum !== undefined) {
        const diff = schema.maximum - schema.minimum;
        if (diff <= 10) {
          const values: number[] = [];
          for (let i = schema.minimum; i <= schema.maximum; i++) {
            values.push(i);
          }
          const literals = values.map((v) => `z.literal(${v})`).join(", ");
          return { zodSchema: `z.union([${literals}])`, refs: [] };
        }
      }
      if (schema.minimum !== undefined) {
        schemaStr += `.min(${schema.minimum})`;
      }
      if (schema.maximum !== undefined) {
        schemaStr += `.max(${schema.maximum})`;
      }
      return { zodSchema: schemaStr, refs: [] };
    }
    case "integer:nullable": {
      return { zodSchema: "z.int().nullable()", refs: [] };
    }
    case "number": {
      let schemaStr = "z.number()";
      if (schema.minimum !== undefined) {
        schemaStr += `.min(${schema.minimum})`;
      }
      if (schema.maximum !== undefined) {
        schemaStr += `.max(${schema.maximum})`;
      }
      return { zodSchema: schemaStr, refs: [] };
    }
    case "boolean": {
      return { zodSchema: "z.boolean()", refs: [] };
    }
    case "additionalProperties": {
      const { zodSchema: valueSchemaStr, refs } = convertToZod(
        schema.additionalProperties
      );
      return {
        zodSchema: `z.record(z.string(), ${valueSchemaStr})`,
        refs,
      };
    }
    case "object": {
      const props = schema.properties || {};
      const required = new Set(schema.required || []);
      const zodProps: Record<string, string> = {};
      const allRefs = new Set<string>();
      for (const [k, v] of Object.entries(props)) {
        const { zodSchema: sch, refs: propRefs } = convertToZod(v);
        propRefs.forEach((r) => allRefs.add(r));
        let propStr = sch;
        if (!required.has(k)) {
          propStr += ".optional()";
        }
        zodProps[k] = propStr;
      }
      const entries = Object.entries(zodProps);
      const inner =
        entries.length === 1
          ? `{ "${entries[0]![0]}": ${entries[0]![1]} }`
          : "{\n" +
            entries.map(([k, v]) => `  "${k}": ${v},`).join("\n") +
            "\n}";
      return { zodSchema: `z.object(${inner})`, refs: Array.from(allRefs) };
    }
    case "array": {
      const items = schema.items;
      if (!items) {
        return { zodSchema: "z.array(z.unknown())", refs: [] };
      }
      const { zodSchema: itemSchema, refs: itemRefs } = convertToZod(items);
      let zodSchemaStr: string;
      if (
        schema.minItems !== undefined &&
        schema.maxItems !== undefined &&
        schema.minItems === schema.maxItems &&
        schema.minItems <= 10
      ) {
        const n = schema.minItems;
        const tupleItems = Array(n).fill(itemSchema).join(", ");
        zodSchemaStr = `z.tuple([${tupleItems}])`;
      } else {
        let inner = `z.array(${itemSchema})`;
        if (
          schema.minItems !== undefined &&
          schema.maxItems !== undefined &&
          schema.minItems === schema.maxItems
        ) {
          inner += `.length(${schema.minItems})`;
        } else {
          if (schema.minItems !== undefined) {
            inner += `.min(${schema.minItems})`;
          }
          if (schema.maxItems !== undefined) {
            inner += `.max(${schema.maxItems})`;
          }
        }
        zodSchemaStr = inner;
      }
      return { zodSchema: zodSchemaStr, refs: itemRefs } as const;
    }
  }

  assertNever(schema);
}

function assertNever(schema: never): never {
  throw new Error(`Unknown schema: ${JSON.stringify(schema)}`);
}

function convertToZod(schema: unknown | SchemaUnparsed): ConvertResult {
  return convertToZod_(SchemaSchema.parse(schema));
}

async function processFile(filePath: string) {
  filePath = filePath.replaceAll("\\", "/");
  const fileName = filePath.split("/").pop()!.replace(".yaml", "");
  console.log({ filePath, fileName });
  const yamlStr = await Bun.file(filePath).text();
  const schema = Bun.YAML.parse(yamlStr);
  // console.log(schema);
  const { zodSchema, refs: uniqueRefs } = convertToZod(schema);

  uniqueRefs.sort();
  const refImports = uniqueRefs
    .map((refName) => `import ${refName} from "./${refName}";` as const)
    .join("\n");
  const spacedRefImports = refImports
    ? (`\n${refImports}\n` as const)
    : ("" as const);

  const tsCode = `import * as z from "zod";
${spacedRefImports}
const ${fileName} = ${zodSchema};

type ${fileName} = z.infer<typeof ${fileName}>;

export { ${fileName} };
export default ${fileName};
` as const;

  const outFilePath = `src/schemas/${fileName}.ts` as const;

  await Bun.write(outFilePath, tsCode);
}

async function main() {
  const fileName = Bun.argv[2];

  const schemasDir = "specs/schemas" as const;

  if (fileName) {
    const fileNameWithExtension = `${schemasDir}/${fileName}.yaml` as const;
    await processFile(fileNameWithExtension);
  } else {
    const glob = new Bun.Glob(`${schemasDir}/*.{yaml}` as const);
    const yamlFiles = await Array.fromAsync(glob.scan());
    const filesToProcess = yamlFiles.filter((f) => !f.includes("_index.yaml"));
    for (const fullPath of filesToProcess) {
      await processFile(fullPath);
    }
  }
}

await main();
