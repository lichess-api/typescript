import * as z from "zod/mini";

const Count = z.object({
  all: z.int(),
  rated: z.int(),
  ai: z.optional(z.int()),
  draw: z.int(),
  drawH: z.optional(z.int()),
  loss: z.int(),
  lossH: z.optional(z.int()),
  win: z.int(),
  winH: z.optional(z.int()),
  bookmark: z.int(),
  playing: z.int(),
  import: z.int(),
  me: z.int(),
});

type Count = z.infer<typeof Count>;

export { Count };
