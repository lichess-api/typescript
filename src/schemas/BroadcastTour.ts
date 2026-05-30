import * as z from "minizod";

import { BroadcastTourInfo } from "./BroadcastTourInfo";
import { LightUser } from "./LightUser";

const BroadcastTour = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.int(),
  dates: z.optional(
    z.array(z.int()).check(z.minLength(1)).check(z.maxLength(2)),
  ),
  info: z.optional(BroadcastTourInfo),
  tier: z.optional(z.int()),
  image: z.optional(z.url()),
  description: z.optional(z.string()),
  teamTable: z.optional(z.boolean()),
  showTeamScores: z.optional(z.boolean()),
  url: z.url(),
  communityOwner: z.optional(LightUser),
});

type BroadcastTour = z.infer<typeof BroadcastTour>;

export { BroadcastTour };
