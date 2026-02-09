import * as z from "zod/mini";

const ChallengeColor = z.literal(["white", "black", "random"]);

type ChallengeColor = z.infer<typeof ChallengeColor>;

export { ChallengeColor };
