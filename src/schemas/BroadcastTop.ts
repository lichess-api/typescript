import * as z from "zod/mini";

import { BroadcastWithLastRound } from "./BroadcastWithLastRound";

const BroadcastTop = z.object({
  active: z.optional(z.array(BroadcastWithLastRound)),
  upcoming: z.optional(z.tuple([])),
  past: z.optional(
    z.object({
      currentPage: z.optional(z.int()),
      maxPerPage: z.optional(z.int()),
      currentPageResults: z.optional(z.array(BroadcastWithLastRound)),
      previousPage: z.optional(z.nullable(z.int())),
      nextPage: z.optional(z.nullable(z.int())),
    }),
  ),
});

type BroadcastTop = z.infer<typeof BroadcastTop>;

export { BroadcastTop };
