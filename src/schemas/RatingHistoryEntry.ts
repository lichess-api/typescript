import * as z from "minizod";

const RatingHistoryEntry = z.object({
  name: z.optional(z.string()),
  points: z.optional(z.array(z.tuple([z.int(), z.int(), z.int(), z.int()]))),
});

type RatingHistoryEntry = z.infer<typeof RatingHistoryEntry>;

export { RatingHistoryEntry };
