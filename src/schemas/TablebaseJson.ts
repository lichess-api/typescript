import * as z from "zod/mini";

import { TablebaseMove } from "./TablebaseMove";

const TablebaseJson = z.object({
  category: z.literal([
    "win",
    "unknown",
    "syzygy-win",
    "maybe-win",
    "cursed-win",
    "draw",
    "blessed-loss",
    "maybe-loss",
    "syzygy-loss",
    "loss",
  ]),
  dtz: z.optional(z.nullable(z.int())),
  precise_dtz: z.optional(z.nullable(z.int())),
  dtc: z.optional(z.nullable(z.int())),
  dtm: z.optional(z.nullable(z.int())),
  dtw: z.optional(z.nullable(z.int())),
  checkmate: z.optional(z.boolean()),
  stalemate: z.optional(z.boolean()),
  variant_win: z.optional(z.boolean()),
  variant_loss: z.optional(z.boolean()),
  insufficient_material: z.optional(z.boolean()),
  moves: z.array(TablebaseMove),
});

type TablebaseJson = z.infer<typeof TablebaseJson>;

export { TablebaseJson };
