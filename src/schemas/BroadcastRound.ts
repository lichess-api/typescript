import * as z from "zod";

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
  group: BroadcastGroup.optional(),
  isSubscribed: z.boolean().optional(),
  photos: BroadcastPhotos,
});

type BroadcastRound = z.infer<typeof BroadcastRound>;

export { BroadcastRound };
