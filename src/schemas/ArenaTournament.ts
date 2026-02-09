import * as z from "zod/mini";

import { ArenaPerf } from "./ArenaPerf";
import { ArenaPosition } from "./ArenaPosition";
import { ArenaRatingObj } from "./ArenaRatingObj";
import { ArenaStatus } from "./ArenaStatus";
import { Clock } from "./Clock";
import { LightUser } from "./LightUser";
import { Variant } from "./Variant";

const ArenaTournament = z.object({
  id: z.string(),
  createdBy: z.string(),
  system: z.literal("arena"),
  minutes: z.int(),
  clock: Clock,
  rated: z.boolean(),
  fullName: z.string(),
  nbPlayers: z.int(),
  variant: Variant,
  startsAt: z.int(),
  finishesAt: z.int(),
  status: ArenaStatus,
  perf: ArenaPerf,
  secondsToStart: z.optional(z.int()),
  hasMaxRating: z.optional(z.boolean()),
  maxRating: z.optional(ArenaRatingObj),
  minRating: z.optional(ArenaRatingObj),
  minRatedGames: z.optional(z.object({ nb: z.optional(z.int()) })),
  botsAllowed: z.optional(z.boolean()),
  minAccountAgeInDays: z.optional(z.int()),
  onlyTitled: z.optional(z.boolean()),
  teamMember: z.optional(z.string()),
  private: z.optional(z.boolean()),
  position: z.optional(ArenaPosition),
  schedule: z.optional(
    z.object({
      freq: z.optional(z.string()),
      speed: z.optional(z.string()),
    }),
  ),
  teamBattle: z.optional(
    z.object({
      teams: z.optional(z.array(z.string())),
      nbLeaders: z.optional(z.int()),
    }),
  ),
  winner: z.optional(LightUser),
});

type ArenaTournament = z.infer<typeof ArenaTournament>;

export { ArenaTournament };
