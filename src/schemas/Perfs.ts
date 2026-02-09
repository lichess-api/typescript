import * as z from "zod/mini";

import { Perf } from "./Perf";
import { PuzzleModePerf } from "./PuzzleModePerf";

const Perfs = z.object({
  chess960: z.optional(Perf),
  atomic: z.optional(Perf),
  racingKings: z.optional(Perf),
  ultraBullet: z.optional(Perf),
  blitz: z.optional(Perf),
  kingOfTheHill: z.optional(Perf),
  threeCheck: z.optional(Perf),
  antichess: z.optional(Perf),
  crazyhouse: z.optional(Perf),
  bullet: z.optional(Perf),
  correspondence: z.optional(Perf),
  horde: z.optional(Perf),
  puzzle: z.optional(Perf),
  classical: z.optional(Perf),
  rapid: z.optional(Perf),
  storm: z.optional(PuzzleModePerf),
  racer: z.optional(PuzzleModePerf),
  streak: z.optional(PuzzleModePerf),
});

type Perfs = z.infer<typeof Perfs>;

export { Perfs };
