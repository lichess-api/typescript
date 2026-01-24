import * as z from "zod";

const PatchQuery = z.unknown();

type PatchQuery = z.infer<typeof PatchQuery>;

export { PatchQuery };
