import * as z from "minizod";

import { BroadcastGroup } from "./BroadcastGroup";
import { BroadcastPhotos } from "./BroadcastPhotos";
import { BroadcastRoundInfo } from "./BroadcastRoundInfo";
import { BroadcastTour } from "./BroadcastTour";

const BroadcastWithRoundsAndFullGroup = z.object({
  tour: BroadcastTour,
  group: z.optional(BroadcastGroup),
  rounds: z.array(BroadcastRoundInfo),
  defaultRoundId: z.optional(z.string()),
  photos: z.optional(BroadcastPhotos),
});

type BroadcastWithRoundsAndFullGroup = z.infer<
  typeof BroadcastWithRoundsAndFullGroup
>;

export { BroadcastWithRoundsAndFullGroup };
