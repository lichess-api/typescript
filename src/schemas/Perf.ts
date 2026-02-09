import * as z from "zod/mini";

const Perf = z.object({
  games: z.int(),
  rating: z.int(),
  rd: z.int(),
  prog: z.int(),
  prov: z.optional(z.boolean()),
  rank: z.optional(z.int()),
});

type Perf = z.infer<typeof Perf>;

export { Perf };
