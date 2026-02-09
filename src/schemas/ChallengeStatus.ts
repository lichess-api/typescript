import * as z from "zod/mini";

const ChallengeStatus = z.literal([
  "created",
  "offline",
  "canceled",
  "declined",
  "accepted",
]);

type ChallengeStatus = z.infer<typeof ChallengeStatus>;

export { ChallengeStatus };
