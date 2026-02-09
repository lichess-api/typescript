import * as z from "zod/mini";

import { ChallengeColor } from "./ChallengeColor";
import { ChallengeStatus } from "./ChallengeStatus";
import { GameColor } from "./GameColor";
import { Speed } from "./Speed";
import { TimeControl } from "./TimeControl";
import { Variant } from "./Variant";

const ChallengeOpenJson = z.object({
  id: z.string(),
  url: z.url(),
  status: ChallengeStatus,
  challenger: z.null(),
  destUser: z.null(),
  variant: Variant,
  rated: z.boolean(),
  speed: Speed,
  timeControl: TimeControl,
  color: ChallengeColor,
  finalColor: z.optional(GameColor),
  perf: z.object({
    icon: z.optional(z.string()),
    name: z.optional(z.string()),
  }),
  initialFen: z.optional(z.string()),
  urlWhite: z.url(),
  urlBlack: z.url(),
  open: z.object({ userIds: z.optional(z.tuple([z.string(), z.string()])) }),
});

type ChallengeOpenJson = z.infer<typeof ChallengeOpenJson>;

export { ChallengeOpenJson };
