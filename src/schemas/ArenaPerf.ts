import * as z from "zod/mini";

import { PerfType } from "./PerfType";

const ArenaPerf = z.object({
  key: PerfType,
  name: z.string(),
  position: z.int(),
  icon: z.optional(z.string()),
});

type ArenaPerf = z.infer<typeof ArenaPerf>;

export { ArenaPerf };
