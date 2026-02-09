import * as z from "zod/mini";

const PlayTime = z.object({
  total: z.int(),
  tv: z.int(),
  human: z.optional(z.int()),
});

type PlayTime = z.infer<typeof PlayTime>;

export { PlayTime };
