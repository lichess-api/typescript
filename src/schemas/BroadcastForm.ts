import * as z from "minizod";

import { BroadcastTiebreakExtendedCode } from "./BroadcastTiebreakExtendedCode";
import { BroadcastTourInfo } from "./BroadcastTourInfo";

const BroadcastForm = z.object({
  name: z.string().check(z.minLength(3)).check(z.maxLength(80)),
  info: z.optional(BroadcastTourInfo),
  markdown: z.optional(z.string().check(z.maxLength(20000))),
  showScores: z.optional(z.boolean()),
  showRatingDiffs: z.optional(z.boolean()),
  teamTable: z.optional(z.boolean()),
  visibility: z.optional(z.literal(["public", "unlisted", "private"])),
  players: z.optional(z.string()),
  teams: z.optional(z.string()),
  tier: z.optional(z.literal([3, 4, 5])),
  tiebreaks: z.optional(
    z.array(BroadcastTiebreakExtendedCode).check(z.maxLength(5)),
  ),
  grouping: z.optional(
    z.object({
      info: z.optional(
        z.object({
          name: z.optional(z.string()),
          tours: z.optional(z.string()),
        }),
      ),
      scoreGroups: z.optional(z.array(z.string()).check(z.maxLength(10))),
    }),
  ),
});

type BroadcastForm = z.infer<typeof BroadcastForm>;

export { BroadcastForm };
