import { convertToZod, SchemaSchema } from "./shared";

import { readdirSync } from "node:fs";
import path from "node:path";
import * as fs from "node:fs/promises";

async function processFile(filePath: string) {
  filePath = filePath.replaceAll("\\", "/");
  const fileName = filePath.split("/").pop()!.replace(".yaml", "");
  console.log({ filePath, fileName });
  const yamlStr = await Bun.file(filePath).text();
  const yamlContent = Bun.YAML.parse(yamlStr);
  const parsedSchema = SchemaSchema.parse(yamlContent);
  const { zodSchema, refs: uniqueRefs } = convertToZod(parsedSchema);

  uniqueRefs.sort();
  const refImports = uniqueRefs
    .map((refName) => `import { ${refName} } from "./${refName}";` as const)
    .join("\n");
  const spacedRefImports = refImports
    ? (`\n${refImports}\n` as const)
    : ("" as const);

  const tsCode = `import * as z from "zod";
${spacedRefImports}
const ${fileName} = ${zodSchema};

type ${fileName} = z.infer<typeof ${fileName}>;

export { ${fileName} };
` as const;

  const outDir = "src/schemas" as const;
  const outFilePath = `${outDir}/${fileName}.ts` as const;

  await Bun.write(outFilePath, tsCode);
}

async function main() {
  const outDir = "src/schemas" as const;
  await fs.rm(outDir, { recursive: true, force: true });
  const schemasDir = "specs/schemas" as const;
  const glob = new Bun.Glob(`${schemasDir}/*.{yaml}` as const);
  const yamlFiles = await Array.fromAsync(glob.scan());
  const filesToProcess = yamlFiles.filter((f) => !f.includes("_index.yaml"));
  for (const fullPath of filesToProcess) {
    await processFile(fullPath);
  }
  const tsFiles = readdirSync(outDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => path.basename(file, ".ts"));

  const importLines = tsFiles.map(
    (name) => `export { ${name} } from "./${name}";` as const,
  );
  const content = importLines.join("\n");
  const outFile = `${outDir}/index.ts` as const;
  await Bun.write(outFile, content);
}

await main();
