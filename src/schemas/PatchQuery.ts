import * as z from "minizod";

const PatchQuery = z.unknown();

type PatchQuery = z.infer<typeof PatchQuery>;

export { PatchQuery };
