import * as z from "zod/mini";

import { BroadcastPlayerEntry } from "./BroadcastPlayerEntry";
import { BroadcastTeamPOVMatchEntry } from "./BroadcastTeamPOVMatchEntry";

const BroadcastTeamLeaderboardEntry = z.object({
  name: z.string(),
  mp: z.number(),
  gp: z.number(),
  averageRating: z.optional(z.int()),
  matches: z.array(BroadcastTeamPOVMatchEntry),
  players: z.array(BroadcastPlayerEntry),
});

type BroadcastTeamLeaderboardEntry = z.infer<
  typeof BroadcastTeamLeaderboardEntry
>;

export { BroadcastTeamLeaderboardEntry };
