import * as z from "zod/mini";

import { BroadcastGroup } from "./BroadcastGroup";
import { BroadcastPhotos } from "./BroadcastPhotos";
import { BroadcastRoundInfo } from "./BroadcastRoundInfo";
import { BroadcastTour } from "./BroadcastTour";

const BroadcastWithRounds = z.object({
  tour: BroadcastTour,
  group: z.optional(BroadcastGroup),
  rounds: z.array(BroadcastRoundInfo),
  defaultRoundId: z.optional(z.string()),
  photos: z.optional(BroadcastPhotos),
});

type BroadcastWithRounds = z.infer<typeof BroadcastWithRounds>;

export { BroadcastWithRounds };
