import * as z from "minizod";

import { FideTimeControl } from "./FideTimeControl";

const BroadcastTourInfo = z.object({
  format: z.optional(z.string().check(z.maxLength(80))),
  tc: z.optional(z.string()),
  fideTC: z.optional(FideTimeControl),
  timeZone: z.optional(z.string()),
  location: z.optional(z.string().check(z.maxLength(80))),
  players: z.optional(z.string().check(z.maxLength(120))),
  website: z.optional(z.url()),
  standings: z.optional(z.url()),
  regulations: z.optional(z.url()),
});

type BroadcastTourInfo = z.infer<typeof BroadcastTourInfo>;

export { BroadcastTourInfo };
