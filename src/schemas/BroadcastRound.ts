import * as z from "zod/mini";

import { BroadcastGroup } from "./BroadcastGroup";
import { BroadcastPhotos } from "./BroadcastPhotos";
import { BroadcastRoundGame } from "./BroadcastRoundGame";
import { BroadcastRoundInfo } from "./BroadcastRoundInfo";
import { BroadcastRoundStudyInfo } from "./BroadcastRoundStudyInfo";
import { BroadcastTour } from "./BroadcastTour";

const BroadcastRound = z.object({
  round: BroadcastRoundInfo,
  tour: BroadcastTour,
  study: BroadcastRoundStudyInfo,
  games: z.array(BroadcastRoundGame),
  group: z.optional(BroadcastGroup),
  isSubscribed: z.optional(z.boolean()),
  photos: BroadcastPhotos,
});

type BroadcastRound = z.infer<typeof BroadcastRound>;

export { BroadcastRound };
