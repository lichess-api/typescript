import * as z from "zod/mini";

import { BroadcastCustomPoints } from "./BroadcastCustomPoints";
import { BroadcastRoundFormName } from "./BroadcastRoundFormName";

const BroadcastRoundForm = z.intersection(
  z.union([
    z.object({ name: BroadcastRoundFormName }),
    z.object({
      name: BroadcastRoundFormName,
      syncUrl: z.url(),
      onlyRound: z.optional(z.int().check(z.minimum(1)).check(z.maximum(999))),
      slices: z.optional(z.string()),
    }),
    z.object({
      name: BroadcastRoundFormName,
      syncUrls: z.string(),
      onlyRound: z.optional(z.int().check(z.minimum(1)).check(z.maximum(999))),
      slices: z.optional(z.string()),
    }),
    z.object({
      name: BroadcastRoundFormName,
      syncIds: z.string(),
    }),
    z.object({
      name: BroadcastRoundFormName,
      syncUsers: z.string(),
    }),
  ]),
  z.object({
    syncSource: z.optional(z.literal(["push", "url", "urls", "ids", "users"])),
    startsAt: z.optional(z.int().check(z.minimum(1356998400070))),
    startsAfterPrevious: z.optional(z.boolean()),
    delay: z.optional(z.int().check(z.minimum(0)).check(z.maximum(3600))),
    status: z.optional(z.literal(["new", "started", "finished"])),
    rated: z.optional(z.boolean()),
    "customScoring.white.win": z.optional(BroadcastCustomPoints),
    "customScoring.white.draw": z.optional(BroadcastCustomPoints),
    "customScoring.black.win": z.optional(BroadcastCustomPoints),
    "customScoring.black.draw": z.optional(BroadcastCustomPoints),
    period: z.optional(z.int().check(z.minimum(2)).check(z.maximum(60))),
  }),
);

type BroadcastRoundForm = z.infer<typeof BroadcastRoundForm>;

export { BroadcastRoundForm };
