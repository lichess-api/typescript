import * as z from "minizod";

import { PerfType } from "./PerfType";

const ArenaRatingObj = z.object({
  perf: z.optional(PerfType),
  rating: z.int(),
});

type ArenaRatingObj = z.infer<typeof ArenaRatingObj>;

export { ArenaRatingObj };
