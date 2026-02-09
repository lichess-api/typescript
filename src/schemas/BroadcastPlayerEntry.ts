import * as z from "zod/mini";

import { BroadcastPlayerTiebreak } from "./BroadcastPlayerTiebreak";
import { BroadcastPlayerWithFed } from "./BroadcastPlayerWithFed";

const BroadcastPlayerEntry = z.intersection(
  BroadcastPlayerWithFed,
  z.object({
    score: z.optional(z.number()),
    played: z.optional(z.int()),
    ratingDiff: z.optional(z.int()),
    performance: z.optional(z.int()),
    tiebreaks: z.optional(
      z.array(BroadcastPlayerTiebreak).check(z.maxLength(5)),
    ),
    rank: z.optional(z.int().check(z.minimum(1))),
  }),
);

type BroadcastPlayerEntry = z.infer<typeof BroadcastPlayerEntry>;

export { BroadcastPlayerEntry };
