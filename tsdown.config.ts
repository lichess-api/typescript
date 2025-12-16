import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.ts", schemas: "src/schemas/index.ts" },
  exports: true,
  dts: { tsgo: true },
});
