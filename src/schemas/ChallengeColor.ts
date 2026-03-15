import * as z from "minizod";

const ChallengeColor = z.literal(["white", "black", "random"]);

type ChallengeColor = z.infer<typeof ChallengeColor>;

export { ChallengeColor };
