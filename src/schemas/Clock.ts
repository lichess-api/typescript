import * as z from "zod/mini";

const Clock = z.object({
  limit: z.int(),
  increment: z.int(),
});

type Clock = z.infer<typeof Clock>;

export { Clock };
