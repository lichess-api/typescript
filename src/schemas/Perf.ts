import * as z from "zod";

const Perf = z.object({
  games: z.int(),
  rating: z.int(),
  rd: z.int(),
  prog: z.int(),
  prov: z.boolean().optional(),
  rank: z.int().optional(),
});

type Perf = z.infer<typeof Perf>;

export { Perf };
export default Perf;
