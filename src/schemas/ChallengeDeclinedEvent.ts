import * as z from "zod/mini";

import { ChallengeDeclinedJson } from "./ChallengeDeclinedJson";

const ChallengeDeclinedEvent = z.object({
  type: z.literal("challengeDeclined"),
  challenge: ChallengeDeclinedJson,
});

type ChallengeDeclinedEvent = z.infer<typeof ChallengeDeclinedEvent>;

export { ChallengeDeclinedEvent };
