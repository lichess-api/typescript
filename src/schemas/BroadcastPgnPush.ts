import * as z from "zod/mini";

import { BroadcastPgnPushTags } from "./BroadcastPgnPushTags";

const BroadcastPgnPush = z.object({
  games: z.array(
    z.object({
      tags: BroadcastPgnPushTags,
      moves: z.optional(z.int()),
      error: z.optional(z.string()),
    }),
  ),
});

type BroadcastPgnPush = z.infer<typeof BroadcastPgnPush>;

export { BroadcastPgnPush };
