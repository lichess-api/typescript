import * as z from "zod";

import { BroadcastGroup } from "./BroadcastGroup";
import { BroadcastPhotos } from "./BroadcastPhotos";
import { BroadcastRoundInfo } from "./BroadcastRoundInfo";
import { BroadcastTour } from "./BroadcastTour";

const BroadcastWithRounds = z.object({
  tour: BroadcastTour,
  group: BroadcastGroup.optional(),
  rounds: z.array(BroadcastRoundInfo),
  defaultRoundId: z.string().optional(),
  photos: BroadcastPhotos.optional(),
});

type BroadcastWithRounds = z.infer<typeof BroadcastWithRounds>;

export { BroadcastWithRounds };
