import * as z from "zod/mini";

import { Title } from "./Title";

const BroadcastRoundGame = z.object({
  id: z.string(),
  name: z.string(),
  fen: z.optional(z.string()),
  players: z.optional(
    z.array(
      z.object({
        name: z.optional(z.string()),
        title: z.optional(Title),
        rating: z.optional(z.int()),
        fideId: z.optional(z.int()),
        fed: z.optional(z.string()),
        clock: z.optional(z.int()),
      }),
    ),
  ),
  lastMove: z.optional(z.string()),
  check: z.optional(z.literal(["+", "#"])),
  thinkTime: z.optional(z.int()),
  status: z.optional(z.literal(["*", "1-0", "0-1", "½-½"])),
});

type BroadcastRoundGame = z.infer<typeof BroadcastRoundGame>;

export { BroadcastRoundGame };
