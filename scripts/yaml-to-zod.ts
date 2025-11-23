import { convertToZod } from "./shared";

async function processFile(filePath: string) {
  filePath = filePath.replaceAll("\\", "/");
  const fileName = filePath.split("/").pop()!.replace(".yaml", "");
  console.log({ filePath, fileName });
  const yamlStr = await Bun.file(filePath).text();
  const schema = Bun.YAML.parse(yamlStr);
  const { zodSchema, refs: uniqueRefs } = convertToZod(schema);

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
