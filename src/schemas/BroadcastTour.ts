import * as z from "zod/mini";

import { FideTimeControl } from "./FideTimeControl";
import { LightUser } from "./LightUser";

const BroadcastTour = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.int(),
  dates: z.optional(
    z.array(z.int()).check(z.minLength(1)).check(z.maxLength(2)),
  ),
  info: z.optional(
    z.object({
      website: z.optional(z.url()),
      players: z.optional(z.string()),
      location: z.optional(z.string()),
      tc: z.optional(z.string()),
      fideTC: z.optional(FideTimeControl),
      timeZone: z.optional(z.string()),
      standings: z.optional(z.url()),
      format: z.optional(z.string()),
    }),
  ),
  tier: z.optional(z.int()),
  image: z.optional(z.url()),
  description: z.optional(z.string()),
  teamTable: z.optional(z.boolean()),
  url: z.url(),
  communityOwner: z.optional(LightUser),
});

type BroadcastTour = z.infer<typeof BroadcastTour>;

export { BroadcastTour };
