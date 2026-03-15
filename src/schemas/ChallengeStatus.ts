import * as z from "minizod";

const ChallengeStatus = z.literal([
  "created",
  "offline",
  "canceled",
  "declined",
  "accepted",
]);

type ChallengeStatus = z.infer<typeof ChallengeStatus>;

export { ChallengeStatus };
