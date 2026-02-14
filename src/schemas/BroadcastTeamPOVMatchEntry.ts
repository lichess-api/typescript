import * as z from "zod/mini";

import { BroadcastPointStr } from "./BroadcastPointStr";

const BroadcastTeamPOVMatchEntry = z.object({
  roundId: z.string(),
  opponent: z.string(),
  mp: z.optional(z.number()),
  gp: z.optional(z.number()),
  points: z.optional(BroadcastPointStr),
});

type BroadcastTeamPOVMatchEntry = z.infer<typeof BroadcastTeamPOVMatchEntry>;

export { BroadcastTeamPOVMatchEntry };
