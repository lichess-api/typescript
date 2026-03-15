import * as z from "minizod";

import { BroadcastRoundInfo } from "./BroadcastRoundInfo";
import { BroadcastTour } from "./BroadcastTour";

const BroadcastWithLastRound = z.object({
  group: z.optional(z.string()),
  tour: z.optional(BroadcastTour),
  round: z.optional(BroadcastRoundInfo),
});

type BroadcastWithLastRound = z.infer<typeof BroadcastWithLastRound>;

export { BroadcastWithLastRound };
