import * as z from "zod/mini";

const ArenaSheet = z.object({
  scores: z.string(),
  fire: z.optional(z.boolean()),
});

type ArenaSheet = z.infer<typeof ArenaSheet>;

export { ArenaSheet };
