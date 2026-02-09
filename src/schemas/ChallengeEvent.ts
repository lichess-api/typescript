import * as z from "zod/mini";

import { ChallengeJson } from "./ChallengeJson";
import { GameCompat } from "./GameCompat";

const ChallengeEvent = z.object({
  type: z.literal("challenge"),
  challenge: ChallengeJson,
  compat: z.optional(GameCompat),
});

type ChallengeEvent = z.infer<typeof ChallengeEvent>;

export { ChallengeEvent };
