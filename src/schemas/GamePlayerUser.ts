import * as z from "zod/mini";

import { LightUser } from "./LightUser";

const GamePlayerUser = z.object({
  user: LightUser,
  rating: z.int(),
  ratingDiff: z.optional(z.int()),
  name: z.optional(z.string()),
  provisional: z.optional(z.boolean()),
  aiLevel: z.optional(z.int()),
  analysis: z.optional(
    z.object({
      inaccuracy: z.int(),
      mistake: z.int(),
      blunder: z.int(),
      acpl: z.int(),
      accuracy: z.optional(z.int()),
    }),
  ),
  team: z.optional(z.string()),
});

type GamePlayerUser = z.infer<typeof GamePlayerUser>;

export { GamePlayerUser };
