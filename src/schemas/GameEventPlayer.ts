import * as z from "zod/mini";

import { Title } from "./Title";

const GameEventPlayer = z.object({
  aiLevel: z.optional(z.int()),
  id: z.string(),
  name: z.string(),
  title: z.optional(z.union([Title, z.null()])),
  rating: z.optional(z.int()),
  provisional: z.optional(z.boolean()),
});

type GameEventPlayer = z.infer<typeof GameEventPlayer>;

export { GameEventPlayer };
