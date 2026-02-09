import * as z from "zod/mini";

const PatchQuery = z.unknown();

type PatchQuery = z.infer<typeof PatchQuery>;

export { PatchQuery };
