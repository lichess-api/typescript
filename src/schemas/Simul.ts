import * as z from "zod/mini";

import { LightUser } from "./LightUser";
import { VariantKey } from "./VariantKey";

const Simul = z.object({
  id: z.string(),
  host: z.intersection(
    LightUser,
    z.object({
      rating: z.optional(z.int()),
      provisional: z.optional(z.boolean()),
      gameId: z.optional(z.string()),
      online: z.optional(z.boolean()),
    }),
  ),
  name: z.string(),
  fullName: z.string(),
  variants: z.array(
    z.object({
      key: z.optional(VariantKey),
      icon: z.optional(z.string()),
      name: z.optional(z.string()),
    }),
  ),
  isCreated: z.boolean(),
  isFinished: z.boolean(),
  isRunning: z.boolean(),
  text: z.optional(z.string()),
  estimatedStartAt: z.optional(z.int()),
  startedAt: z.optional(z.int()),
  finishedAt: z.optional(z.int()),
  nbApplicants: z.int(),
  nbPairings: z.int(),
});

type Simul = z.infer<typeof Simul>;

export { Simul };
