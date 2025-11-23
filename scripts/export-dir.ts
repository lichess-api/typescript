import { readdirSync } from "node:fs";
import path from "node:path";

async function main() {
  const dir = "src/schemas" as const;

  const tsFiles = readdirSync(dir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => path.basename(file, ".ts"));

  if (!tsFiles.length) {
    throw new Error("Empty dir");
  }

  const importLines = tsFiles.map(
    (name) => `export { ${name} } from "./${name}";` as const
  );

  const content = importLines.join("\n");

  const outFile = `${dir}/index.ts` as const;

  await Bun.write(outFile, content);
}

await main();
