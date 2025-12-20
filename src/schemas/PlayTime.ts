import * as z from "zod";

const PlayTime = z.object({
  total: z.int(),
  tv: z.int(),
  human: z.int().optional(),
});

type PlayTime = z.infer<typeof PlayTime>;

export { PlayTime };
