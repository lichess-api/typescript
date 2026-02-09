import * as z from "zod/mini";

import { BroadcastTiebreakExtendedCode } from "./BroadcastTiebreakExtendedCode";
import { FideTimeControl } from "./FideTimeControl";

const BroadcastForm = z.object({
  name: z.string().check(z.minLength(3)).check(z.maxLength(80)),
  "info.format": z.optional(z.string().check(z.maxLength(80))),
  "info.location": z.optional(z.string().check(z.maxLength(80))),
  "info.tc": z.optional(z.string().check(z.maxLength(80))),
  "info.fideTc": z.optional(FideTimeControl),
  "info.timeZone": z.optional(z.string()),
  "info.players": z.optional(z.string().check(z.maxLength(120))),
  "info.website": z.optional(z.url()),
  "info.standings": z.optional(z.url()),
  markdown: z.optional(z.string().check(z.maxLength(20000))),
  showScores: z.optional(z.boolean()),
  showRatingDiffs: z.optional(z.boolean()),
  teamTable: z.optional(z.boolean()),
  visibility: z.optional(z.literal(["public", "unlisted", "private"])),
  players: z.optional(z.string()),
  teams: z.optional(z.string()),
  tier: z.optional(z.literal([3, 4, 5])),
  "tiebreaks[]": z.optional(
    z.array(BroadcastTiebreakExtendedCode).check(z.maxLength(5)),
  ),
});

type BroadcastForm = z.infer<typeof BroadcastForm>;

export { BroadcastForm };
