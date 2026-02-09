import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { VariantKey } from "./VariantKey";

const UserActivityCorrespondenceGame = z.object({
  id: z.string(),
  color: GameColor,
  url: z.url(),
  variant: z.optional(VariantKey),
  speed: z.optional(z.literal("correspondence")),
  perf: z.optional(z.literal("correspondence")),
  rated: z.optional(z.boolean()),
  opponent: z.union([
    z.object({ aiLevel: z.int() }),
    z.object({
      user: z.string(),
      rating: z.int(),
    }),
  ]),
});

type UserActivityCorrespondenceGame = z.infer<
  typeof UserActivityCorrespondenceGame
>;

export { UserActivityCorrespondenceGame };
