import * as z from "minizod";

import { PerfType } from "./PerfType";

const RatingHistoryEntry = z.object({
  name: z.optional(z.union([z.literal(["puzzle"]), PerfType])),
  points: z.optional(z.array(z.tuple([z.int(), z.int(), z.int(), z.int()]))),
});

type RatingHistoryEntry = z.infer<typeof RatingHistoryEntry>;

export { RatingHistoryEntry };
