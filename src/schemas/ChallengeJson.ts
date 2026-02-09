import * as z from "zod/mini";

import { ChallengeColor } from "./ChallengeColor";
import { ChallengeStatus } from "./ChallengeStatus";
import { ChallengeUser } from "./ChallengeUser";
import { GameColor } from "./GameColor";
import { Speed } from "./Speed";
import { TimeControl } from "./TimeControl";
import { Variant } from "./Variant";

const ChallengeJson = z.object({
  id: z.string(),
  url: z.url(),
  status: ChallengeStatus,
  challenger: ChallengeUser,
  destUser: z.union([ChallengeUser, z.null()]),
  variant: Variant,
  rated: z.boolean(),
  speed: Speed,
  timeControl: TimeControl,
  color: ChallengeColor,
  finalColor: z.optional(GameColor),
  perf: z.object({
    icon: z.string(),
    name: z.string(),
  }),
  direction: z.optional(z.literal(["in", "out"])),
  initialFen: z.optional(z.string()),
  rematchOf: z.optional(z.string()),
});

type ChallengeJson = z.infer<typeof ChallengeJson>;

export { ChallengeJson };
