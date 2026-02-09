import * as z from "zod/mini";

import { BroadcastGameEntry } from "./BroadcastGameEntry";
import { BroadcastPlayerEntry } from "./BroadcastPlayerEntry";

const BroadcastPlayerEntryWithFideAndGames = z.intersection(
  BroadcastPlayerEntry,
  z.object({
    fide: z.optional(
      z.object({
        year: z.optional(z.int()),
        ratings: z.optional(
          z.object({
            standard: z.optional(z.int()),
            rapid: z.optional(z.int()),
            blitz: z.optional(z.int()),
          }),
        ),
      }),
    ),
    games: z.optional(z.array(BroadcastGameEntry)),
  }),
);

type BroadcastPlayerEntryWithFideAndGames = z.infer<
  typeof BroadcastPlayerEntryWithFideAndGames
>;

export { BroadcastPlayerEntryWithFideAndGames };
