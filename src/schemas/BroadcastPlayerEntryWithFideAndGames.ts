import * as z from "zod/mini";

import { BroadcastGameEntry } from "./BroadcastGameEntry";
import { BroadcastPlayerEntry } from "./BroadcastPlayerEntry";
import { StatByFideTC } from "./StatByFideTC";

const BroadcastPlayerEntryWithFideAndGames = z.intersection(
  BroadcastPlayerEntry,
  z.object({
    fide: z.optional(
      z.object({
        year: z.optional(z.int()),
        ratings: z.optional(StatByFideTC),
      }),
    ),
    games: z.optional(z.array(BroadcastGameEntry)),
  }),
);

type BroadcastPlayerEntryWithFideAndGames = z.infer<
  typeof BroadcastPlayerEntryWithFideAndGames
>;

export { BroadcastPlayerEntryWithFideAndGames };
