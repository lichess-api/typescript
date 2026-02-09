import * as z from "zod/mini";

import { Title } from "./Title";

const BroadcastPlayerWithFed = z.object({
  name: z.string(),
  title: z.optional(Title),
  rating: z.optional(z.int()),
  fideId: z.optional(z.int()),
  team: z.optional(z.string()),
  fed: z.optional(z.string()),
});

type BroadcastPlayerWithFed = z.infer<typeof BroadcastPlayerWithFed>;

export { BroadcastPlayerWithFed };
